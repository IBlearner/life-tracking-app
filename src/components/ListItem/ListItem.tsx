import "./Listitem.scss";

export const Listitem = (props: { name: string }) => {
	return (
		<div className="list-item">
			<div>{props.name}</div>
		</div>
	);
};
