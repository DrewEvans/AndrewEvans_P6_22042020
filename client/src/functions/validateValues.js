export default function validateValues(values) {
	//regex patterns to test strings from contact form
	const nameRegex = /^[a-zA-ZÀ-ÿ,.'-]{2,}$/;
	const spaceRegex = /[\s]{2,}/;
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//new object array to push errros if strings fails regex pattern
	let errors = {};

	//if string fails update user msg with error
	if (
		!spaceRegex.test(values.firstName) &&
		!nameRegex.test(values.firstName)
	) {
		errors.firstName = "Entrez votre prénom";
	}
	//if string fails update user msg with error
	if (!spaceRegex.test(values.lastName) && !nameRegex.test(values.lastName)) {
		errors.lastName = "Entrez votre nom";
	}
	//if string fails update user msg with error
	if (!emailRegex.test(values.email)) {
		errors.email = "Adresse e-mail invalide";
	}

	return errors;
}
