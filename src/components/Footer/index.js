// Importa React y PropTypes para definir el componente y validar props
import React from "react";
import PropTypes from "prop-types";

// Importa los controles de canción y volumen
import SongControls from "../SongControls";
import VolumeControls from "../VolumeControls";

// Importa los estilos CSS específicos del footer
import "./Footer.css";

// Componente funcional que representa el pie de página de la app (Footer)
// Contiene los controles de reproducción y volumen
const Footer = ({ stopSong, pauseSong, resumeSong, audioControl }) => (
  <div className="footer">
    {/* Componente de controles de reproducción */}
    <SongControls
      stopSong={stopSong}
      pauseSong={pauseSong}
      resumeSong={resumeSong}
      audioControl={audioControl}
    />
    {/* Componente de control de volumen */}
    <VolumeControls />
  </div>
);

// Define los tipos esperados para las propiedades del componente
Footer.propTypes = {
  stopSong: PropTypes.func,
  pauseSong: PropTypes.func,
  resumeSong: PropTypes.func,
  audioControl: PropTypes.func
};

// Exporta el componente para que pueda usarse en otros archivos
export default Footer;