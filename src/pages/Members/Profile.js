import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react"
import {
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap"
import Select from "react-select";
import { useAlert } from "react-alert";
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// Redux
import { connect, useDispatch, useSelector } from "react-redux"
import { useHistory, withRouter } from 'react-router-dom';
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"
import { memberUpdate, getUserProfile } from '../../helpers/backend_helper'
// import { optionGroupStaus, optionGroupType } from './Constants'
import { loginUser } from '../../store/actions';

const Profile = props => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const {userDetail} = useSelector((state)=> state?.Login);
  const [avatar, setavatar] = useState();
  const [updateAvatar, setupdateAvatar] = useState();
  const [avatarURL, setAvtarURL] = useState(null);
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setspassword] = useState(null);
  const [passwordType, setPasswordType] = useState("password");
  const [profile_id, set_profile_id] = useState([]);
  const [updateName, setupdatename] = useState(null);
  const [updateEmail, setupdateemail] = useState(null);
  const [updatePassword, setupdatespassword] = useState(null);

  
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  useEffect(()=>{
    if(userDetail){
      setupdateAvatar(userDetail[0]?.avatar)
    }
  },[userDetail])

  useEffect(() => {
    getUserProfile().then(resp => {
      if (resp?.data[0] !== null) {
        setname(resp?.data[0].name)
        setemail(resp?.data[0].email)
        setupdateAvatar(resp?.data[0].avatar)
        setavatar(resp?.data[0].avatar)
        set_profile_id(resp?.data[0]._id)
      }


    }).catch(err => {
    })
  }, []);

  const handleFileChange = (file) => {
    setavatar(file);
    const reader = new FileReader();
    reader.onloadend = function () {
      setAvtarURL(reader.result)
    }
    reader.readAsDataURL(file);
  }

  const updateMember = (event, values) => {
    const formData = new FormData();

    formData.append("avatar", avatar);
    formData.append("name", updateName ? updateName : name);
    formData.append("email", email)
    updatePassword && formData.append("password", updatePassword);
    // formData.append("id", id);

    memberUpdate(formData, profile_id).then(resp => {
      if (resp.status == true) {
        dispatch(loginUser(resp?.data))
        alert.success('Profile Updated Successfully');
        history.push('/profile')

      } else if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      }
      else {
        alert.error('Please Try Again...');
      }

    }).catch(err => {
      alert.error(err);
      // dispatch(UpdateMember(err.response))
      // console.log('resp err=>>', err.response);
    })

  }

  return (
    <React.Fragment>
      <div className="page-content">
        {/* Render Breadcrumb */}
        <Breadcrumb title="EasyDM" breadcrumbItem="Profile" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div className="ms-3">
                    <img
                      src={`${process.env.REACT_APP_DATABASEURL}avatar/${updateAvatar}`}
                      alt={name}
                      className="avatar-md rounded-circle img-thumbnail"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4 font-size-18">Update Profile</CardTitle>
                {/* <form encType="multipart/form-data" method="post"> */}
                <AvForm onValidSubmit={(e, v) => {
                  updateMember(e, v)
                }}>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="member_name">{name}</label> */}
                        <AvField
                          type="text"
                          label="Update Name"
                          name="name"
                          className="form-control"
                          id="member_name"
                          placeholder="Enter Name"
                          onChange={e => setupdatename(e.target.value)}
                          required
                          defaultValue={name}
                          key={name}
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
                          onChange={e => setupdateemail(e.target.value)}
                          defaultValue={email}
                          readOnly
                          required
                          autoComplete="off"
                          key={`${Math.floor((Math.random() * 1000))}-min`}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3 ">
                        <label htmlFor="Password">Update Password </label>
                        <div className="d-flex">
                          <div className="col-md-11">
                            <AvField
                              type={passwordType}
                              className="form-control"
                              id="member_password"
                              name="member_password"
                              placeholder="Keep blank if you dont want to update existing password."
                              autoComplete="new-password"
                              onChange={e => setupdatespassword(e.target.value)}
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



                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} >
                          Update
                        </button>

                        {/* <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>
                          Back
                        </button> */}

                      </div>
                    </Col>

                  </Row>

                </AvForm>


              </CardBody>
            </Card>
          </Col>

        </Row>

        {/* <h4 className="card-title mb-4">Update Name</h4> */}

        {/* <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v)
                }}
              >
                <div className="form-group">
                  <AvField
                    name="name"
                    label="Name"
                    value={name}
                    className="form-control"
                    placeholder="Enter Name"
                    type="text"
                    required
                  />
                  <AvField name="idx" value={idx} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update Profile
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card> */}




      </div>
    </React.Fragment>
  )
}


export default withRouter(Profile)