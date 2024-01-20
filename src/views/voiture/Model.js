import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
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

const Model = () => {
  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);

  const fetchData=()=>{
    fetchDataMarque();
    fetchDataModeles();
  }

  const fetchDataMarque=()=>{
    MarqueService.all()
    .then(result => {
      if (result.success) setMarques(result.data);
    })
  }

  const fetchDataModeles=()=>{
    ModeleService.all()
    .then(result => {
      if (result.success) setModeles(result.data);
    })
  }
  useEffect(()=>fetchData(), []);

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
              />
            </div>
            <CFormSelect aria-label="Default select example">
              <option>Marques</option>
              {marques.map((marque, index) => <option key={index} value={marque.id}>{marque.nom}</option> )}
            </CFormSelect>
            <br />
            <CRow className="align-items-center mb-3">
              <CCol>
                <CButton color="primary" active={true} style={{width:'100%'}}>
                  Ajouter
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={8}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Liste des model par marque</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Marque</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Modele</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {modeles.map((modele, index) => 
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{modele.marque}</CTableDataCell>
                  <CTableDataCell>{modele.nom}</CTableDataCell>
                  <CTableDataCell>
                      <CButton color="success" active={true}  style={{  background: 'red' ,color : 'white' , border: 'none' , float:'right'}}>
                          <Link to="/voiture/detail" style={{ color: 'inherit', textDecoration: 'none' }}>
                          supprimer
                          </Link>
                      </CButton>
                  </CTableDataCell>
                </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
      
      
    </>
  )
}
export default Model
