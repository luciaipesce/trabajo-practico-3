// Importa el componente visual de la lista de artistas
import ArtistList from "./component";

// Importa funciones necesarias de Redux para conectar el estado global
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Importa las acciones que se van a utilizar desde los reducers correspondientes
import { fetchArtistSongs } from "../../actions/artistActions";
import { updateHeaderTitle } from "../../actions/uiActions";

// Función que toma el estado global y lo transforma en props para el componente
const mapStateToProps = state => {
  return {
    // Si hay token guardado, lo pasa; si no, envía string vacío
    token: state.tokenReducer.token ? state.tokenReducer.token : "",
    
    // Si hay una lista de artistas, pasa la propiedad "artists" de esa lista; si no, string vacío
    artists: state.artistsReducer.artistList
      ? state.artistsReducer.artistList.artists
      : []
  };
};

// Función que agrupa y vincula las acciones a dispatch para poder usarlas como props
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchArtistSongs,     // Acción para obtener canciones de un artista
      updateHeaderTitle     // Acción para actualizar el encabezado con el nombre del artista
    },
    dispatch
  );
};

// Conecta el componente al store de Redux pasando las props de estado y acciones
export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
