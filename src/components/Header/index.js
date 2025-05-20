// Importa React para definir el componente
import React from "react";

// Importa componentes hijos que se muestran dentro del header
import UserDetails from "../UserDetails";     // Muestra los datos del usuario (nombre e imagen)
import TrackSearch from "../TrackSearch";     // Muestra la barra de búsqueda de canciones

// Importa los estilos del encabezado
import "./Header.css";

// Componente funcional Header
const Header = () => (
  <div className="header"> {/* Contenedor principal del encabezado */}
    <TrackSearch />        {/* Componente de búsqueda */}
    <UserDetails />        {/* Componente con los datos del usuario */}
  </div>
);

// Exporta el componente para que pueda usarse en otras partes de la aplicación
export default Header;
