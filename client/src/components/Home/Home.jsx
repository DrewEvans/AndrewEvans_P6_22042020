import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PhotographerCard from "./PhotographerCard";

const Home = () => {
	const [photogrpahers, setPhotographers] = useState([]);
	const [navTags, setNavTags] = useState([]);

	useEffect(() => {
		fetchPhotographers();
		fetchPhotographersTags();
	}, []);

	async function fetchPhotographers() {
		const request = await axios.get("/api/photographers");
		setPhotographers(request.data);
	}
	async function fetchPhotographersTags() {
		const request = await axios.get("/api/photographers/tags");
		setNavTags(request.data);
	}

	return (
		<>
			<header>
				<NavLink to="/home">FishEye</NavLink>
				<nav>
					<div>
						{navTags
							? navTags.map((navtag, i) => {
									return <button key={i}>#{navtag}</button>;
							  })
							: "Loading..."}
					</div>
				</nav>
			</header>
			<main>
				<div>
					<h1>Nos photographes</h1>
				</div>
				{photogrpahers.map((photographer) => {
					return (
						<div key={photographer.id}>
							<PhotographerCard
								name={photographer.name}
								city={photographer.city}
								country={photographer.country}
								price={photographer.price}
								tags={photographer.tags}
								tagline={photographer.tagline}
								id={photographer.id}
								portrait={photographer.portrait}
							/>
						</div>
					);
				})}
			</main>
		</>
	);
};

export default Home;
