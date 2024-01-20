import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import EquipementService from 'src/services/equipementService'
import {
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
} from '@coreui/react'

const Energie = () => {
  const [energie, setEnergie] = useState('');
  const [energies, setEnergies] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData=()=>{
    EquipementService.all().then(result => setEnergies(result.data));
  }

  const handleChange=(event)=>{
    setEnergie(event.target.value);
  }

  const handleAdd=()=>{
    EquipementService.add(energie)
    .then(result => {
      if (result.success) {
        setEnergie('');
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
            <CCardHeader>Ajout d'une nouvelle energie</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  <CCardBody>
                    <CRow>
                      <CCol xs={8}>
                        <CFormInput placeholder="energie" aria-label="Energie" value={energie} onChange={handleChange}/>
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
                {energies.map((energie, index)=>
                <CListGroupItem key={index}>
                  <CRow>
                    <CCol xs={10} style={{marginTop:'10px'}}>{energie.nom}</CCol>
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
