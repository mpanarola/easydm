import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import Select from "react-select";
import { useHistory } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Createmember = () => {

  const [profile_pic, setprofile_pic] = useState(null);
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [type, settype] = useState(null);
  const [status, setstatus] = useState(null);
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


// console.log('webpage ', webpage)
  const history = useHistory();



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
        { label: "Active", value: "1" },
        { label: "InActive", value: "0" },
      ],
    },
   
  ];



  const createMember = (e) => {
    history.push('/members')
  };


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
                 
                  <form >
                      <Row>
                       
                        <Col lg={6}>
                        <div className="mb-3">
                            <label htmlFor="member_name">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="member_name"
                              placeholder="Enter Name"
                              // onChange={e => setname(e.target.value)}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                        <div className="mb-3">
                            <label htmlFor="profile_pic">Photo</label>
                            <input
                              type="file"
                              className="form-control"
                              id="profile_pic"
                              onChange={e => setprofile_pic(e.target.value)}
                            />
                          </div>
                        </Col>
                        
                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="member_email">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="member_email"
                              placeholder="Enter Member Email"
                              // onChange={e => setemail(e.target.value)}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <div className="d-flex">
                            <input
                              type={passwordType}
                              className="form-control"
                              id="member_password"
                              placeholder="Enter Member Password"
                              onChange={e => setspassword(e.target.value)}
                            />
                            <button type="button" className="btn btn-outline-primary mr-2" onClick={togglePassword}>
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
                      // onChange={e => settype(e.target.value)}
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
                      // onChange={e => setstatus(e.target.value)}
                    />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{marginRight: "30px"}} onClick={() => createMember()}>
                          Create Member
                        </button>

                        <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>
                          Back
                        </button>

                      </div>
                    </Col>

                      </Row>
                      
                    </form>

                 
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    </>
  )
}

export default Createmember
