import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    let showingContacts
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            to='/create'
            className='add-contact'
          >Add Contact</Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
// import React from 'react';
//>>>>>>>KIP THAT DEPENDING ON THE TYPE OF COMPONENT YOU ARE USING WILL DETERMINE THE TYPE OF IMPORTS-
// YOU WILL USE AT THE TOP OF YOUR DOC
//****** EXAMPLE OF LISTCONTACTS AS CLASS COMPONENT *******
// class ListContacts extends Component {
//     render() {
//         return(
//             <ol className='contact-list'>
//                 {this.props.contacts.map((contact) => (
//                     <li key={contact.id} className='contact-list-item'>
//                         <div className='contact-avatar'
//                         style={{
//                             backgroundImage: `url(${contact.avatarURL})`
//                         }}/>
//                         <div className='contact-details'>
//                             <p>{contact.name}</p>
//                             <p>{contact.email}</p>
//                         </div>
//                         <button className='contact-remove'>
//                             Remove
//                         </button>
//                     </li>
//                 ))}
//             </ol>
//         )
//     }
// }

//********LIST CONTACTS AS A STATELESS FUNCTIONAL COMPONEN**********
// function ListContacts (props) {
//     return(
//         <ol className='contact-list'>
//             {props.contacts.map((contact) => (
//                 <li key={contact.id} className='contact-list-item'>
//                     <div className='contact-avatar' style={{
//                         backgroundImage: `url(${contact.avatarURL})`
//                     }}/>
//                     <div className='contact-details'>
//                         <p>{contact.name}</p>
//                         <p>{contact.email}</p>
//                     </div>
//                     <button  onClick={() => props.onDeleteContact(contact)} className='contact-remove'>
//                         Remove
//                     </button>
//                 </li>
//             ))}
//
//         </ol>
//     )
// }
