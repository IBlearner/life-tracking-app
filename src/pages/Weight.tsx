import { ChangeEvent, useState } from "react";
import { getDate, getMonth, getYear } from "date-fns";
import { Calender } from "../components/Calender/Calender";
import "./Weight.scss";

// Icon imports
import { IoScaleOutline } from "react-icons/io5";

export const Weight = () => {
	// Instantiating the chosen date as the current date
	const [chosenDate, setChosenDate] = useState<Date>(new Date(Date.now()));
	const [weight, setWeight] = useState<number>(0);
	const [notes, setNotes] = useState<string>("");

	const updateSelectedDay = (chosenDate: Date) => {
		setChosenDate(chosenDate);
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
	return (
		<div id="weight-container">
			<IoScaleOutline size={80} />
			<Calender onDaySelect={updateSelectedDay} />
			<p>{getDate(chosenDate)}</p>
			<p>{getMonth(chosenDate) + 1}</p>
			<p>{getYear(chosenDate)}</p>
			<label htmlFor="weight-input">Weight:</label>
			<input id="weight-input" onChange={(e) => onWeightChange(e)} />
			<label htmlFor="notes-input">Notes:</label>
			<input id="notes-input" onChange={(e) => onNoteChange(e)} />
			<button onClick={() => onSubmit()}>SUBMIT</button>
			<p>{weight}</p>
			<p>{notes}</p>
		</div>
	);
};
