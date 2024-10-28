import { ReactNode } from "react";

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

export interface IGroceryItem {
	id: number;
	name: string;
	quantity: number;
	measurement: string;
	isCommonGood: boolean;
}
