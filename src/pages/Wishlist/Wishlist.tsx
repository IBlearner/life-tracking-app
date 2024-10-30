import { IWishlistItem } from "../../Interfaces";
import { Listitem } from "../../components/ListItem/ListItem";
import { useState } from "react";

export const Wishlist = () => {
	const mockWishlist: IWishlistItem[] = [
		{ id: 0, name: "fdsfds", createdDate: "now" },
		{ id: 0, name: "dsf", createdDate: "now" },
		{ id: 0, name: "fdewrwersfds", createdDate: "now" },
		{ id: 0, name: "fdewr34sfds", createdDate: "now" },
		{ id: 0, name: "fd43124sfds", createdDate: "now" },
		{ id: 0, name: "fde23423234Ssfdseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", createdDate: "now" }
	];
	const [selectedItems, setSelectedItems] = useState<number[]>([999]); // The index of the currently selected item. Setting it as 999 so nothing is selected on inuit
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	// Handle when a list item gets selected
	const handleSelectItem = (index: number) => {
		const currentItemAlreadySelected = selectedItems.includes(index);
		// EDIT MODE If in edit mode we can allow multiple items to be selected at a time
		if (isEditMode) {
			// If the current item is already in our list of selected items we want to unselect it
			if (currentItemAlreadySelected) {
				const newSelectedItems = selectedItems.filter((elem) => elem !== index);
				setSelectedItems(newSelectedItems);
			}
			// If not we add it
			else {
				setSelectedItems([...selectedItems, index]);
			}
		}
		// NORMAL MODE: only one item can be selected at a time
		else {
			setSelectedItems(currentItemAlreadySelected ? [] : [index]);
		}
	};

	// Toggle between normal and edit mode when a list item gets selected
	const toggleEditMode = () => {
		setIsEditMode(!isEditMode);
	};

	// Delete items that have been selected
	const deleteItems = () => {
		// TODO: call to db to delete the items

		console.log("Deleting items!");
	};

	// Get the mapped wishlist
	const getList = (items: IWishlistItem[]) => {
		return items.map((elem: IWishlistItem, index: number) => {
			return (
				<Listitem
					name={elem.name}
					index={index}
					isSelected={selectedItems.includes(index)}
					isDeletable={isEditMode}
					onSelectItem={(e) => handleSelectItem(e)}
				/>
			);
		});
	};

	return (
		<div>
			<h1>Wishlist</h1>
			<button onClick={toggleEditMode}>Edit</button>
			<button onClick={deleteItems}>Delete</button>
			<div>{getList(mockWishlist)}</div>
		</div>
	);
};
