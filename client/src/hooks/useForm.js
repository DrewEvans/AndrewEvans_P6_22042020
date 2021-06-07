import axios from "axios";
import { useState } from "react";

const useForm = (validate, id, onClose) => {
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		message: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
		setErrors(validate(values));
	};

	const submitForm = () => {
		if (!errors.firstName && !errors.lastName && !errors.email) {
			axios
				.post("/api/contactForm/submit", {
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					message: values.message,
					photographerId: id,
				})
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					console.log(error);
				});
			console.log(
				`firstName: ${values.firstName} lastname: ${values.lastName} Email: ${values.email} Message:${values.message} `
			);

			onClose();
		} else {
			return console.log(errors);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submitForm();
	};

	return { handleChange, handleSubmit, values, errors };
};

export default useForm;
