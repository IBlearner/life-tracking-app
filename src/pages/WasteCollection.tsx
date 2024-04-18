import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import "./WasteCollection.scss";
import { IoCheckmark } from "react-icons/io5";
import { BsTrash3 } from "react-icons/bs";
import { IWasteCollectionItem } from "../Constants";

// MUI imports
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const WasteCollection = () => {
	const wasteCollectionDataFile = "waste_collection_data_clean.json";
	const timeAnchor = new Date("2024-02-05");
	const [wasteCollectionData, setWasteCollectionData] = useState<IWasteCollectionItem[]>([]);
	const [selectedSuburb, setSelectedSuburb] = useState<string>("");
	const [selectedDay, setSelectedDay] = useState<string>("");
	const [selectedZone, setSelectedZone] = useState<number>(0);
	const [isAltWeek, setIsAltWeek] = useState<boolean>(true); // Represents if Zone 2 is trash week
	const [preferenceSaved, setPreferenceSaved] = useState<boolean>(false);

	useEffect(() => {
		fetch(wasteCollectionDataFile, {
			method: "GET"
		})
			.then((response) => response.json())
			.then((data) => {
				const dataMapped: IWasteCollectionItem[] = data.map((elem: any) => {
					return {
						suburb: elem[0],
						day: elem[1],
						zone: elem[2][5]
					} as IWasteCollectionItem;
				});
				setWasteCollectionData(dataMapped);
			});

		// Using date-fns package will return the distance between now and anchor as a string, so must convert to an number
		const rawDaysSinceAnchor = formatDistanceToNowStrict(timeAnchor, { unit: "day" }).split(" ");
		const cleanDaysSinceAnchor = Number.parseInt(rawDaysSinceAnchor[0]) ?? -1;
		setIsAltWeek(cleanDaysSinceAnchor % 13 <= 6);

		// Check local storage to see if user saved a preference. Set state if found.
		// If one local storage item was found but the others aren't? Better to only set state if they are all found.
		const suburbPref = window.localStorage.getItem("waste-collection-suburb-pref");
		const dayPref = window.localStorage.getItem("waste-collection-day-pref");
		const zonePref = window.localStorage.getItem("waste-collection-zone-pref");
		if (suburbPref && dayPref && zonePref) {
			setSelectedSuburb(suburbPref);
			setSelectedDay(dayPref);
			setSelectedZone(Number.parseInt(zonePref));
		}
	}, []);

	const getSuburbDropdown = () => {
		return (
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="suburb-select-label">Suburb</InputLabel>
				<Select
					labelId="suburb-select-label"
					id="suburb-select"
					value={selectedSuburb}
					onChange={(e) => onSuburbDropdownChange(e)}
					autoWidth
					label="Suburb"
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{getSuburbOptions()}
				</Select>
			</FormControl>
		);
	};

	const getSuburbOptions = () => {
		return (
			wasteCollectionData
				// Custom sort function to sort the array of objects by key "suburb"
				.sort((a, b) => {
					if (a.suburb < b.suburb) {
						return -1;
					}
					if (a.suburb > b.suburb) {
						return 1;
					}
					return 0;
				})
				.map((elem) => {
					return (
						<MenuItem value={elem.suburb} key={elem.suburb}>
							{elem.suburb.toLowerCase()}
						</MenuItem>
					);
				})
		);
	};

	const onSuburbDropdownChange = (e: any) => {
		const suburb = e.target.value;
		const index = wasteCollectionData.findIndex((elem) => elem.suburb === suburb);
		setSelectedSuburb(wasteCollectionData[index].suburb);
		setSelectedDay(wasteCollectionData[index].day);
		setSelectedZone(wasteCollectionData[index].zone);
		setPreferenceSaved(false);
	};

	const getSuburbData = () => {
		return (
			<div id="suburb-specific-data">
				<h3>Bin day: {selectedDay}</h3>
				{getBinColours()}
				{/* <p>
					Click <button>here</button> to add a weekly reminder the night before. // Probably can't even do this w/o react native
				</p> */}
				{getSavePreferenceSection()}
			</div>
		);
	};

	const onSaveSuburbPreference = () => {
		window.localStorage.setItem("waste-collection-suburb-pref", selectedSuburb);
		window.localStorage.setItem("waste-collection-day-pref", selectedDay);
		window.localStorage.setItem("waste-collection-zone-pref", selectedZone.toString());
		setPreferenceSaved(true);
	};

	const getBinColours = () => {
		return (
			<div id="bin-colour-group">
				<div className="bin-colour red"></div>
				<div className="bin-colour black"></div>
				<div className={`bin-colour ${isAltWeek === (selectedZone == 2) ? "yellow" : "green"}`}></div>
			</div>
		);
	};

	const getSavePreferenceSection = () => {
		return (
			<div id="save-preference">
				<button
					className={`${preferenceSaved ? "preference-saved" : "preference-not-saved"}`}
					onClick={() => onSaveSuburbPreference()}
				>
					Save suburb preference
				</button>
				<IoCheckmark
					id="checkmark"
					className={`${preferenceSaved ? "checkmark-shown" : "checkmark-not-shown"}`}
					enableBackground={"true"}
					size={60}
					color="rgb(0, 255, 4)"
				/>
			</div>
		);
	};

	return (
		<div id="waste-collection-container">
			<BsTrash3 size={80} />
			<p>Use the dropdown below to choose a suburb</p>
			{getSuburbDropdown()}
			<h2>{selectedSuburb}</h2>
			{selectedSuburb ? getSuburbData() : null}
		</div>
	);
};
