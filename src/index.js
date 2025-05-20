// Importa React y ReactDOM para renderizar la app
import React from "react";
import ReactDOM from "react-dom";

// Importa herramientas de Redux para crear el store y manejar acciones asíncronas
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

// Importa los reducers combinados y el componente principal de la aplicación
import reducers from "./reducers";
import App from "./App";

// Importa el enrutador de React Router para manejar las rutas de la aplicación
import { BrowserRouter as Router } from "react-router-dom";

// Crea el store con middleware y soporte para DevTools
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

// Renderiza la aplicación envolviéndola con Redux y Router
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);