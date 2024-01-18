import { useState } from "react";
import "./App.css";
import { Home } from "./pages/Home";

function App() {
	const [count, setCount] = useState(0);

	const test = () => {
		console.log("woo");
	};

	return (
		<>
			<Home />
			<button onClick={() => handleAuthClick()}>Authorize</button>
		</>
	);
}

export default App;
