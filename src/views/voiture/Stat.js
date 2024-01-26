import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CCard,
  CCardBody,
  CButton,
  CButtonGroup,
  CCardFooter,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAvatar,
  CProgress,
  CCardTitle,
} from '@coreui/react'
import { getStyle, hexToRgba } from '@coreui/utils'
import { CChartBar, CChartLine, CChartPie } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { 
  cilArrowBottom, 
  cilArrowTop, 
  cilCloudDownload, 
  cilOptions,
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilPeople,
  cilUser,
  cilUserFemale 
} from '@coreui/icons'
import { Link } from 'react-router-dom'





import StatWidget from './StatWidget'
import StatUser from './StatUser'
import StatMarque from './StatMarque'
import StatModele from './StatModele'
import StatChiffreAffaire from './StatChiffreAffaire'
import StatBestSeller from './StatBestSeller'



const Stat = () => {    
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
    const [nbUtilisateurTotal, setNbUtilisateurTotal] = useState(26000);
    const [mostSelledMarque, setMostSelledMarque] = useState({id: 1, nom: "NISSAN", nbVente: 45});
    const [mostSelledModele, setMostSelledModele] = useState({id: 1, nom: "NISSAN", marque: 'TOYOTA', nbVente: 20});
    const [commission, setCommission] = useState(20);
    const [chiffreAffaire, setChiffreAffaire] = useState(20000000);
    const [chiffreAffaires, setChiffreAffaires] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
  return (
    <>
      <StatWidget />
      <StatUser />
      <CRow>
        <CCol xs={6} id='marque-vendue'>
          <StatMarque />
        </CCol>
        <CCol xs={6} id='modele-vendue'>
          <StatModele />
        </CCol>
      </CRow>
      <StatChiffreAffaire />
      <StatBestSeller />
    </>
  )
}

export default Stat;
