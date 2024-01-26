import React, { useEffect, useState, createRef } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CTooltip, CPagination, CPaginationItem, CFormLabel } from '@coreui/react'
import FreinageService from 'src/services/freinageService'
import {
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilSettings } from '@coreui/icons'

const Freinage = () => {
  const [page, setPage] = useState(0);
  const [nbPage, setNbPage] = useState(0);
  const [id, setId] = useState(0);
  const [freinage, setFreinage] = useState('');
  const [freinages, setFreinages] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData=()=>{
    FreinageService.page(page)
      .then(result => setFreinages(result.data))
      .catch(error => alert(error));
    FreinageService.nbPage()
      .then(result => setNbPage(result.data))
      .catch(error => alert(error));
  }

  const handleChange=(event)=>{
    setFreinage(event.target.value);
  }

  const handleDelete = (id_p) => {
    FreinageService.delete(id_p)
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
      setFreinage('');
    } else {
      setUpdating(true);
      setId(id_p);
      setFreinage(nom);
    }
  }

  const handleClick=()=>{
    if (updating) {
      FreinageService.update(id, freinage)
      .then(result => {
        if (result.success) {
          setFreinage('');
          setUpdating(false);
          fetchData();
        } else {
          alert(result.error);
        }
      })
      .catch(error => alert(error));
    } else {
      FreinageService.add(freinage)
      .then(result => {
        if (result.success) {
          setFreinage('');
          fetchData();
        }
      })
      .catch(error => alert(error));
    }
  }

  const handleChangePage = (page_p)=>{
    setPage(page_p)
    FreinageService.page(page_p)
      .then(result => setFreinages(result.data))
      .catch(error => alert(error));
  }

  return (
    <>
      <CRow>
        <CCol xs={4}>
          <CCard className="mb-4">
            <CCardHeader>Ajout d'une nouvelle freinage</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  <CCardBody>
                    <CFormLabel htmlFor="freinage-input">Freinages</CFormLabel>
                    <CFormInput id='freinage-input' placeholder="Nouvelle freinage" aria-label="Freinage" value={freinage} onChange={handleChange}/>
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
            <CCardHeader>Listes des freinages</CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem active>Freinage de voiture</CListGroupItem>
                {freinages.map((freinage, index)=>
                <CListGroupItem key={index}>
                  <CRow>
                    <CCol xs={10} style={{marginTop:'10px'}}>{freinage.nom}</CCol>
                    <CCol xs={2}>
                    <CTooltip
                      content="Mettre à jour"
                    >
                      <CButton color="info" active={true} onClick={()=>handleClickUpdate(freinage.id, freinage.nom)}><CIcon icon={cilSettings} /></CButton>
                    </CTooltip>
                    <CTooltip
                      content="supprimer"
                    >
                      <CButton color="danger" active={true} onClick={()=>setModalDelete(freinage.id)}><CIcon icon={cilDelete}/></CButton>
                    </CTooltip>
                    </CCol>
                    <CModal visible={modalDelete==freinage.id} onClose={() => setModalDelete(0)}>
                      <CModalHeader>
                        <CModalTitle>Confirmation de suppression</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        Vous êtes sur le point de supprimer la freinage "<strong>{freinage.nom}</strong>"<br />
                        Aucun retour en arrière n'est possible.<br />
                        Êtes-vous sûr de vouloir supprimer "<strong>{freinage.nom}</strong>" pour toujours<br />
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setModalDelete(0)}>
                          Close
                        </CButton>
                        <CButton color="danger" onClick={()=> handleDelete(freinage.id)}>Supprimer</CButton>
                      </CModalFooter>
                    </CModal>
                  </CRow>
                </CListGroupItem>
                )}
                <CPagination aria-label="Page navigation example" className="justify-content-center">
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
export default Freinage
