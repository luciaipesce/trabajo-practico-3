// uiActions.js es un archivo que contiene las acciones relacionadas con la interfaz de usuario (UI) en la aplicación.
// Estas acciones son utilizadas para manejar el estado de la UI, como el título del encabezado y la visibilidad de los modales.

// Acción para actualizar el título que se muestra en el encabezado de la aplicación
export const updateHeaderTitle = (title) => ({
  type: 'UPDATE_HEADER_TITLE', // Tipo de acción que indica una actualización del título
  title // Nuevo título que se desea mostrar
});

