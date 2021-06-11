import "./navbar.scss";

const Navbar = ({ navTags, handleBtns }) => {
	//on navtag load render all unique tags on home compnent
	return (
		<>
			<nav>
				<div className="filter-container">
					{navTags
						? navTags.map((navtag, i) => {
								return (
									<button
										className="filter-pills"
										onClick={handleBtns}
										key={i}
										value={navtag}
										aria-label={navtag}
									>
										#{navtag}
									</button>
								);
						  })
						: "Loading..."}
				</div>
			</nav>
		</>
	);
};
export default Navbar;
