import { useState } from "react";

export const FoodTracker = () => {
	const [foodListData, setFoodListData] = useState([]);

	// Food item states
	const [name, setName] = useState<string>("");
	const [kj, setKj] = useState<string>("");
	const [isCommonFood, setIsCommonFood] = useState<boolean>(false);

	const foodItemForm = () => {
		return (
			<div id="food-list-form">
				<label htmlFor="food-list-name-input">Name</label>
				<input
					id="grocery-list-name-input"
					type="text"
					name="grocery-list-name-input"
					onChange={(e) => onNameChange(e)}
				/>
				<label htmlFor="grocery-list-quantity-input">Qty</label>
				<input
					id="grocery-list-quantity-input"
					type="text"
					name="grocery-list-quantity-input"
					onChange={(e) => onQuantityChange(e)}
				/>
				<Dropdown
					id="grocery-list-measurement-dropdown"
					label="measurement"
					options={dropdownOptions}
					onDropdownChange={(e) => onMeasurementChange(e)}
				/>
				{/* <input type="button" value="Add" onClick={() => addGroceryListItem()} /> */}
			</div>
		);
	};

	const foodList = () => {
		return foodListData.map((elem) => {
			return foodListItem(elem);
		});
	};

	const foodListItem = (elem: any) => {
		return <div>elem</div>;
	};

	return (
		<div id="foodtracker-container">
			<div></div>
			<span>hi</span>
			<div>{foodItemForm()}</div>
			<div>{foodList()}</div>
		</div>
	);
};
