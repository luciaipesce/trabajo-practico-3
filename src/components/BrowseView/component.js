import React from 'react';
import PropTypes from 'prop-types';
import './BrowseView.css';

// Componente funcional que muestra una lista de categorías o playlists según el tipo de vista
const BrowseView = ({ view, viewType, token, fetchPlaylistSongs, updateHeaderTitle, addPlaylistItem }) => {
  let browseView;

  // Si hay contenido en "view", se genera la vista de elementos
  if (view) {
    browseView = view.map((item, i) => {

      // Función que se ejecuta al hacer clic sobre una playlist destacada
      const getPlaylistSongs = () => {
        addPlaylistItem(item);                           // Agrega el ítem al estado
        fetchPlaylistSongs(item.owner.id, item.id, token); // Trae las canciones de la playlist
        updateHeaderTitle(item.name);                    // Actualiza el título del encabezado con el nombre de la playlist
      };

      return (
        // Si el tipo de vista es "Featured", permite hacer clic para ver las canciones de la playlist
        <li 
          onClick={viewType === 'Featured' ? getPlaylistSongs : null} 
          className='category-item' 
          key={i}
        >
          <div className='category-image'>
            {/* Muestra la imagen de la categoría o playlist */}
            <img alt="category" src={item.icons ? item.icons[0].url : item.images[0].url} />
            
            {/* Si el tipo de vista es "Genres", muestra el nombre de la categoría */}
            {viewType === 'Genres' && (
              <p className='category-name'>{item.name}</p>
            )}
          </div>
        </li>
      );
    });
  }

  // Devuelve el listado renderizado
  return (
    <ul className='browse-view-container'>
      {browseView}
    </ul>
  );
};

// Validación de tipos de props recibidos por el componente
BrowseView.propTypes = {
  view: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  viewType: PropTypes.string,             // Indica si es una vista de "Featured" o "Genres"
  token: PropTypes.string,                // Token de autenticación de Spotify
  fetchPlaylistSongs: PropTypes.func,     // Función para obtener las canciones de una playlist
  updateHeaderTitle: PropTypes.func,      // Función para actualizar el título de la vista
  addPlaylistItem: PropTypes.func         // Función para agregar un ítem de playlist al estado
};

export default BrowseView;

