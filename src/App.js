import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import Alert from "./components/Alert/Alert";

export default class App extends Component {
  static propTypes = {
    getVisibleContacts: PropTypes.func,
    addContact: PropTypes.func,
    changeFilter: PropTypes.func,
    removeContact: PropTypes.func,
  };

  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    duplication: false,
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");
    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      this.setState({ duplication: true });
      setTimeout(() => this.setState({ duplication: false }), 3000);
    } else {
      const contact = {
        id: uuidv4(),
        name,
        number,
      };

      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, contact],
          duplication: false,
        };
      });
    }
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  //метод который возвращает новый массив (не мутирует state)
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  showAlert = e => {
    const { duplication } = this.state;
    if (duplication) {
      setTimeout(e, 100);
    }
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter, duplication } = this.state;
    return (
      <>
        <CSSTransition
          in={duplication}
          timeout={250}
          classNames="Alert"
          unmountOnExit
        >
          <Alert />
        </CSSTransition>

        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames="Logo"
          unmountOnExit
        >
          <h1>Phonebook</h1>
        </CSSTransition>
        <ContactForm onAddContact={this.addContact} />

        <CSSTransition
          in={visibleContacts.length > 1}
          timeout={250}
          classNames="Filter"
          unmountOnExit
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>

        <CSSTransition
          in={visibleContacts.length > 0}
          appear={true}
          timeout={250}
          classNames="ListView"
          unmountOnExit
        >
          <ContactList
            contacts={visibleContacts}
            onRemove={this.removeContact}
          />
        </CSSTransition>
      </>
    );
  }
}
