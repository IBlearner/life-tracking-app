import { useState } from "react";
import "./App.css";
import { IoHome } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

// Page imports
import { Home } from "./pages/Home";
import { Exercise } from "./pages/Exercise";
import { WasteCollection } from "./pages/WasteCollection";

function App() {
	const [currentPage, setCurrentPage] = useState<string>("home");

	const getCurrentPage = () => {
		switch (currentPage) {
			case "home":
				return <Home updateCurrentPage={updateCurrentPage} />;
			case "exercise":
				return <Exercise />;
			case "wasteCollection":
				return <WasteCollection />;
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
