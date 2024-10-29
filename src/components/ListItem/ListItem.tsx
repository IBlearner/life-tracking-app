import "./Listitem.scss";
import { FaDeleteLeft } from "react-icons/fa6";

export const Listitem = (props: { name: string }) => {
	return (
		<div className="list-item">
			<div className="list-item-text">{props.name}</div>
			<div className="list-item-delete">
				<FaDeleteLeft size={30} />
			</div>
		</div>
	);
};
