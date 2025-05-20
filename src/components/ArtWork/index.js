// Importa el componente de control de canciones
import SongControls from "./component";

// Importa la función connect de React Redux para conectar el componente al store
import { connect } from "react-redux";

// Define cómo se transformará el estado global en props para el componente
const mapStateToProps = state => {
  return {
    // Si existe información de la canción actual, se obtiene la URL de la imagen del álbum,
    // si no existe, se asigna un string vacío para evitar errores.
    albumImage: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.album.images[0].url
      : ""
  };
};

// Conecta el componente SongControls con Redux usando las props definidas arriba
export default connect(mapStateToProps)(SongControls);

