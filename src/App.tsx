import { useState } from "react";
import "./App.css";
import { IoHome } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { Dropdown } from "./components/Dropdown/Dropdown";
import { IDropdownItem, IPageDetails, IUserDetails } from "./Constants";

// Page imports
import { Home } from "./pages/Home";
import { Exercise } from "./pages/Exercise";
import { WasteCollection } from "./pages/WasteCollection";
import { Checklist } from "./pages/Checklist";
import { Weight } from "./pages/Weight";
import { Groceries } from "./pages/Groceries";
import { FoodTracker } from "./pages/FoodTracker";
import { Wishlist } from "./pages/Wishlist/Wishlist";

// Icon imports
import { CiViewList } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { GrDocumentMissing } from "react-icons/gr";
import { CiDumbbell } from "react-icons/ci";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { PiBowlFoodLight } from "react-icons/pi";
import { GiWeight } from "react-icons/gi";
import { LiaListOlSolid } from "react-icons/lia";

function App() {
	const [currentPage, setCurrentPage] = useState<string>("home");
	const [user, setUser] = useState<IUserDetails | null>(null);

	const pageDetails: IPageDetails[] = [
		{
			name: "exercise",
			available: false,
			icon: <CiDumbbell size={100} />
		},
		{
			name: "checklist",
			available: false,
			icon: <CiViewList size={100} />
		},
		{
			name: "groceries",
			available: false,
			icon: <PiShoppingCartSimpleLight size={100} />
		},
		{
			name: "waste + recycling",
			available: true,
			icon: <CiTrash size={100} />
		},
		{
			name: "weight",
			available: true,
			icon: <GiWeight size={100} />
		},
		{
			name: "food tracker",
			available: false,
			icon: <PiBowlFoodLight size={100} />
		},
		{
			name: "wishlist",
			available: true,
			icon: <LiaListOlSolid size={100} />
		}
	];

	// Gets the current page to be displayed
	const getCurrentPage = () => {
		switch (currentPage) {
			case "home":
				return <Home updateCurrentPage={updateCurrentPage} pageDetails={pageDetails} user={user} />;
			case "exercise":
				return <Exercise />;
			case "checklist":
				return <Checklist />;
			case "groceries":
				return <Groceries />;
			case "waste + recycling":
				return <WasteCollection />;
			case "weight":
				return <Weight user={user} />;
			case "food tracker":
				return <FoodTracker />;
			case "wishlist":
				return <Wishlist />;
			default:
				break;
		}
	};

	// Goes through the page details and finds the correct icon to display in the banner
	const getCurrentPageIcon = () => {
		const pageDetail = pageDetails.find((x) => x.name === currentPage);
		const icon = pageDetail ? pageDetail.icon : <GrDocumentMissing size={100} />;
		return icon;
	};

	const getToolbar = () => {
		return (
			<div id="toolbar">
				<IoHome id="home-button-icon" size={30} onClick={() => setCurrentPage("home")} />
				{getCurrentPageIcon()}
				<IoMenu id="menu-button-icon" size={30} onClick={() => console.log("opening menu..")} />
			</div>
		);
	};

	const updateCurrentPage = (page: string) => {
		setCurrentPage(page);
	};

	const updateUser = (option: IDropdownItem) => {
		// The dropdown component gives us a value of type IDropdownDetails so we must convert it to type IUserDetails
		const optionAsUser = mapDropdownOptionToUser(option);
		setUser(optionAsUser);
	};

	// Convert IDropdownDetails -> IUserDetails
	const mapDropdownOptionToUser = (option: IDropdownItem) => {
		return {
			id: option.id,
			name: option.value
		} as IUserDetails;
	};

	const tempLoginUsers: IDropdownItem[] = [
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

	const signOut = () => {
		setUser(null);

		// TODO: Need to also consider disabling user specific local storage items
	};

	return (
		<div id="app-page">
			{currentPage !== "home" ? getToolbar() : null}
			{/* <button onClick={() => handleAuthClick()}>Authorize</button> */}
			{getCurrentPage()}
			{tempLoginDropdown()}
			{user ? <span>Signed in as {user.name}!</span> : null}
			{user ? <button onClick={signOut}>Sign out</button> : null}
		</div>
	);
}

export default App;
