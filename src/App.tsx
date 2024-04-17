import { useState, useEffect } from "react";
import "./App.css";
import { IoHome } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

// Page imports
import { Home } from "./pages/Home";
import { Exercise } from "./pages/Exercise";
import { WasteCollection } from "./pages/WasteCollection";
import { Checklist } from "./pages/Checklist";
import { Weight } from "./pages/Weight";

function App() {
	const [currentPage, setCurrentPage] = useState<string>("home");
	const [userId, setUserId] = useState(123);

	useEffect(() => {
		setUserId(456);
	}, []);

	const getCurrentPage = () => {
		switch (currentPage) {
			case "home":
				return <Home updateCurrentPage={updateCurrentPage} />;
			case "exercise":
				return <Exercise />;
			case "checklist":
				return <Checklist />;
			case "wasteCollection":
				return <WasteCollection />;
			case "weight":
				return <Weight userId={userId} />;
			default:
				break;
		}
	};

	const getToolbar = () => {
		return (
			<div id="toolbar">
				<IoHome id="home-button-icon" size={30} onClick={() => setCurrentPage("home")} />
				<IoMenu id="menu-button-icon" size={30} onClick={() => console.log("opening menu..")} />
			</div>
		);
	};

	const updateCurrentPage = (page: string) => {
		setCurrentPage(page);
	};

	return (
		<div id="app-page">
			{currentPage !== "home" ? getToolbar() : null}
			{/* <button onClick={() => handleAuthClick()}>Authorize</button> */}
			{getCurrentPage()}
		</div>
	);
}

export default App;
