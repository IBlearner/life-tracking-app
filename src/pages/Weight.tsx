import { ChangeEvent, useState } from "react";
import { Calender } from "../components/Calender/Calender";
import { months } from "../Constants";
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

export const Weight = () => {
	// Instantiating the chosen date as the current date
	const [chosenDate, setChosenDate] = useState<Date>(new Date(Date.now()));
	const [weight, setWeight] = useState<number>(0);
	const [notes, setNotes] = useState<string>("");
	const [viewingMonth, setViewingMonth] = useState<number>(0);

	const updateSelectedDay = (chosenDate: Date) => {
		setChosenDate(chosenDate);
	};

	const updateViewingMonth = (viewingMonth: number) => {
		// The value from the calender viewing month is indexed 0-11
		setViewingMonth(viewingMonth);
	};

	const onWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
		setWeight(parseInt(e.target.value));
	};

	const onNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNotes(e.target.value);
	};

	const onSubmit = () => {
		const data = {
			date: chosenDate,
			weight: weight,
			notes: notes
		};
		return console.log(data);
	};

	const getWeightGraph = () => {
		// This gets the x-axis labels by geting # days in the month and creating an array for each of those days
		const labels = new Array(months[viewingMonth].days).fill("").map((_, i) => {
			return i + 1;
		});

		const weightData = [89, 88, 87, 89, 85, 83, 81, 85, 80];
		const data = {
			labels: labels,
			datasets: [
				{
					label: months[viewingMonth].name,
					data: weightData,
					borderColor: "rgb(53, 162, 235)",
					backgroundColor: "rgba(53, 162, 235, 0.5)"
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
					text: "Chart.js Line Chart"
				}
			}
		};

		return <Line options={options} data={data} />;
	};

	return (
		<div id="weight-container">
			<IoScaleOutline size={80} />
			<Calender onDaySelect={updateSelectedDay} onViewingMonthChange={updateViewingMonth} />
			<label htmlFor="weight-input">Weight:</label>
			<input id="weight-input" onChange={(e) => onWeightChange(e)} />
			<label htmlFor="notes-input">Notes:</label>
			<input id="notes-input" onChange={(e) => onNoteChange(e)} />
			<button onClick={() => onSubmit()}>SUBMIT</button>
			<p>{weight}</p>
			<p>{notes}</p>
			<p>Viewing month: {viewingMonth}</p>
			{getWeightGraph()}
		</div>
	);
};
