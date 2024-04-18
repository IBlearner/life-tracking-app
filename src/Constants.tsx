export const appsScriptURL: string =
	"https://script.google.com/macros/s/AKfycbzR2BbU2UzIwbBluiQWKLxLohsSNYMPXZqWus0vRmb_7KaZ7p5g_5mW5jEa_hgKrywzng/exec";

export interface IMonths {
	name: string;
	days: number;
}

export const months: IMonths[] = [
	{
		name: "january",
		days: 31
	},
	{
		name: "february",
		days: 28
	},
	{
		name: "march",
		days: 31
	},
	{
		name: "april",
		days: 30
	},
	{
		name: "may",
		days: 31
	},
	{
		name: "june",
		days: 30
	},
	{
		name: "july",
		days: 31
	},
	{
		name: "august",
		days: 31
	},
	{
		name: "september",
		days: 30
	},
	{
		name: "october",
		days: 31
	},
	{
		name: "november",
		days: 30
	},
	{
		name: "december",
		days: 31
	}
];

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
