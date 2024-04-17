import { ChangeEvent, useEffect, useState } from "react";
import { Calender } from "../components/Calender/Calender";
import { appsScriptURL, IDateWeightItem, months } from "../Constants";
import { parseISO, format, isValid, toDate } from "date-fns";
import "./Weight.scss";

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

// Icon imports
import { IoScaleOutline } from "react-icons/io5";

export const Weight = (props: { userId: number }) => {
	// Instantiating the chosen date as the current date
	const [chosenDate, setChosenDate] = useState<Date>(new Date(Date.now()));
	const [weight, setWeight] = useState<number>(0);
	const [notes, setNotes] = useState<string>("");
	const [viewingMonth, setViewingMonth] = useState<number>(0);
	const [viewingYear, setViewingYear] = useState<number>(0);
	const [weightData, setWeightData] = useState<IDateWeightItem[]>([]);
	const [weightDataViewingPeriod, setWeightDataViewingPeriod] = useState<IDateWeightItem[]>([]);

	useEffect(() => {
		// Get user data
		getData();

		// TODO: We need to filter the data so that we have only the data for the current viewing month
		// getDataForViewingMonth();
	}, []);

	useEffect(() => {
		getDataForViewingMonth();
	}, [viewingMonth, viewingYear, weightData]);

	const getData = () => {
		fetch(`${appsScriptURL}?userId=${props.userId}`, {
			method: "GET"
		})
			.then((response) => response.json())
			.then((data) => {
				const mappedData = data
					.map((elem: any) => {
						// Date comes to us in ISO format so we must convert it to a Date type (or "") if it's invalid.
						const elemDateConvert = isValid(parseISO(elem.date)) ? toDate(parseISO(elem.date)) : "";
						// We don't care about entries that have invalid dates, so we'll map it as null then filter it out
						// TODO: Add a check for other potential malformed values such as weight
						if (!elemDateConvert) return null;
						return {
							id: elem.userId,
							date: elemDateConvert,
							weight: elem.weight,
							notes: elem.notes
						} as IDateWeightItem;
					})
					.filter((elem: IDateWeightItem) => {
						return !!elem;
					});
				setWeightData(mappedData);
			});
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

	const onSubmit = () => {
		// Our database is storing time as MM/dd/yyyy so we must format it as so
		fetch(
			`${appsScriptURL}?method=post&userId=${props.userId}&date=${format(
				chosenDate,
				"MM/dd/yyyy"
			)}&weight=${weight}&notes=${notes}`,
			{
				method: "GET"
			}
		)
			.then((response) => response.json())
			.then((data) => {
				// TODO: handle the response. 200 is OK, 400 is not.
				console.log(data);

				// We want to refresh the user's data after successful submit
				if (data.status === "OK" && data.statusCode === 200) {
					getData();

					// Clear the input field
					setWeight(0);
				}
			});

		// TODO: add a set timer out to reload the page??
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
			<IoScaleOutline size={80} />
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
			<p>{notes}</p>
			{getWeightGraph()}
			<p>Signed in as {props.userId}</p>
		</div>
	);
};
