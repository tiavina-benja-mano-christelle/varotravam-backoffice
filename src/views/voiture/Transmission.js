import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import TransmissionService from 'src/services/transmissionService'
import {
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
} from '@coreui/react'

const Energie = () => {
  const [transmission, setTransmission] = useState('');
  const [transmissions, setTransmissions] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData=()=>{
    TransmissionService.all().then(result => setTransmissions(result.data));
  }

  const handleChange=(event)=>{
    setTransmission(event.target.value);
  }

  const handleAdd=()=>{
    TransmissionService.add(transmission)
    .then(result => {
      if (result.success) {
        setTransmission('');
        fetchData();
      }
    })
    .catch(error => alert(error));
  }

  return (
    <>
      <CRow>
        <CCol xs={4}>
          <CCard className="mb-4">
            <CCardHeader>Ajout d'une nouvelle transmission</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  <CCardBody>
                    <CRow>
                      <CCol xs={8}>
                        <CFormInput placeholder="transmission" aria-label="Energie" value={transmission} onChange={handleChange}/>
                      </CCol>
                      <CCol xs={4}>
                        <CButton color="info" active={true} onClick={()=>handleAdd()}>
                          Ajouter
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
          <CCard className="mb-4">
            <CCardHeader>Liste Categorie</CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem active>Energie de voiture</CListGroupItem>
                {transmissions.map((transmission, index)=>
                <CListGroupItem key={index}>
                  <CRow>
                    <CCol xs={10} style={{marginTop:'10px'}}>{transmission.nom}</CCol>
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
export default Energie
