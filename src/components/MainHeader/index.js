// Importamos el componente de presentación
import MainHeader from "./component";

// Funciones de Redux para conectar el componente al estado y acciones
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Importamos las acciones que se van a usar en el header
import {
  fetchCategories,
  fetchNewReleases,
  fetchFeatured
} from "../../actions/browseActions";

import { updateHeaderTitle } from "../../actions/uiActions";
import { updateViewType } from "../../actions/songActions";

// Función que toma el estado global y lo transforma en props para el componente
const mapStateToProps = state => {
  return {
    // Estado de reproducción (si está pausada o no)
    songPaused: state.songsReducer.songPaused,

    // Título actual del encabezado (puede ser 'Albums', 'Browse', etc.)
    headerTitle: state.uiReducer.title,

    // Tipo de vista actual (por ejemplo, 'playlist', 'Genres', etc.)
    viewType: state.songsReducer.viewType,

    // Lista de playlists cargadas en el estado
    playlists: state.playlistReducer.playlists,

    // Lista de artistas (si existe artistList en el reducer)
    artists: state.artistsReducer.artistList
      ? state.artistsReducer.artistList.artists
      : [],

    // Token de autenticación para acceder a la API de Spotify
    token: state.tokenReducer.token
  };
};

// Función que convierte las acciones en props para que el componente pueda dispararlas
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCategories,        // Acción para obtener géneros
      fetchNewReleases,       // Acción para obtener nuevos lanzamientos
      updateHeaderTitle,      // Acción para actualizar el título del header
      updateViewType,         // Acción para cambiar el tipo de vista
      fetchFeatured           // Acción para obtener playlists destacadas
    },
    dispatch
  );
};

// Conectamos el componente MainHeader con Redux
export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);

