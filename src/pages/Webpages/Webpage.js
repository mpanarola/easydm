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

const Webpage = () => {

  const history = useHistory();
  // const updateWebpage = (e) => {
  //   history.push("/update_website")}
  //  };
  const [selectedMulti, setselectedMulti] = useState(null);
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)

  const deleteWebpage = (e) => {
    // alert('')
    setconfirm_both(true)
  };


  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }

  const optionGroupCategory = [
    {
      label: "Category",
      options: [
        { label: "Services", value: "Services" },
        { label: "Industry", value: "Industry" },
        { label: "Technologies", value: "Technologies" },
        { label: "Career", value: "Career" },
        { label: "Blogs", value: "Blogs" }
      ],
    },

  ];

  const optionGroup = [
    {
      label: "Members",
      options: [
        { label: "Ashish", value: "Ashish" },
        { label: "Nilesh", value: "Nilesh" },
        { label: "Milan", value: "Milan" },
      ],
    },

  ];

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
      // {
      //   label: "Web Page URL",
      //   field: "webpage_url",
      //   sort: "asc",
      //   width: 270,
      // },
      {
        label: "Assigned To",
        field: "assigned_to",
        sort: "asc",
        width: 270,
      },
      {
        label: "Effective From",
        field: "effective_from",
        sort: "asc",
        width: 270,
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
        assigned_to: (
          <div className="d-flex align-items-start">
            <div className="me-3 align-self-center">
              <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" />
            </div>
            <div className="me-3 align-self-center">
              <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" />
            </div>
          </div>
        ),
        effective_from: "30-Mar-2023",
        date: "27-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_website') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteWebpage()}
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
        assigned_to: (
          <div className="d-flex align-items-start">
            <div className="me-3 align-self-center">
              <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" />
            </div>
            <div className="me-3 align-self-center">
              <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" />
            </div>
          </div>
        ),
        effective_from: "30-Mar-2023",
        date: "29-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_website') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteWebpage()}
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
        assigned_to: (
          <div className="d-flex align-items-start">
            <div className="me-3 align-self-center">
              <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" />
            </div>
            <div className="me-3 align-self-center">
              <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" />
            </div>
          </div>
        ),
        effective_from: "1-Apr-2023",
        date: "28-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_website') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteWebpage()}
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
        assigned_to: (
          <div className="d-flex align-items-start">
            <div className="me-3 align-self-center">
              <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" />
            </div>
            <div className="me-3 align-self-center">
              <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" />
            </div>
          </div>
        ),
        effective_from: "28-Mar-2023",
        date: "27-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_website') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteWebpage()}
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
        assigned_to: (
          <div className="d-flex align-items-start">
            <div className="me-3 align-self-center">
              <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" />
            </div>
            <div className="me-3 align-self-center">
              <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" />
            </div>
          </div>
        ),
        effective_from: "30-Mar-2023",
        date: "27-Mar-2023",
        action: (
          <div className="d-flex">
            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => { history.push('/update_website') }}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteWebpage()}
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

        <Breadcrumbs title="Pages" breadcrumbItem="Websites" />

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
                  history.push("/create_website")
                }}
                to="#"
                className="btn btn-primary"
              >
                Add Website
              </Link>
            </div>

            {/* <Modal
              size="lg"
              isOpen={modal}
              toggle={() => {
                setmodal(!modal)
              }}
            >
              <ModalHeader
                toggle={() => {
                  setmodal(!modal)
                }}
                className="h4 mt-0 mb-4"
              >
                Add Website
              </ModalHeader>
              <ModalBody>
                <form>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <label htmlFor="name">Website</label>
                        <input
                          type="text"
                          className="form-control"
                          id="webpage"
                          placeholder="Enter Web Page"
                        />
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="mb-3">
                        <label htmlFor="webpage_url">Web Page URL</label>
                        <input
                          type="url"
                          className="form-control"
                          id="webpage_url"
                          placeholder="Enter Web Page URL"
                        />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <Select
                      id="category"
                      options={optionGroupCategory}
                      classNamePrefix="select2-selection"
                    />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="mb-3">
                        <label htmlFor="assigned_to">Assign Members</label>
                        <Select
                      value={selectedMulti}
                      id="assigned_to"

                      isMulti={true}
                      onChange={() => {
                        handleMulti();
                      }}
                      options={optionGroup}
                      classNamePrefix="select2-selection"
                    />
                      </div>
                    </Col>


                    <Col lg={12}>
                      <div className="mb-3">
                        <label htmlFor="effective_from">Effective From</label>
                        <input
                          type="date"
                          className="form-control"
                          id="effective_from"
                        />
                      </div>
                    </Col>


                    <Col lg={12}>
                      <div className="text-right">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </Col>
                  </Row>

                </form>
              </ModalBody>
            </Modal> */}
          </CardBody>
        </Card>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle>Website Lists </CardTitle>
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
                  setdynamic_description("Your file has been deleted.")
                }}
                onCancel={() => {
                  setconfirm_both(false)
                  setsuccess_dlg(true)
                  setdynamic_title("Cancelled")
                  setdynamic_description("Your imaginary file is safe :)")
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

export default Webpage
