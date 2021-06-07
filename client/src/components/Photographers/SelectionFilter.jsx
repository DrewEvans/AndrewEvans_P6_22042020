import "./selectionFilter.scss";

const SelectionFilter = ({ handleClickItem }) => {
	return (
		<div className="wrapper">
			<p className="header">Trier par</p>
			<select onChange={handleClickItem} aria-label="content-filter">
				<option className="item" value="likes" aria-labelledby="likes">
					Popularité
				</option>
				<option value="date" aria-labelledby="order by date">
					Date
				</option>
				<option value="image" aria-labelledby="order by title">
					Titre
				</option>
			</select>
		</div>
	);
};

export default SelectionFilter;
