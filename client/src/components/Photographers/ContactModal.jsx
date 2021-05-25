import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./contactmodal.scss";

const ContactModal = ({ open, onClose, name }) => {
	const closeCross = <FontAwesomeIcon icon={faTimes} />;

	if (!open) return null;
	return (
		<>
			<div className="modal-container">
				<button onClick={onClose} className="modal-cross">
					{closeCross}
				</button>
				<div className="contact-form">
					<div className="form-title">
						<h1>Contactez-moi</h1>
						<h2>{name}</h2>
					</div>
					<div className="user-details">
						<label htmlFor="">{"Prénom"}</label>
						<input type="text" />
						<label htmlFor="">{"Nom"}</label>
						<input type="text" />
						<label htmlFor="">{"Email"}</label>
						<input type="email" />
						<label htmlFor="">{"Votre message"}</label>
						<textarea
							type="text"
							name=""
							id=""
							rows="6"
							cols="45"
							wrap="hard"
						/>
					</div>
				</div>

				<submit
					className="submit-btn"
					onClick={(e) => e.preventDefault}
				>
					Envoyer
				</submit>
			</div>
		</>
	);
};

export default ContactModal;
