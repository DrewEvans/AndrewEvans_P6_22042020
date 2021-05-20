const SelectionFilter = ({ onChange }) => {
	console.log(onChange);
	return (
		<>
			<select>
				<option value="likes">Popularité</option>
				<option value="date">Date</option>
				<option value="image">Titre</option>
			</select>
		</>
	);
};

export default SelectionFilter;
