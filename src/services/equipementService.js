import { BACKEND_URL } from "../others/URL";

const BASE = BACKEND_URL + "/api/v1/equipements";

const EquipementService = {
  all: async () => {
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
  page: async (page) => {
    try {
      const response = await fetch(BASE + "/" + page, {
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
  nbPage: async () => {
    try {
      const response = await fetch(BASE + "/pages" , {
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
  add: async (nom) => {
    try {
      const response = await fetch(BASE, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: JSON.stringify({"nom": nom})
      });
      if (response.ok) {
        return {success: true};
      } else {
        const errorData = await response.json();
        return {success: false, error: errorData.error}
      } 
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return {success: false, error: error};
    }
  },
  delete: async (id) => {
    try {
      const response = await fetch(BASE, {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: JSON.stringify({"id": id})
      });
      if (response.ok) {
        return {success: true};
      } else {
        const errorData = await response.json();
        return {success: false, error: errorData.error}
      } 
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return {success: false, error: error};
    }
  },
  update: async (id, nom) => {
    try {
      const response = await fetch(BASE, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: JSON.stringify({"id": id, "nom": nom})
      });
      if (response.ok) {
        return {success: true};
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
export default EquipementService;
  