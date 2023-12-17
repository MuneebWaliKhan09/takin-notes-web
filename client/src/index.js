import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import Index_todos from './components/index-todos/Index_todos';
import { CookiesProvider } from 'react-cookie';
import Context from './components/context/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context>
      <CookiesProvider>
        <Index_todos />
      </CookiesProvider>
    </Context>
    <ToastContainer /> {/* Place the ToastContainer at the root level */}
  </React.StrictMode>
);

