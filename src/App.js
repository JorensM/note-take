import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux/es/exports';
import notesReducer from "redux/slices/notesReducer"
import foldersReducer from 'redux/slices/foldersReducer';

import { NoteTakeApp } from 'containers/NoteTakeApp/NoteTakeApp.js';

import './App.css';


const store = configureStore({
  reducer: {
    notesState: notesReducer,
    folders: foldersReducer,
  }
})

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <NoteTakeApp/>
      </div>
    </Provider>
  );
}

export default App;