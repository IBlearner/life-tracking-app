import { IWishlistItem } from "../../Interfaces";

export const Wishlist = () => {
	const mockWishlist: IWishlistItem[] = [
		{ id: 0, name: "fdsfds", createdDate: "now" },
		{ id: 0, name: "dsf", createdDate: "now" },
		{ id: 0, name: "fdewrwersfds", createdDate: "now" },
		{ id: 0, name: "fdewr34sfds", createdDate: "now" },
		{ id: 0, name: "fd43124sfds", createdDate: "now" },
		{ id: 0, name: "fde23423234Ssfds", createdDate: "now" }
	];
	const getList = (items: IWishlistItem[]) => {
		return items.map((elem) => {
			return elem.name;
		});
	};

	return (
		<div>
			<h1>wishlist</h1>
			<div>{getList(mockWishlist)}</div>
		</div>
	);
};
