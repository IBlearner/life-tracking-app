import { ChangeEvent, useState, MouseEvent } from "react";
import "./Checklist.scss";
import { CiViewList } from "react-icons/ci";

interface IChecklistItem {
	name: string;
	completed: boolean;
	createdDate: string; // Could be Date?
	completedDate?: string; // Could be Date?
}

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
			name: data[index].name,
			completed: !data[index].completed,
			createdDate: data[index].createdDate,
			completedDate: data[index].completedDate
		};

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
