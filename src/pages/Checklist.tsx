import { useState } from "react";
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
	const getInputField = () => {
		return (
			<>
				<input />
				<button
					onClick={() =>
						addItemToList({
							name: "dfnsfd",
							completed: false,
							createdDate: "dfsf-dfs-ds"
						})
					}
				>
					go
				</button>
			</>
		);
	};

	const addItemToList = (newItem: IChecklistItem) => {
		setData([...data, newItem]);
		console.log(data);
	};

	return (
		<div id="checklist-container">
			<CiViewList size={80} />
			Task:
			{getInputField()}
			<h2>something</h2>\<p>fds</p>
		</div>
	);
};
