import { IPageDetails, IUserDetails } from "../Constants";
import "./Home.scss";

export const Home = ({
	updateCurrentPage,
	pageDetails,
	user
}: {
	updateCurrentPage: (e: string) => void;
	pageDetails: IPageDetails[];
	user: IUserDetails | null;
}) => {
	const getTileButtons = () => {
		return (
			<div id="tile-buttons">
				{pageDetails.map((elem: IPageDetails) => {
					return (
						<div
							className={`tile-button tile-${elem.available ? "" : "not-"}available`}
							onClick={() => {
								// TODO: implement a check if user has specific privileges. Enabled user in general just for testing.
								if (elem.available || user) updateCurrentPage(elem.name);
							}}
						>
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
