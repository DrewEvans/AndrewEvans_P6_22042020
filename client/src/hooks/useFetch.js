import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
	const [state, setState] = useState({ data: null, loading: true });

	useEffect(() => {
		setState({ data: null, loading: false });
		async function fetchData() {
			const request = await axios.get(url);
			setState({ data: request.data, loading: false });
		}
		fetchData();
	}, [url]);

	return state;
}

export default useFetch;
