import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import "./ContactList.css";

const ContactList = ({ contacts, onRemove }) => {
  return (
    <div className="TaskEditor">
      <h2>Contacts</h2>
      <TransitionGroup component="ul">
        {contacts.map(cont => (
          <CSSTransition
            key={cont.id}
            timeout={250}
            classNames="TaskList-item-fade"
          >
            <li className="TaskListItem" key={cont.id}>
              <span className="TaskListText">{cont.name}: </span>
              <span className="TaskListText">{cont.number}</span>
              <button
                type="button"
                className="TaskListButton"
                onClick={() => onRemove(cont.id)}
              >
                Delete
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onRemove: PropTypes.func.isRequired,
};

export default ContactList;
