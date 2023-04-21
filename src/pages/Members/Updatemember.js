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

const Updatemember = () => {

  const [profile_pic, setprofile_pic] = useState(null);
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [type, settype] = useState(null);
  const [status, setstatus] = useState(null);
//   const [selectedMulti, setselectedMulti] = useState(null);

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


    const updateMember = (e) => {
    history.push("/members")
   };


  return (
    <>
      <div className="page-content">
        
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Members" breadcrumbItem="Update Member" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Update Member</CardTitle>
                 
                  <form >
                      <Row>
                        <Col lg={12}>
                        <div className="mb-3">
                            <label htmlFor="profile_pic">Profile Pic</label>
                            <input
                              type="file"
                              className="form-control"
                              id="profile_pic"
                              // onChange={e => setprofile_pic(e.target.value)}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                        <div className="mb-3">
                            <label htmlFor="member_name">Member Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="member_name"
                              placeholder="Enter Member Name"
                              // onChange={e => setname(e.target.value)}
                              // value = {name}
                            />
                          </div>
                        </Col>

                        
                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="member_email">Member Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="member_email"
                              placeholder="Enter Member Email"
                              // onChange={e => setemail(e.target.value)}
                              // value = {email}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>

                      <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="user_type">Type</label>
                        <Select
                      id="user_type"
                      isMulti={false}
                      options={optionGroupType}
                      classNamePrefix="select2-selection"
                      // onChange={e => settype(e.target.value)}
                      // value = {type}
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
                      // value = {status}
                    />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="button" className="btn btn-primary" style={{marginRight: "30px"}}  onClick={() => updateMember()}>
                          Update Member
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

export default Updatemember
