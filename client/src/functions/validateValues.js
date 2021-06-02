export default function validateValues(values) {
	const nameRegex = /^[a-zA-ZÀ-ÿ,.'-]{2,}$/;
	const spaceRegex = /[\s]{2,}/;
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	let errors = {};

	if (
		!spaceRegex.test(values.firstName) &&
		!nameRegex.test(values.firstName)
	) {
		errors.firstName = "Entrez votre prénom";
	}
	if (!spaceRegex.test(values.lastName) && !nameRegex.test(values.lastName)) {
		errors.lastName = "Entrez votre nom";
	}

	if (!emailRegex.test(values.email)) {
		errors.email = "Adresse e-mail invalide";
	}

	return errors;
}
