import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Provider store={store}>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
    
  )
   
}

export default App;
