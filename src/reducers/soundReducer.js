// soundReducer.js es un reducer que administra el nivel de volumen global de la aplicación.
// Solo tiene una propiedad en su estado: `volume`, que representa el volumen actual del reproductor (0 a 100).

export const soundReducer = (state = { volume: 100 }, action) => {
  switch (action.type) {
    // Actualiza el volumen cuando se dispara la acción UPDATE_VOLUME
    case "UPDATE_VOLUME":
      return {
        volume: action.volume
      };

    // Si la acción no coincide, devuelve el estado actual sin cambios
    default:
      return state;
  }
};

export default soundReducer;

