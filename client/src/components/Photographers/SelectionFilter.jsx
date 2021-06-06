import "./selectionFilter.scss";

const SelectionFilter = ({ handleClickItem }) => {
	return (
		<div className="wrapper">
			<p className="header">Trier par</p>
			<select onChange={handleClickItem} aria-label="content-filter">
				<option className="item" value="likes" aria-label="likes">
					Popularité
				</option>
				<option value="date" aria-label="date">
					Date
				</option>
				<option value="image" aria-label="title">
					Titre
				</option>
			</select>
		</div>
	);
};

export default SelectionFilter;
