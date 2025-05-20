// Importa el componente de presentación
import UserDetails from "./component";

// Importa la función connect para conectar el componente con el store de Redux
import { connect } from "react-redux";

// Función que mapea el estado global de Redux a las props del componente
const mapStateToProps = (state) => {
	return {
		// Obtiene el nombre visible del usuario si está definido en el estado
		displayName: state.userReducer.user ? state.userReducer.user.display_name : '',

		// Obtiene la URL de la imagen de perfil si existe
		userImage:
		state.userReducer.user &&
		Array.isArray(state.userReducer.user.images) &&
		state.userReducer.user.images.length > 0
			? state.userReducer.user.images[0].url
		: '',
	};
};

// Conecta el componente `UserDetails` al store de Redux y exporta el componente conectado
export default connect(mapStateToProps)(UserDetails);

