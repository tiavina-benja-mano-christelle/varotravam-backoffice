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

const Buttons = () => {
  return (
    <>
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
            <option value="1">Marque 1</option>
            <option value="2">Marque 2</option>
            <option value="3">Marque 3</option>
          </CFormSelect>
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
        <CCardHeader>
          <strong>React Table</strong> <small>Captions</small>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableCaption>List of users</CTableCaption>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Modele</CTableHeaderCell>
                <CTableHeaderCell scope="col">Marque</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                 <CTableHeaderCell scope="row">1</CTableHeaderCell>
                 <CTableDataCell>Mark</CTableDataCell>
                 <CTableDataCell>Otto</CTableDataCell>
                 <CTableDataCell>@mdo</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}
export default Buttons
