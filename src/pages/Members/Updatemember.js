import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import Select from "react-select";
import { useHistory, withRouter } from 'react-router-dom';
import Moment from 'moment';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { updateMember as UpdateMember } from "../../store/actions"
import { memberUpdate } from '../../helpers/backend_helper'
import { optionGroupStaus, optionGroupType } from './Constants'


const Updatemember = (props) => {

  const member_data = props.location && props.location.state;

  const get_auth_user = JSON.parse(localStorage.getItem("authUser"))

  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();

  const [avatar, setprofile_pic] = useState(member_data && member_data.data.avatar);
  const [avatarURL, setAvtarURL] = useState('');
  const [name, setname] = useState(member_data && member_data.data.name);
  const [email, setemail] = useState(member_data && member_data.data.email);
  const [type, settype] = useState(member_data && member_data.data.userType);
  const status_check = member_data && member_data.data.isActive ? true : false;
  const [status, setstatus] = useState(member_data && member_data.data.isActive);
  const [id, setid] = useState(member_data && member_data.data._id);
  const [password, setspassword] = useState(null);
  const [passwordType, setPasswordType] = useState("password");
  let head_published_on = Moment(member_data && member_data.data.createdAt).format('DD-MMM-YY');


  const handleFileChange = (file) => {
    setprofile_pic(file);
    const reader = new FileReader();
    reader.onloadend = function () {
      setAvtarURL(reader.result)
    }
    reader.readAsDataURL(file);
  }
  // console.log('avatarURL ', avatarURL)
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const updateMember = (event, values) => {
    const formData = new FormData();

    formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("email", email)
    password && formData.append("password", password);
    formData.append("userType", type);
    formData.append("isActive", status);
    // formData.append("id", id);

    memberUpdate(formData, id).then(resp => {
      if (resp.status == true) {
        alert.success('Member Updated Successfully');
        dispatch(UpdateMember(resp?.data))
        if (resp?.message == 'Unauthorized User!!') {
          history.push('/logout')
          alert.error('Session timeout');
        }
        else {
          history.push('/members')
        }
      } else {
        alert.error('Please Try Again...');
      }

    }).catch(err => {
      alert.error(err);
      dispatch(UpdateMember(err.response))
      // console.log('resp err=>>', err.response);
    })

  }

  useEffect(() => {
    !member_data &&   history.push('/members');
  }, []);

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
                  <h4 className="me-4"> ID:  {id}</h4>
                  <label htmlFor="published_on">Created On :  {head_published_on}</label>
                </div>
    
                <div className="col-md-1" style={{ float: "right" }}>
                  {
                    avatarURL == '' ?    <img src={`${process.env.REACT_APP_DATABASEURL}avatar/${avatar}`} alt={name} width="90px" />
                    :
                    <img src={avatarURL} alt={name} width="90px" className="avatar" />
                  }
                 
                </div>
              </div>
            </CardBody>
          </Card>

          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4 font-size-18">Update Member</CardTitle>

                {/* <form encType="multipart/form-data" method="post"> */}
                <AvForm onValidSubmit={(e, v) => {
                  updateMember(e, v)
                }} autoComplete="off">
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
                          accept="image/png, image/gif, image/jpeg"
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
                          defaultValue={email}
                          readOnly
                          required
                        />
                      </div>
                    </Col>

                    {id === get_auth_user._id || get_auth_user.userRole == 1 &&
                      <Col lg={6}>
                        <div className="mb-3 ">
                          <label htmlFor="Password">Password</label>
                          <div className="d-flex">

                            <div className="col-md-11">
                              <AvField
                                type={passwordType}
                                className="form-control"
                                id="member_password"
                                name="member_password"
                                placeholder="Keep blank if you dont want to update existing password."
                                autoComplete="new-password"
                                onChange={e => setspassword(e.target.value)}
                              />
                            </div>

                            <button type="button" className="btn btn-outline-primary"
                              style={{ marginLeft: "10px" }}
                              onClick={togglePassword}>
                              {passwordType === "password" ? <i className="mdi mdi-eye-off"></i> : <i className="mdi mdi-eye"></i>}
                            </button>
                          </div>
                        </div>

                      </Col>
                    }

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

                    {id === get_auth_user._id || get_auth_user.userRole == 1 &&
                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="user_status">Status</label>
                        <Select
                          id="user_status"
                          isMulti={false}
                          options={optionGroupStaus}
                          classNamePrefix="select2-selection"
                          onChange={e => setstatus(e.value)}
                          defaultValue={{ label: status_check ? "Active" : "InActive" }}
                        />
                      </div>
                    </Col>
                    }

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} >
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
