import { useState } from "react";
import "./App.css";
const finnhub = require("finnhub");

// get the Finhub Api Key
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "cbv40lqad3ibve998qeg";
const finnhubClient = new finnhub.DefaultApi();

function App() {
	// state hooked vars
	const [companyName, setCompanyName] = useState("");
	// #TODO basic stretch call, make sure the date is less than current dat
	const [dispCounter, setDispCounter] = useState(0);
	const [subMonth, setSubMonth] = useState(0);
	const [newsFeed, setNewsFeed] = useState([]);

	// handle disp counter
	const handleAddCounter = (event) => {
		if (dispCounter < 10) {
			setDispCounter(dispCounter + 1);
			handleNewsForm(event);
		}
	};
	const handleSubtractCounter = (event) => {
		if (dispCounter > 0) {
			setDispCounter(dispCounter - 1);
			handleNewsForm(event);
		}
	};

	// handle month subtraction
	const subtractMonths = (numOfMonths, date = new Date()) => {
		date.setMonth(date.getMonth() - numOfMonths);
		return date.toISOString().split("T")[0];
	};

	// handle submit button for the form
	const handleNewsForm = (event) => {
		event.preventDefault();
		finnhubClient.companyNews(
			companyName,
			subtractMonths(subMonth),
			new Date().toISOString().split("T")[0],
			(error, data, response) => {
				if (error) {
					console.error(error);
				} else {
					setNewsFeed(data[dispCounter]);
				}
			}
		);
	};
	return (
		<div className="App">
			<header className="App-header">
				<form
					onSubmit={(event) => {
						handleNewsForm(event);
					}}
				>
					{/* ----------- THE COMPANY NAME ------------------ */}
					<label>
						Enter Company Name
						<input
							onChange={(event) => {
								setCompanyName(event.target.value);
							}}
						></input>
					</label>
					<br />
					<button type="submit">Submit</button>
				</form>
				<br />

				{/* ----------- RECENT RESULTS ------------------ */}
				<button
					onClick={(event) => {
						setSubMonth(0.25);
						setDispCounter(0);
						handleNewsForm(event);
					}}
				>
					Recent
				</button>
				<br />

				{/* ----------- PAST2MONTHS RESULTS ------------------ */}
				<button
					onClick={(event) => {
						setSubMonth(2);
						setDispCounter(0);
						handleNewsForm(event);
					}}
				>
					Past 2 months
				</button>
				<br />

				{/* ----------- RECEPAST4MONTHSNT RESULTS ------------------ */}
				<button
					onClick={(event) => {
						setSubMonth(4);
						setDispCounter(0);
						handleNewsForm(event);
					}}
				>
					Past 4 months
				</button>
				<br />

				{/* ----------- RESULTS DISP COUNTER ------------------ */}
				<div>
					<button
						onClick={(event) => {
							handleSubtractCounter(event);
						}}
					>
						Prev
					</button>
					<button
						onClick={(event) => {
							handleAddCounter(event);
						}}
					>
						Next
					</button>
					<br />
				</div>
				<h4>{dispCounter}</h4>
				<h4>{subMonth}</h4>

				{/* ------------- NEWS FEED --------------------- */}
				{typeof newsFeed.length === "undefined" && (
					<>
						<h2>News Section</h2>
						<div className="newImgSection">
							{newsFeed.image ? (
								<>
									<img
										height={300}
										px
										width={300}
										px
										src={newsFeed.image}
										alt="img"
									/>
								</>
							) : (
								<h3>No Image Available</h3>
							)}
							<ul>
								<il>Headline: {newsFeed.headline}</il>
								<br />
								<br />
								<il>Source: {newsFeed.source}</il>
								<br />
								<br />
								<il>Summary: {newsFeed.summary}</il>
								<br />
								<br />
							</ul>
						</div>
					</>
				)}
			</header>
		</div>
	);
}

export default App;
