import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { Link } from 'react-router-dom'
import {
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import AnnonceService from 'src/services/annonceService'
const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-medium-emphasis">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-medium-emphasis">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const Colors = () => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(()=>{fetchData(); console.log(annonces)}, [])
  const fetchData=()=>{
    AnnonceService.annonceEnAttente()
    .then(result => {
      if (result.success) setAnnonces(result.data);
    })
  } 

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Liste Annonce</CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#Client</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Modele</CTableHeaderCell>
                <CTableHeaderCell scope="col">Marque</CTableHeaderCell>
                <CTableHeaderCell scope="col">Categorie</CTableHeaderCell>
                <CTableHeaderCell scope="col">Prix</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {annonces.map((annonce, index) => 
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                <CTableDataCell>{annonce.proprietaire.nom}({annonce.proprietaire.email})</CTableDataCell>
                <CTableDataCell>{annonce.vehicule.modele}</CTableDataCell>
                <CTableDataCell>{annonce.vehicule.marque}</CTableDataCell>
                <CTableDataCell>{annonce.vehicule.categorie}</CTableDataCell>
                <CTableDataCell>{annonce.prixInitial.toLocaleString()} AR</CTableDataCell>
                <CTableDataCell>
                  <CButton color="success" active={true}  style={{  background: 'red' ,color : 'white' , border: 'none'}}>
                    <Link to={`/voiture/detail/${annonce.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      refuser
                    </Link>
                  </CButton>
                  <CButton color="success" active={true}  style={{  background: 'blue' ,color : 'white' , marginLeft : '5px' , border: 'none'}}>
                    <Link to="/voiture/detail" style={{ color: 'inherit', textDecoration: 'none' }}>
                      valider
                    </Link>
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="success" active={true}>
                    <Link to={`/voiture/detail/${annonce.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      voir
                    </Link>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )}

            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Colors
