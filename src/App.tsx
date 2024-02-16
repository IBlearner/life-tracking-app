import { useState } from "react";
import "./App.css";
import { IoHome } from "react-icons/io5";

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

	const getHomeButton = () => {
		return (
			<div onClick={() => setCurrentPage("home")}>
				<IoHome size={80} />
			</div>
		);
	};

	const updateCurrentPage = (page: string) => {
		setCurrentPage(page);
		console.log("dfsfdsf");
	};

	return (
		<>
			{currentPage !== "home" ? getHomeButton() : null}
			{/* <button onClick={() => handleAuthClick()}>Authorize</button> */}
			{getCurrentPage()}
		</>
	);
}

export default App;
