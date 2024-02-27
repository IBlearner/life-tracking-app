import "./Home.scss";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";

// const gettt = () => {
// 	fetch(`https://sheets.googleapis.com/v4/spreadsheets/${import.meta.env.VITE_SHEET_ID}/values/Sheet1!A1:A3`, {
// 		method: "GET"
// 	})
// 		.then((response) => {
// 			return response.json();
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// };

// const body = {
// 	range: `${import.meta.env.VITE_SHEET_NAME}!A1:A3`,
// 	values: [["Hello"], ["testing"], ["goodbye"]]
// };

// const up = (spreadsheetId, range, _values, callback) => {
// 	// let values = [
// 	// 	[
// 	// 		// Cell values ...
// 	// 	],
// 	// 	// Additional rows ...
// 	// ];
// 	// values = _values;
// 	// const body = {
// 	// 	values: values,
// 	// };
// 	try {
// 		gapi.client.spreadsheets.values
// 			.update({
// 				spreadsheetId: spreadsheetId,
// 				range: range,
// 				valueInputOption: "RAW",
// 				resource: body
// 			})
// 			.then((response) => {
// 				const result = response.result;
// 				console.log(`${result.updatedCells} cells updated.`);
// 				if (callback) callback(response);
// 			});
// 	} catch (err) {
// 		return console.log(err);
// 	}
// };

// const updateValues = () => {
// 	const body = {
// 		range: `${import.meta.env.VITE_SHEET_NAME}!A1:A3`,
// 		values: [["Hello"], ["testing"], ["goodbye"]],
// 	};

// 	fetch(`https://sheets.googleapis.com/v4/spreadsheets/${import.meta.env.VITE_SHEET_ID}/values/Test!A1:A3`, {
// 		method: "PUT",
// 		body: body,
// 	})
// 		.then((response) => {
// 			console.log(response);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// };

export const Home = ({ updateCurrentPage }: { updateCurrentPage: (e: string) => void }) => {
	const tiles = [
		{
			name: "exercise",
			icon: <GiWeightLiftingUp size={100} />
		},
		{
			name: "checklist",
			icon: <CiViewList size={100} />
		},
		{
			name: "groceries",
			icon: <MdOutlineLocalGroceryStore size={100} />
		},
		{
			name: "wasteCollection",
			icon: <BsTrash3 size={100} />
		},
		{
			name: "exercise",
			icon: <MdOutlineLocalGroceryStore size={100} />
		}
	];

	const getTileButtons = () => {
		return (
			<div id="tile-buttons">
				{tiles.map((elem) => {
					return (
						<div className="tile-button" onClick={() => updateCurrentPage(elem.name)}>
							<div className="tile-icon">{elem.icon}</div>
							<div className="tile-text">{elem.name.toUpperCase()}</div>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<>
			<h1 id="home-title">Life Tracker</h1>
			<p>
				<i>Because everyone needs a little help sometimes</i>
			</p>
			{getTileButtons()}

			{/* <form>
				<div>
					<input
						type="checkbox"
						id="test"
						name="subscribe"
						value="newsletter"
						// onClick={() => updateValues()}
						// onClick={() => {
						// 	console.log(gapi);
						// 	updateValues(import.meta.env.VITE_SHEET_ID, `${import.meta.env.VITE_SHEET_NAME}!A1:A3`, body, (data) => {
						// 		console.log(data);
						// 	});
						// }}
						onClick={() => {
							up(import.meta.env.VITE_SHEET_ID, `Test!A1:A3`, body, (data) => {
								console.log(data);
							});
						}}
					/>
					<label htmlFor="test">Did you eat a piece of fruit today?</label>
				</div>
				<div>
					<button type="submit">Subscribe</button>
				</div>
			</form>
			<button
				onClick={() =>
					// gettt(import.meta.env.VITE_SHEET_ID, `${import.meta.env.VITE_SHEET_NAME}!A1:B2`, (data) =>
					// 	console.log(data)
					// )
					gettt()
				}
			>
				Get
			</button> */}
		</>
	);
};
