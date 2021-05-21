import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PhotographerCard from "./PhotographerCard";
import Navbar from "./Navbar";

const Home = () => {
	const [photogrpahers, setPhotographers] = useState([]);
	const [navTags, setNavTags] = useState([]);
	const [filter, setFilter] = useState({ clicked: false, value: null });

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

	const handleBtns = (e) => {
		console.log(e);
		//if user select pill add the value to the filter list
		e.istrusted
			? console.log(false)
			: setFilter(filter + [{ clicked: true, value: e.target.value }]);
	};

	return (
		<>
			<header>
				<NavLink to="/">FishEye</NavLink>
				<Navbar navTags={navTags} handleBtns={handleBtns} />
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
