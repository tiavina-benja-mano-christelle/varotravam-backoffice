import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CPagination, CPaginationItem, CTooltip, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { Link } from 'react-router-dom'

import {
  CBadge,
  CListGroup,
  CListGroupItem,
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import MarqueService from 'src/services/marqueService'
import ModeleService from 'src/services/modeleService'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilSettings } from '@coreui/icons'

const Model = () => {
  const [page, setPage] = useState(0);
  const [nbPage, setNbPage] = useState(0);
  const [id, setId] = useState(0);
  const [modele, setModele] = useState('');
  const [marque, setMarque] = useState('');
  const [modeles, setModeles] = useState([]);
  const [marques, setMarques] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData=()=>{
    ModeleService.page(page)
      .then(result => {
        setModeles(result.data)
      })
      .catch(error => alert(error));
    MarqueService.all()
      .then(result => {
        setMarques(result.data)
      })
      .catch(error => alert(error));
    ModeleService.nbPage()
      .then(result => setNbPage(result.data))
      .catch(error => alert(error));
  }

  const handleChangeModele=(event)=>{
    setModele(event.target.value);
  }

  const handleChangeMarque=(event)=>{
    setMarque(event.target.value);
  }

  const handleDelete = (id_p) => {
    ModeleService.delete(id_p)
    .then(result => {
      if (result.success) {
        setModalDelete(0);
        fetchData();
      }
      else alert(result.error);
    })
    .catch(error => alert(error));
  }

  const handleClickUpdate=(id_p, nom, marque_p)=>{
    if (id === id_p) {
      setUpdating(false);
      setId(0);
      setModele('');
      setMarque('');
    } else {
      setUpdating(true);
      setId(id_p);
      setModele(nom);
      setMarque(marque_p);
    }
  }

  const handleClick=()=>{
    if (updating) {
      ModeleService.update(id, modele, marque)
      .then(result => {
        if (result.success) {
          setMarque('');
          setModele('');
          setUpdating(false);
          fetchData();
        } else {
          alert(result.error);
        }
      })
      .catch(error => alert(error));
    } else {
      ModeleService.add(modele, marque)
      .then(result => {
        if (result.success) {
          setMarque('');
          setModele('');
          fetchData();
        }
      })
      .catch(error => alert(error));
    }
  }

  const handleChangePage = (page_p)=>{
    setPage(page_p)
    ModeleService.page(page_p)
      .then(result => setModeles(result.data))
      .catch(error => alert(error));
  }

  return (
    <>
    <CRow>
      <CCol xs={4}>
        <CCard className="mb-4">
          <CCardHeader>Insertion Nouvelle Modele</CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Modele</CFormLabel>
              <CFormInput
                type="text"
                placeholder="modele de voiture"
                aria-label="default input example"
                onChange={handleChangeModele}
                value={modele}
              />

            </div>
            <CFormSelect aria-label="Default select example" onChange={handleChangeMarque} value={marque} disabled={updating}>
              <option>Marques</option>
              {marques.map((marque, index) => <option key={index} value={marque.id}>{marque.nom}</option> )}
            </CFormSelect>
            <br />
            <CRow className="align-items-center mb-3">
              <CCol>
                <CButton color={updating ? "warning" : "primary"} active={true} style={{width:'100%'}} onClick={()=>handleClick()}>
                  {updating ? "Mettre à jour" : "Ajouter"}
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={8}>
        <CCard className="mb-4" >
          <CCardHeader>Listes des modèles</CCardHeader>
          <CCardBody>
            <CListGroup>
              <CListGroupItem active>Modèle de voiture</CListGroupItem>
              {modeles.map((modele, index)=>
              <CListGroupItem key={index}>
                <CRow>
                  <CCol xs={5} style={{marginTop:'10px'}}>{modele.marque}</CCol>
                  <CCol xs={5} style={{marginTop:'10px'}}>{modele.nom}</CCol>
                  <CCol xs={2}>
                  <CTooltip
                    content="Mettre à jour"
                  >
                    <CButton color="info" active={true} onClick={()=>handleClickUpdate(modele.id, modele.nom, modele.marqueId)}><CIcon icon={cilSettings} /></CButton>
                  </CTooltip>
                  <CTooltip
                    content="supprimer"
                  >
                    <CButton color="danger" active={true} onClick={()=>setModalDelete(modele.id)}><CIcon icon={cilDelete}/></CButton>
                  </CTooltip>
                  </CCol>
                  <CModal visible={modalDelete==modele.id} onClose={() => setModalDelete(0)}>
                    <CModalHeader>
                      <CModalTitle>Confirmation de suppression</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      Vous êtes sur le point de supprimer la modele "<strong>{modele.marque} {modele.nom}</strong>"<br />
                      Aucun retour en arrière n'est possible.<br />
                      Êtes-vous sûr de vouloir supprimer "<strong>{modele.marque} {modele.nom}</strong>" pour toujours<br />
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setModalDelete(0)}>
                        Close
                      </CButton>
                      <CButton color="danger" onClick={()=> handleDelete(modele.id)}>Supprimer</CButton>
                    </CModalFooter>
                  </CModal>
                </CRow>
              </CListGroupItem>
              )}
              <CPagination aria-label="Page navigation example" className="justify-content-center">
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
export default Model