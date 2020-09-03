import React from "react";

import PropTypes from "prop-types";
import styles from "../ContactForm/ContactForm.module.css";

export default function Filter({ value, onChangeFilter }) {
  return (
    <div className={styles.TaskEditor}>
      <label className={styles.TaskEditorLabel}>
        Find contacts by name
        <input
          className={styles.TaskEditorInput}
          type="text"
          value={value}
          onChange={e => onChangeFilter(e.target.value)}
          data-row="filter"
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired,
};
