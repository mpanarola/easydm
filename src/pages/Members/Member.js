import React, { useEffect, useMemo, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle,   Modal,
  ModalHeader,
  ModalBody, } from "reactstrap"
  import { Link } from "react-router-dom"
  import Select from "react-select";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import { useHistory, withRouter } from 'react-router-dom';
import SweetAlert from "react-bootstrap-sweetalert"
import { useDispatch } from "react-redux"

import Moment from 'moment';
import { deleteMember , getMembers } from "../../store/actions"
import { memberDelete, getAllMembers } from '../../helpers/backend_helper'


const Member = () => {
  const [modal, setmodal] = useState(false)


  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [sweet_timer, setSweet_timer] = useState(false)
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)

  const [members_list, setcmembers_list] = useState([])


  const history = useHistory();
  const dispatch = useDispatch();

  const updateMember = (data) => {
      history.push({
      pathname: '/update_member',
      state: { data: data },
    })
  };
  

  useEffect(()=>{
    allMembers()
},[]);

  const deleteMember = (e) => {
    setconfirm_both(true)
  };


  const allMembers = (event, values) => {
    getAllMembers().then(resp=>{
      setcmembers_list(resp?.data?.list)
      console.log('resp?.data ', resp?.data?.list)
      dispatch(getMembers(resp?.data))
    
    }).catch(err=>{
      dispatch(getMembers(err.response))
      // console.log('resp err=>>', err.response);
    })
    
  }


  const columns = [
    {
      label: "ID",
      field: "id",
      sort: "asc",
      width: 150,
    },
    {
      label: "Photo",
      field: "avatar",
      sort: "asc",
      width: 150,
    },
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 100,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 270,
    },
    {
      label: "Type",
      field: "userType",
      sort: "asc",
      width: 200,
    },
    {
      label: "Status",
      field: "isActive",
      sort: "asc",
      width: 150,
    },
    {
      label: "Created On",
      field: "createdAt",
      sort: "asc",
      width: 100,
    },
    {
      label: "Action",
      field: "action",
      width: 200,
    },
   
  ];

  const rows = useMemo(() => 
  members_list.map((row, order) => ({
    ...row,
        id: order+1,
              name: row.name,
              avatar: ( 
               
                <div className="d-flex align-items-start">
                <div className="me-3 align-self-center">
                <img src= {`${'http://localhost:8080/avatar'}/${row.avatar}`}  alt={row.name} className="avatar-sm rounded-circle" />
                </div>
              </div>
              ),
              email: row.email,
              userType: row.userType,
              isActive: (
                row.isActive ? 
                <span className= "bg-primary badge badge-secondary font-size-13">Active</span>
                : <span className= "bg-primary badge badge-secondary font-size-13">In Active</span>
              
              ),
              createdAt:  Moment(row.createdAt).format('DD-MMMM-YYYY'),
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
                  
                  <div
                    className="btn btn-danger"
                    onClick={() => deleteMember(row._id)}
                  >
                    Delete
                  </div>
          
                </div>
              )

     
  })), [members_list])




// const rows = [
//   ,
  
//   {
//     id: "2",
//     name: "Nilesh",
//     photo: ( 
//       <div className="d-flex align-items-start">
//       <div className="me-3 align-self-center">
//       <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" />
//       </div>
//     </div>
//     ),
//     email: "nilesh@narola.email",
//     type: "Graphic Designer",
//     status: (
//       <span className="bg-primary badge badge-secondary font-size-13">Active</span>
//     ),
//     created_on: "25-Mar-2023",
//     action: (
//       <div className="d-flex">
//         <div
//           className="btn btn-primary"
//           style={{
//             cursor: "pointer",
//             marginRight: "10px"
//           }}
//           onClick={() => updateMember()}
//         >
//           Update
//         </div>
        
//         <div
//           className="btn btn-danger"
//           onClick={() => deleteMember()}
//         >
//           Delete
//         </div>

//       </div>
//     )
//   },

//   {
//     id: "3",
//     name: "Milan",
//     photo: ( 
//       <div className="d-flex align-items-start">
//       <div className="me-3 align-self-center">
//       <img src="/static/media/avatar-2.feb0f89d.jpg" alt="" className="avatar-sm rounded-circle" />
//       </div>
//     </div>
//     ),
//     email: "milan@narola.email",
//     type: "Content Writer",
//     status: (
//       <span className="bg-danger badge badge-secondary font-size-13">InActive</span>
//     ),
//     created_on: "27-Mar-2023",
//     action: (
//       <div className="d-flex">
//         <div
//           className="btn btn-primary"
//           style={{
//             cursor: "pointer",
//             marginRight: "10px"
//           }}
//           onClick={() => updateMember()}
//         >
//           Update
//         </div>
        
//         <div
//           className="btn btn-danger"
//           onClick={() => deleteMember()}
//         >
//           Delete
//         </div>

//       </div>
//     )
//   } 
// ]

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
                <MDBDataTable responsive bordered data={{ rows, columns }} />
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
                      setconfirm_both(false)
                      setsuccess_dlg(true)
                      setdynamic_title("Deleted")
                      setdynamic_description("Your member has been deleted.")
                    }}
                    onCancel={() => {
                      setconfirm_both(false)
                      setsuccess_dlg(true)
                      setdynamic_title("Cancelled")
                      setdynamic_description("Your member is safe :)")
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
