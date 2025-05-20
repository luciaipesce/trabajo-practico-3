// Importa el componente SongControls
import SongControls from "./component";

// Importa connect de react-redux para conectar el componente al store de Redux
import { connect } from "react-redux";

// Importa bindActionCreators para vincular acciones con dispatch
import { bindActionCreators } from "redux";

// Importa la acción que permite aumentar el tiempo de reproducción
import { increaseSongTime } from "../../actions/songActions";

const mapStateToProps = state => {
  return {
    // Obtiene el nombre de la canción actual desde el estado
    songName: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.name
      : "",

    // Obtiene el nombre del artista de la canción actual
    artistName: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.artists[0].name
      : "",

    // Indica si hay una canción reproduciéndose
    songPlaying: state.songsReducer.songPlaying,

    // Tiempo transcurrido de la canción actual
    timeElapsed: state.songsReducer.timeElapsed,

    // Indica si la canción está pausada
    songPaused: state.songsReducer.songPaused,

    // Detalles completos de la canción actual
    songDetails: state.songsReducer.songDetails,

    // Lista de canciones cargadas
    songs: state.songsReducer.songs
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // Acción para incrementar el tiempo de reproducción
      increaseSongTime
    },
    dispatch
  );
};

// Conecta el componente SongControls con Redux usando las props definidas
export default connect(mapStateToProps, mapDispatchToProps)(SongControls);
