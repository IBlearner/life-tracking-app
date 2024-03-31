import { useRef, useState } from "react";
import { getDay, getMonth, getYear } from "date-fns";
import { Calender } from "../components/Calender/Calender";
import "./Weight.scss";

// Icon imports
import { IoScaleOutline } from "react-icons/io5";
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

export const Weight = () => {
	// Values to specify both the day the user selects, as well as the month/year the user currently sees
	const [chosenDay, setChosenDay] = useState<number>(getDay(Date.now()));
	const [chosenMonth, setChosenMonth] = useState<number>(getMonth(Date.now()));
	const [chosenYear, setChosenYear] = useState<number>(getYear(Date.now()));
	const [viewingMonth, setViewingMonth] = useState<number>(getMonth(Date.now()));
	const [viewingYear, setViewingYear] = useState<number>(getYear(Date.now()));
	// TODO: WE NEED TO DIFFERENET THE VIEWING AND CHOSEN VALUES
	const [curDate, setCurDate] = useState<string>(Date.now().toString());
	const [chosenDate, setChosenDate] = useState<string>(Date.now().toString());

	const calenderDayRef = useRef<HTMLElement | null>(null);

	const getCalender = () => {
		return (
			<div>
				<div id="calender-toolbar">
					<div className="calender-arrow" onClick={() => onCalenderMonthChange(false)}>
						<FaLongArrowAltLeft size={30} />
					</div>
					<div>
						{months[viewingMonth - 1].name.toUpperCase()} {viewingYear}
					</div>
					<div className="calender-arrow" onClick={() => onCalenderMonthChange(true)}>
						<FaLongArrowAltRight size={30} />
					</div>
				</div>
				<div id="calender-days-container">{getCalenderDays(viewingMonth)}</div>
			</div>
		);
	};

	const getCalenderDays = (month: number) => {
		// The month we get in this param is DIFFERENT to the one we are looking in the month const since arr starts at 0 not 1.
		const monthPos = month - 1;

		let arr = [];
		for (let i = 1; i < months[monthPos].days + 1; i++) {
			arr.push(
				<div
					className="calender-day"
					id={`calender-${i}-${month}-${chosenYear}`}
					onClick={(e) => onCalenderDayClick(i, month, viewingYear, e.target as HTMLElement)}
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

	const onCalenderDayClick = (day: number, month: number, year: number, elemRef: HTMLElement) => {
		// Updating the "chosen" values
		setChosenDay(day);
		setChosenMonth(month);
		setChosenYear(year);

		// We need to first deselect the current day ref
		// TODO: On init, we want the day ref to be todays date.
		if (calenderDayRef.current) {
			calenderDayRef.current.classList.remove("calender-selected");
		}
		// Then update to the new day ref
		calenderDayRef.current = elemRef;
		calenderDayRef.current.classList.add("calender-selected");

		console.log(calenderDayRef.current);
	};

	const updateSelectedDay = (chosenDate: string) => {
		console.log(chosenDate);
	};

	return (
		<div id="weight-container">
			<IoScaleOutline size={80} />
			<Calender onDaySelect={updateSelectedDay} />
			{/* <p>{curDate}</p> */}
			{/* <p>{chosenDate}</p> */}
			<p>{chosenDay}</p>
			<p>{chosenMonth}</p>
			<p>{chosenYear}</p>
			<input />
		</div>
	);
};
