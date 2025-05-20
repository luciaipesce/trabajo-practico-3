// Importa React y PropTypes para validación de props
import React from "react";
import PropTypes from "prop-types";
// Importa los estilos CSS específicos del componente
import "./UserDetails.css";

// Componente funcional que muestra los datos del usuario (imagen y nombre)
const UserDetails = ({ userImage, displayName }) => (
  <div className="user-details-container">
    {/* Imagen de perfil del usuario */}
    <img alt="user" className="user-image" src={userImage} />
    
    {/* Nombre del usuario */}
    <p className="user-name">{displayName}</p>
  </div>
);

// Validación de tipos de props esperadas
UserDetails.propTypes = {
  userImage: PropTypes.string, // URL de la imagen de perfil
  displayName: PropTypes.string // Nombre visible del usuario
};

// Exporta el componente para poder usarlo en otros archivos
export default UserDetails;

