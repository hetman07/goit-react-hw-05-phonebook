import React from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import styles from "./Filter.module.css";

export default function Filter({ value, onChangeFilter, lengthContacts }) {
  return (
    <CSSTransition
      in={lengthContacts > 1 || value !== ""}
      timeout={500}
      classNames={{ ...styles }}
      unmountOnExit
    >
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
    </CSSTransition>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired,
  lengthContacts: PropTypes.number,
};
