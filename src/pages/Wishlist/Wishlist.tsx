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
	const [selected, setSelected] = useState<number>(0);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	// Handle when a list item gets selected
	const handleSelectItem = (index: number) => {
		setSelected(index);
	};

	// Toggle between normal and edit mode when a list item gets selected
	const toggleEditMode = () => {
		setIsEditMode(!isEditMode);
	};

	// Get the mapped wishlist
	const getList = (items: IWishlistItem[]) => {
		return items.map((elem: IWishlistItem, index: number) => {
			return (
				<Listitem
					name={elem.name}
					index={index}
					isSelected={index === selected}
					isDeletable={isEditMode}
					onSelectItem={(e) => handleSelectItem(e)}
				/>
			);
		});
	};

	return (
		<div>
			<h1>wishlist</h1>
			<button onClick={toggleEditMode}>Edit</button>
			<div>{getList(mockWishlist)}</div>
		</div>
	);
};
