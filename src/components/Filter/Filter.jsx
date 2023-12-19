import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

class Filter extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  handleChange = e => {
    // console.log(e);
    const { value } = e.currentTarget;
    // console.log(value);
    this.props.onFilterChange(value);
  };

  render() {
    const { value } = this.props;
    return (
      <div className={css.wrapper}>
        <label className={css.label}>
          Find contacts by name
          <input
            className={css.input}
            type="text"
            name="filter"
            value={value}
            onChange={this.handleChange}
          />
        </label>
      </div>
    );
  }
}

export default Filter;
