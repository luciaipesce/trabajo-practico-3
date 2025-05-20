import React from "react";
import PropTypes from "prop-types";
import "./SideMenu.css";

// Componente funcional que representa el menú lateral de navegación
const SideMenu = ({
  updateHeaderTitle,    // Función para actualizar el título del encabezado
  updateViewType,       // Función para actualizar el tipo de vista
  fetchFeatured,        // Acción para traer listas destacadas
  fetchRecentlyPlayed,  // Acción para traer canciones reproducidas recientemente
  fetchSongs,           // Acción para traer canciones guardadas
  fetchAlbums,          // Acción para traer álbumes
  fetchArtists,         // Acción para traer artistas
  token,                // Token de autorización de Spotify
  title,                // Título actual del encabezado
  artistIds             // Lista de IDs de artistas
}) => {

  // Actualiza el título del encabezado y el tipo de vista
  const handleClick = name => {
    updateHeaderTitle(name);
    updateViewType(name);
  };

  // Acción especial al hacer clic en "Explorar"
  const handleBrowseClick = () => {
    updateHeaderTitle("Browse");            // Actualiza el título del header
    updateViewType("Featured");             // Cambia el tipo de vista
    fetchFeatured(token);                   // Llama a la API para obtener playlists destacadas
  };

  // Genera dinámicamente los ítems del menú a partir de un array
  const renderSideMenu = () => {
    const menu = [
      {
        name: "Recently Played",           // Nombre del ítem
        label: "Reproducido Recientemente",
        action: fetchRecentlyPlayed        // Acción asociada
      },
      {
        name: "Songs",
        label: "Canciones",
        action: fetchSongs
      },
      {
        name: "Albums",
        label: "Álbumes",
        action: fetchAlbums
      },
      {
        name: "Artists",
        label: "Artistas",
        action: fetchArtists,
        getArtists: true                   // Necesita pasar artistIds
      }
    ];

    // Mapea el array para renderizar cada ítem
    return menu.map(item => {
      return (
        <li
          key={item.name}
          className={
            title === item.name ? "active side-menu-item" : "side-menu-item"
          }
          onClick={() => {
            // Si necesita artistIds, se los pasa
            item.getArtists
              ? item.action(token, artistIds)
              : item.action(token);

            // Cambia el título y la vista
            handleClick(item.name);
          }}
        >
          {item.label}
        </li>
      );
    });
  };

  // Renderiza el menú completo
  return (
    <ul className="side-menu-container">
      {/* Ítem fijo: Explorar */}
      <li
        onClick={handleBrowseClick}
        className={
          title === "Browse" ? "active side-menu-item" : "side-menu-item"
        }
      >
        Explorar
      </li>

      {/* Ítem fijo: Radio (solo se muestra, no tiene acción asociada) */}
      <li className="side-menu-item radio">Radio</li>

      {/* Sección de biblioteca */}
      <h3 className="user-library-header">Tu Biblioteca</h3>

      {/* Resto de ítems del menú */}
      {renderSideMenu()}
    </ul>
  );
};

// Tipado de props para validación
SideMenu.propTypes = {
  updateHeaderTitle: PropTypes.func,
  updateViewType: PropTypes.func,
  fetchFeatured: PropTypes.func,
  fetchRecentlyPlayed: PropTypes.func,
  fetchSongs: PropTypes.func,
  fetchAlbums: PropTypes.func,
  fetchArtists: PropTypes.func,
  token: PropTypes.string,
  artistIds: PropTypes.string,
  title: PropTypes.string
};

export default SideMenu;
