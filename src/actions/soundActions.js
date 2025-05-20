// soundActions.js es un archivo que contiene las acciones relacionadas con el sonido en la aplicación.
// Estas acciones son utilizadas para manejar el estado del sonido, como el volumen y la reproducción de música.

// Acción para actualizar el volumen de la aplicación
export const updateVolume = (volume) => {
  return {
    type: 'UPDATE_VOLUME', // Tipo de acción que será manejada por el reducer correspondiente
    volume // Valor del volumen que se desea establecer (por ejemplo, entre 0 y 100)
  };
};

