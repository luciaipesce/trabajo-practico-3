// Importa el componente principal
import SongList from "./component";

// Importa funciones para conectar el componente a Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Importa las acciones necesarias
import { fetchSongs } from '../../actions/songActions';
import { addSongToLibrary } from '../../actions/userActions';

// Mapea el estado global de Redux a las props del componente
const mapStateToProps = (state) => {
  return {
    // Token de autenticación
    token: state.tokenReducer.token ? state.tokenReducer.token : '',

    // Lista de canciones obtenidas
    songs: state.songsReducer.songs ? state.songsReducer.songs : '',

    // Bandera que indica si hubo error al obtener canciones
    fetchSongsError: state.songsReducer.fetchSongsError,

    // Bandera que indica si se están obteniendo canciones
    fetchSongsPending: state.songsReducer.fetchSongsPending,

    // Bandera que indica si se están cargando canciones de una playlist
    fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,

    // Indica si hay una canción sonando
    songPlaying: state.songsReducer.songPlaying,

    // Indica si la canción está pausada
    songPaused: state.songsReducer.songPaused,

    // ID de la canción actualmente seleccionada
    songId: state.songsReducer.songId,

    // ID de la canción recientemente agregada a la biblioteca
    songAddedId: state.userReducer.songId || '',

    // Tipo de vista actual
    viewType: state.songsReducer.viewType,
  };
};

// Mapea las acciones a las props para poder llamarlas desde el componente
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchSongs,         // Acción para obtener canciones del usuario
    addSongToLibrary    // Acción para agregar canción a la biblioteca del usuario
  }, dispatch);
};

// Conecta el componente SongList al store de Redux
export default connect(mapStateToProps, mapDispatchToProps)(SongList);

