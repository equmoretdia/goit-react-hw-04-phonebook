import { useState, useEffect } from 'react';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid/non-secure';

import initialContacts from 'data/contacts.json';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

export default function App() {
  const unparsedContacts = window.localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(unparsedContacts);
  const [contacts, setContacts] = useState(() => {
    return parsedContacts ?? initialContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase() === newContact.name.toLowerCase().trim()
      )
    ) {
      toast.warn(`${newContact.name} is already in your contacts`, {
        position: 'top-right',
        theme: 'colored',
      });
    } else {
      setContacts(contacts => [...contacts, newContact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <section className={css.section}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={addNewContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onFilterChange={setFilter} />
        <ContactList
          contacts={filteredContacts}
          onContactDelete={deleteContact}
        />
      </section>

      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}
