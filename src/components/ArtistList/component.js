import React from "react";
import PropTypes from "prop-types";
import "./ArtistList.css";

// Redux
import { connect } from "react-redux";
import { toggleFavoriteArtist } from "../../actions/favoriteActions";

const ArtistList = ({
  artists,
  fetchArtistSongs,
  token,
  updateHeaderTitle,
  favoriteArtists,
  toggleFavoriteArtist
}) => {
  // Verifica si un artista está en la lista de favoritos
  const isFavorito = (id) => favoriteArtists.includes(id);

  // Alterna el estado de favorito usando Redux
  const handleToggleFavorito = (e, id) => {
    e.stopPropagation(); // Evita que se dispare la acción de artista
    toggleFavoriteArtist(id);
  };

  // Al hacer clic en un artista, muestra sus canciones
  const artistSongsAction = (artist) => {
    fetchArtistSongs(artist.id, token);
    updateHeaderTitle(artist.name);
  };

  // Renderiza la lista principal de artistas
  const renderArtists = () => {
    return artists.map((artist, i) => {
      const favorito = isFavorito(artist.id);

      return (
        <li
          key={i}
          className="artist-item"
          onClick={() => artistSongsAction(artist)}
        >
          <a>
            <div>
              <div className="artist-image">
                {/* Ícono de favorito (corazón) */}
                <span
                  className={`material-symbols-outlined heart-icon ${favorito ? "favorito-activo" : ""}`}
                  onClick={(e) => handleToggleFavorito(e, artist.id)}
                >
                  favorite
                </span>

                <img
                  alt="artist"
                  src={artist.images[0] ? artist.images[0].url : ""}
                />
              </div>
              <div className="artist-details">
                <p>{artist.name}</p>
              </div>
            </div>
          </a>
        </li>
      );
    });
  };

  // Filtra los artistas que están marcados como favoritos
  const artistasFavoritos = artists.filter((artist) =>
    favoriteArtists.includes(artist.id)
  );

  return (
    <div className="artist-layout">
      {/* Lista principal de artistas */}
      <ul className="artist-view-container">
        {artists && renderArtists()}
      </ul>

      {/* Panel de favoritos a la derecha */}
      <div className="favoritos-panel">
        <h3>Favoritos</h3>
        <ul className="favoritos-lista">
          {artistasFavoritos.map((favArtist) => (
            <li
              key={favArtist.id}
              className="favorito-nombre"
              onClick={() => artistSongsAction(favArtist)}
            >
              {favArtist.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Validación de props
ArtistList.propTypes = {
  artists: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchArtistSongs: PropTypes.func,
  token: PropTypes.string,
  updateHeaderTitle: PropTypes.func,
  favoriteArtists: PropTypes.array,
  toggleFavoriteArtist: PropTypes.func
};

// Mapea el estado global a props
const mapStateToProps = (state) => ({
  favoriteArtists: state.favoriteArtists
});

// Mapea la acción a props
const mapDispatchToProps = {
  toggleFavoriteArtist
};

// Conecta el componente a Redux
export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);


