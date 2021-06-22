import axios from "axios";
import { SRLWrapper } from "simple-react-lightbox";
import { useEffect, useState } from "react";
import LandingHeader from "./LandingHeader";
import Media from "./Media";
import Logo from "../Home/Logo";
import SelectionFilter from "./SelectionFilter";
import PhotograpgherHighlights from "./PhotograpgherHighlights";

import "./photographerprofile.scss";

const options = {
	settings: {
		overlayColor: "rgba(196, 196, 196, .8)",
		autoplaySpeed: 1500,
		transitionSpeed: 500,
		usingPreact: false,
		slideTransitionSpeed: 0.4,
		slideTransitionTimingFunction: "linear",
	},
	buttons: {
		backgroundColor: "rgba(30,30,36,0)",
		iconColor: "rgba(144, 28, 28, 1)",
		showAutoplayButton: false,
		showCloseButton: true,
		showDownloadButton: false,
		showFullscreenButton: false,
		showThumbnailsButton: false,
	},
	caption: {
		captionColor: "rgba(144, 28, 28, 1)",
		captionFontFamily: "DM Sans, sans-serif",
		captionFontWeight: "600",
	},
	thumbnails: {
		showThumbnails: false,
	},
};

const PhotographerProfile = ({ match }) => {
	const ID = parseInt(match.params.id);
	const [photographer, setPhotographer] = useState([]);
	const [allMedia, setAllMedia] = useState([]);
	const [sortedMedia, setSortedMedia] = useState([]);
	const [sortType, setSortType] = useState("likes");
	//calulate total likes a photographer has

	let totalLikes = null;

	allMedia.forEach((like) => {
		totalLikes += like.likes;
	});

	const [sumOfLikes, setSumOfLikes] = useState(totalLikes);

	const incLikes = (e) => {
		if (e.isTrusted) {
			setSumOfLikes(sumOfLikes + 1);
		}
	};

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

	const prevButton = document.querySelector(".SRLPrevButton");
	const nextButton = document.querySelector(".SRLNextButton");
	const closeButton = document.querySelector(".SRLCloseButton");

	if (prevButton) {
		prevButton.ariaLabel = "Previous Image";
		nextButton.ariaLabel = "Next Image";
		closeButton.ariaLabel = "Close Dialog";
	}

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

					<SRLWrapper options={options}>
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
											tags={media.tags}
											name={photographer.name}
											image={media.image}
											contentId={media.id}
											PhotographerId={
												media.photographerId
											}
											likes={media.likes}
											video={media.video}
											date={media.date}
											key={photographer.Id}
											incLikes={incLikes}
										/>
									</div>
								);
							})}
						</div>
					</SRLWrapper>
				</section>
				{
					//render component if data present
					photographer ? (
						<PhotograpgherHighlights
							likes={totalLikes + sumOfLikes}
							price={photographer.price}
						/>
					) : (
						"Loading..."
					)
				}
			</main>
		</>
	);
};

export default PhotographerProfile;
