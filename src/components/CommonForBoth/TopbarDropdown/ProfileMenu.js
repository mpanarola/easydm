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
import { connect } from "react-redux"
import { withRouter, Link, useHistory } from "react-router-dom"
import { getUserProfile } from '../../../helpers/backend_helper'

// users
// import user4 from "../../../assets/images/users/avatar-2.jpg"

const ProfileMenu = props => {
  const alert = useAlert();
  const history = useHistory();
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  // const [username, setusername] = useState("Milan")
  // const get_auth_user = JSON.parse(localStorage.getItem("authUser"))
  // const user_avatar = get_auth_user.avatar

  const [avatar, setavatar] = useState();
  const [name, setname] = useState(null);

  // useEffect(() => {
  //   if (localStorage.getItem("authUser")) {
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       const obj = JSON.parse(localStorage.getItem("authUser"))
  //       setusername(obj.displayName)
  //     } else if (
  //       process.env.REACT_APP_DEFAULTAUTH === "fake" ||
  //       process.env.REACT_APP_DEFAULTAUTH === "jwt"
  //     ) {
  //       const obj = JSON.parse(localStorage.getItem("authUser"))
  //       // setusername(obj.username)
  //     }
  //   }
  // }, [props.success])


  useEffect(()=>{
    getUserProfile().then(resp=>{
      // console.log('user_data ', resp?.data[0].name)
      // set_get_user_profile(resp?.data[0])
  
      if(resp?.data[0] !== null){
        setname(resp?.data[0].name)
        // setemail(resp?.data[0].email)
        setavatar(resp?.data[0].avatar)
        // set_profile_id(resp?.data[0]._id)
  
        // setname(resp?.data[0].name)
  
      }
      
    
    }).catch(err=>{
    })
    },[]);



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
           src={`${process.env.REACT_APP_DATABASEURL}avatar/${avatar}`} alt={name}
          />{" "}
          <span className="d-none d-xl-inline-block ms-1">{name}</span>{" "}
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>{" "}
        </DropdownToggle>
       <DropdownMenu className="dropdown-menu-end">
           <DropdownItem >
            <Link className="waves-effect waves-light" to="/profile">   <i className="bx bx-user font-size-16 align-middle me-1"></i> View Profile </Link>
          </DropdownItem>
          {/* <DropdownItem tag="a" href="/#">
            <i className="bx bx-wallet font-size-16 align-middle me-1"></i>{" "}
            {props.t("My Wallet")}
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span><i
              className="bx bx-wrench font-size-16 align-middle me-1"></i>{" "}
            {props.t("Settings")}
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1"></i>{" "}
            {props.t("Lock screen")}
          </DropdownItem> */}
       
          
          <Link to="#"   onClick={() => logOut()} className="dropdown-item text-danger">
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