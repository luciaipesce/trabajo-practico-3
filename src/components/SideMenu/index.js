// Importa el componente principal del menú lateral
import SideMenu from "./component";

// Importa funciones necesarias para conectar con Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Importa las acciones que se pueden despachar desde el menú lateral
import { fetchSongs, fetchRecentlyPlayed, updateViewType } from '../../actions/songActions';
import { fetchAlbums } from '../../actions/albumActions';
import { fetchArtists } from '../../actions/artistActions';
import { fetchFeatured } from '../../actions/browseActions';
import { updateHeaderTitle } from '../../actions/uiActions';

// Mapea el estado global de Redux a las props que necesita el componente
const mapStateToProps = (state) => {
  return {
    // ID del usuario si está disponible
    userId: state.userReducer.user ? state.userReducer.user.id : '',
    
    // Token de autenticación de Spotify si está disponible
    token: state.tokenReducer.token ? state.tokenReducer.token : '',
    
    // Lista de IDs de artistas almacenada en el estado
    artistIds: state.artistsReducer.artistIds,
    
    // Título actual mostrado en el encabezado
    title: state.uiReducer.title
  };
};

// Mapea las funciones (acciones) que se pueden despachar desde este componente
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchRecentlyPlayed,   // Acción para traer canciones reproducidas recientemente
    fetchSongs,            // Acción para traer canciones guardadas
    fetchAlbums,           // Acción para traer álbumes
    fetchArtists,          // Acción para traer artistas
    fetchFeatured,         // Acción para traer playlists destacadas
    updateViewType,        // Acción para actualizar la vista activa
    updateHeaderTitle,     // Acción para actualizar el título del encabezado
  }, dispatch);
};

// Conecta el componente SideMenu con el estado y las acciones de Redux
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
