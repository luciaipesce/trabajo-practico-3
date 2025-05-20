// Importa React y Component para crear un componente de clase
import React, { Component } from "react";
// Importa PropTypes para validación de props
import PropTypes from "prop-types";
// Importa los estilos CSS para este componente
import "./TrackSearch.css";

// Componente de clase TrackSearch
class TrackSearch extends Component {
  // Estado local: guarda el término de búsqueda que escribe el usuario
  state = {
    searchTerm: ""
  };

  // Actualiza el estado cada vez que el usuario escribe algo en el input
  updateSearchTerm = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    return (
      <div className="track-search-container">
        {/* Formulario de búsqueda */}
        <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.updateViewType("search");
          this.props.updateHeaderTitle("Artistas");
          this.props.searchArtists(this.state.searchTerm, this.props.token);
        }}
        >
          {/* Campo de texto para escribir la búsqueda */}
          <input
            onChange={this.updateSearchTerm}
            type="text"
            placeholder="Buscar Artista..."
          />
          {/* Botón de búsqueda (ícono de lupa) */}
          <button
          onClick={e => {
            e.preventDefault();
            this.props.updateViewType("search");
            this.props.updateHeaderTitle("Artistas");
            this.props.searchArtists(this.state.searchTerm, this.props.token);
          }}
          >
            <i className="fa fa-search search" aria-hidden="true" />
          </button>
        </form>
      </div>
    );
  }
}

// Validación de las props esperadas
TrackSearch.propTypes = {
  searchArtists: PropTypes.func,
  updateHeaderTitle: PropTypes.func,
  updateViewType: PropTypes.func,
  token: PropTypes.string
};

// Exporta el componente para ser usado en otros archivos
export default TrackSearch;
