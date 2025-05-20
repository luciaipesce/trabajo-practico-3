// Importamos React y validadores de tipos
import React from "react";
import PropTypes from "prop-types";

// Importamos los componentes que se mostrarán según el título actual del encabezado
import SongList from "../SongList";
import AlbumList from "../AlbumList";
import ArtistList from "../ArtistList";
import BrowseView from "../BrowseView";

// Componente funcional que muestra diferentes vistas según el título actual
const MainView = ({ headerTitle, audioControl, resumeSong, pauseSong }) => {
  return (
    <React.Fragment>
      {/* Si el título del encabezado es "Albums", se muestra la lista de álbumes */}
      {headerTitle === "Albums" ? (
        <AlbumList audioControl={audioControl} />

      // Si el título es "Artists", se muestra la lista de artistas
      ) : headerTitle === "Artists" ? (
        <ArtistList />

      // Si el título es "Browse", se muestra la vista de exploración (categorías, lanzamientos, destacados)
      ) : headerTitle === "Browse" ? (
        <BrowseView />

      // Si no es ninguno de los anteriores, se muestra por defecto la lista de canciones
      ) : (
        <SongList
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      )}
    </React.Fragment>
  );
};

// Validación de los props que recibe el componente
MainView.propTypes = {
  headerTitle: PropTypes.string,         // Título actual del encabezado
  audioControl: PropTypes.func,          // Función para reproducir una canción
  resumeSong: PropTypes.func,            // Función para reanudar una canción
  pauseSong: PropTypes.func              // Función para pausar una canción
};

// Exportamos el componente para poder usarlo en otras partes de la app
export default MainView;
