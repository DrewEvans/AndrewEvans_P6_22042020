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
		// for collecting siblings
		let siblings = [];
		// if no parent, return no sibling
		if (!e.target.parentNode) {
			return siblings;
		}
		// first child of the parent node
		let sibling = e.target.parentNode.firstChild;

		// collecting siblings
		while (sibling) {
			if (sibling.nodeType === 1 && sibling !== e.target) {
				siblings.push(sibling);
			}
			sibling = sibling.nextSibling;
		}
		// on user click remove filters on siblings
		if (e.isTrusted) {
			siblings.forEach((sibling) => {
				sibling.removeAttribute("is-selected");
			});
		}
		//set the new target filter
		e.target.setAttribute("is-selected", true);
		setFilter(e.target.value);
	};

	useEffect(() => {
		const targetPhotographers = (filterTag, photographers) => {
			// if no filter selected display all photographers

			if (filterTag) {
				// if filter selected display photographers with filter tag
				const result = photographers.filter((photographer) => {
					return photographer.tags === filterTag;
				});
				//set state as filtered photographers
				setFilterPhotographers(result);
			}
			setFilterPhotographers(photographers);
		};
		targetPhotographers(filter, photographers);
	}, [filter, photographers]);

	// 	filter.map((value) => {
	// 		setFilterPhotographers(
	// 			photographers.filter(function (photographer) {
	// 				return photographer.tags.includes(value);
	// 			})
	// 		);
	// 		return photographers;
	// 	});
	// } else setFilterPhotographers(photographers);
	// };

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
