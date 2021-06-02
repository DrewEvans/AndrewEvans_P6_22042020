import "./selectionFilter.scss";

const SelectionFilter = ({ handleClickItem }) => {
	return (
		<div className="wrapper">
			<p className="header">Trier par</p>
			<select onChange={handleClickItem}>
				<option className="item" value="likes">
					Popularité
				</option>
				<option value="date">Date</option>
				<option value="image">Titre</option>
			</select>
		</div>
	);
};

export default SelectionFilter;
