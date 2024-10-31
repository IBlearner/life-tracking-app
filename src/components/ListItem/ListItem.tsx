import "./Listitem.scss";

// Icon imports
import { FaRegCircle } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";

export const Listitem = (props: {
	name: string;
	id: number; // Given to this child component so it can then emitted to the parent
	isSelected: boolean; // If the current item is selected
	showRadio: boolean; // Basically is edit mode
	onSelectItem: (index: number) => void;
}) => {
	const getIsSelectedClass = (): string => {
		return `${props.isSelected ? " selected" : ""}`;
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

			<div className="list-item-text">{props.name}</div>
		</div>
	);
};
