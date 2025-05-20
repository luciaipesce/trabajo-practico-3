// Importa el componente visual de la lista de álbumes
import AlbumList from "./component";
// Importa la función connect de react-redux para conectar el componente al store
import { connect } from "react-redux";
// Importa la función uniqBy de lodash para eliminar duplicados basados en una clave
import uniqBy from "lodash/uniqBy";

// Esta función transforma el estado global de Redux en props para el componente
// Redux es una librería de gestión de estado para aplicaciones JavaScript. Lo que hace es permitirnos tener un único lugar donde almacenar el estado de toda la aplicación, y luego conectar diferentes partes de la aplicación a ese estado. Esto facilita la gestión y actualización del estado de manera predecible y eficiente.
const mapStateToProps = state => {
  // Si hay canciones en el estado, se filtran para obtener solo un álbum por nombre
  const albumSongs = state.songsReducer.songs
    ? uniqBy(state.songsReducer.songs, item => item.track.album.name)
    : "";

  // Devuelve un objeto que será pasado como props al componente AlbumList
  return {
    songs: albumSongs
  };
};

// Conecta el componente AlbumList al store de Redux con las props que definimos
export default connect(mapStateToProps)(AlbumList);

