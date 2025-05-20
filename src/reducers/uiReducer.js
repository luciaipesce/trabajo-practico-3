// uiReducer.js es un reducer que gestiona el estado de la interfaz de usuario,
// específicamente el título actual que se muestra en el encabezado de la app.

const defaultState = {
  title: "Songs" // Título inicial por defecto
};

export const uiReducer = (state = defaultState, action) => {
  switch (action.type) {

    // Actualiza el título del encabezado cuando se dispara la acción UPDATE_HEADER_TITLE
    case "UPDATE_HEADER_TITLE":
      return {
        ...state,
        title: action.title
      };

    // Si no se reconoce la acción, devuelve el estado actual
    default:
      return state;
  }
};

export default uiReducer;

