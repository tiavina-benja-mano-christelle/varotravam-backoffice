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
  CFormFloating,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'

const Accordion = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Insertion Nouvelle Categorie</CCardHeader>
        <CCardBody>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">Categorie</CFormLabel>
            <CFormInput
              type="text"
              placeholder="categorie de voiture"
              aria-label="default input example"
            />
          </div>
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
        <CCardHeader>Liste Categorie</CCardHeader>
        <CCardBody>
          <CListGroup>
            <CListGroupItem active>Categories de voiture</CListGroupItem>
            <CListGroupItem>Categorie 2</CListGroupItem>
            <CListGroupItem>Categorie 3</CListGroupItem>
            <CListGroupItem>Categorie 4</CListGroupItem>
            <CListGroupItem>Categorie 5</CListGroupItem>
          </CListGroup>
        </CCardBody>
      </CCard>
    </>
  )
}
export default Accordion
