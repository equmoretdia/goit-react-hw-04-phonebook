import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

const ContactItem = ({ id, name, number, onContactDelete }) => {
  return (
    <li className={css.item}>
      <p>
        {name}: {number}
      </p>
      <button
        className={css.button}
        type="button"
        onClick={() => onContactDelete(id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onContactDelete: PropTypes.func.isRequired,
};

export default ContactItem;
