import { ReactNode } from "react";

export interface IListItem {
	id: number;
	name: string;
	createdDate: string; // TODO: Make this a Date type?
	options?: IListItemOption;
}

export interface IListItemOption {
	text: string;
	action: () => void;
}

export interface IMonths {
	name: string;
	days: number;
}

export interface IDateWeightItem {
	id: number;
	date: Date;
	weight: number;
	notes: string;
}

export interface IWasteCollectionItem {
	suburb: string;
	day: string;
	zone: number;
}

export interface IKerbsideCollectionItem {
	suburb: string;
	day: string;
}

export interface IUserDetails {
	id: number;
	name: string;
}

export interface IDropdownItem {
	id: number;
	value: string;
}

export interface IPageDetails {
	name: string;
	available: boolean;
	icon: ReactNode;
}

export interface IGroceryItem extends IListItem {
	quantity: number;
	measurement: string;
	isCommonGood: boolean;
}

export interface IChecklistItem extends IListItem {
	completed: boolean;
	completedDate?: string; // TODO: Make this a Date type?
}

export interface IWishlistItem extends IListItem {
	priority: number;
	price: string; // Making this a string to accomodate float values
	location: string;
}
