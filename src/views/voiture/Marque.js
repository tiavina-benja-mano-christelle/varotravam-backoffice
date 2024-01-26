import React, { useEffect, useState, createRef } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CTooltip, CPagination, CPaginationItem, CFormLabel } from '@coreui/react'
import MarqueService from 'src/services/marqueService'
import {
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilSettings } from '@coreui/icons'

const Marque = () => {
  const [page, setPage] = useState(0);
  const [nbPage, setNbPage] = useState(0);
  const [id, setId] = useState(0);
  const [marque, setMarque] = useState('');
  const [marques, setMarques] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData=()=>{
    MarqueService.page(page)
      .then(result => setMarques(result.data))
      .catch(error => alert(error));
    MarqueService.nbPage()
      .then(result => setNbPage(result.data))
      .catch(error => alert(error));
  }

  const handleChange=(event)=>{
    setMarque(event.target.value);
  }

  const handleDelete = (id_p) => {
    MarqueService.delete(id_p)
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
      setMarque('');
    } else {
      setUpdating(true);
      setId(id_p);
      setMarque(nom);
    }
  }

  const handleClick=()=>{
    if (updating) {
      MarqueService.update(id, marque)
      .then(result => {
        if (result.success) {
          setMarque('');
          setUpdating(false);
          fetchData();
        } else {
          alert(result.error);
        }
      })
      .catch(error => alert(error));
    } else {
      MarqueService.add(marque)
      .then(result => {
        if (result.success) {
          setMarque('');
          fetchData();
        }
      })
      .catch(error => alert(error));
    }
  }

  const handleChangePage = (page_p)=>{
    setPage(page_p)
    MarqueService.page(page_p)
      .then(result => setMarques(result.data))
      .catch(error => alert(error));
  }

  return (
    <>
      <CRow>
        <CCol xs={4}>
          <CCard className="mb-4">
            <CCardHeader>Ajout d'une nouvelle marque</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12}>
                  <CCardBody>
                    <CFormLabel htmlFor="marque-input">Marques</CFormLabel>
                    <CFormInput id='marque-input' placeholder="Nouvelle marque" aria-label="Marque" value={marque} onChange={handleChange}/>
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
            <CCardHeader>Listes des marques</CCardHeader>
            <CCardBody>
              <CListGroup>
                <CListGroupItem active>Marque de voiture</CListGroupItem>
                {marques.map((marque, index)=>
                <CListGroupItem key={index}>
                  <CRow>
                    <CCol xs={10} style={{marginTop:'10px'}}>{marque.nom}</CCol>
                    <CCol xs={2}>
                    <CTooltip
                      content="Mettre à jour"
                    >
                      <CButton color="info" active={true} onClick={()=>handleClickUpdate(marque.id, marque.nom)}><CIcon icon={cilSettings} /></CButton>
                    </CTooltip>
                    <CTooltip
                      content="supprimer"
                    >
                      <CButton color="danger" active={true} onClick={()=>setModalDelete(marque.id)}><CIcon icon={cilDelete}/></CButton>
                    </CTooltip>
                    </CCol>
                    <CModal visible={modalDelete==marque.id} onClose={() => setModalDelete(0)}>
                      <CModalHeader>
                        <CModalTitle>Confirmation de suppression</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        Vous êtes sur le point de supprimer la marque "<strong>{marque.nom}</strong>"<br />
                        Aucun retour en arrière n'est possible.<br />
                        Êtes-vous sûr de vouloir supprimer "<strong>{marque.nom}</strong>" pour toujours<br />
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setModalDelete(0)}>
                          Close
                        </CButton>
                        <CButton color="danger" onClick={()=> handleDelete(marque.id)}>Supprimer</CButton>
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
export default Marque
