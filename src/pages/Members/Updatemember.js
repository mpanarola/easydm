import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import Select from "react-select";
import { useHistory, withRouter } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux"
import { AvForm, AvField } from "availity-reactstrap-validation"

import { updateMember as UpdateMember } from "../../store/actions"
import { memberUpdate } from '../../helpers/backend_helper'

const Updatemember = (props) => {

  const member_data =   props.location && props.location.state;

  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();

  const [avatar, setprofile_pic] = useState(member_data.data.avatar);
  const [avatarURL, setAvtarURL] = useState(null);

  const [name, setname] = useState(member_data.data.name);
  const [email, setemail] = useState(member_data.data.email);
  const [type, settype] = useState(member_data.data.userType);
  const status_check = member_data.data.isActive ? '1' : '0';
  const [status, setstatus] = useState('1');
  const [id, setid] = useState(member_data.data._id);

//   const [selectedMulti, setselectedMulti] = useState(null);

const [password, setspassword] = useState(null);
const [passwordType, setPasswordType] = useState("password");


const handleFileChange = (file) => {
  setprofile_pic(file);
  const reader  = new FileReader();
  reader.onloadend = function () {
    setAvtarURL(reader.result)
  }
  reader.readAsDataURL(file);
}


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
        { label: "Active", value: '1' },
        { label: "InActive", value: '0' },
      ],
    },
   
  ];



  const updateMember = (event, values) => {
    const formData = new FormData();
    
    formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userType", type);
    formData.append("status", status);
    // formData.append("id", id);

    memberUpdate(formData, id).then(resp=>{
      if(resp.status == true){
      alert.success('Member Updated Successfully');
      dispatch(UpdateMember(resp?.data))
      history.push('/members')

    }else{
      alert.error('Please Try Again...');
    }
    
    }).catch(err=>{
      alert.error(err);
      dispatch(UpdateMember(err.response))
      // console.log('resp err=>>', err.response);
    })
    
  }

  return (
    <>
      <div className="page-content">
        
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Members" breadcrumbItem="Update Member" />

    
          <Row>
          <Card>
            <CardBody>
              <div className="col-md-12 d-flex">
                <div className="col-md-11">
              <h4 className="me-4"> ID:  #1</h4>
              <label htmlFor="published_on">Created On :  27-Mar-2023</label>
              </div>
              <div className="col-md-1" style={{float: "right"}}>
              <img src={`${'http://localhost:8080/avatar'}/${avatar}`} alt={name}  width="90px"/>
              </div>
              </div>
            </CardBody>
          </Card>

            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4 font-size-18">Update Member</CardTitle>
                 
                  {/* <form encType="multipart/form-data" method="post"> */}
                  <AvForm  onValidSubmit={(e, v) => {
                        updateMember(e, v)
                      }}>
                      <Row>
                        
                        <Col lg={6}>
                        <div className="mb-3">
                            {/* <label htmlFor="member_name">Member Name</label> */}
                            <AvField
                              type="text"
                              label="Name"
                              name="name"
                              className="form-control"
                              id="member_name"
                              placeholder="Enter Name"
                              onChange={e => setname(e.target.value)}
                              required
                              defaultValue={name}
                              // value = {name}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                        <div className="mb-3 ">
                            {/* <label htmlFor="profile_pic">Photo</label> */}
                           

                            
                            <AvField
                              type="file"
                              label="Update Photo"
                              name="photo"
                              className="form-control"
                              id="profile_pic"
                              onChange={e => handleFileChange(e.target.files[0])}
                            />
                           
                        
                         </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            {/* <label htmlFor="member_email">Email</label> */}
                         
                            <AvField
                              type="email"
                              label="Email"
                              className="form-control"
                              id="member_email"
                              name="email"
                              placeholder="Enter Email"
                              onChange={e => setemail(e.target.value)}
                              required
                            />

              </div>
                        </Col>
                     
                        <Col lg={6}>
                          <div className="mb-3 ">
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
                      defaultValue={{ value: status}}

                    />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{marginRight: "30px"}} >
                          Update Member
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

// export default Updatemember
export default withRouter(Updatemember)
