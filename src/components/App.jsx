import React from 'react';
import css from './App.module.css';

import { nanoid } from 'nanoid/non-secure';

import initialContacts from 'data/contacts.json';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends React.Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  componentDidMount() {
    const unparsedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(unparsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addNewContact = ({ name, number }) => {
    const { contacts } = this.state;
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
      alert(`${newContact.name} is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, newContact],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilterChange = newFilter => {
    this.setState({ filter: newFilter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <section className={css.section}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addNewContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onFilterChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onContactDelete={this.deleteContact}
        />
      </section>
    );
  }
}

export default App;
