import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

import ContactItem from '../ContactItem';

const ContactList = ({ contacts, onContactDelete }) => {
  return (
    <ul className={css.wrapper}>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onContactDelete={onContactDelete}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onContactDelete: PropTypes.func.isRequired,
};

export default ContactList;
