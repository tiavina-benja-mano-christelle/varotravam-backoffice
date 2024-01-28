import { CButton, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnnonceService from 'src/services/annonceService';
import '../../assets/css/DetailsVoiture.css';


function DetailsVoiture() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [observation, setObservation] = useState('');
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

  const handleValidate=()=>{
    AnnonceService.validationAnnonce(id)
    .then(result => {
      if(result.success) {
        navigate("/voiture/attente");
      }
    })
    .catch(error => console.log(error));
  }

  const handleRefuse=()=>{
    AnnonceService.refuseAnnonce(id, observation)
    .then(result => {
      if(result.success) {
        navigate("/voiture/attente");
      }
    })
    .catch(error => console.log(error));
  }

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
                <p className="type-model">{data.vehicule.puissance} CV</p>
              </div>
              <div className="details-model">
                <p className="head-model">Consommation</p>
                <p className="type-model">{data.vehicule.consommation} L/100Km</p>
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
              <CButton onClick={()=>handleValidate()} className="contacter" color='success'>Valider</CButton>
            </div>
            <div className="contact">
              <span className="prix">
                <CFormTextarea onChange={()=>setObservation(event.target.value)}/>
              </span>
              <a onClick={()=>handleRefuse()} className="refuser" color='danger'>Refuser</a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default DetailsVoiture;

