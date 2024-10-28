import { ChangeEvent, useState, MouseEvent } from "react";
import "./Checklist.scss";
import { CiViewList } from "react-icons/ci";
import { IChecklistItem } from "../Interfaces";

export const Checklist = () => {
	const [data, setData] = useState<IChecklistItem[]>([]);
	const [itemInput, setItemInput] = useState<string>("");

	const getInputField = () => {
		return (
			<form>
				<input onChange={(e) => onInputFieldChange(e)} value={itemInput} required={true} />
				<button
					onClick={() => {
						if (itemInput.trim() !== "") {
							addItemToList();
						}
					}}
					type="submit"
					disabled={itemInput.trim() === ""}
				>
					Add
				</button>
			</form>
		);
	};

	const onInputFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		setItemInput(e.target.value);
	};

	const addItemToList = () => {
		const newItem: IChecklistItem = {
			// TODO: update this id field. Setting this to 0 as I just updated IChecklistItem to extend from IListItem
			id: 0,
			name: itemInput,
			completed: false,
			createdDate: Date.now().toString()
		};
		setData([...data, newItem]);

		// Deleting the value of the input after user adds an item
		setItemInput("");
	};

	const getChecklist = () => {
		return data.map((elem: IChecklistItem, index: number) => {
			return (
				<div className="checklist-item">
					<div className="checklist-item-name">{elem.completed ? <i>{elem.name}</i> : elem.name}</div>
					<input
						id={index.toString()}
						type="checkbox"
						checked={elem.completed}
						onClick={(e) => updateChecklistChecked(e, index)}
					/>
				</div>
			);
		});
	};

	const updateChecklistChecked = (e: MouseEvent<HTMLInputElement>, index: number) => {
		const newItem: IChecklistItem = {
			// TODO: update this id field. Setting this to 0 as I just updated IChecklistItem to extend from IListItem
			id: 0,
			name: data[index].name,
			completed: !data[index].completed,
			createdDate: data[index].createdDate,
			completedDate: data[index].completedDate
		};

		console.log(e);
		console.log([...data]);
		const newArray = [...data].splice(index, 0, newItem);
		console.log(newArray);

		setData(newArray);
	};

	return (
		<div id="checklist-container">
			<CiViewList size={80} />
			Task:
			{getInputField()}
			<h2>something</h2>
			{getChecklist()}
		</div>
	);
};
