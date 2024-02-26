import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import "./WasteCollection.scss";
import { IoCheckmark } from "react-icons/io5";

export const WasteCollection = () => {
	const wasteCollectionDataFile = "waste_collection_data_clean.json";
	const timeAnchor = new Date("2024-02-05");
	const [wasteCollectionData, setWasteCollectionData] = useState([]);
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
				setWasteCollectionData(data);
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

	const getSuburbOptions = () => {
		return wasteCollectionData.sort().map((elem) => {
			return (
				<option value={elem} key={elem[0]}>
					{elem[0]}
				</option>
			);
		});
	};

	const getSuburbData = () => {
		return (
			<>
				<div>
					<p>
						Your bin day is: <strong>{selectedDay}</strong>
					</p>
				</div>
				{getBinColours()}
				{/* <p>
					Click <button>here</button> to add a weekly reminder the night before. // Probably can't even do this w/o react native
				</p> */}
				<div id="save-preference">
					<button
						className={`${preferenceSaved ? "preference-saved" : "preference-not-saved"}`}
						onClick={() => saveSuburbPreference()}
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
			</>
		);
	};

	const saveSuburbPreference = () => {
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

	return (
		<div>
			{selectedSuburb ? <p>Showing for {selectedSuburb}</p> : <p>Select a suburb below</p>}
			<label htmlFor="suburb-select">Choose a suburb:</label>

			<select
				name="suburbs"
				id="suburb-select"
				onChange={(e) => {
					// e.target.value stringifies the data, so we need to handle this
					const data = e.target.value.split(",");
					setSelectedSuburb(data[0]);
					setSelectedDay(data[1]);
					setSelectedZone(Number.parseInt(data[2].split(" ")[1]));
					setPreferenceSaved(false);
				}}
			>
				<option value="choose-option">--Please choose an option--</option>
				{getSuburbOptions()}
			</select>
			{selectedSuburb ? getSuburbData() : null}
		</div>
	);
};
