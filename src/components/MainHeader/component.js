import React from 'react';
import PropTypes from 'prop-types';
import './MainHeader.css';
import '../SongList/SongList.css';

const TITLE_LABELS = {
  "Songs": "Canciones",
  "Albums": "Álbumes",
  "Artists": "Artistas",
  "Recently Played": "Reproducido Recientemente",
  "Browse": "Explorar"
};

// Componente principal del header dinámico
const MainHeader = ({
  pauseSong,
  resumeSong,
  fetchCategories,
  fetchNewReleases,
  fetchFeatured,
  updateHeaderTitle,
  updateViewType,
  songPaused,
  headerTitle,
  viewType,
  playlists,
  token,
  artists
}) => {
  // Variables para almacenar la playlist o artista actual según el tipo de vista
  let currentPlaylist;
  let currentArtist;

  // Si se está viendo una playlist, se busca la playlist activa por su nombre
  if (viewType === 'playlist') {
    currentPlaylist = playlists.filter(playlist => {
      return playlist.name === headerTitle;
    })[0];
  }

  // Si se está viendo un artista, se busca el artista activo por su nombre
  if (viewType === 'Artist' && artists.length > 0) {
    currentArtist = artists.filter(artist => {
      return artist.name === headerTitle;
    })[0];
  }

  return (
    <div className='section-title'>
      {/* Vista de Playlist */}
      {viewType === 'playlist' && (
        <div className='playlist-title-container'>
          <div className='playlist-image-container'>
            <img alt="playlist" className='playlist-image' src={currentPlaylist.images[0] ? currentPlaylist.images[0].url : null} />
          </div>
          <div className='playlist-info-container'>
            <p className='playlist-text'>LISTA DE REPRODUCCIÓN</p>
            <h3 className='header-title'>{TITLE_LABELS[headerTitle] || headerTitle}</h3>
            <p className='created-by'>
              Creado por: <span className='lighter-text'>{currentPlaylist.owner.display_name}</span> - {currentPlaylist.tracks.total} canciones
            </p>
            {/* Botón de reproducir o pausar */}
            <button
              onClick={!songPaused ? pauseSong : resumeSong}
              className='main-pause-play-btn'>
              {songPaused ? 'REPRODUCIR' : 'PAUSAR'}
            </button>
          </div>
        </div>
      )}

      {/* Vista de Artista */}
      {viewType === 'Artist' && currentArtist && (
        <div>
          {/* Botón para volver a la vista de búsqueda de artistas */}
          <button
            className="back-button"
            onClick={() => {
              updateHeaderTitle("Artists");
              updateViewType("Artists");
            }}
            title="Volver a Artistas"
          >
            <span className="material-symbols-outlined">arrow_circle_left</span>
          </button>
          <div className='current-artist-header-container'>
            <img alt="current-artist" className='current-artist-image' src={currentArtist.images[0].url} />
            <div className='current-artist-info'>
              <p>Artistas de tu Biblioteca</p>
              <h3>{currentArtist.name}</h3>
            </div>
          </div>
          <button
            onClick={!songPaused ? pauseSong : resumeSong}
            className='main-pause-play-btn artist-button'>
            {songPaused ? 'REPRODUCIR' : 'PAUSAR'}
          </button>
        </div>
      )}

      {/* Vistas generales como Canciones, Reproducidas Recientemente, Álbumes, Artistas */}
      {(headerTitle === 'Songs' ||
        headerTitle === 'Recently Played' ||
        headerTitle === 'Albums' ||
        headerTitle === 'Artists') && (
        <div>
          <h3 className='header-title'>{TITLE_LABELS[headerTitle] || headerTitle}</h3>
          {/* Solo en vistas con canciones se muestra el botón de reproducción */}
          {headerTitle !== 'Artists' && (
            <button
              onClick={!songPaused ? pauseSong : resumeSong}
              className='main-pause-play-btn'>
              {songPaused ? 'REPRODUCIR' : 'PAUSAR'}
            </button>
          )}
        </div>
      )}

      {/* Vista de Exploración: géneros, lanzamientos, destacados */}
      {(headerTitle === 'Browse') && (
        <div>
          <h3 className='header-title'>{TITLE_LABELS[headerTitle] || headerTitle}</h3>
          <div className='browse-headers'>
            {/* Opciones de navegación con estilos dinámicos */}
            <p
              className={viewType === 'Genres' ? 'active' : ''}
              onClick={() => {
                fetchCategories(token);
                updateViewType('Genres');
                updateHeaderTitle('Browse');
              }}
            >
              Géneros
            </p>
            <p
              className={viewType === 'New Releases' ? 'active' : ''}
              onClick={() => {
                fetchNewReleases(token);
                updateViewType('New Releases');
                updateHeaderTitle('Browse');
              }}
            >
              Nuevos Lanzamientos
            </p>
            <p
              className={viewType === 'Featured' ? 'active' : ''}
              onClick={() => {
                fetchFeatured(token);
                updateViewType('Featured');
                updateHeaderTitle('Browse');
              }}
            >
              Destacados
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Validación de tipos de props requeridos
MainHeader.propTypes = {
  pauseSong: PropTypes.func,
  resumeSong: PropTypes.func,
  fetchCategories: PropTypes.func,
  fetchNewReleases: PropTypes.func,
  fetchFeatured: PropTypes.func,
  updateHeaderTitle: PropTypes.func,
  updateViewType: PropTypes.func,
  songPaused: PropTypes.bool,
  headerTitle: PropTypes.string,
  viewType: PropTypes.string,
  playlists: PropTypes.array,
  playlistMenu: PropTypes.array,
  token: PropTypes.string,
  artists: PropTypes.array,
};

export default MainHeader;
