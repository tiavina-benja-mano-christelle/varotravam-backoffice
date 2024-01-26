import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
      if (result.success) alert("SUCCESS");
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
          <CCol md={8}>
            <CCardGroup>
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
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
