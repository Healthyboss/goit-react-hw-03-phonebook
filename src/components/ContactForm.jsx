import PropTypes from "prop-types";
import styles from "./ContactForm.module.css"

const ContactForm = ({name, setName, number, setNumber, addContact}) =>{
   const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() && number.trim()) {
        addContact(name, number);
        setName('');
        setNumber('');
    }
   };

   return(
    <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.fieldName}>
              Full Name:
            <input className={styles.input}
                type="text"
                name="name"
                pattern="/^[a-zA-Zà-žÀ-Ž]+$/"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value ={name}
                onChange={(event) => setName(event.target.value)}
            />
        </label>

        <label className={styles.fieldName}>
              Telephone Number:
            < input className={styles.input}
                type="tel"
                name="number"
                pattern="/^\+?[1-9]\d{1,14}$/"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={(event) => setNumber(event.target.value)}
            />
        </label>

        <button className={styles.button} type="submit">Add Contact</button>
    </form>
   )
}

ContactForm.propTypes ={
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    number: PropTypes.string.isRequired,
    setNumber: PropTypes.func.isRequired,
    addContact: PropTypes.func.isRequired,
}
export default ContactForm;