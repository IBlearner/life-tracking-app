import { IMonths } from "./Interfaces";

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
	},
	wishlist: {
		confirmDeleteItem: "Are you sure you want to delete this item?",
		confirmDeleteItems: "Are you sure you want to delete these items?"
	}
};

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
