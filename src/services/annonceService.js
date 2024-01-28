import { BACKEND_URL } from "../others/URL"
import AuthService from "./authService";

const BASE = BACKEND_URL + "/api/v1/annonces";
const EN_ATTENTE = BASE + "/en-attente";
const VALIDATE = BASE + "/validate";
const REFUSED = BASE + "/refuse";


const AnnonceService = {
    annonceEnAttente: async () => {
        try {
            const response = await fetch(EN_ATTENTE, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            });
            if (response.ok) {
                const result = await response.json();
                return {success: true, data: result.data};
            } else if (response.status === 401){
                AuthService.deconnection();
                return {success: false, error: "Non autorisé"}
            } else {
                const errorData = await response.json();
                return {success: false, error: errorData.error}
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return {success: false, error: error};
        }
    },
    detailAnnonce: async (annonceId) => {
        try {
            const response = await fetch(BASE + "/" + annonceId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            });
            if (response.ok) {
                const result = await response.json();
                return {success: true, data: result.data};
            } else if (response.status === 401){
                return {success: false, error: "Non autorisé"}
            } else {
                const errorData = await response.json();
                return {success: false, error: errorData.error}
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return {success: false, error: error};
        }
    },
    validationAnnonce: async (annonceId) => {
        try {
            const response = await fetch(VALIDATE, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify({id: annonceId})
            });
            if (response.ok) {
                return {success: true};
            } else if (response.status === 401){
                AuthService.deconnection();
                return {success: false, error: "Non autorisé"}
            } else {
                const errorData = await response.json();
                return {success: false, error: errorData.error}
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return {success: false, error: error};
        }
    },
    refuseAnnonce: async (id, observation) => {
        try {
            const response = await fetch(REFUSED, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify({id, observation})
            });
            if (response.ok) {
                return {success: true};
            } else if (response.status === 401){
                AuthService.deconnection();
                return {success: false, error: "Non autorisé"}
            } else {
                const errorData = await response.json();
                return {success: false, error: errorData.error}
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return {success: false, error: error};
        }
    }
}
export default AnnonceService;