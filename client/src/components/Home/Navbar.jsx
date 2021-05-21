const Navbar = ({ navTags, handleBtns }) => {
	return (
		<>
			<nav>
				<div>
					{navTags
						? navTags.map((navtag, i) => {
								return (
									<button
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
