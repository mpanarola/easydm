import React, { useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row, Col, Card, CardBody, CardTitle
} from "reactstrap"
import { Link } from "react-router-dom"

import SweetAlert from "react-bootstrap-sweetalert"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

import { useHistory } from 'react-router-dom';

const Backlink = () => {

  const history = useHistory();
  // const updateWebpage = (e) => {
  //   history.push("/update_backlink")}
  //  };
  const [selectedMulti, setselectedMulti] = useState(null);
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)

  const deleteBacklink = (e) => {
    // alert('')
    setconfirm_both(true)
  };


  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Web Page",
        field: "webpage",
        sort: "asc",
        width: 150,
      },
      {
        label: "Published On",
        field: "date",
        sort: "asc",
        width: 200,
      },
      {
        label: "Category",
        field: "category",
        sort: "asc",
        width: 270,
      },
      {
        label: "Month-Year",
        field: "month_year",
        sort: "asc",
        width: 200,
      },
      {
        label: "No. of Backlinks",
        field: "total_backlinks",
        sort: "asc",
        width: 170,
      },
      {
        label: "Action",
        field: "action",
        width: 250,
      },

    ],
    rows: [
      {
        id: "1",
        webpage: (
          <a href="https://www.home.com/" rel="noopener" target="_blank">Home</a>
        ),
        date: "27-Mar-2023",
        // webpage_url: "",
        category: "Blogs",
        month_year: "Mar-23",
        total_backlinks: (
      <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>45 +</span>
        ),
       
        action: (
          <div className="d-flex" >
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_backlink') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteBacklink()}
            >
              Delete
            </div>

          </div>
        )
      },
      {
        id: "2",
        webpage: (
          <a href="https://www.about.com" target="_blank">About</a>
        ),
        date: "27-Mar-2023",
        category: "Industry",
        month_year: "Mar-23",
        total_backlinks:(
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>50 +</span>
        ),
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_backlink') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteBacklink()}
            >
              Delete
            </div>

          </div>
        )
      },
      {
        id: "3",
        webpage: (
          <a href="https://www.contact.com" target="_blank">Contact</a>
        ),
        date: "27-Mar-2023",
        category: "Career",
        month_year: "Mar-23",
        total_backlinks: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>25 +</span>
        ),
        
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_backlink') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteBacklink()}
            >
              Delete
            </div>

          </div>
        )
      },
      {
        id: "4",
        webpage: (
          <a href="https://www.blogs.com" target="_blank">Blogs</a>
        ),
        date: "27-Mar-2023",
        category: "Blogs",
        month_year: "Mar-23",
        total_backlinks: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>20 +</span>
        ),
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_backlink') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteBacklink()}
            >
              Delete
            </div>

          </div>
        )
      },
      {
        id: "5",
        webpage: (
          <a href="https://www.events.com" target="_blank">Events</a>
        ),
        date: "27-Mar-2023",
        category: "Services",
        month_year: "Mar-23",
        total_backlinks: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>10 +</span>
        ),
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_backlink') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteBacklink()}
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

        <Breadcrumbs title="Pages" breadcrumbItem="Back Links" />

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
                onClick={() => {
                  history.push("/create_backlink")
                }}
                to="#"
                className="btn btn-primary"
              >
                Add Back Link
              </Link>
            </div>
          </CardBody>
        </Card>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle>Back Links List</CardTitle>
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
                  setdynamic_description("Your back link has been deleted.")
                }}
                onCancel={() => {
                  setconfirm_both(false)
                  setsuccess_dlg(true)
                  setdynamic_title("Cancelled")
                  setdynamic_description("Your back link is safe :)")
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

export default Backlink
