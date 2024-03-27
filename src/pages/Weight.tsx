import { useState } from "react";
import "./Weight.scss";
import { IoScaleOutline } from "react-icons/io5";

interface IMonths {
	name: string;
	days: number;
}
const months: IMonths[] = [
	{
		name: "january",
		days: 31
	},
	{
		name: "february",
		days: 28
	},
	{
		name: "march",
		days: 31
	},
	{
		name: "april",
		days: 30
	},
	{
		name: "may",
		days: 31
	},
	{
		name: "june",
		days: 30
	},
	{
		name: "july",
		days: 31
	},
	{
		name: "august",
		days: 31
	},
	{
		name: "september",
		days: 30
	},
	{
		name: "october",
		days: 31
	},
	{
		name: "november",
		days: 30
	},
	{
		name: "december",
		days: 31
	}
];

export const Weight = () => {
	const [curDay, setCurDay] = useState<number>(6);
	const [curMonth, setCurMonth] = useState<number>(6);
	const [curYear, setCurYear] = useState<number>(2024);
	const [curDate, setCurDate] = useState<string>(Date.now().toString());
	const [chosenDate, setChosenDate] = useState<string>(Date.now().toString());

	const getCalender = () => {
		return (
			<div>
				<div id="calender-toolbar">
					<div onClick={() => onCalenderMonthChange(false)}>BACK</div>
					<div>
						{months[curMonth - 1].name} + {curYear}
					</div>
					<div onClick={() => onCalenderMonthChange(true)}>FORWARD</div>
				</div>
				<div id="calender-days-container">{getCalenderDays(curMonth)}</div>
			</div>
		);
	};

	const getCalenderDays = (month: number) => {
		// The month we get in this param is DIFFERENT to the one we are looking in the month const since arr starts at 0 not 1.
		const monthPos = month - 1;

		let arr = [];
		for (let i = 1; i < months[monthPos].days; i++) {
			arr.push(
				<div
					className="calender-day"
					id={`calender-${i}-${months[monthPos]}-${curYear}`}
					onClick={() => onCalenderDayClick(i, month, curYear)}
				>
					{i < 10 ? "0" + i : i}
				</div>
			);
		}
		return arr;
	};

	const onCalenderMonthChange = (forwards: boolean) => {
		// Implementing bounds for the month changer
		if (forwards) {
			console.log(curMonth);
			if (curMonth >= 12) {
				setCurMonth(1);
				setCurYear(curYear + 1);
			} else {
				setCurMonth(curMonth + 1);
			}
		} else {
			if (curMonth <= 1) {
				setCurMonth(12);
				setCurYear(curYear - 1);
			} else {
				setCurMonth(curMonth - 1);
			}
		}
	};

	const onCalenderDayClick = (day: number, month: number, year: number) => {
		setCurDay(day);
		setCurMonth(month);
		setCurYear(year);
	};

	return (
		<div id="weight-container">
			<IoScaleOutline size={80} />
			{getCalender()}
			<p>{curDate}</p>
			<p>{chosenDate}</p>
			<p>{curDay}</p>
			<p>{curMonth}</p>
			<p>{curYear}</p>

			<p>select a day and input it</p>
		</div>
	);
};
