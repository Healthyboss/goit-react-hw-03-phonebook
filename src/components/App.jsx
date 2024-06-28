import React, {useState, useEffect} from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { nanoid } from "nanoid";


function App() {

  const getInitialContacts = () => {
    const localStorageContacts = localStorage.getItem('contacts');
    return localStorageContacts ? JSON.parse(localStorageContacts): []
    };

  const [contacts, setContacts] = useState(getInitialContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localStorageContacts = localStorage.getItem("contacts");
    if (localStorageContacts) {
      const parsedContacts = JSON.parse(localStorageContacts);
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem('contacts', JSON.stringify(contacts));
    },[contacts]);
  
  const addContact = (name, number) => {

    const normalizedName = name.toLowerCase();

    const existingName = contacts.filter(
      (contact) => contact.name.toLowerCase() === normalizedName
    );

    if (existingName.length > 0) {
      alert(`${name} is already on the Contacts list !`)
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    
    setContacts([...contacts, newContact]);

  };  

  const handleFilterChange =(event)=> {
    setFilter(event.target.value);
  }

  const filteredContacts =() =>{
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  }

  const deletedContact =(id) =>{
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  }
  

  return (
    <div>

    <h1 style={{
      margin:"0 ,auto",
      height: "100%",
      display: "flex",
      fontSize: 30,
      fontStyle: "italic",
      color: "#e645bb",
    }}>Phonebook</h1>

    <ContactForm 
    name={name} 
    setName={setName}
    number={number} 
    setNumber={setNumber}
    addContact={addContact}/>

    <h2 style={{
      margin:"0 ,auto",
      height: "100%",
      display: "flex",
      fontSize: 20,
      fontStyle: "italic",
      color: "#a83275",
    }}>Contacts:</h2>

    <Filter value={filter} onChange={handleFilterChange}/>

    <ContactList contacts={filteredContacts()} onDeleteContacts={deletedContact}/>

    </div>
  );
}

export default App;
