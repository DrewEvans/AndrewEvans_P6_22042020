import axios from "axios";
import { useEffect, useState } from "react";
import LandingHeader from "./LandingHeader";
import Media from "./Media";
import Logo from "../Home/Logo";
import Lightbox from "./Lightbox";

import "./photographerprofile.scss";

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

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState();
	const [prevImage, setPrevImage] = useState();
	const [nextImage, setNextImage] = useState();
	const [imageIndex, setImageIndex] = useState();

	const handleClick = (e) => {
		setModalIsOpen(true);

		let images = sortedMedia.map((images) => {
			return images.image;
		});

		let clickedImage = e.target.currentSrc;

		clickedImage = clickedImage.split(/(\\|\/)/g).pop();

		setCurrentImage(clickedImage);
		setImageIndex(images.indexOf(currentImage));

		setPrevImage(images[imageIndex - 1]);
		setNextImage(images[imageIndex + 1]);
	};

	const moveBackward = (e) => {
		if (e.isTrusted && prevImage === undefined) {
			return false;
		} else {
			setCurrentImage(prevImage);
		}
	};
	const moveForward = (e) => {
		if (e.isTrusted && nextImage === undefined) {
			return false;
		} else {
			setCurrentImage(nextImage);
		}
	};

	console.log(`im previous ${prevImage}`);
	console.log(`im current:${currentImage}`);
	console.log(`im next: ${nextImage}`);

	return (
		<>
			<Logo />
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
					>
						<option value="likes">Popularité</option>
						<option value="date">Date</option>
						<option value="image">Titre</option>
					</select>
					<Lightbox
						openmodal={modalIsOpen}
						closemodal={() => setModalIsOpen(false)}
						image={currentImage}
						name={photographer.name}
						moveBackward={moveBackward}
						moveForward={moveForward}
					/>
					<div className="content-container">
						{sortedMedia.map((media, i) => {
							return (
								<div key={photographer.id + i}>
									<Media
										openmodal={handleClick}
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
					</div>
				</section>
			</main>
		</>
	);
};

export default PhotographerProfile;
