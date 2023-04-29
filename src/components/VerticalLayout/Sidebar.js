import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { connect, useSelector } from "react-redux"
import { withRouter, Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"
import { getUserProfile } from '../../helpers/backend_helper'
import avatar2 from "../../assets/images/users/avatar-2.jpg"

const Sidebar = props => {

  const {userDetail} = useSelector((state)=>state?.Login)
  const [avatar, setavatar] = useState();
  const [name, setname] = useState(null);
  // console.log('useDetails =>', userDetail);
  // const get_auth_user = localStorage.getItem('authUser');
  // const get_auth_user = JSON.parse(localStorage.getItem("authUser"))
  // const user_avatar = get_auth_user.avatar

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

  // put(`${url.UPDATE_MEMBER}/${'6449f881268ec292ea774b50'}`, data, {headers: {'Content-Type': 'multipart/form-data'}}
  
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="h-100">
          <div className="user-wid text-center py-4">
            <div className="user-img">
              <img src={`${process.env.REACT_APP_DATABASEURL}avatar/${avatar}`} alt={name} className="avatar-md mx-auto rounded-circle" />
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