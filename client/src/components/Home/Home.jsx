import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PhotographerCard from "./PhotographerCard";
import Navbar from "./Navbar";

const Home = () => {
	const [photographers, setPhotographers] = useState([]);
	const [filterPhotographers, setFilterPhotographers] = useState([]);
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
		setFilter((filter) => [{ clicked: true, value: e.target.value }]);

		filter.map((obj) => {
			if (obj.clicked) {
				const isClicked = photographers.filter(function (photographer) {
					return photographer.tags.includes(obj.value);
				});
				setFilterPhotographers(isClicked);
			}
			return console.log(obj.value);
		});
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
				{photographers.map((photographer) => {
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
