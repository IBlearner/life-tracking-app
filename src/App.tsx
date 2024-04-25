import { useState } from "react";
import "./App.css";
import { IoHome } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { Dropdown } from "./components/Dropdown/Dropdown";

// Page imports
import { Home } from "./pages/Home";
import { Exercise } from "./pages/Exercise";
import { WasteCollection } from "./pages/WasteCollection";
import { Checklist } from "./pages/Checklist";
import { Weight } from "./pages/Weight";
import { IDropdownDetails, IUserDetails } from "./Constants";

function App() {
	const [currentPage, setCurrentPage] = useState<string>("home");
	const [user, setUser] = useState<IUserDetails | null>(null);

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
				return <Weight user={user} />;
			default:
				break;
		}
	};

	const getToolbar = () => {
		return (
			<div id="toolbar">
				<IoHome id="home-button-icon" size={30} onClick={() => setCurrentPage("home")} />
				{user ? <span>Hello, {user.name}!</span> : null}
				<IoMenu id="menu-button-icon" size={30} onClick={() => console.log("opening menu..")} />
			</div>
		);
	};

	const updateCurrentPage = (page: string) => {
		setCurrentPage(page);
	};

	const updateUser = (option: IDropdownDetails) => {
		// The dropdown component gives us a value of type IDropdownDetails so we must convert it to type IUserDetails
		const optionAsUser = mapDropdownOptionToUser(option);
		setUser(optionAsUser);
	};

	// Convert IDropdownDetails -> IUserDetails
	const mapDropdownOptionToUser = (option: IDropdownDetails) => {
		return {
			id: option.id,
			name: option.value
		} as IUserDetails;
	};

	const tempLoginUsers: IDropdownDetails[] = [
		{
			id: 0,
			value: "kienvi"
		},
		{
			id: 1,
			value: "sam"
		},
		{
			id: 2,
			value: "leeann"
		}
	];

	const tempLoginDropdown = () => {
		return (
			<Dropdown
				id="temp-login-dropdown"
				label="Name:"
				options={tempLoginUsers}
				onDropdownChange={(e) => updateUser(e)}
			/>
		);
	};

	return (
		<div id="app-page">
			{currentPage !== "home" ? getToolbar() : null}
			{/* <button onClick={() => handleAuthClick()}>Authorize</button> */}
			{getCurrentPage()}
			{tempLoginDropdown()}
		</div>
	);
}

export default App;
