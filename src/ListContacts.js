import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    };

    state = {
        query: ''
    };

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    };

    clearQuery = () => {
        this.setState({ query: ''}) //resets the query
    };

    render() {
        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;
        //KIP the obj destructuring! - line 74, 76,78,95,109
        //Looks like the obj destructuring is just adding the this.props OR
        //- adding the this.state - looks  a little cleaner vs always having
        //the same call multiple times just have the obj property name

        let showingContacts;
        if (query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
            showingContacts = contacts.filter((contact) => match.test(contact.name))
        }else {
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'));

        return (
            <div className='list-contacts'>
                {/*{JSON.stringify(this.state)}
                used to show updated query state
                */}
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <a
                        href='#create'
                        onClick={this.props.onNavigate}
                        className='add-contact'
                    >Add Contact</a>
                </div>

                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span> Now showing {showingContacts.length} of {contacts.length} total </span>
                        <button onClick={this.clearQuery}>Show All</button>
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
