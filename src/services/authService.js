import { BACKEND_URL } from "../others/URL";

const BASE = BACKEND_URL + "/authentification";
const ADMIN = BASE + "/administrateur";


const AuthService = {
    connection: async (nom, motDePasse) => {
      try {
        const response = await fetch(ADMIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode:'no-cors',
          body: JSON.stringify({nom, motDePasse})
        });
  
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('accessToken', data.tokens);
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
  