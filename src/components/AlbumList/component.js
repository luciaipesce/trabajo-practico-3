// Importa React para poder usar JSX
import React from "react";
// Importa PropTypes para validar los tipos de las props
import PropTypes from "prop-types";
// Importa los estilos CSS del componente
import "./AlbumList.css";

// Componente funcional que muestra una lista de álbumes
const AlbumList = ({ songs, audioControl }) => {
  // Función que recorre el array de canciones y genera los elementos de la lista
  const renderAlbums = () => {
    return songs.map((song, i) => {
      return (
        <li
          // Al hacer clic en un álbum, se llama a la función que controla el audio
          onClick={() => {
            audioControl(song);
          }}
          className="album-item" // Clase para los estilos
          key={i} // Clave única para cada elemento
        >
          <div>
            <div className="album-image">
              {/* Muestra la imagen del álbum */}
              <img alt="album" src={song.track.album.images[0].url} />
              {/* Ícono de reproducir que aparece al pasar el mouse */}
              <div className="play-song">
                <i
                  className="fa fa-play-circle-o play-btn"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Muestra el nombre del álbum y el artista */}
            <div className="album-details">
              <p className="album-name">{song.track.album.name}</p>
              <p className="artist-name">{song.track.album.artists[0].name}</p>
            </div>
          </div>
        </li>
      );
    });
  };

  // Renderiza la lista completa de álbumes
  return <ul className="album-view-container">{renderAlbums()}</ul>;
};

// Validación de tipos de las props
AlbumList.propTypes = {
  songs: PropTypes.array,         // Lista de canciones
  audioControl: PropTypes.func    // Función para controlar el audio
};

// Exporta el componente para usarlo en otras partes de la app
export default AlbumList;

