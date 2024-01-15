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

const Alerts = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Insertion Nouvelle Boite Vitesse</CCardHeader>
        <CCardBody>
          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">Boite Vitesse</CFormLabel>
            <CFormInput
              type="text"
              placeholder="boite de vitesse de voiture"
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
        <CCardHeader>Liste Boite Vitesse</CCardHeader>
        <CCardBody>
          <CListGroup>
            <CListGroupItem active>Boite de Vitesse de voiture</CListGroupItem>
            <CListGroupItem>BV 2</CListGroupItem>
            <CListGroupItem>BV 3</CListGroupItem>
            <CListGroupItem>BV 4</CListGroupItem>
            <CListGroupItem>BV 5</CListGroupItem>
          </CListGroup>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Alerts
