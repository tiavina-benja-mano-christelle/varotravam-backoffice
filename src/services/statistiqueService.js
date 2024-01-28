import { BACKEND_URL } from "../others/URL";
import AuthService from "./authService";

const BASE = BACKEND_URL + "/api/v1/stats";
const COMMISSION = BASE + "/commission";
const NB_ANNONCE_DISPONIBLE = BASE + "/nb-annonce-dispo";
const NB_INSCRIT_TOTAL = BASE + "/nb-utilisateur-inscrit";
const GRAPHE_NOUVELLE_ANNONCE = BASE + "/graphe-nouvelle-annonce";
const GRAPHE_ANNONCE_VENDUE = BASE + "/graphe-annonce-vendue";
const GRAPHE_UTILISATEUR = BASE + "/utilisateurs";
const MEILLEUR_MODELE_VENDUE = BASE + "/modeles";
const MEILLEUR_MARQUE_VENDUE = BASE + "/marques";
const MEILLEUR_MODELE_VENDUE_ONE = BASE + "/modele";
const MEILLEUR_MARQUE_VENDUE_ONE = BASE + "/marque";
const GRAPHE_CHIFFRE_AFFAIRE = BASE + "/graphe-chiffre-affaire";
const CHIFFRE_AFFAIRE = BASE + "/chiffre-affaire";

const StatistiqueService = {
    all: async() => {
        try {
            const response = await fetch(BASE, {
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
    commission: async() => {
        try {
            const response = await fetch(COMMISSION, {
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
    utilisateurs: async (annee) => {
        try {
            const response = await fetch(GRAPHE_UTILISATEUR + "?annee=" + annee, {
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
    nbAnnonceDisponible: async() => {
        try {
            const response = await fetch(NB_ANNONCE_DISPONIBLE, {
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
    nbInscritTotal: async() => {
        try {
            const response = await fetch(NB_INSCRIT_TOTAL, {
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
    grapheNouvelleAnnonce: async(annee) => {
        try {
            const response = await fetch(GRAPHE_NOUVELLE_ANNONCE + "?annee=" + annee, {
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
    grapheAnnonceVendue: async(annee) => {
        try {
            const response = await fetch(GRAPHE_ANNONCE_VENDUE + "?annee=" + annee, {
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
    meilleurModeleVendue: async(annee) => {
        try {
            const response = await fetch(MEILLEUR_MODELE_VENDUE + "?annee=" + annee, {
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
    meilleurMarqueVendue: async(annee) => {
        try {
            const response = await fetch(MEILLEUR_MARQUE_VENDUE + "?annee=" + annee, {
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
    
    meilleurModeleVendueOne: async() => {
        try {
            const response = await fetch(MEILLEUR_MODELE_VENDUE_ONE, {
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
    meilleurMarqueVendueOne: async() => {
        try {
            const response = await fetch(MEILLEUR_MARQUE_VENDUE_ONE, {
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
    grapheChiffreAffaire: async(annee) => {
        try {
            const response = await fetch(GRAPHE_CHIFFRE_AFFAIRE + "?annee=" + annee, {
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
    chiffreAffaire: async() => {
        try {
            const response = await fetch(CHIFFRE_AFFAIRE, {
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
    }
    
}
export default StatistiqueService;