import React from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import {
  CButton,
  CAlert,
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

const Typography = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Historiques Annonce </CCardHeader>
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
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#Client</CTableHeaderCell>
                <CTableHeaderCell scope="col">Modele</CTableHeaderCell>
                <CTableHeaderCell scope="col">Categorie</CTableHeaderCell>
                <CTableHeaderCell scope="col">Prix</CTableHeaderCell>
                <CTableHeaderCell scope="col">Etat</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>@mdo</CTableDataCell>
                <CTableDataCell>
                  <CAlert color="danger">invalide</CAlert>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Jacob</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>@fat</CTableDataCell>
                <CTableDataCell>
                  <CAlert color="success">valide</CAlert>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
                <CTableDataCell>
                  <CAlert color="success">invalide</CAlert>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Typography
