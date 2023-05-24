import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for a contact
interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

// Define the initial state for the store
const initialState: Contact[] = [];

// Create a slice using createSlice
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state: Contact[], action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    deleteContact: (state: Contact[], action: PayloadAction<number>) => {
      const contactId = action.payload;
      return state.filter(contact => contact.id !== contactId);
    },
  },
});

// Extract the actions from the slice
const { addContact, deleteContact } = contactsSlice.actions;

// Create the Redux store
const store = configureStore({
  reducer: contactsSlice.reducer,
});

export { addContact, deleteContact }

export default store
