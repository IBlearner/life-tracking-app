import { useState } from "react";
import "./ListItem.scss";

// Icon imports
import { FaRegCircle } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { IListItemOption } from "../../Interfaces";

export const Listitem = (props: {
	primary: string;
	secondary?: string; // Text underneath the title
	id: number; // Given to this child component so it can then emitted to the parent
	isSelected: boolean; // If the current item is selected
	showRadio: boolean; // Basically is edit mode
	options?: IListItemOption[];
	onSelectItem: (index: number) => void;
}) => {
	const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

	const getIsSelectedClass = (): string => {
		return `${props.isSelected ? " selected" : ""}`;
	};

	const getOptionsBox = (): React.ReactElement => {
		let mappedOptions;
		if (props.options) {
			mappedOptions = props.options.map((elem: IListItemOption) => {
				return (
					<div
						className="list-item-option-item"
						onClick={(e: React.MouseEvent<HTMLElement>) => onOptionItemClick(e, elem.action)}
					>
						{elem.text}
					</div>
				);
			});
		}

		return <div className="list-item-options-box">{mappedOptions}</div>;
	};

	const onOptionsClick = (e: React.MouseEvent<SVGElement>) => {
		// Prevents the List item from being selected, but allows the option box to open
		e.stopPropagation();
		setIsOptionsOpen(!isOptionsOpen);
	};

	const onOptionItemClick = (e: React.MouseEvent<HTMLElement>, action: () => void) => {
		// Prevents the List item from being selected, but allows the option box to open
		e.stopPropagation();
		action();
	};

	return (
		<div className={"list-item" + getIsSelectedClass()} onClick={() => props.onSelectItem(props.id)}>
			{/* If edit mode, choose between the filled or unfilled radio */}
			{props.showRadio ? (
				props.isSelected ? (
					<div className="list-item-radio">
						<FaRegDotCircle size={30} opacity={1} />
					</div>
				) : (
					<div className="list-item-radio">
						<FaRegCircle size={30} opacity={0.5} />
					</div>
				)
			) : null}
			<div className="list-item-primary">{props.primary}</div>
			{props.options ? (
				<div className="list-item-options-selector">
					<SlOptions size={15} opacity={1} onClick={(e: React.MouseEvent<SVGElement>) => onOptionsClick(e)} />
					{isOptionsOpen ? getOptionsBox() : null}
				</div>
			) : null}
			{props.secondary ? <div className="list-item-secondary">{props.secondary}</div> : null}
		</div>
	);
};
