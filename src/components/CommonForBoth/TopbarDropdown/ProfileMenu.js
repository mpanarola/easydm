import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import { useAlert } from "react-alert";
//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect, useSelector } from "react-redux"
import { withRouter, Link, useHistory } from "react-router-dom"
import { getUserProfile } from '../../../helpers/backend_helper'

// users
// import user4 from "../../../assets/images/users/avatar-2.jpg"

const ProfileMenu = props => {
  const alert = useAlert();
  const history = useHistory();
  // Declare a new state variable, which we'll call "menu"
  const { userDetail } = useSelector((state) => state?.Login);
  const [menu, setMenu] = useState(false)
  const [avatar, setavatar] = useState();
  const [name, setname] = useState(null);


  useEffect(()=>{
    if(userDetail){
      setavatar(userDetail[0]?.avatar)
      setname(userDetail[0]?.name)
    }
  },[userDetail])


  useEffect(() => {
    getUserProfile().then(resp => {
      if (resp?.data[0] !== null) {
        setname(resp?.data[0].name)
        setavatar(resp?.data[0].avatar)
      }
    }).catch(err => {
    })
  }, []);

  const logOut = (e) => {
    // alert('')
    alert.success('Logout Successfully');
    history.push({
      pathname: '/logout'
    })

  };


  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={`${process.env.REACT_APP_BACKEND}avatar/${avatar}`} alt={name}
          />{" "}
          <span className="d-none d-xl-inline-block ms-1">{name}</span>{" "}
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>{" "}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem >
            <Link className="waves-effect waves-light" to="/profile">   <i className="bx bx-user font-size-16 align-middle me-1"></i> View Profile </Link>
          </DropdownItem>

          <Link to="#" onClick={() => logOut()} className="dropdown-item text-danger">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>{" "}
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)