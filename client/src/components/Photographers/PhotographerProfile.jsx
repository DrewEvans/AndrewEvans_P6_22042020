import axios from "axios";
import { useEffect, useState } from "react";
import LandingHeader from "./LandingHeader";
import Media from "./Media";
import Logo from "../Home/Logo";
import Lightbox from "./Lightbox";

import "./photographerprofile.scss";
import SelectionFilter from "./SelectionFilter";

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

	const handleClickItem = (e) => {
		setSortType(e.target.value);
	};

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

	let clickedImage;

	const openModal = (e) => {
		setModalIsOpen(true);
		clickedImage = e.target.currentSrc;
		clickedImage = clickedImage.split(/(\\|\/)/g).pop();
		setCurrentImage(clickedImage);
	};

	const moveBackward = (e) => {
		e.isTrusted ? displayImages(-1) : console.log(false);
	};
	const moveForward = (e) => {
		e.isTrusted ? displayImages(+1) : console.log(false);
	};

	let imageIndex;

	const displayImages = (n) => {
		let allContent = sortedMedia.map((content) => {
			if (content.image) {
				return content.image;
			}
			if (content.video) {
				return content.video;
			}
			return content;
		});

		const proxy = new Proxy(allContent, {
			get(target, prop) {
				if (!isNaN(prop)) {
					prop = parseInt(prop, 10);
					if (prop < 0) {
						prop += target.length;
					}
				}
				return target[prop];
			},
		});

		imageIndex = proxy.indexOf(currentImage);

		if (n) {
			setCurrentImage(proxy[(imageIndex += n)]);
		}

		if (imageIndex + 1 > proxy.length) {
			setCurrentImage(proxy[0]);
		}
	};

	displayImages(imageIndex);

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
					<SelectionFilter handleClickItem={handleClickItem} />
					<Lightbox
						openModal={modalIsOpen}
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
										openmodal={openModal}
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
