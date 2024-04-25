import { IDropdownDetails } from "../../Constants";

export const Dropdown = (props: {
	// Unique identifier
	id: string;
	// Label to go with the select box.
	// TODO: make optional?
	label: string;
	// Options for the select to display
	options: IDropdownDetails[];
	// We want this callback to pass back the id only, no point in passing the entire dropdown object back
	onDropdownChange: (e: IDropdownDetails) => void;
}) => {
	const getDropdownOptions = () => {
		return props.options.sort().map((elem: IDropdownDetails) => {
			return (
				<option value={elem.id} key={elem.id}>
					{elem.value}
				</option>
			);
		});
	};

	const getOptionFromId = (id: number) => {
		return props.options.find((e) => e.id === id);
	};

	return (
		<div className="input-container">
			<label htmlFor={props.id + "-input"}>{props.label}</label>

			<select
				name="pets"
				id={props.id + "-input"}
				onChange={(e) => {
					const id = parseInt(e.target.value);
					const option = getOptionFromId(id);
					if (option) {
						props.onDropdownChange(option);
					} else {
						console.log("Could not return the option selected..");
					}
				}}
			>
				<option value="">-- Select an option --</option>
				{getDropdownOptions()}
			</select>
		</div>
	);
};
