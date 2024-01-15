import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
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

const CoreUIIcons = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Insertion Nouvelle Carburant</CCardHeader>
        <CCardBody>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">Carburant</CFormLabel>
            <CFormInput
              type="text"
              placeholder="carburant de voiture"
              aria-label="default input example"
            />
          </div>
          <br />
          <CRow className="align-items-center mb-3">
            <CCol xs>
              <CButton color="primary" active={true}>
                inserer
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Liste Source Energie</CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Carburant</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Carburant</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Carburant</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell>Carburant</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}
export default CoreUIIcons
