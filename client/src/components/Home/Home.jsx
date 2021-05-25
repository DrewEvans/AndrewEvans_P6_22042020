import { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
// import PhotographerCard from "./PhotographerCard";
import Navbar from "./Navbar";
import Logo from "./Logo";
import "./home.scss";
import LoadingSpinner from "../LoadingSpinner";

const PhotographerCard = lazy(() => import("./PhotographerCard"));

const Home = () => {
	const [photographers, setPhotographers] = useState([]);
	const [filterPhotographers, setFilterPhotographers] = useState([]);
	const [navTags, setNavTags] = useState([]);
	const [filter, setFilter] = useState([]);

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
		if (!e.target.hasAttribute("is-selected")) {
			e.target.setAttribute("is-selected", true);
			setFilter((filter) => [...filter, e.target.value]);
		} else {
			e.target.removeAttribute("is-selected");
			const removeTag = (e) => {
				let filterTags = filter.filter((tag) => tag !== e.target.value);
				setFilter(() => [...filterTags]);
			};
			removeTag(e);
		}
	};

	useEffect(() => {
		const targetPhotographers = (value, objects) => {
			if (filter.length > 0) {
				filter.map((value) => {
					setFilterPhotographers(
						photographers.filter(function (photographer) {
							// console.log(`Value: ${value}`);
							// console.log(photographer.tags.includes(value));
							return photographer.tags.includes(value);
						})
					);
					return photographers;
				});
			} else setFilterPhotographers(photographers);
		};
		targetPhotographers(filter, photographers);
	}, [filter, photographers]);

	console.log(filter);
	console.log(navTags);
	console.log(filterPhotographers);

	return (
		<>
			<header>
				<div className="nav-container">
					<Logo />

					<Navbar navTags={navTags} handleBtns={handleBtns} />
				</div>
				<div className="h1-container">
					<h1 className="title">Nos photographes</h1>
				</div>
			</header>
			<main>
				<Suspense fallback={<LoadingSpinner />}>
					<div className="photographers-container">
						{filterPhotographers.map((photographer) => {
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
					</div>
				</Suspense>
			</main>
		</>
	);
};

export default Home;
