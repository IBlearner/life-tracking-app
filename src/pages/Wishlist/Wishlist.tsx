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

	// Handle when a list item gets selected
	const handleSelectItem = (index: number) => {
		setSelected(index);
	};

	// Get the mapped wishlist
	const getList = (items: IWishlistItem[]) => {
		return items.map((elem: IWishlistItem, index: number) => {
			return (
				<Listitem
					name={elem.name}
					index={index}
					isSelected={index === selected}
					onSelectItem={(e) => handleSelectItem(e)}
				/>
			);
		});
	};

	return (
		<div>
			<h1>wishlist</h1>
			<div>{getList(mockWishlist)}</div>
		</div>
	);
};
