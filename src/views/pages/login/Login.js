import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AuthService from 'src/services/authService'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    username: 'michael.wilson@email.com',
    password: 'motdepasse10'
  });

  const handleChangeInput=(event)=>{
    const {name, value} = event.target;
    setPostData({[name]: value});
  }

  const handleSubmit= async () =>{
    try {
      setLoading(true);
      const result = await AuthService.connection(postData.username, postData.password)
      if (result.success) navigate('/stats');
      else {
        alert(result.error)
      }
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCard className="p-4">
              <CCardBody>
                <h1>Login</h1>
                <p className="text-medium-emphasis">Sign In to your account</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput 
                    placeholder="Username" 
                    autoComplete="username" 
                    value={postData.username}
                    onChange={handleChangeInput}  
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={postData.password}
                    onChange={handleChangeInput}
                  />
                </CInputGroup>
                <CRow>
                  <CCol xs={6}>
                    <CButton 
                      color="primary" 
                      className="px-4" 
                      onClick={()=>handleSubmit()}
                      disabled={loading}
                    >
                    { loading ? ("...Loading") : ("Login") }
                    </CButton>
                  </CCol>
                  <CCol xs={6} className="text-right">
                    <CButton color="link" className="px-0">
                      Forgot password?
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
