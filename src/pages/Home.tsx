import { IPageDetails } from "../Constants";
import "./Home.scss";

export const Home = ({
	updateCurrentPage,
	pageDetails
}: {
	updateCurrentPage: (e: string) => void;
	pageDetails: IPageDetails[];
}) => {
	const getTileButtons = () => {
		return (
			<div id="tile-buttons">
				{pageDetails.map((elem: IPageDetails) => {
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
