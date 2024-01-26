import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnnonceService from 'src/services/annonceService';
import '../../assets/css/DetailsVoiture.css';


function DetailsVoiture() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData=()=>{
    AnnonceService.detailAnnonce(id)
    .then(result => {
      if(result.success) setData(result.data);
    })
  }

  // const data = {
  //   marque: "Mercedes", modele: "C63", kilometrage: "20 000km", puissance: "300 CV", place: 5,
  //   porte: 4, consommation: "8 L/100km", etat_vehicule: "9", transmission: "9",
  //   energie: "Essence", categorie: "Sedan", freinage: "7", couleur: "Noir",
  //   equipements: "Climatisation, GPS, Caméra de recul", images: '',
  //   annonce_id: 1, prix_initial: 25000, date_publication: "2024-01-12", date_fermeture: "2024-02-12",
  //   etat_annonce: "Disponible", description: "Une superbe voiture Mercedes-Benz C63 de l'année 2017 en excellent état.",
  //   utilisateur_id: 1
  // };
  if (data == null) return (<h1>Annonce not found</h1>);
  else {
    return (
      <div className="container">
        <div className="details-annonces-container py-4">
          <div className="images">
            <div className="image">
            </div>
            <div className="autreImage">
              {data.vehicule.images.map((image, index) => 
                <img src={`${image}?alt=media`} key={index} className="img"/>
              )}
            </div>
            <br />
            <div className="voiture-etat">
              <div className="details-etat">
                <div>Etat du vehicule</div>
                <progress max="10" value={data.vehicule.etat}></progress>
              </div>
              {/* <div className="details-etat">
                <div>Etat du frein</div>
                <progress max="10" value={data.freinage}></progress>
              </div>
              <div className="details-etat">
                <div>Etat du transmission</div>
                <progress max="10" value={data.transmission}></progress>
              </div> */}
            </div>
          </div>

          <div className="descriptions">
            <div className="description">
              <p className="titre">{data.vehicule.marque} {data.vehicule.modele}</p>
              <span className="vendeur"> {data.datePublication}</span>
            </div>

            <div className="model">
              <div className="details-model">
                <p className="head-model">Puissance</p>
                <p className="type-model">{data.vehicule.puissance}</p>
              </div>
              <div className="details-model">
                <p className="head-model">Consommation</p>
                <p className="type-model">{data.vehicule.consommation}</p>
              </div>
            </div>

          <div className="table-description">
            <div className="ligne">
              <span className="col1">Transmission</span>
              <span className="col2">{data.vehicule.transmission}</span>
            </div>
            <div className="ligne">
              <span className="col1">Énergie</span>
              <span className="col2">{data.vehicule.energie}</span>
            </div>
            <div className="ligne">
              <span className="col1">Categorie</span>
              <span className="col2">{data.vehicule.categorie}</span>
            </div>
            <div className="ligne">
              <span className="col1">Freinage</span>
              <span className="col2">{data.vehicule.freinage}</span>
            </div>
            <div className="ligne">
              <span className="col1">Couleur</span>
              <span className="col2">{data.vehicule.couleur}</span>
            </div>
            <div className="ligne">
              <span className="col1">Nombre de Places</span>
              <span className="col2">{data.vehicule.place}</span>
            </div>
            <div className="ligne">
              <span className="col1">Nombre de Portes</span>
              <span className="col2">{data.vehicule.porte}</span>
            </div>
          </div>

            <div className="contact">
              <span className="prix">{data.prixInitial.toLocaleString()} Ariary</span>
              <a href="#" className="contacter">Valider</a>
            </div>
            <div className="contact">
              <span className="prix"></span>
              <a href="#" className="refuser">Refuser</a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default DetailsVoiture;

