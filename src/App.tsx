import { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	const test = () => {
		console.log("woo");
	};

	return (
		<>
			<button onClick={() => handleAuthClick()}>Authorize</button>
			<button
				onClick={() =>
					getValues(import.meta.env.VITE_SHEET_ID, `${import.meta.env.VITE_SHEET_NAME}!A1:B2`, (data) =>
						console.log(data)
					)
				}
			>
				Get
			</button>
		</>
	);
}

export default App;
