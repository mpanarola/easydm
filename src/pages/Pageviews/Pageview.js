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
  //   history.push("/update_page_view")}
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
        label: "Category",
        field: "category",
        sort: "asc",
        width: 270,
      },
      {
        label: "Page Views",
        field: "total_pageviews",
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
        label: "Published On",
        field: "date",
        sort: "asc",
        width: 200,
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
        webpage: (
          <a href="https://www.home.com/" rel="noopener" target="_blank">Home</a>
        ),
        // webpage_url: "",
        category: "Blogs",
        month_year: "Mar-23",
        total_pageviews: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>350 +</span>
        ),
        date: "27-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_page_view') }}
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
        category: "Industry",
        month_year: "Mar-23",
        total_pageviews: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>1450 +</span>
        ),
        date: "27-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_page_view') }}
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
        category: "Career",
        month_year: "Mar-23",
        total_pageviews: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>650 +</span>
        ),
        date: "27-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_page_view') }}
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
        category: "Blogs",
        month_year: "Mar-23",
        total_pageviews: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>200 +</span>
        ),
        date: "27-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_page_view') }}
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
        category: "Services",
        month_year: "Mar-23",
        total_pageviews: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>500 +</span>
        ),
        date: "27-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_page_view') }}
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

        <Breadcrumbs title="Pages" breadcrumbItem="Page Views" />

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
                  history.push("/create_page_view")
                }}
                to="#"
                className="btn btn-primary"
              >
                Add Page View
              </Link>
            </div>
          </CardBody>
        </Card>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle>Page Views List</CardTitle>
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
                  setdynamic_description("Your page view has been deleted.")
                }}
                onCancel={() => {
                  setconfirm_both(false)
                  setsuccess_dlg(true)
                  setdynamic_title("Cancelled")
                  setdynamic_description("Your page view is safe :)")
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
