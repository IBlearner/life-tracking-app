import { IWishlistItem } from "../../Interfaces";
import { Listitem } from "../../components/ListItem/ListItem";
import { useState } from "react";

export const Wishlist = () => {
	const mockWishlist: IWishlistItem[] = [
		{
			id: 0,
			name: "fdsfds",
			createdDate: "now",
			price: "1231.95",
			priority: 1,
			location: "bunnings bunnings bunnings bunnings bunnings bunnings bunnings bunnings"
		},
		{ id: 3, name: "dsf", createdDate: "now", price: "65.30", priority: 5, location: "kmart" },
		{ id: 4, name: "fdewrwersfds", createdDate: "now", price: "10", priority: 6, location: "amazon" },
		{ id: 6, name: "fdewr34sfds", createdDate: "now", price: "1000.15", priority: 4, location: "big w" },
		{ id: 99, name: "fd43124sfds", createdDate: "now", price: "13", priority: 2, location: "coles" },
		{
			id: 123,
			name: "fde23423234Ssfdseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
			createdDate: "now",
			price: "33",
			priority: 3,
			location: "online"
		}
	];
	const [data, setData] = useState<IWishlistItem[]>(mockWishlist);
	const [selectedItems, setSelectedItems] = useState<number[]>([]); // Array to hold the ID's of all selected items
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	// Handle when a list item gets selected
	const handleSelectItem = (index: number): void => {
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
	const toggleEditMode = (): void => {
		setIsEditMode(!isEditMode);
	};

	// Delete items that have been selected
	const deleteItems = (): void => {
		// TODO: call to db to delete the items

		// Create an array with all items to NOT be deleted
		const remainingItems = data.filter((elem) => !selectedItems.includes(elem.id));
		setData(remainingItems);
	};

	const getListSecondaryText = (price: string, location: string): string => {
		return `$${price} - ${location}`;
	};

	// Get the mapped wishlist
	const getList = (items: IWishlistItem[]) => {
		return items.map((elem: IWishlistItem) => {
			return (
				<Listitem
					primary={elem.name}
					secondary={getListSecondaryText(elem.price, elem.location)}
					id={elem.id}
					isSelected={selectedItems.includes(elem.id)}
					showRadio={isEditMode}
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
