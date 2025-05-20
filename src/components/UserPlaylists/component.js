import React, { Component } from "react";
import PropTypes from "prop-types";
import "./UserPlaylists.css";

class UserPlaylists extends Component {

  // Cuando se reciben nuevas props, si hay userId y token, se piden las playlists del usuario
  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== "" && nextProps.token !== "") {
      this.props.fetchPlaylistsMenu(nextProps.userId, nextProps.token);
    }
  }

  // Función para renderizar la lista de playlists
  renderPlaylists() {
    return this.props.playlistMenu.map(playlist => {
      
      // Esta función se ejecuta al hacer clic en una playlist: carga sus canciones y actualiza el título
      const getPlaylistSongs = () => {
        this.props.fetchPlaylistSongs(
          playlist.owner.id,
          playlist.id,
          this.props.token
        );
        this.props.updateHeaderTitle(playlist.name);
      };

      return (
        <li
          onClick={getPlaylistSongs}
          className={
            this.props.title === playlist.name
              ? "active side-menu-item"  // Aplica estilo si es la playlist seleccionada
              : "side-menu-item"
          }
          key={playlist.id}
        >
          {playlist.name}
        </li>
      );
    });
  }

  // Renderiza el título y la lista de playlists (si existen)
  render() {
    return (
      <div className="user-playlist-container">
        <h3 className="user-playlist-header">Listas de Reproducción</h3>
        {this.props.playlistMenu && this.renderPlaylists()}
      </div>
    );
  }
}

// Validación de props esperadas
UserPlaylists.propTypes = {
  userId: PropTypes.string,                         // ID del usuario autenticado
  token: PropTypes.string,                          // Token de acceso de Spotify
  title: PropTypes.string,                          // Título del encabezado actual
  playlistMenu: PropTypes.oneOfType([               // Lista de playlists (puede ser string o array)
    PropTypes.string,
    PropTypes.array
  ]),
  fetchPlaylistsMenu: PropTypes.func,              // Acción para cargar playlists del usuario
  fetchPlaylistSongs: PropTypes.func,              // Acción para cargar canciones de una playlist
  updateHeaderTitle: PropTypes.func                // Acción para actualizar el título principal
};

export default UserPlaylists;
