import { useState, useRef, useEffect } from "react";
import { getDate, getMonth, getYear, format } from "date-fns";
import "./Calender.scss";

// Icon imports
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

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

export const Calender = (props) => {
	// Values to specify both the day the user selects, as well as the month/year the user currently sees
	const [chosenDay, setChosenDay] = useState<number>(getDate(Date.now()));
	const [chosenMonth, setChosenMonth] = useState<number>(getMonth(Date.now()));
	const [chosenYear, setChosenYear] = useState<number>(getYear(Date.now()));
	const [chosenDate, setChosenDate] = useState<string>(format(Date.now(), "dd/MM/yyyy")); // On init it should be today's date
	const [viewingMonth, setViewingMonth] = useState<number>(getMonth(Date.now()));
	const [viewingYear, setViewingYear] = useState<number>(getYear(Date.now()));

	useEffect(() => {
		props.onDaySelect(chosenDate);
	}, [chosenDate]);

	const getCalenderDays = () => {
		let arr = [];
		for (let i = 1; i < months[viewingMonth].days + 1; i++) {
			arr.push(
				<div
					className={`calender-day`}
					id={`calender-${i}-${viewingMonth}-${chosenYear}`}
					onClick={(e) => onCalenderDayClick(i, viewingMonth, viewingYear)}
				>
					{i < 10 ? "0" + i : i}
				</div>
			);
		}
		return arr;
	};

	const getCalenderDaysWithHighlightedDay = () => {
		let arr = [];
		for (let i = 1; i < months[viewingMonth].days + 1; i++) {
			arr.push(
				<div
					className={`calender-day ${chosenDay === i ? "calender-selected" : ""}`}
					id={`calender-${i}-${viewingMonth}-${chosenYear}`}
					onClick={(e) => onCalenderDayClick(i, viewingMonth, viewingYear)}
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
			if (viewingMonth >= 12) {
				setViewingMonth(1);
				setViewingYear(viewingYear + 1);
			} else {
				setViewingMonth(viewingMonth + 1);
			}
		} else {
			if (viewingMonth <= 1) {
				setViewingMonth(12);
				setViewingYear(viewingYear - 1);
			} else {
				setViewingMonth(viewingMonth - 1);
			}
		}
	};

	const onCalenderDayClick = (day: number, month: number, year: number) => {
		// Updating the "chosen" values
		setChosenDay(day);
		setChosenMonth(month);
		setChosenYear(year);
		setChosenDate(`${day}/${month}/${year}`);
	};

	const shouldHaveHighlightedDay = () => {
		return viewingMonth === chosenMonth && viewingYear === chosenYear;
	};

	return (
		<div>
			<div id="calender-toolbar">
				<div className="calender-arrow" onClick={() => onCalenderMonthChange(false)}>
					<FaLongArrowAltLeft size={30} />
				</div>
				<div>
					{months[viewingMonth].name.toUpperCase()} {viewingYear}
				</div>
				<div className="calender-arrow" onClick={() => onCalenderMonthChange(true)}>
					<FaLongArrowAltRight size={30} />
				</div>
			</div>
			<div id="calender-days-container">
				{shouldHaveHighlightedDay() ? getCalenderDaysWithHighlightedDay() : getCalenderDays()}
			</div>
		</div>
	);
};
