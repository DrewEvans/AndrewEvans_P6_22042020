import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./contactmodal.scss";
import useForm from "../../hooks/useForm";
import validate from "../../functions/validateValues";

const ContactModal = ({ open, onClose, name, id }) => {
	const { handleChange, values, handleSubmit, errors } = useForm(
		validate,
		id,
		onClose
	);

	const closeCross = <FontAwesomeIcon icon={faTimes} />;

	if (!open) return null;
	return (
		<div className="contact-form-background">
			<dialog
				aria-label={`contact me ${name}`}
				className="modal-container"
			>
				<button
					onClick={onClose}
					className="modal-cross"
					aria-label="close contact form"
				>
					{closeCross}
				</button>
				<div className="contact-form">
					<div className="form-title">
						<h1>Contactez-moi</h1>
						<h2>{name}</h2>
					</div>
					<form className="user-details">
						<div className="form-group">
							<label htmlFor="firstName">{"Prénom"}</label>
							<input
								id="firstName"
								name="firstName"
								className="form-control"
								type="text"
								minLength="2"
								value={values.firstName}
								aria-label="first name"
								onChange={handleChange}
							/>
							{errors.firstName && (
								<p className="error-msg">*{errors.firstName}</p>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="lastName">{"Nom"}</label>
							<input
								id="lastName"
								name="lastName"
								className="form-control"
								type="text"
								minLength="2"
								value={values.lastName}
								aria-label="last name"
								onChange={handleChange}
							/>
							{errors.lastName && (
								<p className="error-msg">*{errors.lastName}</p>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="email">{"Email"}</label>
							<input
								id="email"
								name="email"
								className="form-control"
								type="email"
								value={values.email}
								onChange={handleChange}
								aria-label="email"
							/>
							{errors.email && (
								<p className="error-msg">*{errors.email}</p>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="message">{"Votre message"}</label>
							<textarea
								id="message"
								name="message"
								className="form-control"
								type="text"
								minLength="2"
								value={values.message}
								aria-label="your message"
								onChange={handleChange}
								rows="6"
								cols="45"
								wrap="hard"
							/>
						</div>
						<input
							type="submit"
							value="Envoyer"
							className="submit-btn-input"
							onClick={handleSubmit}
							aria-label="send"
						/>
					</form>
				</div>
			</dialog>
		</div>
	);
};

export default ContactModal;
