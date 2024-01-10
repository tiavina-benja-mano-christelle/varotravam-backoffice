import { BACKEND_URL } from "../others/URL";

const URL_MAPPING = {
    BASE : "/api/v1/categories",
} 


const CategorieService = {
    tous: async () => {
      try {
        const response = await fetch(BACKEND_URL + URL_MAPPING.BASE, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
          },
        });
        if (response.ok) {
          const result = await response.json();
          return {success: true, data: result.data};
        } else if (response.status === 401){
          const errorData = await response.json();
          return {success: false, error: errorData.error}
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        return {success: false, error: error};
      }
    },
    ajouter: async (nom) => {
        try {
            const response = await fetch(BACKEND_URL + URL_MAPPING.BASE, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
              },
              body: JSON.stringify(nom)
            });
            if (response.ok) {
              const data = await response.json();
              return {success: true, data: data};
            } else {
              const errorData = await response.json();
              return {success: false, error: errorData.error}
            } 
          } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return {success: false, error: error};
          }
    }

  
  };
export default CategorieService;
  