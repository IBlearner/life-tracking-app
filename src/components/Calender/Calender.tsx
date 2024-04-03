import { useState, useEffect } from "react";
import { getDate, getMonth, getYear } from "date-fns";
import { months } from "../../Constants";
import "./Calender.scss";

// Icon imports
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

export const Calender = (props: { onDaySelect: (e: Date) => void; onViewingMonthChange: (e: number) => void }) => {
	// Values to specify both the day the user selects, as well as the month/year the user currently sees
	const [chosenDay, setChosenDay] = useState<number>(getDate(Date.now()));
	const [chosenMonth, setChosenMonth] = useState<number>(getMonth(Date.now()));
	const [chosenYear, setChosenYear] = useState<number>(getYear(Date.now()));
	const [chosenDate, setChosenDate] = useState<Date>(new Date(Date.now())); // On init it should be today's date
	const [viewingMonth, setViewingMonth] = useState<number>(getMonth(Date.now()));
	const [viewingYear, setViewingYear] = useState<number>(getYear(Date.now()));

	useEffect(() => {
		props.onDaySelect(chosenDate);
	}, [chosenDate]);

	// On init, and when the viewing month changes, we want to emit the current viewing month
	useEffect(() => {
		props.onViewingMonthChange(viewingMonth);
	}, [viewingMonth]);

	const getCalenderDays = () => {
		let arr = [];
		for (let i = 1; i < months[viewingMonth].days + 1 + (isLeapYear() ? 1 : 0); i++) {
			arr.push(
				<div
					className={`calender-day`}
					id={`calender-${i}-${viewingMonth}-${chosenYear}`}
					onClick={() => onCalenderDayClick(i, viewingMonth, viewingYear)}
				>
					{i < 10 ? "0" + i : i}
				</div>
			);
		}
		return arr;
	};

	const getCalenderDaysWithHighlightedDay = () => {
		let arr = [];
		for (let i = 1; i < months[viewingMonth].days + 1 + (isLeapYear() ? 1 : 0); i++) {
			arr.push(
				<div
					className={`calender-day ${chosenDay === i ? "calender-selected" : ""}`}
					id={`calender-${i}-${viewingMonth}-${chosenYear}`}
					onClick={() => onCalenderDayClick(i, viewingMonth, viewingYear)}
				>
					{i < 10 ? "0" + i : i}
				</div>
			);
		}
		arr.push(<div className={`empty-calender-day`}>{9}</div>);
		return arr;
	};

	const onCalenderMonthChange = (forwards: boolean) => {
		// Implementing bounds for the month changer
		// Note: getMonth will give Jan = 0, Dec = 11 so we must have bounds between 0-11
		if (forwards) {
			if (viewingMonth >= 11) {
				setViewingMonth(0);
				setViewingYear(viewingYear + 1);
			} else {
				setViewingMonth(viewingMonth + 1);
			}
		} else {
			if (viewingMonth <= 0) {
				setViewingMonth(11);
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
		setChosenDate(new Date(year, month, day));
	};

	const shouldHaveHighlightedDay = () => {
		return viewingMonth === chosenMonth && viewingYear === chosenYear;
	};

	const isLeapYear = () => {
		return viewingMonth === 1 && viewingYear % 4 === 0;
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
