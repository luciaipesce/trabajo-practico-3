import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./SongList.css";

class SongList extends Component {
  // Cuando se reciben nuevas props, chequea si debe volver a buscar canciones
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.token !== "" &&
      !nextProps.fetchSongsError &&
      nextProps.fetchSongsPending &&
      nextProps.viewType === "songs"
    ) {
      this.props.fetchSongs(nextProps.token);
    }
  }

  // Convierte milisegundos a formato mm:ss para mostrar la duración
  msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  // Renderiza cada canción en la lista
  renderSongs() {
    return this.props.songs.map((song, i) => {
      // Determina si se muestra el ícono de play o pause
      const buttonClass =
        song.track.id === this.props.songId && !this.props.songPaused
          ? "fa-pause-circle-o"
          : "fa-play-circle-o";

      return (
        <li
          className={
            song.track.id === this.props.songId
              ? "active user-song-item" // Marca la canción actual como activa
              : "user-song-item"
          }
          key={i}
        >
          {/* Al hacer click en el ícono de play/pause */}
          <div
            onClick={() => {
              song.track.id === this.props.songId &&
              this.props.songPlaying &&
              this.props.songPaused
                ? this.props.resumeSong() // Si está pausada, la reanuda
                : this.props.songPlaying &&
                  !this.props.songPaused &&
                  song.track.id === this.props.songId
                ? this.props.pauseSong() // Si está sonando, la pausa
                : this.props.audioControl(song); // Si es otra canción, la reproduce
            }}
            className="play-song"
          >
            <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
          </div>

          {/* Ícono + o ✓ para agregar a la biblioteca */}
          {this.props.viewType !== "songs" && (
            <p
              className="add-song"
              onClick={() => {
                this.props.addSongToLibrary(this.props.token, song.track.id);
              }}
            >
              {this.props.songAddedId === song.track.id ? (
                <i className="fa fa-check add-song" aria-hidden="true" />
              ) : (
                <i className="fa fa-plus add-song" aria-hidden="true" />
              )}
            </p>
          )}

          {/* Si ya es una canción agregada, muestra directamente el ✓ */}
          {this.props.viewType === "songs" && (
            <p className="add-song">
              <i className="fa fa-check" aria-hidden="true" />
            </p>
          )}

          {/* Título de la canción */}
          <div className="song-title">
            <p>{song.track.name}</p>
          </div>

          {/* Artista */}
          <div className="song-artist">
            <p>{song.track.artists[0].name}</p>
          </div>

          {/* Álbum */}
          <div className="song-album">
            <p>{song.track.album.name}</p>
          </div>

          {/* Fecha en que fue agregada a la biblioteca */}
          <div className="song-added">
            <p>{moment(song.added_at).format("YYYY-MM-DD")}</p>
          </div>

          {/* Duración */}
          <div className="song-length">
            <p>{this.msToMinutesAndSeconds(song.track.duration_ms)}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        {/* Encabezado de la tabla con nombres de columnas */}
        <div className="song-header-container">
          <div className="song-title-header">
            <p>Título</p>
          </div>
          <div className="song-artist-header">
            <p>Artista</p>
          </div>
          <div className="song-album-header">
            <p>Álbum</p>
          </div>
          <div className="song-added-header">
            <i className="fa fa-calendar-plus-o" aria-hidden="true" />
          </div>
          <div className="song-length-header">
            <p>
              <i className="fa fa-clock-o" aria-hidden="true" />
            </p>
          </div>
        </div>

        {/* Renderiza la lista de canciones si no hay errores ni carga pendiente */}
        {this.props.songs &&
          !this.props.fetchSongsPending &&
          !this.props.fetchPlaylistSongsPending &&
          this.renderSongs()}
      </div>
    );
  }
}

// Validación de tipos de props
SongList.propTypes = {
  viewType: PropTypes.string,
  token: PropTypes.string,
  songAddedId: PropTypes.string,
  songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchSongsError: PropTypes.bool,
  fetchSongsPending: PropTypes.bool,
  fetchPlaylistSongsPending: PropTypes.bool,
  fetchSongs: PropTypes.func,
  audioControl: PropTypes.func,
  songPaused: PropTypes.bool,
  songPlaying: PropTypes.bool,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func,
  addSongToLibrary: PropTypes.func,
};

export default SongList;
