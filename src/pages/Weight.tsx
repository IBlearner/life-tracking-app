import { ChangeEvent, useEffect, useState } from "react";
import { Calender } from "../components/Calender/Calender";
import { months } from "../Constants";
import { IDateWeightItem, IUserDetails } from "../Interfaces";
import { format, toDate } from "date-fns";
import "./Weight.scss";
import CircularProgress from "@mui/material/CircularProgress";
import supabase from "../configs/supabaseClient";

// Graphing imports
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Weight = (props: { user: IUserDetails | null }) => {
	// Instantiating the chosen date as the current date
	const [chosenDate, setChosenDate] = useState<Date>(new Date(Date.now()));
	const [weight, setWeight] = useState<number>(0);
	const [notes, setNotes] = useState<string>("");
	const [viewingMonth, setViewingMonth] = useState<number>(0);
	const [viewingYear, setViewingYear] = useState<number>(0);
	const [weightData, setWeightData] = useState<IDateWeightItem[]>([]);
	const [weightDataViewingPeriod, setWeightDataViewingPeriod] = useState<IDateWeightItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		// Get user data
		getData();

		// TODO: We need to filter the data so that we have only the data for the current viewing month
		// getDataForViewingMonth();
	}, []);

	useEffect(() => {
		getDataForViewingMonth();
	}, [viewingMonth, viewingYear, weightData]);

	const getData = async () => {
		if (!props.user) {
			return console.log("There is no user signed in..");
		} else {
			setIsLoading(true);

			const { data, error, status } = await supabase.from("Weight data").select();

			if (error) throw error;
			if (status === 200) {
				const mappedData = data.map((elem) => {
					return {
						id: elem.user_id,
						date: toDate(elem.date),
						weight: elem.weight,
						notes: elem.notes
					} as IDateWeightItem;
				});
				setWeightData(mappedData);
				setIsLoading(false);
			}
		}
	};

	const getDataForViewingMonth = () => {
		// Remember, viewingMonth is the position of the month in the arr so 0-11 - must +1 here
		const filteredWeightData = weightData.filter((elem: IDateWeightItem) => {
			return format(elem.date, "MM/yyyy").includes(`${viewingMonth + 1}/${viewingYear}`);
		});

		setWeightDataViewingPeriod(filteredWeightData);
	};

	const updateSelectedDay = (chosenDate: Date) => {
		setChosenDate(chosenDate);
	};

	const updateViewingMonth = (viewingMonth: number) => {
		// The value from the calender viewing month is indexed 0-11
		setViewingMonth(viewingMonth);
	};

	const updateViewingYear = (viewingYear: number) => {
		setViewingYear(viewingYear);
	};

	const onWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
		setWeight(parseInt(e.target.value));
	};

	const onNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNotes(e.target.value);
	};

	const onSubmit = async () => {
		if (!props.user) {
			return console.log("There is no user signed in..");
		} else {
			setIsLoading(true);

			const { data, error, status, statusText } = await supabase
				.from("Weight data")
				.insert({ date: chosenDate.toDateString(), weight: weight, notes: notes, user_id: props.user?.id })
				.select();

			if (error) throw error;
			if (status === 201 && statusText === "Created") {
				console.log(data);

				// Refresh user data
				getData();
				// Clear the input field
				setWeight(0);

				setIsLoading(false);
			}
		}
	};

	const getWeightGraph = () => {
		// This gets the x-axis labels by geting # days in the month and creating an array for each of those days
		const labels = new Array(months[viewingMonth].days).fill("").map((_, i) => {
			return i + 1;
		});

		const weightDataArr = new Array(months[viewingMonth].days).fill(null);
		weightDataViewingPeriod.forEach((elem) => {
			// For each elem in the current viewing month, we get the index of the date to modify the weight at that position
			const day = parseInt(format(elem.date, "d"));
			// We must -1 because day starts at 1, but indexing starts at 0
			weightDataArr[day - 1] = elem.weight;
		});

		const data = {
			labels: labels,
			datasets: [
				{
					label: months[viewingMonth].name,
					data: weightDataArr,
					borderColor: "rgb(53, 162, 235)",
					backgroundColor: "rgba(53, 162, 235, 0.5)",
					spanGaps: true,
					tension: 0.2
				}
			]
		};

		const options = {
			responsive: true,
			plugins: {
				legend: {
					position: "top" as const
				},
				title: {
					display: true,
					text: `Weight progress for ${months[viewingMonth].name.toUpperCase()}`
				}
			}
		};

		return <Line options={options} data={data} />;
	};

	return (
		<div id="weight-container">
			<Calender
				onDaySelect={updateSelectedDay}
				onViewingMonthChange={updateViewingMonth}
				onViewingYearChange={updateViewingYear}
			/>
			<label htmlFor="weight-input">Weight:</label>
			<input id="weight-input" onChange={(e) => onWeightChange(e)} value={weight || ""} />
			<label htmlFor="notes-input">Notes:</label>
			<input id="notes-input" onChange={(e) => onNoteChange(e)} value={notes} />
			<button onClick={() => onSubmit()}>SUBMIT</button>
			{isLoading ? (
				<CircularProgress />
			) : (
				<div>
					<p>{notes}</p>
					{getWeightGraph()}
				</div>
			)}
		</div>
	);
};
