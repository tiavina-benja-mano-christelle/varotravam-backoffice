import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import FreinageService from 'src/services/freinageService'
import {
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
} from '@coreui/react'

const Energie = () => {
  const [freinage, setFreinage] = useState('');
  const [freinages, setFreinages] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData=()=>{
    FreinageService.all().then(result => setFreinages(result.data));
  }

  const handleChange=(event)=>{
    setFreinage(event.target.value);
  }

  const handleAdd=()=>{
    FreinageService.add(freinage)
    .then(result => {
      if (result.success) {
        setFreinage('');
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
            <CCardHeader>Ajout d'une nouvelle freinage</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  <CCardBody>
                    <CRow>
                      <CCol xs={8}>
                        <CFormInput placeholder="freinage" aria-label="Freinage" value={freinage} onChange={handleChange}/>
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
            <CCardHeader>Liste des systèmes de freinage</CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem active>Energie de voiture</CListGroupItem>
                {freinages.map((freinage, index)=>
                <CListGroupItem key={index}>
                  <CRow>
                    <CCol xs={10} style={{marginTop:'10px'}}>{freinage.nom}</CCol>
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
