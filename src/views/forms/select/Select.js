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

const Select = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Insertion Nouvelle Marque</CCardHeader>
        <CCardBody>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">Marque</CFormLabel>
            <CFormInput
              type="text"
              placeholder="marque de voiture"
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
        <CCardHeader>Liste Marque</CCardHeader>
        <CCardBody>
          <CListGroup>
            <CListGroupItem active>Marques de voiture</CListGroupItem>
            <CListGroupItem>Marque 2</CListGroupItem>
            <CListGroupItem>Marque 3</CListGroupItem>
            <CListGroupItem>Marque 4</CListGroupItem>
            <CListGroupItem>Marque 5</CListGroupItem>
          </CListGroup>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Select
