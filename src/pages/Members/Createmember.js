import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import Select from "react-select";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux"
import { useHistory, withRouter } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { registerUser } from "../../store/actions"
import { addMember } from '../../helpers/backend_helper'

import { AvForm, AvField } from "availity-reactstrap-validation"

const Createmember = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();

  const [avatar, setprofile_pic] = useState(null);
  const [avatarURL, setAvtarURL] = useState(null);
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [type, settype] = useState('DM Executive');
  const [status, setstatus] = useState('Active');
  const [password, setspassword] = useState(null);
const [passwordType, setPasswordType] = useState("password");

const togglePassword =()=>{
  if(passwordType==="password")
  {
   setPasswordType("text")
   return;
  }
  setPasswordType("password")
}



  // User Type
  const optionGroupType = [
    {
      label: "Type",
      options: [
        { label: "DM Executive", value: "DM Executive" },
        { label: "Graphic Designer", value: "Graphic Designer" },
        { label: "Content Writer", value: "Content Writer" },
      ],
    },
   
  ];

  // User Status
  const optionGroupStaus = [
    {
      label: "Type",
      options: [
        { label: "Active", value: true },
        { label: "InActive", value: false },
      ],
    },
   
  ];



  const handleFileChange = (file) => {
    setprofile_pic(file);
    const reader  = new FileReader();
    reader.onloadend = function () {
      setAvtarURL(reader.result)
    }
    reader.readAsDataURL(file);
  }


    // handleValidSubmit
    const createMember = (event, values) => {

      const formData = new FormData();
      
      formData.append("avatar", avatar);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userType", type);
      formData.append("status", status);

      addMember(formData).then(resp=>{
        // console.log('resp =>>', resp);
        // console.log('token ', resp?.data[0].token)
        if(resp.status == true){
        alert.success('Member Created Successfully');
        dispatch(registerUser(resp?.data))
        history.push('/members')

      }else{
        alert.error('Please Try Again...');
      }
      
      }).catch(err=>{
        alert.error(err);
        dispatch(registerUser(err.response))
        // console.log('resp err=>>', err.response);
      })
      
    }


  return (
    <>
      <div className="page-content">
        
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Members" breadcrumbItem="Create Member" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4 font-size-18">Create Member</CardTitle>
                 
                  <AvForm  onValidSubmit={(e, v) => {
                        createMember(e, v)
                      }}>
                      <Row>
                       
                        <Col lg={6}>
                        <div className="mb-3">

                        <AvField
                          name="member_name"
                          label="Name"
                          onChange={e => setname(e.target.value)}
                          className="form-control"
                          placeholder="Enter Name"
                          type="text"
                          required
                        />
                          </div>

                          

                        </Col>

                        <Col lg={6}>
                        <div className="mb-3">
                            {/* <label htmlFor="profile_pic"></label> */}
                            <AvField
                              type="file"
                              label="Photo"
                              className="form-control"
                              id="profile_pic"
                              name="avatar"
                              
                              onChange={e => handleFileChange(e.target.files[0])}
                            />
                            
                          </div>
                        </Col>
                        
                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="member_email"></label>
                            <AvField
                              type="email"
                              Email="Name"
                              label="Email"
                              className="form-control"
                              id="member_email"
                              name="member_email"
                              placeholder="Enter Member Email"
                              required
                              onChange={e => setemail(e.target.value)}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3 mt-3">
                          <label htmlFor="Password">Password</label>
                            <div className="d-flex">

                          <div className="col-md-11">
                          <AvField
                              type={passwordType}
                              // label="Password"
                              className="form-control"
                              id="member_password"
                              name="member_password"
                              placeholder="Enter Password"
                              required
                              onChange={e => setspassword(e.target.value)}
                            />

                          </div>
                            
                           
                            <button type="button" className="btn btn-outline-primary" 
                            style={{marginLeft: "10px"}}
                            onClick={togglePassword}>
                     { passwordType==="password"? <i className="mdi mdi-eye-off"></i> :<i className="mdi mdi-eye"></i> }
                     </button>
                     </div>
                          </div>
                          
                        </Col>


                      <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="user_type">Type</label>
                        <Select
                      id="user_type"
                      isMulti={false}
                      options={optionGroupType}
                      classNamePrefix="select2-selection"
                      onChange={e => settype(e.value)}
                      defaultValue={{ label: type }}
                    />
                      </div>
                    </Col>

                      <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="user_status">Status</label>
                        <Select
                      id="user_status"
                      isMulti={false}
                      options={optionGroupStaus}
                      classNamePrefix="select2-selection"
                      onChange={e => setstatus(e.value)}
                      defaultValue={{ label: status }}
                    />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{marginRight: "30px"}} >
                          Create Member
                        </button>

                        <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>
                          Back
                        </button>

                      </div>
                    </Col>

                      </Row>
                      
                      </AvForm>

                 
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    </>
  )
}

// export default Createmember
export default withRouter(Createmember)
