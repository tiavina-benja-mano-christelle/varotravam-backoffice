import React, { useEffect, useState, createRef } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CTooltip, CPagination, CPaginationItem, CFormLabel } from '@coreui/react'
import EnergieService from 'src/services/energieService'
import {
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilSettings } from '@coreui/icons'

const Energie = () => {
  const [page, setPage] = useState(0);
  const [nbPage, setNbPage] = useState(0);
  const [id, setId] = useState(0);
  const [energie, setEnergie] = useState('');
  const [energies, setEnergies] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData=()=>{
    EnergieService.page(page)
      .then(result => setEnergies(result.data))
      .catch(error => alert(error));
    EnergieService.nbPage()
      .then(result => setNbPage(result.data))
      .catch(error => alert(error));
  }

  const handleChange=(event)=>{
    setEnergie(event.target.value);
  }

  const handleDelete = (id_p) => {
    EnergieService.delete(id_p)
    .then(result => {
      if (result.success) {
        setModalDelete(0);
        fetchData();
      }
      else alert(result.error);
    })
    .catch(error => alert(error));
  }

  const handleClickUpdate=(id_p, nom)=>{
    if (id === id_p) {
      setUpdating(false);
      setId(0);
      setEnergie('');
    } else {
      setUpdating(true);
      setId(id_p);
      setEnergie(nom);
    }
  }

  const handleClick=()=>{
    if (updating) {
      EnergieService.update(id, energie)
      .then(result => {
        if (result.success) {
          setEnergie('');
          setUpdating(false);
          fetchData();
        } else {
          alert(result.error);
        }
      })
      .catch(error => alert(error));
    } else {
      EnergieService.add(energie)
      .then(result => {
        if (result.success) {
          setEnergie('');
          fetchData();
        }
      })
      .catch(error => alert(error));
    }
  }

  const handleChangePage = (page_p)=>{
    setPage(page_p)
    EnergieService.page(page_p)
      .then(result => setEnergies(result.data))
      .catch(error => alert(error));
  }

  return (
    <>
      <CRow>
        <CCol xs={4}>
          <CCard className="mb-4">
            <CCardHeader>Ajout d'une nouvelle energie</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  <CCardBody>
                    <CFormLabel htmlFor="energie-input">Energies</CFormLabel>
                    <CFormInput id='energie-input' placeholder="Nouvelle energie" aria-label="Energie" value={energie} onChange={handleChange}/>
                    <CRow className="align-items-center mt-3">
                      <CCol>
                        <CButton color={updating ? "warning" : "primary"} active={true} onClick={()=>handleClick()} style={{width:'100%'}}>
                          {updating ? "Mettre à jour" : "Ajouter"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCol>
              </CRow>
            </CCardBody>
            
          </CCard>

        </CCol>
        <CCol xs={8}>
          <CCard className="mb-4" >
            <CCardHeader>Listes des energies</CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem active>Energie de voiture</CListGroupItem>
                {energies.map((energie, index)=>
                <CListGroupItem key={index}>
                  <CRow>
                    <CCol xs={10} style={{marginTop:'10px'}}>{energie.nom}</CCol>
                    <CCol xs={2}>
                    <CTooltip
                      content="Mettre à jour"
                    >
                      <CButton color="info" active={true} onClick={()=>handleClickUpdate(energie.id, energie.nom)}><CIcon icon={cilSettings} /></CButton>
                    </CTooltip>
                    <CTooltip
                      content="supprimer"
                    >
                      <CButton color="danger" active={true} onClick={()=>setModalDelete(energie.id)}><CIcon icon={cilDelete}/></CButton>
                    </CTooltip>
                    </CCol>
                    <CModal visible={modalDelete==energie.id} onClose={() => setModalDelete(0)}>
                      <CModalHeader>
                        <CModalTitle>Confirmation de suppression</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        Vous êtes sur le point de supprimer la energie "<strong>{energie.nom}</strong>"<br />
                        Aucun retour en arrière n'est possible.<br />
                        Êtes-vous sûr de vouloir supprimer "<strong>{energie.nom}</strong>" pour toujours<br />
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setModalDelete(0)}>
                          Close
                        </CButton>
                        <CButton color="danger" onClick={()=> handleDelete(energie.id)}>Supprimer</CButton>
                      </CModalFooter>
                    </CModal>
                  </CRow>
                </CListGroupItem>
                )}
                <CPagination aria-label="Page navigation example" className="justify-content-center" >
                  <CPaginationItem onClick={()=>handleChangePage(page - 1)} disabled={page === 0} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </CPaginationItem>
                  {Array.from({length: nbPage+1}, (_, index)=>(
                    <CPaginationItem active={index === page} key={index} onClick={()=>handleChangePage(index)}>{index+1}</CPaginationItem>
                  ))}
                  <CPaginationItem onClick={()=>handleChangePage(page + 1)} disabled={page === nbPage}>
                    <span aria-hidden="true">&raquo;</span>
                  </CPaginationItem>
                </CPagination>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
      
    </>
  )
}
export default Energie
