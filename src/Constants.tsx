export const appsScriptURL: string =
	"https://script.google.com/macros/s/AKfycbzaqv92fbtfMlaRrmrm_ZB7FFCbzMz0c2TFPOmGMgrvFzEZAsIkJcjdXQbqhZpcyIRE-A/exec";

export const text = {
	wasteCollection: {
		generalWasteMessageDo:
			"tissues, books, clothing textiles, glass, food scraps, cartons, packaging, syringes (sealed), masks, light bulbs.",
		generalWasteMessageDont:
			"batteries, building materials, electronic products, furniture, gas cylinders, oil, paints, recycables, toxic products.",
		recycleWasteMessageDo:
			"cardboard boxes/packaging, firm plastic containers/bottles, glass bottles, paper, steel/aluminium.",
		recycleWasteMessageDont:
			"batteries, books, hangers, crockery, electronics, food/garden waste, light bulbs, ink catridges, syringes, polystyrene, soft plastic, textiles, tissues.",
		greenWasteMessageDo: "grass, prunings, twigs, bark, flowers, weeds.",
		greenWasteMessageDont:
			"faeces, fruit/vege waste, plastics, logs, paper, recyclables, rocks/bricks, furniture, bamboo.",
		wasteViewMoreLink:
			"https://www.brisbane.qld.gov.au/clean-and-green/rubbish-tips-and-bins/rubbish-bins/bin-items",
		kerbsideInaccurateMessage: "Kerbside collection date is based off the previous year's data."
	}
};

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
	icon: any;
}

export interface IGroceryItem {
	id: number;
	name: string;
	quantity: number;
	measurement: string;
	isCommonGood: boolean;
}
