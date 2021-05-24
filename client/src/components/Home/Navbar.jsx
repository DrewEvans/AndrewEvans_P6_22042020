import "./navbar.scss";

const Navbar = ({ navTags, handleBtns }) => {
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
