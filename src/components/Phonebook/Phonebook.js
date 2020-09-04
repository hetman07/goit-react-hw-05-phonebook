import React, { Component } from "react";
import PropTypes from "prop-types";

import { v4 as uuidv4 } from "uuid";

import ContactForm from "../ContactForm";
import Filter from "../Filter";
import ContactList from "../ContactList";
import Alert from "../Alert";
import Logo from "../Logo";

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
    txtMsg: "",
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
      this.setState({ txtMsg: "Contact is dublication!" });
      setTimeout(() => this.setState({ txtMsg: "" }), 3000);
    } else if (name === "" || number === "") {
      this.setState({ txtMsg: "Contact is EMPTY!" });
      setTimeout(() => this.setState({ txtMsg: "" }), 3000);
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

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter, txtMsg } = this.state;
    return (
      <>
        <Alert onShow={txtMsg} />
        <Logo text={"Phonebook"} />
        <ContactForm onAddContact={this.addContact} />

        <Filter
          value={filter}
          onChangeFilter={this.changeFilter}
          lengthContacts={visibleContacts.length}
        />

        <ContactList contacts={visibleContacts} onRemove={this.removeContact} />
      </>
    );
  }
}
