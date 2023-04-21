import React, { useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle,   Modal,
  ModalHeader,
  ModalBody, } from "reactstrap"
  import { Link } from "react-router-dom"
  import Select from "react-select";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import { useHistory } from 'react-router-dom';
import SweetAlert from "react-bootstrap-sweetalert"


const Member = () => {
  const [modal, setmodal] = useState(false)


  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [sweet_timer, setSweet_timer] = useState(false)
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)

  const history = useHistory();

  const updateMember = (e) => {
    history.push('/update_member')
  };
  
  
  const deleteMember = (e) => {
    setconfirm_both(true)
  };

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Photo",
        field: "photo",
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
        field: "type",
        sort: "asc",
        width: 200,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 150,
      },
      {
        label: "Created On",
        field: "created_on",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        width: 200,
      },
     
    ],
    rows: [
      {
        id: "1",
        photo: ( 
          <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
            <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" />
          </div>
        </div>
        ),
        name: "Ashish",
        email: "ashish@narola.email",
        type: "DM Executive",
        status: (
          <span className="bg-primary badge badge-secondary font-size-13">Active</span>
        ),
        created_on: "25-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => updateMember()}
            >
              Update
            </div>
            
            <div
              className="btn btn-danger"
              onClick={() => deleteMember()}
            >
              Delete
            </div>

          </div>
        )
      },
      
      {
        id: "2",
        name: "Nilesh",
        photo: ( 
          <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
          <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" />
          </div>
        </div>
        ),
        email: "nilesh@narola.email",
        type: "Graphic Designer",
        status: (
          <span className="bg-primary badge badge-secondary font-size-13">Active</span>
        ),
        created_on: "25-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => updateMember()}
            >
              Update
            </div>
            
            <div
              className="btn btn-danger"
              onClick={() => deleteMember()}
            >
              Delete
            </div>

          </div>
        )
      },

      {
        id: "3",
        name: "Milan",
        photo: ( 
          <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
          <img src="/static/media/avatar-2.feb0f89d.jpg" alt="" className="avatar-sm rounded-circle" />
          </div>
        </div>
        ),
        email: "milan@narola.email",
        type: "Content Writer",
        status: (
          <span className="bg-danger badge badge-secondary font-size-13">InActive</span>
        ),
        created_on: "27-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => updateMember()}
            >
              Update
            </div>
            
            <div
              className="btn btn-danger"
              onClick={() => deleteMember()}
            >
              Delete
            </div>

          </div>
        )
      },
      
      
     
      
    ],
  }

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
                <MDBDataTable responsive bordered data={data} />
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

export default Member
