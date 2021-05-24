import { NavLink } from "react-router-dom";

const Logo = () => {
	return (
		<NavLink to="/">
			<div>
				<img src="../assets/fisheye-logo.png" alt="" />
			</div>
		</NavLink>
	);
};

export default Logo;
