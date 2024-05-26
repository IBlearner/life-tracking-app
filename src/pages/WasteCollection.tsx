import { useEffect, useState } from "react";
import { formatDistanceToNowStrict, add, isBefore, parse, format } from "date-fns";
import "./WasteCollection.scss";
import { IWasteCollectionItem, IKerbsideCollectionItem } from "../Constants";

// Icon imports
import { RiRecycleFill } from "react-icons/ri";
import { IoCheckmark } from "react-icons/io5";
import { IoIosLeaf } from "react-icons/io";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";

// MUI imports
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const WasteCollection = () => {
	const wasteCollectionDataFile = "waste_collection_data_clean.json";
	const kerbsideCollectionDataFile = "kerbside_collection_data_clean.json";
	const [wasteCollectionData, setWasteCollectionData] = useState<IWasteCollectionItem[]>([]);
	const [kerbsideCollectionData, setKerbCollectionData] = useState<IKerbsideCollectionItem[]>([]);
	const timeAnchor = new Date("2024-02-05");
	const [selectedSuburb, setSelectedSuburb] = useState<string>("");
	const [selectedDay, setSelectedDay] = useState<string>("");
	const [selectedZone, setSelectedZone] = useState<number>(0);
	const [isAltWeek, setIsAltWeek] = useState<boolean>(true); // Represents if Zone 2 is trash week
	const [preferenceSaved, setPreferenceSaved] = useState<boolean>(false);
	const [suburbSavedInStorage, setSuburbSavedInStorage] = useState<string>("");
	const [isDropdownAvailable, setIsDropdownAvailable] = useState<boolean>(true);

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

		fetch(kerbsideCollectionDataFile, {
			method: "GET"
		})
			.then((response) => response.json())
			.then((data) => {
				const dataMapped: IKerbsideCollectionItem[] = data.map((elem: any) => {
					return {
						suburb: elem[0],
						day: elem[1]
					} as IKerbsideCollectionItem;
				});
				setKerbCollectionData(dataMapped);
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

			// Initialise state with suburb found in local storage
			setSuburbSavedInStorage(suburbPref);

			// Toggling the dropdown if there is already a suburb saved as a preference
			setIsDropdownAvailable(false);
		}
	}, []);

	const onSuburbDropdownChange = (e: any) => {
		const suburb = e.target.value;

		if (suburb) {
			const index = wasteCollectionData.findIndex((elem) => elem.suburb === suburb);
			setSelectedSuburb(wasteCollectionData[index].suburb);
			setSelectedDay(wasteCollectionData[index].day);
			setSelectedZone(wasteCollectionData[index].zone);
		} else {
			// Saving empty data to reset data
			setSelectedSuburb("");
			setSelectedDay("");
			setSelectedZone(0);
		}

		setPreferenceSaved(false);

		// We want the dropdown to only disappear if the user selects an actual suburb
		if (suburb) {
			setIsDropdownAvailable(false);
		}
	};

	const onSaveSuburbPreference = () => {
		window.localStorage.setItem("waste-collection-suburb-pref", selectedSuburb);
		window.localStorage.setItem("waste-collection-day-pref", selectedDay);
		window.localStorage.setItem("waste-collection-zone-pref", selectedZone.toString());
		setPreferenceSaved(true);

		// We also need a state to save which suburb the user has saved to track while they're on this page
		setSuburbSavedInStorage(selectedSuburb);
	};

	const isNatureBinWeek = (): boolean => {
		return isAltWeek === (selectedZone == 2);
	};

	const getSuburbHeader = () => {
		return <h2 id="suburb-header">{selectedSuburb}</h2>;
	};

	const getSuburbSelectorComponent = () => {
		return (
			<div>
				{selectedSuburb ? undefined : <span>Use the dropdown below to choose a suburb</span>}
				<div id="suburb-selector-component">
					{getSuburbHeader()}
					{isDropdownAvailable ? (
						getSuburbDropdown()
					) : (
						<FaGear color="grey" size={20} onClick={() => setIsDropdownAvailable(true)} />
					)}
				</div>
			</div>
		);
	};

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

	const getSuburbData = () => {
		return (
			<div id="suburb-specific-data">
				<h3>Bin day: {selectedDay}</h3>
				{getBinIcons()}
				{/* <p>
					Click <button>here</button> to add a weekly reminder the night before. // Probably can't even do this w/o react native
				</p> */}
				{getKerbsideComponent()}
			</div>
		);
	};

	const getBinIcons = () => {
		return (
			<div id="bin-colour-group">
				<div>
					<BsFillTrash3Fill className="bin-icon red-bin" size={50} />
				</div>
				<div>
					<BsFillTrash3Fill className="bin-icon black-bin" size={50} />
				</div>
				<div>
					{isNatureBinWeek() ? (
						<IoIosLeaf className="bin-icon green-bin" size={50} />
					) : (
						<RiRecycleFill className="bin-icon yellow-bin" size={50} />
					)}
				</div>
			</div>
		);
	};

	const getSavePreferenceComponent = () => {
		const isSuburbAlreadySaved = selectedSuburb === suburbSavedInStorage;
		return (
			<div id="save-preference">
				<button
					className={`${preferenceSaved ? "preference-saved" : "preference-not-saved"}`}
					disabled={isSuburbAlreadySaved}
					onClick={() => onSaveSuburbPreference()}
				>
					{isSuburbAlreadySaved ? "Preference Saved" : "Save suburb preference"}
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

	const getKerbsideComponent = () => {
		const updatedKerbsideDay = getUpdatedKerbsideDay();

		// We need to check if the kerbsideDay in the data has been modified by us
		// Because if we did, we must inform the user know it may not be accurate
		return updatedKerbsideDay ? (
			<div id="kerbside-component">
				<h3>Kerbside collection: {updatedKerbsideDay}</h3>
				{getKerbsideDayFromData() !== updatedKerbsideDay ? (
					<span id="kerbside-inaccurate-message">
						This kerbside collection date may not be accurate as it was based on the previous year's data.
					</span>
				) : undefined}
			</div>
		) : undefined;
	};

	const getKerbsideDayFromData = (): string => {
		const kerbsideElem = kerbsideCollectionData.find(
			(elem: IKerbsideCollectionItem) => elem.suburb === selectedSuburb
		);
		return kerbsideElem ? kerbsideElem.day : "";
	};

	const getUpdatedKerbsideDay = (): string => {
		let kerbsideDay = getKerbsideDayFromData();

		if (kerbsideDay) {
			// Converting the string date to a workable date
			let kerbsideDayAsDate = parse(kerbsideDay, "dd/MM/yyyy", new Date());

			// We need to add a year onto the date IF the kurbside has already passed. Implementing while loop to accomodate all future years
			while (isBefore(kerbsideDayAsDate, Date.now())) {
				kerbsideDayAsDate = add(kerbsideDayAsDate, {
					years: 1
				});
			}

			kerbsideDay = format(kerbsideDayAsDate, "dd/MM/yyyy");
		}

		return kerbsideDay;
	};

	return (
		<div id="waste-collection-container">
			{getSuburbSelectorComponent()}
			{selectedSuburb ? getSuburbData() : null}
			{getSavePreferenceComponent()}
		</div>
	);
};
