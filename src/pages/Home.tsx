import "./Home.scss";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import { IoScaleOutline } from "react-icons/io5";

export const Home = ({ updateCurrentPage }: { updateCurrentPage: (e: string) => void }) => {
	const tiles = [
		{
			name: "exercise",
			icon: <GiWeightLiftingUp size={100} />
		},
		{
			name: "checklist",
			icon: <CiViewList size={100} />
		},
		{
			name: "groceries",
			icon: <MdOutlineLocalGroceryStore size={100} />
		},
		{
			name: "wasteCollection",
			icon: <BsTrash3 size={100} />
		},
		{
			name: "weight",
			icon: <IoScaleOutline size={100} />
		}
	];

	const getTileButtons = () => {
		return (
			<div id="tile-buttons">
				{tiles.map((elem) => {
					return (
						<div className="tile-button" onClick={() => updateCurrentPage(elem.name)}>
							<div className="tile-icon">{elem.icon}</div>
							<div className="tile-text">{elem.name.toUpperCase()}</div>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<>
			<h1 id="home-title">Life Tracker</h1>
			<p>
				<i>Because everyone needs a little help sometimes</i>
			</p>
			{getTileButtons()}
		</>
	);
};
