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
// ... (code précédent inchangé)

const Colors = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Annonce en attente</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs={12}>
              <CCardBody>
                <CRow>
                  <CCol xs>
                    <CFormInput placeholder="client" aria-label="First name" />
                  </CCol>
                  <CCol xs>
                    <CFormInput type="date" placeholder="" aria-label="Last name" />
                  </CCol>
                </CRow>
                <br />
                <CRow className="align-items-center mb-3">
                  <CCol xs>
                    <CButton color="info" active={true}>
                      Sélectionner
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Liste Annonce</CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#Client</CTableHeaderCell>
                <CTableHeaderCell scope="col">Modele</CTableHeaderCell>
                <CTableHeaderCell scope="col">Categorie</CTableHeaderCell>
                <CTableHeaderCell scope="col">Prix</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>@mdo</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" active={true}>
                    <Link to="/theme/detail" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Detail
                    </Link>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Jacob</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>@fat</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" active={true}>
                    <Link to="/theme/detail" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Detail
                    </Link>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" active={true}>
                    <Link to="/theme/detail" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Detail
                    </Link>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Colors
