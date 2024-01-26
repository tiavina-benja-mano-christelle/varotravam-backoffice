import React, { useEffect, useState, createRef } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CTooltip, CPagination, CPaginationItem, CFormLabel } from '@coreui/react'
import CouleurService from 'src/services/couleurService'
import {
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilSettings } from '@coreui/icons'

const Couleur = () => {
  const [page, setPage] = useState(0);
  const [nbPage, setNbPage] = useState(0);
  const [id, setId] = useState(0);
  const [couleur, setCouleur] = useState('');
  const [couleurRGB, setCouleurRGB] = useState('');
  const [couleurs, setCouleurs] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData=()=>{
    CouleurService.page(page)
      .then(result => setCouleurs(result.data))
      .catch(error => alert(error));
    CouleurService.nbPage()
      .then(result => setNbPage(result.data))
      .catch(error => alert(error));
  }

  const handleChange=(event)=>{
    setCouleur(event.target.value);
  }

  const handleChangeRGB=(event)=>{
    setCouleurRGB(event.target.value);
  }

  const handleDelete = (id_p) => {
    CouleurService.delete(id_p)
    .then(result => {
      if (result.success) {
        setModalDelete(0);
        fetchData();
      }
      else alert(result.error);
    })
    .catch(error => alert(error));
  }

  const handleClickUpdate=(id_p, nom, valeur)=>{
    if (id === id_p) {
      setUpdating(false);
      setId(0);
      setCouleur('');
      setCouleurRGB('');
    } else {
      setUpdating(true);
      setId(id_p);
      setCouleur(nom);
      setCouleurRGB(valeur);
    }
  }

  const handleClick=()=>{
    if (updating) {
      CouleurService.update(id, couleur, couleurRGB)
      .then(result => {
        if (result.success) {
          setCouleur('');
          setUpdating(false);
          fetchData();
        } else {
          alert(result.error);
        }
      })
      .catch(error => alert(error));
    } else {
      CouleurService.add(couleur, couleurRGB)
      .then(result => {
        if (result.success) {
          setCouleur('');
          fetchData();
        } else {
          alert(result.error)
        }
      })
      .catch(error => alert(error));
    }
  }

  const handleChangePage = (page_p)=>{
    setPage(page_p)
    CouleurService.page(page_p)
      .then(result => setCouleurs(result.data))
      .catch(error => alert(error));
  }

  return (
    <>
      <CRow>
        <CCol xs={4}>
          <CCard className="mb-4">
            <CCardHeader>Ajout d'une nouvelle couleur</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  <CCardBody>
                    <CFormLabel htmlFor="couleur-input">Couleurs</CFormLabel>
                    <CFormInput id='couleur-input' placeholder="Nouvelle couleur" aria-label="Couleur" value={couleur} onChange={handleChange}/>
                    
                    <CFormLabel htmlFor="couleur-input">RGB</CFormLabel>
                    <CFormInput type='color' id='couleur-input' style={{ width: "100%" }}placeholder="Nouvelle couleur" aria-label="Couleur" value={couleurRGB} onChange={handleChangeRGB}/>
                    <CRow className="align-items-center mt-3">
                      <CCol>
                        <CButton color={updating ? "warning" : "primary"} active={true} onClick={()=>handleClick()} style={{width:'100%'}}>
                          {updating ? "Mettre à jour" : "Ajouter"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCol>
              </CRow>
            </CCardBody>
            
          </CCard>

        </CCol>
        <CCol xs={8}>
          <CCard className="mb-4" >
            <CCardHeader>Listes des couleurs</CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem active>Couleur de voiture</CListGroupItem>
                {couleurs.map((couleur, index)=>
                <CListGroupItem key={index}>
                  <CRow>
                    <CCol xs={3} style={{marginTop:'10px'}}>{couleur.nom}</CCol>
                    <CCol xs={7} style={{marginTop:'10px'}}>
                      <div style={{padding: '10px', background: couleur.valeur}}></div>
                    </CCol>
                    <CCol xs={2}>
                    <CTooltip
                      content="Mettre à jour"
                    >
                      <CButton color="info" active={true} onClick={()=>handleClickUpdate(couleur.id, couleur.nom, couleur.valeur)}><CIcon icon={cilSettings} /></CButton>
                    </CTooltip>
                    <CTooltip
                      content="supprimer"
                    >
                      <CButton color="danger" active={true} onClick={()=>setModalDelete(couleur.id)}><CIcon icon={cilDelete}/></CButton>
                    </CTooltip>
                    </CCol>
                    <CModal visible={modalDelete==couleur.id} onClose={() => setModalDelete(0)}>
                      <CModalHeader>
                        <CModalTitle>Confirmation de suppression</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        Vous êtes sur le point de supprimer la couleur "<strong>{couleur.nom}</strong>"<br />
                        Aucun retour en arrière n'est possible.<br />
                        Êtes-vous sûr de vouloir supprimer "<strong>{couleur.nom}</strong>" pour toujours<br />
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setModalDelete(0)}>
                          Close
                        </CButton>
                        <CButton color="danger" onClick={()=> handleDelete(couleur.id)}>Supprimer</CButton>
                      </CModalFooter>
                    </CModal>
                  </CRow>
                </CListGroupItem>
                )}
                <CPagination aria-label="Page navigation example" className="justify-content-center" >
                  <CPaginationItem onClick={()=>handleChangePage(page - 1)} disabled={page === 0} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </CPaginationItem>
                  {Array.from({length: nbPage+1}, (_, index)=>(
                    <CPaginationItem active={index === page} key={index} onClick={()=>handleChangePage(index)}>{index+1}</CPaginationItem>
                  ))}
                  <CPaginationItem onClick={()=>handleChangePage(page + 1)} disabled={page === nbPage}>
                    <span aria-hidden="true">&raquo;</span>
                  </CPaginationItem>
                </CPagination>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
      
    </>
  )
}
export default Couleur
