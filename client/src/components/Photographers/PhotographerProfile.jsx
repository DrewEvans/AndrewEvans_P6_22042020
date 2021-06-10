import axios from "axios";
import { useEffect, useState } from "react";
import LandingHeader from "./LandingHeader";
import Media from "./Media";
import Logo from "../Home/Logo";
import Lightbox from "./Lightbox";

import "./photographerprofile.scss";
import SelectionFilter from "./SelectionFilter";
import PhotograpgherHighlights from "./PhotograpgherHighlights";

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

	useEffect(() => {
		sortArray(sortType);
	}, [sortType, allMedia]);

	async function fetchPhotographerInfo(id) {
		const request = await axios({
			method: "get",
			url: `/api/photographers/${id}`,
			baseURL: "http://34.251.153.147:5000",
		});
		const data = request.data;

		data.map((photographerInfo) => {
			setPhotographer(photographerInfo);
			return true;
		});
	}

	async function fetchPhotographerMedia(id) {
		const request = await axios({
			method: "get",
			url: `/api/photographers/${id}/media`,
			baseURL: "http://34.251.153.147:5000",
		});
		const data = request.data;
		setAllMedia(data);
	}

	const handleClickItem = (e) => {
		setSortType(e.target.value);
	};

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

	const onKeyPress = (e) => {
		console.log(e.charCode);
		if (e.charCode === 13) {
			setModalIsOpen(true);
		}
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
			return true;
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

	let totalLikes = 0;
	allMedia.forEach((like) => {
		totalLikes += like.likes;
	});

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
										index={i}
										openmodal={openModal}
										onKeyPress={onKeyPress}
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
				{photographer ? (
					<PhotograpgherHighlights
						likes={totalLikes}
						price={photographer.price}
					/>
				) : (
					"Loading..."
				)}
			</main>
		</>
	);
};

export default PhotographerProfile;
