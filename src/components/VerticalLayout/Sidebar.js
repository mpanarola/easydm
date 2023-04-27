import PropTypes from "prop-types"
import React from "react"
import { connect, useSelector } from "react-redux"
import { withRouter, Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import avatar2 from "../../assets/images/users/avatar-2.jpg"

const Sidebar = props => {

  const {userDetail} = useSelector((state)=>state?.Login)
  // console.log('useDetails =>', userDetail);
  // const get_auth_user = localStorage.getItem('authUser');
  const get_auth_user = JSON.parse(localStorage.getItem("authUser"))
  
  // console.log('get_auth_user ', get_auth_user.token)
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="h-100">
          <div className="user-wid text-center py-4">
            <div className="user-img">
              <img src={get_auth_user.avatar} alt="" className="avatar-md mx-auto rounded-circle" />
            </div>

              <div className="mt-3">
                <Link to="#" className="text-dark fw-medium font-size-16">{get_auth_user.name}</Link>
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