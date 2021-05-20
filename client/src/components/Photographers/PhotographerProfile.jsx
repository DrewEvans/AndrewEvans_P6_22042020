import axios from "axios";
import { useEffect, useState } from "react";
import LandingHeader from "./LandingHeader";
import Media from "./Media";

const PhotographerProfile = ({ match }) => {
	const ID = parseInt(match.params.id);
	const [photographer, setPhotographer] = useState([]);
	const [allMedia, setAllMedia] = useState([]);
	const [sortedMedia, setSortedMedia] = useState([]);
	const [sortType, setSortType] = useState("likes");

	useEffect(() => {
		fetchPhotographerInfo(ID);
		fetchPhotographerMedia(ID);
	}, [ID]);

	async function fetchPhotographerInfo(id) {
		const request = await axios.get(`/api/photographers/${id}`);
		const data = request.data;

		data.map((photographerInfo) => {
			setPhotographer(photographerInfo);
			return true;
		});
	}

	async function fetchPhotographerMedia(id) {
		const request = await axios.get(`/api/photographers/${id}/media`);
		const data = request.data;
		setAllMedia(data);
	}

	useEffect(() => {
		const sortArray = (type) => {
			const types = {
				likes: "likes",
				date: "date",
				image: "image",
			};
			const sortProperty = types[type];

			let sortParameters = sortType;

			if (sortProperty === "likes") {
				sortParameters = [...allMedia].sort((a, b) => {
					if (b.likes > a.likes) {
						return 1;
					}
					return -1;
				});
			}
			if (sortProperty === "image") {
				sortParameters = [...allMedia].sort((a, b) => {
					if (a.image - b.image) {
						return 1;
					}
					return -1;
				});
			}
			if (sortProperty === "date") {
				sortParameters = [...allMedia].sort((a, b) => {
					if (a.date > b.date) {
						return 1;
					}
					return -1;
				});
			}
			const sorted = sortParameters;
			setSortedMedia(sorted);
		};
		sortArray(sortType);
	}, [sortType, allMedia]);

	return (
		<>
			<main>
				<header>
					{photographer ? (
						<LandingHeader
							id={ID}
							photographer={photographer}
							name={photographer.name}
							city={photographer.city}
							country={photographer.country}
							tagline={photographer.tagline}
							tags={photographer.tags}
							portrait={photographer.portrait}
						/>
					) : (
						"Loading..."
					)}
				</header>
				<section>
					<select
						onChange={(e) => {
							setSortType(e.target.value);
						}}
						className=" form-select form-select-md mb-2 select-css "
					>
						<option value="likes">Popularité</option>

						<option value="date">Date</option>
						<option value="image">Titre</option>
					</select>
					{sortedMedia.map((media, i) => {
						return (
							<div key={photographer.id + i}>
								<Media
									tags={media.tags}
									name={photographer.name}
									image={media.image}
									contentId={media.id}
									PhotographerId={media.photographerId}
									likes={media.likes}
									video={media.video}
									date={media.date}
									key={photographer.Id}
								/>
							</div>
						);
					})}
				</section>
			</main>
		</>
	);
};

export default PhotographerProfile;
