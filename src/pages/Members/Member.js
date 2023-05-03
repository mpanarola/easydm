import React, { useEffect, useMemo, useState } from "react"
import { useAlert } from "react-alert";
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"
// import Select from "react-select";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import { useHistory, withRouter } from 'react-router-dom';
import SweetAlert from "react-bootstrap-sweetalert"
import { useDispatch } from "react-redux"

import Moment from 'moment';
import { deleteMember, getMembers } from "../../store/actions"
import { memberDelete, getAllMembers } from '../../helpers/backend_helper'
import { columns } from './Constants'

const Member = () => {
  const [modal, setmodal] = useState(false)


  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [sweet_timer, setSweet_timer] = useState(false)
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)

  const [is_loading, setloading] = useState(true)


  const [members_list, setcmembers_list] = useState([])
  const [record_id, set_id] = useState()
  const get_auth_user = JSON.parse(localStorage.getItem("authUser"))

  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();


  const updateMember = (data) => {
    history.push({
      pathname: '/update_member',
      state: { data: data },
    })
  };


  useEffect(() => {
    setTimeout(function () {
      allMembers()
    }, 1000);

  }, []);

  const confirmDelete = (id) => {
    setconfirm_both(true)
    set_id(id)

  };

  const deleteMember = () => {
    if (record_id !== '') {
      memberDelete(record_id).then(resp => {
        setconfirm_both(false)
        alert.success('Your member has been deleted.');
        allMembers()
        if (resp?.message == 'Unauthorized User!!') {
          history.push('/logout')
          alert.error('Session timeout');
        }
      }).catch(err => {
        alert.error('Please try again...');
      })

    }
  };


   const payload =  {
    "options": {
      "sort": {
        "createdAt": [1/-1]
    }
    }
  }

  const allMembers = (event, values) => {
    getAllMembers(payload).then(resp => {
      setcmembers_list(resp?.data[0]?.list)
      // console.log('resp?.data ', resp?.data[0]?.list)
      setloading(false)
      dispatch(getMembers(resp?.data))
      if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      }

    }).catch(err => {
      dispatch(getMembers(err.response))
      alert.error('Backend server not responding, Please try again....');
    })

  }

  const rows = useMemo(() =>
    members_list && members_list.map((row, order) => ({
      ...row,
      id: order + 1,
      name: row.name,
      avatar: (
        <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
            <img src={`${'http://192.168.100.14:8080/avatar'}/${row.avatar}`} title={row.name} alt={row.name} className="avatar-sm rounded-circle" />
          </div>
        </div>
      ),
      email: row.email,
      userType: row.userType,
      isActive: (
        row.isActive ?
          <span className="bg-primary badge badge-secondary font-size-13">Active</span>
          : <span className="bg-danger badge badge-secondary font-size-13">In Active</span>

      ),
      createdAt: Moment(row.createdAt).format('DD-MMM-YY'),
      action: (
        <div className="d-flex">
          <div
            className="btn btn-primary"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}

            onClick={() => updateMember(row)}
          >
            Update
          </div>
          { get_auth_user.userRole == 1 &&
              <div
                className="btn btn-danger"
                onClick={() => confirmDelete(row._id)}
              >
                Delete
              </div>
          }

        </div>
      )


    })), [members_list])

  return (
    <React.Fragment>
      <div className="page-content">

        <Breadcrumbs title="Pages" breadcrumbItem="Members" />
        
        {success_dlg ? (
          <SweetAlert
            success
            title={dynamic_title}
            onConfirm={() => {
              setsuccess_dlg(false)
            }}
          >
            {dynamic_description}
          </SweetAlert>
        ) : null}

        <Card >
          <CardBody>
            {/* <CardTitle className="mb-4 ">Add Website</CardTitle> */}
            <div className="float-end">
              <Link
                // onClick={()=>{history.push('/create_member')}}
                to="/create_member"
                className="popup-form btn btn-primary"
              >
                Add Member
              </Link>
            </div>


          </CardBody>
        </Card>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle>Members List </CardTitle>
                {
                  is_loading == true ?   <span className="spinner-grow spinner-grow-sm"></span> :
                
                <MDBDataTable responsive bordered data={{ rows, columns }} />
              }
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Delete popup */}
        <Col xl="3" lg="4" sm="6" className="mb-2">

          {confirm_both ? (
            <SweetAlert
              title="Are you sure?"
              warning
              showCancel
              confirmBtnBsStyle="success"
              cancelBtnBsStyle="danger"
              onConfirm={() => {
                deleteMember()
                setconfirm_both(false)
                // setsuccess_dlg(true)
                // setdynamic_title("Deleted")
                // setdynamic_description("Your member has been deleted.")
              }}
              onCancel={() => {
                setconfirm_both(false)
                // setsuccess_dlg(true)
                // setdynamic_title("Cancelled")
                // setdynamic_description("Your member is safe :)")
              }}
            >
              You won't be able to revert this!
            </SweetAlert>
          ) : null}
        </Col>


      </div>

    </React.Fragment>
  )
}

// export default Member
export default withRouter(Member)
