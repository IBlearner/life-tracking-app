import { useEffect, useState } from "react";
import { compareAsc, format } from "date-fns";

export const WasteCollection = () => {
	const wasteCollectionDataFile = "waste_collection_data_clean.json";
	const [wasteCollectionData, setWasteCollectionData] = useState([]);
	const [selectedSuburb, setSelectedSuburb] = useState<string>("");
	const [selectedDay, setSelectedDay] = useState<string>("");
	const [selectedZone, setSelectedZone] = useState<string>("");
	const timeAnchor = new Date(2024, 2, 16);

	useEffect(() => {
		fetch(wasteCollectionDataFile, {
			method: "GET"
		})
			.then((response) => response.json())
			.then((data) => {
				setWasteCollectionData(data);
			});

		console.log(Date.now() - timeAnchor);
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
					<p>Your bin day is: {selectedDay}</p>
					<p>
						Click <button>here</button> to add a weekly reminder the night before.
					</p>
				</div>
				<div>{selectedZone}</div>
			</>
		);
	};

	return (
		<div>
			{selectedSuburb ? <p>Showing for {selectedSuburb}</p> : <p>Select a suburb below</p>}
			<label htmlFor="pet-select">Choose a suburb:</label>

			<select
				name="pets"
				id="pet-select"
				onChange={(e) => {
					// e.target.value stringifies the data, so we need to handle this
					const data = e.target.value.split(",");
					setSelectedSuburb(data[0]);
					setSelectedDay(data[1]);
					setSelectedZone(data[2]);
				}}
			>
				<option value="">--Please choose an option--</option>
				{getSuburbOptions()}
			</select>
			{selectedSuburb ? getSuburbData() : null}
		</div>
	);
};
