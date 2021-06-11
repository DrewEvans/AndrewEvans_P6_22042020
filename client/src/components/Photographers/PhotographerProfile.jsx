import axios from "axios";
import { useEffect, useState } from "react";
import LandingHeader from "./LandingHeader";
import Media from "./Media";
import Logo from "../Home/Logo";
import Lightbox from "./Lightbox";
import SelectionFilter from "./SelectionFilter";
import PhotograpgherHighlights from "./PhotograpgherHighlights";

import "./photographerprofile.scss";

const PhotographerProfile = ({ match }) => {
	const ID = parseInt(match.params.id);
	const [photographer, setPhotographer] = useState([]);
	const [allMedia, setAllMedia] = useState([]);
	const [sortedMedia, setSortedMedia] = useState([]);
	const [sortType, setSortType] = useState("likes");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState();

	let clickedImage;
	let imageIndex;

	//calulate total likes a photographer has
	let totalLikes = 0;
	allMedia.forEach((like) => {
		totalLikes += like.likes;
	});

	//render fetched data once and save to state to avoid rerender
	useEffect(() => {
		fetchPhotographerInfo(ID);
		fetchPhotographerMedia(ID);
	}, [ID]);

	//re-render the sorted data if sort type is updated
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

		//loops over the data and sets state with photographer Data
		data.map((photographerInfo) => {
			setPhotographer(photographerInfo);
			return true;
		});
	}

	//fetch content data from server based on photographer ID
	async function fetchPhotographerMedia(id) {
		const request = await axios({
			method: "get",
			url: `/api/photographers/${id}/media`,
			baseURL: "http://34.251.153.147:5000",
		});
		const data = request.data;
		//update state with requested data
		setAllMedia(data);
	}

	//listens to click on the selection element
	const handleClickItem = (e) => {
		//updates state with the value selected
		setSortType(e.target.value);
	};

	//sort media function takes arg of selection value
	const sortArray = (type) => {
		//list of values to sort media by
		const types = {
			likes: "likes",
			date: "date",
			image: "image",
		};
		const sortProperty = types[type];
		//updates with sortType State
		let sortParameters = sortType;

		//if value is likes sort likes media by dsc > asc
		if (sortProperty === "likes") {
			//re-order allMedia objects and update sortParameters
			sortParameters = [...allMedia].sort((a, b) => {
				if (b.likes > a.likes) {
					return 1;
				}
				return -1;
			});
		}
		//if value is image/title sort media by a-z
		if (sortProperty === "image") {
			//re-order allMedia objects and update sortParameters
			sortParameters = [...allMedia].sort((a, b) => {
				if (a.image - b.image) {
					return 1;
				}
				return -1;
			});
		}
		//if value is date sort date media by dsc > asc
		if (sortProperty === "date") {
			//re-order allMedia objects and update sortParameters
			sortParameters = [...allMedia].sort((a, b) => {
				if (a.date > b.date) {
					return 1;
				}
				return -1;
			});
		}
		const sorted = sortParameters;
		//update sortedMedia state with updated list ordering
		setSortedMedia(sorted);
	};

	//listens to when user clicks on image to display lightBox
	const openModal = (e) => {
		//if clicked
		setModalIsOpen(true);
		//update to image user clicked to be display
		clickedImage = e.target.currentSrc;
		//remove unneeded string from DOM to query file
		clickedImage = clickedImage.split(/(\\|\/)/g).pop();
		//updated state with image clicked
		setCurrentImage(clickedImage);
	};
	//navagate prev image event listener
	const moveBackward = (e) => {
		e.isTrusted ? displayImages(-1) : console.log(false);
	};
	//navagate next image event listener
	const moveForward = (e) => {
		e.isTrusted ? displayImages(+1) : console.log(false);
	};
	//dispaly modal & image if user tabs over and enter is pressed
	const onKeyPress = (e) => {
		console.log(e.charCode);
		if (e.charCode === 13) {
			setModalIsOpen(true);
		}
	};

	//determines the images placement in the lightbox modal
	const displayImages = (n) => {
		//if defined display the content type
		let allContent = sortedMedia.map((content) => {
			if (content.image) {
				return content.image;
			}
			if (content.video) {
				return content.video;
			}
			return true;
		});

		// negative indexes on proxied arrays
		const proxy = new Proxy(allContent, {
			//set a property named -1 in all content
			get(target, prop) {
				//convert string prop to valid index value
				if (!isNaN(prop)) {
					prop = parseInt(prop, 10);
					if (prop < 0) {
						prop += target.length;
					}
				}
				return target[prop];
			},
		});
		//update with the new proxied index of the current image
		imageIndex = proxy.indexOf(currentImage);

		//if value is passed set current image to new image index
		if (n) {
			setCurrentImage(proxy[(imageIndex += n)]);
		}
		//if imageIndex goes beyond array length start reset index to 0
		if (imageIndex + 1 > proxy.length) {
			setCurrentImage(proxy[0]);
		}
	};

	return (
		<>
			<div className="l-container">
				<Logo />
			</div>
			<main>
				<header>
					{
						//if data present render component
						photographer ? (
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
							// display loading message
							"Loading..."
						)
					}
				</header>

				<section>
					<SelectionFilter
						//prop to listen to when value is update in the component
						handleClickItem={handleClickItem}
					/>
					<Lightbox
						//calls modalIsOpen when user interacts with image
						openModal={modalIsOpen}
						//calls function when user clicks on cross button
						closemodal={() => setModalIsOpen(false)}
						//calls function when button is clicked
						moveBackward={moveBackward}
						//calls function when button is clicked
						moveForward={moveForward}
						image={currentImage}
						name={photographer.name}
					/>
					<div
						role="region"
						aria-label="Photographer Media"
						className="content-container"
					>
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
