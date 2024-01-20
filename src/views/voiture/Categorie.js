import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import CategorieService from 'src/services/categorieService';
import {
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
} from '@coreui/react'

const Categorie = () => {
  const [categorie, setCategorie] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData=()=>{
    CategorieService.all().then(result => setCategories(result.data));
  }

  const handleChange=(event)=>{
    setCategorie(event.target.value);
  }

  const handleAdd=()=>{
    CategorieService.add(categorie)
    .then(result => {
      if (result.success) {
        setCategorie('');
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
            <CCardHeader>Insertion Nouvelle Categorie</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  <CCardBody>
                    <CRow>
                      <CCol xs={8}>
                        <CFormInput placeholder="categorie" aria-label="Categorie" value={categorie} onChange={handleChange}/>
                      </CCol>
                      <CCol xs={4}>
                        <CButton color="danger" active={true} onClick={()=>handleAdd()}>
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
                <CListGroupItem active>Categories de voiture</CListGroupItem>
                {categories.map((categorie, index)=>
                <CListGroupItem key={index}>
                  <CRow>
                    <CCol xs={10} style={{marginTop:'10px'}}>{categorie.nom}</CCol>
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
export default Categorie
