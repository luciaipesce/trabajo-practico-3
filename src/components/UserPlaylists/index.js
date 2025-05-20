// Importa el componente UserPlaylists y las funciones necesarias de React y Redux
import UserPlaylists from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Importa las acciones que se utilizarán
import {
	fetchPlaylistsMenu,
	fetchPlaylistSongs
} from '../../actions/playlistActions';
import { updateHeaderTitle } from '../../actions/uiActions';

// Esta función toma el estado global y lo convierte en props para el componente
const mapStateToProps = (state) => {
	return {
		// Obtiene el ID del usuario si está definido
		userId: state.userReducer.user ? state.userReducer.user.id : '',
		// Obtiene las listas de reproducción del menú, si existen
		playlistMenu: state.playlistReducer.playlistMenu ? state.playlistReducer.playlistMenu : '',
		// Obtiene el token de acceso para hacer solicitudes a la API
		token: state.tokenReducer.token ? state.tokenReducer.token : '',
		// Obtiene el título actual del encabezado
		title: state.uiReducer.title
	};
};

// Esta función vincula las acciones para que puedan ser llamadas directamente desde props
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		fetchPlaylistsMenu,     // Acción para obtener las listas de reproducción del usuario
		fetchPlaylistSongs,     // Acción para obtener las canciones de una lista
		updateHeaderTitle       // Acción para actualizar el título del encabezado
	}, dispatch);
};

// Conecta el componente UserPlaylists al store de Redux
export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylists);
