import "./selectionFilter.scss";

const SelectionFilter = ({ handleClickItem }) => {
	//returns the value to Photographer
	//component when user selects an option

	return (
		<div className="wrapper">
			<p className="header">Trier par</p>
			<select
				onChange={handleClickItem}
				role="list"
				tabIndex="0"
				aria-controls="content-filter"
				aria-label="content-filter"
			>
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
