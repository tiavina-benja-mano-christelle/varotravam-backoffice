import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
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

const Detail = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Detail Annonce</CCardHeader>
        <CCardBody>
          <CListGroup>
            <CListGroupItem active>Annonce Client 1</CListGroupItem>
            <CListGroupItem>Categorie</CListGroupItem>
            <CListGroupItem>Modele</CListGroupItem>
            <CListGroupItem>Kilometrage</CListGroupItem>
            <CListGroupItem>Vitesse</CListGroupItem>
            <CListGroupItem>Etat</CListGroupItem>
            <CListGroupItem>Prix de Vente</CListGroupItem>
            <CListGroupItem>Prix Initial</CListGroupItem>
          </CListGroup>
          <br/>
          <CTableDataCell>
            <CButton color="success" active={true}>
              valider
            </CButton>
          </CTableDataCell>
          <CTableDataCell>
            <CButton color="danger" active={true}>
              refuser
            </CButton>
          </CTableDataCell>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Detail
