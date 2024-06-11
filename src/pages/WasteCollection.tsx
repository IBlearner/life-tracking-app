import { useEffect, useState } from "react";
import { formatDistanceToNowStrict, add, isBefore, parse, format } from "date-fns";
import "./WasteCollection.scss";
import { IWasteCollectionItem, IKerbsideCollectionItem, text } from "../Constants";

// Icon imports
import { RiRecycleFill } from "react-icons/ri";
import { IoIosLeaf } from "react-icons/io";
import { BsFillTrash3Fill, BsBookmarkStarFill, BsBookmarkFill } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "react-icons/ri";
import { GoDot, GoDotFill } from "react-icons/go";

// MUI imports
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

enum BinInfoTypes {
	general = "general",
	recycle = "recycle",
	green = "green"
}

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
	const [suburbSavedInStorage, setSuburbSavedInStorage] = useState<string>(""); // Used to compare what suburb the user has currently saved
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true); // If the dropdown to select the suburb is open
	const [selectedBinInfo, setSelectedBinInfo] = useState<BinInfoTypes | undefined>(undefined); // If the dropdown to select the suburb is open

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

		// Check local storage to see if user has a saved suburb. Set state if found.
		// If one local storage item was found but the others aren't? Better to only set state if they are all found.
		const suburbBookmarkedLS = window.localStorage.getItem("waste-collection-suburb-bookmarked");
		const dayBookmarkedLS = window.localStorage.getItem("waste-collection-day-bookmarked");
		const zoneBookmarkedLS = window.localStorage.getItem("waste-collection-zone-bookmarked");
		if (suburbBookmarkedLS && dayBookmarkedLS && zoneBookmarkedLS) {
			setSelectedSuburb(suburbBookmarkedLS);
			setSelectedDay(dayBookmarkedLS);
			setSelectedZone(Number.parseInt(zoneBookmarkedLS));

			// Initialise state with suburb found in local storage
			setSuburbSavedInStorage(suburbBookmarkedLS);

			// Toggling the dropdown if there is already a suburb bookmarked
			setIsDropdownOpen(false);
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

		// We want the dropdown to only disappear if the user selects an actual suburb
		if (suburb) {
			setIsDropdownOpen(false);
		}
	};

	const onSuburbBookmark = (toggle: boolean) => {
		if (toggle) {
			window.localStorage.setItem("waste-collection-suburb-bookmarked", selectedSuburb);
			window.localStorage.setItem("waste-collection-day-bookmarked", selectedDay);
			window.localStorage.setItem("waste-collection-zone-bookmarked", selectedZone.toString());

			// We also need a state to save which suburb the user has saved to track while they're on this page
			setSuburbSavedInStorage(selectedSuburb);
		} else {
			window.localStorage.removeItem("waste-collection-suburb-bookmarked");
			window.localStorage.removeItem("waste-collection-day-bookmarked");
			window.localStorage.removeItem("waste-collection-zone-bookmarked");

			// Clearing whatever the user has stored
			setSuburbSavedInStorage("");
		}
	};

	const onSelectedBinInfoChange = (target: BinInfoTypes) => {
		// If the selected bin info is already the same as what they're clicking, toggle the info panel off (by making it undefined)
		setSelectedBinInfo(selectedBinInfo === target ? undefined : target);
	};

	// Fn to determine if it is green bin. If false then it has to be recycle week
	const isNatureBinWeek = (): boolean => {
		return isAltWeek === (selectedZone == 2);
	};

	const getSuburbHeader = () => {
		return <h2 id="suburb-header">{selectedSuburb}</h2>;
	};

	const getBinDayHeader = () => {
		return <span id="bin-day-header">{[selectedDay[0], selectedDay.slice(1).toLowerCase()].join("")}</span>;
	};

	const getSuburbSelectorComponent = () => {
		return (
			<div>
				{selectedSuburb ? undefined : <span>Use the dropdown below to choose a suburb</span>}
				<div id="suburb-selector-component">
					{getSuburbHeader()}
					{isDropdownOpen ? (
						getSuburbDropdown()
					) : (
						<FaGear color="grey" size={20} onClick={() => setIsDropdownOpen(true)} />
					)}
					{selectedSuburb ? getBookmarkIcon() : undefined}
				</div>
			</div>
		);
	};

	const getBookmarkIcon = () => {
		// If what is saved in the user's LS === what they currently have selected the bookmark should be on
		return suburbSavedInStorage === selectedSuburb ? (
			<BsBookmarkFill className={"suburb-bookmarked"} size={20} onClick={() => onSuburbBookmark(false)} />
		) : (
			<BsBookmarkStarFill className={"suburb-not-bookmarked"} size={20} onClick={() => onSuburbBookmark(true)} />
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
					<MenuItem value="" hidden={true} divider={true} disabled={true}>
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

	const getBinIconDot = (isFilled: boolean) => {
		return isFilled ? <GoDotFill /> : <GoDot />;
	};

	const getBinIcons = () => {
		return (
			<div id="bin-icon-group">
				<div id="bin-icon-groupling">
					<BsFillTrash3Fill
						className="bin-icon red-bin"
						size={50}
						onClick={() => onSelectedBinInfoChange(BinInfoTypes.general)}
					/>
					{getBinIconDot(selectedBinInfo === BinInfoTypes.general)}
				</div>
				<div id="bin-icon-groupling">
					<BsFillTrash3Fill
						className="bin-icon black-bin"
						size={50}
						onClick={() => onSelectedBinInfoChange(BinInfoTypes.general)}
					/>
					{getBinIconDot(selectedBinInfo === BinInfoTypes.general)}
				</div>
				{isNatureBinWeek() ? (
					<div id="bin-icon-groupling">
						<IoIosLeaf
							className="bin-icon green-bin"
							size={50}
							onClick={() => onSelectedBinInfoChange(BinInfoTypes.green)}
						/>
						{getBinIconDot(selectedBinInfo === BinInfoTypes.green)}
					</div>
				) : (
					<div id="bin-icon-groupling">
						<RiRecycleFill
							className="bin-icon yellow-bin"
							size={50}
							onClick={() => onSelectedBinInfoChange(BinInfoTypes.recycle)}
						/>
						{getBinIconDot(selectedBinInfo === BinInfoTypes.recycle)}
					</div>
				)}
				{getBinDayHeader()}
			</div>
		);
	};

	const getBinDescriptions = () => {
		let doText: string = "";
		let dontText: string = "";

		switch (selectedBinInfo) {
			case BinInfoTypes.general:
				doText = text.wasteCollection.generalWasteMessageDo;
				dontText = text.wasteCollection.generalWasteMessageDont;
				break;
			case BinInfoTypes.green:
				doText = text.wasteCollection.greenWasteMessageDo;
				dontText = text.wasteCollection.greenWasteMessageDont;
				break;
			case BinInfoTypes.recycle:
				doText = text.wasteCollection.recycleWasteMessageDo;
				dontText = text.wasteCollection.recycleWasteMessageDont;
				break;
			default:
				break;
		}
		return selectedBinInfo ? (
			<div id="bin-descriptions">
				{selectedBinInfo === BinInfoTypes.general}
				<div className="bin-descriptions-row">
					<RiCheckboxCircleFill size={80} color="green" />
					<p>Includes: {doText}</p>
				</div>
				<div className="bin-descriptions-row">
					<RiErrorWarningFill size={80} color="orange" />
					<p>Includes: {dontText}</p>
				</div>
				<p>
					Visit the&nbsp;
					<a href={text.wasteCollection.wasteViewMoreLink} target="_blank">
						official website
					</a>
					&nbsp;for more info.
				</p>
			</div>
		) : undefined;
	};

	const getKerbsideComponent = () => {
		const updatedKerbsideDay = getUpdatedKerbsideDay();

		// We need to check if the kerbsideDay in the data has been modified by us
		// Because if we did, we must inform the user know it may not be accurate
		return updatedKerbsideDay ? (
			<div id="kerbside-component">
				<h3>Kerbside collection: {updatedKerbsideDay}</h3>
				{getKerbsideDayFromData() !== updatedKerbsideDay ? (
					<span id="kerbside-inaccurate-message">{text.wasteCollection.kerbsideInaccurateMessage}</span>
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

			// We need to add a year onto the date IF the kerbside has already passed. Implementing while loop to accomodate all future years
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

			{selectedSuburb ? (
				<>
					{getBinIcons()}
					{getBinDescriptions()}
					{/* <p>
                        Click <button>here</button> to add a weekly reminder the night before. // Probably can't even do this w/o react native
                    </p> */}
					{getKerbsideComponent()}
				</>
			) : undefined}
		</div>
	);
};
