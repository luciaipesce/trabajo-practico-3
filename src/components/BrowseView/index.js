// Importa el componente que se va a conectar a Redux
import BrowseView from "./component";
// Importa funciones para conectar el componente con Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Importa las acciones necesarias desde los distintos archivos de acciones
import {
  fetchPlaylistSongs,  // Trae las canciones de una playlist específica
  addPlaylistItem       // Agrega una playlist al estado global
} from "../../actions/playlistActions";

import { updateHeaderTitle } from "../../actions/uiActions"; // Actualiza el título del encabezado

// Extrae los datos necesarios del estado global de Redux y los pasa como props al componente
const mapStateToProps = state => {
  return {
    view: state.browseReducer.view,               // Contenido a mostrar (categorías o playlists)
    viewType: state.songsReducer.viewType,        // Tipo de vista: "Featured" o "Genres"
    token: state.tokenReducer.token               // Token de autenticación de Spotify
  };
};

// Mapea las acciones para que estén disponibles como props del componente
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPlaylistSongs,    // Función para obtener canciones
      updateHeaderTitle,     // Función para actualizar el encabezado
      addPlaylistItem        // Función para agregar una playlist seleccionada
    },
    dispatch
  );
};

// Conecta el componente BrowseView al store de Redux y exporta la versión conectada
export default connect(mapStateToProps, mapDispatchToProps)(BrowseView);

