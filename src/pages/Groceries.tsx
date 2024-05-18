import { ChangeEvent, useEffect, useState } from "react";
import { IDropdownItem, IGroceryItem } from "../Constants";
import { Dropdown } from "../components/Dropdown/Dropdown";

export const Groceries = () => {
	const [groceryListData, setGroceryListData] = useState<IGroceryItem[]>([]);
	const [name, setName] = useState<string>("");
	const [quantity, setQuantity] = useState<number>(0);
	const [measurement, setMeasurement] = useState<string>("");

	useEffect(() => {
		setGroceryListData(tempGroceryList);
	}, []);

	const dropdownOptions: IDropdownItem[] = [
		{
			id: 0,
			value: "gram"
		},
		{
			id: 1,
			value: "kg"
		},
		{
			id: 2,
			value: "bottle"
		}
	];

	const tempGroceryList: IGroceryItem[] = [
		{
			id: 0,
			name: "peanuts",
			quantity: 2,
			measurement: "bag",
			isCommonGood: false
		},
		{
			id: 1,
			name: "eggs",
			quantity: 24,
			measurement: "piece",
			isCommonGood: false
		},
		{
			id: 2,
			name: "chicken",
			quantity: 200,
			measurement: "gram",
			isCommonGood: false
		},
		{
			id: 3,
			name: "milk",
			quantity: 1,
			measurement: "bottle",
			isCommonGood: false
		},
		{
			id: 4,
			name: "icecream",
			quantity: 2,
			measurement: "litre",
			isCommonGood: false
		}
	];

	const groceryItemForm = () => {
		return (
			<div id="grocery-list-form">
				<label htmlFor="grocery-list-name-input">Name</label>
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
				<input type="button" value="Add" onClick={() => addGroceryListItem()} />
			</div>
		);
	};

	const groceryList = () => {
		return groceryListData.map((elem) => {
			return getGroceryListItem(elem);
		});
	};

	const getGroceryListItem = (item: IGroceryItem) => {
		return (
			<div>
				<p>
					{item.name} x {item.quantity} {item.measurement}s
				</p>
				<p>Is this a common good? {item.isCommonGood ? "True" : "False"}.</p>
			</div>
		);
	};

	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuantity(parseInt(e.target.value));
	};

	const onMeasurementChange = (e: IDropdownItem) => {
		// E.value represents the actual measurement - kg, gram, bottle etc.
		setMeasurement(e.value);
	};

	const addGroceryListItem = () => {
		const item = {
			id: 6,
			name: name,
			quantity: quantity,
			measurement: measurement,
			isCommonGood: false
		} as IGroceryItem;

		setGroceryListData([...groceryListData, item]);
	};

	const onSubmit = () => {
		// TODO: Call API to submit all changes we made
	};

	return (
		<div id="groceries-container">
			{groceryItemForm()}
			{groceryList()}
			<button onClick={() => onSubmit()}>SAVE</button>
		</div>
	);
};
