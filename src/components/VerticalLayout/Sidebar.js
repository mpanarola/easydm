import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { connect, useSelector } from "react-redux"
import { withRouter, Link } from "react-router-dom"
//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"
import { getUserProfile } from '../../helpers/backend_helper'
// import avatar2 from "../../assets/images/users/avatar-2.jpg"

const Sidebar = props => {
  const { userDetail } = useSelector((state) => state?.Login);
  const [avatar, setavatar] = useState();
  const [name, setname] = useState(null);
  // console.log('useDetails =>', userDetail);
  // const get_auth_user = localStorage.getItem('authUser');
  // const get_auth_user = JSON.parse(localStorage.getItem("authUser"))
  // const user_avatar = get_auth_user.avatar


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

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="h-100">
          <div className="user-wid text-center py-4">
            <div className="user-img">
              <img src={`${process.env.REACT_APP_BACKEND}avatar/${avatar}`} alt={name} className="avatar-md mx-auto rounded-circle" />
            </div>

            <div className="mt-3">
              <Link to="#" className="text-dark fw-medium font-size-16">{name}</Link>
              {/* <p className="text-body mt-1 mb-0 font-size-13">UI/UX Designer</p> */}
            </div>
          </div>
          <div data-simplebar className="h-100">
            {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))