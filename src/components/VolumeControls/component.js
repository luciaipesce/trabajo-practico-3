// Importa React y Component para crear un componente de clase
import React, { Component } from "react";
// Importa PropTypes para validar las propiedades
import PropTypes from "prop-types";
// Importa los estilos CSS asociados al componente
import "./VolumeControls.css";

// Define el componente de clase VolumeControls
class VolumeControls extends Component {
  constructor(props) {
    super(props);
    // Estado local que guarda el volumen actual
    this.state = {
      volume: props.volume // El volumen inicial viene desde las props
    };
  }

  // Método que se llama cuando el usuario mueve el control de volumen
  updateVolume = e => {
    // Actualiza el estado con el nuevo valor del volumen
    this.setState({
      volume: e.target.value
    });

    // Redondea el valor del volumen al múltiplo de 10 más cercano
    // y lo pasa al método updateVolume recibido por props
    this.props.updateVolume(Math.ceil(e.target.value / 10) * 10);
  };

  // Renderiza el componente visual
  render() {
    return (
      <div className="volume-container">
        {/* Ícono de volumen */}
        <i className="fa fa-volume-up" aria-hidden="true" />
        {/* Input tipo rango (slider) para ajustar el volumen */}
        <input
          className="volume"
          type="range"
          min={0}                  // Mínimo: 0
          max={100}                // Máximo: 100
          value={this.state.volume} // Valor actual del slider
          onChange={this.updateVolume} // Maneja el cambio de valor
        />
      </div>
    );
  }
}

// Validación de tipos de propiedades que recibe el componente
VolumeControls.propTypes = {
  volume: PropTypes.number,           // El volumen actual (número)
  updateVolume: PropTypes.func        // Función para actualizar el volumen
};

// Exporta el componente para ser usado en otros archivos
export default VolumeControls;
