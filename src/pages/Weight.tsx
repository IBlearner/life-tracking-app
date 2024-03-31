import { useState } from "react";
import { getDate, getMonth, getYear } from "date-fns";
import { Calender } from "../components/Calender/Calender";
import "./Weight.scss";

// Icon imports
import { IoScaleOutline } from "react-icons/io5";

export const Weight = () => {
	// Instantiating the chosen date as the current date
	const [chosenDate, setChosenDate] = useState<Date>(new Date(Date.now()));
	const [userWeight, setUserWeight] = useState<number>(0);

	const updateSelectedDay = (chosenDate: Date) => {
		setChosenDate(chosenDate);
	};

	return (
		<div id="weight-container">
			<IoScaleOutline size={80} />
			<Calender onDaySelect={updateSelectedDay} />
			{/* <p>{curDate}</p> */}
			{/* <p>{chosenDate}</p> */}
			<p>{getDate(chosenDate)}</p>
			<p>{getMonth(chosenDate) + 1}</p>
			<p>{getYear(chosenDate)}</p>
			<input />
		</div>
	);
};
