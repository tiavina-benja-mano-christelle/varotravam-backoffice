import { BACKEND_URL } from "../others/URL";

const URL_MAPPING = {
    LOG_IN: "/authentification/administrateur"
} 


const AuthService = {
    connection: async (nom, motDePasse) => {
      try {
        const response = await fetch(BACKEND_URL + URL_MAPPING.LOG_IN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nom, motDePasse }),
        });
  
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('accessToken', data.data);
          return {success: true};
        } else if (response.status === 401){
          const errorData = await response.json();
          return {success: false, error: errorData.error}
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        return {success: false, error: error};
      }
    },
  
    deconnection: () => {
      localStorage.removeItem('accessToken');
    },
  
    estConnecte: () => {
      return !!localStorage.getItem('accessToken');
    },
  };
export default AuthService;
  