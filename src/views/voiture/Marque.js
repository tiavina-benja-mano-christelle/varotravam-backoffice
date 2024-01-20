import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CFormLabel } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import {
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
} from '@coreui/react'
import MarqueService from 'src/services/marqueService'

const Marque = () => {
  const [marque, setMarque] = useState('');
  const [marques, setMarques] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData=()=>{
    MarqueService.all()
    .then(result => setMarques(result.data));
  }

  const handleChange=(event)=>{
    setMarque(event.target.value);
  }

  const handleAdd=()=>{
    MarqueService.add(marque)
    .then(result => {
      if (result.success) {
        setMarque('');
        fetchData();
      }
    })
    .catch(error => alert(error));
  }
  console.log(marques)
  return (
    <>
    <CRow>
      <CCol xs={4}>
        <CCard className="mb-4">
          <CCardHeader>Insertion Nouvelle Marque</CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <CFormInput placeholder="Marque" aria-label="First name" value={marque} onChange={handleChange}/>
            </div>
            <br />
            <CRow className="align-items-center mb-3">
              <CCol>
                <CButton color="primary" active={true} style={{width:'100%'}} onClick={()=>handleAdd()}>
                  Ajouter
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={8}>
        <CCard className="mb-4">
          <CCardHeader>Liste Marque</CCardHeader>
          <CCardBody>
            <CListGroup>
              <CListGroupItem active>Marques de voiture</CListGroupItem>
              {marques.map((element, index) => 
                <CListGroupItem key={index}>
                  <CRow>
                    <CCol xs={10} style={{marginTop:'10px'}}>{element.nom}</CCol>
                    <CCol xs={2}><CButton color="info" active={true}>supprimer</CButton></CCol>
                  </CRow>
                </CListGroupItem>
              )}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
      
    </>
  )
}
export default Marque
