import { IWishlistItem } from "../../Interfaces";
import { Listitem } from "../../components/ListItem/ListItem";
import { useState } from "react";

export const Wishlist = () => {
	const mockWishlist: IWishlistItem[] = [
		{ id: 0, name: "fdsfds", createdDate: "now" },
		{ id: 3, name: "dsf", createdDate: "now" },
		{ id: 4, name: "fdewrwersfds", createdDate: "now" },
		{ id: 6, name: "fdewr34sfds", createdDate: "now" },
		{ id: 99, name: "fd43124sfds", createdDate: "now" },
		{ id: 123, name: "fde23423234Ssfdseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", createdDate: "now" }
	];
	const [data, setData] = useState<IWishlistItem[]>(mockWishlist);
	const [selectedItems, setSelectedItems] = useState<number[]>([]); // Array to hold the ID's of all selected items
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	// Handle when a list item gets selected
	const handleSelectItem = (index: number) => {
		const currentItemAlreadySelected = selectedItems.includes(index);
		// EDIT MODE: If in edit mode we can allow multiple items to be selected at a time
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

		// Create an array with all items to NOT be deleted
		const remainingItems = data.filter((elem) => !selectedItems.includes(elem.id));
		setData(remainingItems);
	};

	// Get the mapped wishlist
	const getList = (items: IWishlistItem[]) => {
		return items.map((elem: IWishlistItem) => {
			return (
				<Listitem
					name={elem.name}
					id={elem.id}
					isSelected={selectedItems.includes(elem.id)}
					isDeletable={isEditMode}
					onSelectItem={(e) => handleSelectItem(e)}
				/>
			);
		});
	};

	const shouldShowDeleteButton = (): boolean => {
		return isEditMode && selectedItems.length > 0;
	};

	return (
		<div>
			<h1>Wishlist</h1>
			<button onClick={toggleEditMode}>Edit</button>
			{shouldShowDeleteButton() ? <button onClick={deleteItems}>Delete</button> : null}
			<div>{getList(data)}</div>
		</div>
	);
};
