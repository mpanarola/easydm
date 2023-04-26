import React, { useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row, Col, Card, CardBody, CardTitle, Button
} from "reactstrap"
import { Link } from "react-router-dom"

import SweetAlert from "react-bootstrap-sweetalert"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

import { useHistory } from 'react-router-dom';

const Daybook = () => {

  const history = useHistory();
  // const updateWebpage = (e) => {
  //   history.push("/update_daybook")}
  //  };
  const [selectedMulti, setselectedMulti] = useState(null);
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)

  const deleteDaybook = (e) => {
    // alert('')
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
        width: 270,
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 200,
      },
      {
        label: "Hours",
        field: "hours",
        sort: "asc",
        width: 270,
      },

      // {
      //   label: "Details",
      //   field: "details",
      //   sort: "asc",
      //   width: 200,
      // },
      
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
        // webpage_url: "",
        name: "Ashish",
        date: "27-Mar-2023",
        hours: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>8</span>
        ),
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_daybook') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteDaybook()}
            >
              Delete
            </div>

          </div>
        )
      },
      {
        id: "2",
        photo: (
          <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
          <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" />
          </div>
        </div>
        ),
        name: "Nilesh",
        date: "27-Mar-2023",
        hours: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>10</span>
        ),
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_daybook') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteDaybook()}
            >
              Delete
            </div>

          </div>
        )
      },
      {
        id: "3",
        photo: (
          <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
          <img src="/static/media/avatar-2.feb0f89d.jpg" alt="" className="avatar-sm rounded-circle" />
          </div>
        </div>
        ),
        name: "Milan",
        date: "27-Mar-2023",
        hours: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>2</span>
        ),
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_daybook') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteDaybook()}
            >
              Delete
            </div>

          </div>
        )
      }

    ],
  }

  return (
    <React.Fragment>
      <div className="page-content">

        <Breadcrumbs title="Pages" breadcrumbItem="Day Books" />

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
          <CardBody > 
            {/* <CardTitle className="mb-4 ">Add Website</CardTitle> */}

            <div className="col-md-8 float-start">
            <div> <div class="card-title">Date Filter</div> </div>
            <div className="float-start  d-flex ">
              
              <input type="date" name="start_date" className="form-control"  />
              {/* <span>Start</span> */}
              <input type="date" name="end_date" className="form-control mx-2"/>
              <button type="button" className="btn btn-secondary" >
                         Search
                        </button>
            </div>
            </div>

            <div className="col-md-4 float-end mt-4">
            <div className="float-end ">
              <Link
                onClick={() => {
                  history.push("/create_daybook")
                }}
                to="#"
                className="btn btn-primary"
              >
                Add Day Book
              </Link>
            </div>
            </div>
          </CardBody>
        </Card>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle>Day Books List</CardTitle>
                <MDBDataTable responsive bordered data={data} />
              </CardBody>
            </Card>
          </Col>

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
                  setdynamic_description("Your day book has been deleted.")
                }}
                onCancel={() => {
                  setconfirm_both(false)
                  setsuccess_dlg(true)
                  setdynamic_title("Cancelled")
                  setdynamic_description("Your day book is safe :)")
                }}
              >
                You won't be able to revert this!
              </SweetAlert>
            ) : null}
          </Col>
        </Row>
      </div>

    </React.Fragment>
  )
}

export default Daybook
