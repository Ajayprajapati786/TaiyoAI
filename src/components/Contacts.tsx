import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from '../store';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const Contacts = () => {
  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handlePopupClose = () => {
    setSelectedContact(null);
  };

  const [newContact, setNewContact] = useState<Contact>({
    id: 1,
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleAddContact = () => {
    dispatch(addContact(newContact));
    setNewContact((prevContact) => ({
      id: prevContact.id + 1,
      name: '',
      phone: '',
      email: '',
    }));
  };

  const handleDeleteContact = (id: number) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Contact</h2>
      <form className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          value={newContact.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        />
        <button
          type="button"
          onClick={handleAddContact}
          className="bg-blue-500 text-white rounded-md py-2 px-4"
        >
          Add
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Contacts List</h2>
      <ul>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {(contacts as Contact[]).map((contact) => (
    <div
      key={contact.id}
      className="flex items-center bg-white rounded-lg shadow-md p-4 cursor-pointer"
      
    >
      <div  onClick={() => handleContactClick(contact)}>
      <div className="flex-grow">
        <p className="text-gray-600">Name : {contact.name}</p>
        <p className="text-gray-600">Phone : {contact.phone}</p>
        {/* <p className="text-gray-600">{contact.email}</p> */}
        <p className="text-gray-300">click to see email also</p>
      </div>
      </div>
      <button
        onClick={() => handleDeleteContact(contact.id)}
        className="bg-red-500 text-white rounded-md py-2 px-4 ml-4"
      >
        Delete
      </button>
    </div>
  ))}
</div>


        {selectedContact && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">
                {selectedContact.name}
              </h3>
              <p className="mb-2">
                Phone: {selectedContact.phone}
              </p>
              <p className="mb-4">
                Email: {selectedContact.email}
              </p>
              <button
                onClick={handlePopupClose}
                className="bg-blue-500 text-white rounded-md py-2 px-4"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </ul>
    </div>
  );

};

export default Contacts;
