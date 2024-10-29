import "./Listitem.scss";
import { FaDeleteLeft } from "react-icons/fa6";

export const Listitem = (props: {
	name: string;
	index: number; // Given to this child component so it can then emitted to the parent
	isSelected: boolean;
	isDeletable: boolean;
	onSelectItem: (index: number) => void;
}) => {
	return (
		<div
			className={"list-item" + `${props.isSelected ? " selected" : ""}`}
			onClick={() => props.onSelectItem(props.index)}
		>
			<div className="list-item-text">{props.name}</div>
			{props.isDeletable ? (
				<div className="list-item-delete">
					<FaDeleteLeft size={30} />
				</div>
			) : null}
		</div>
	);
};
