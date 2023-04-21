import React, { useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row, Col, Card, CardBody, CardTitle, Button, UncontrolledPopover,
  PopoverBody, Modal, ModalHeader, ModalBody
} from "reactstrap"
import Select from "react-select";
import { Link } from "react-router-dom"
import AddSchedular from "./CreateScheduler"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import SweetAlert from "react-bootstrap-sweetalert"
import { useHistory } from 'react-router-dom';


// User Status
const optionGroupStaus = [
  {
    label: "Status",
    options: [
      { label: "In Progress", value: "In Progress" },
      { label: "Complete", value: "Complete" },
      { label: "Input missing", value: "Input missing" },
      { label: "In review", value: " In review" },
    ],
  },

];

// Users
const optionGroupMembers = [
  {
    label: "Members",
    options: [
      { label: "Ashish", value: "Ashish" },
      { label: "Nilesh", value: "Nilesh" },
      { label: "Milan", value: "Milan" }
    ],
  },

];

// User Type
const optionGroupType = [
  {
    label: "Type",
    options: [
      { label: "Blog", value: "Blog" },
      { label: "Article", value: "Article" },
      { label: "eBook", value: "eBook" },
      { label: "Infographics", value: "Infographics" },
      { label: "PPT", value: "PPT" },
    ],
  },

];




// const addSchedular = (e) => {
//   setmodal(true);
//   };

const ContentScheduler = () => {
  const history = useHistory();
  const [popoverleft, setpopoverleft] = useState(false)
  const [popoverdismiss, setpopoverdismiss] = useState(false)


  const [modal, setmodal] = useState(false)


  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [sweet_timer, setSweet_timer] = useState(false)
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)


  const updateContentScheduler = (e) => {
    history.push('/update_schedular')
  };


  const deleteContentScheduler = (e) => {
    setconfirm_both(true)
  };


  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 50,
      },
      {
        label: "Web Page",
        field: "web_page",
        sort: "asc",
        width: 200,
      },
      {
        label: "Topic Title",
        field: "topic_title",
        sort: "asc",
        width: 200,
      },
      {
        label: "Content Type",
        field: "content_type",
        sort: "asc",
        width: 50,
      },
      // {
      //   label: "Doc Link",
      //   field: "doc_link",
      //   sort: "asc",
      //   width: 100,
      // },
      // {
      //   label: "Referece Links",
      //   field: "referece_links",
      //   sort: "asc",
      //   width: 100,
      // },
      {
        label: "Expected Words",
        field: "expected_words",
        sort: "asc",
        width: 50,
      },
      {
        label: "Actual Words",
        field: "actual_words",
        sort: "asc",
        width: 50,
      },
      {
        label: "Assigned By",
        field: "assigned_by",
        sort: "asc",
        width: 50,
      },
      {
        label: "Written By",
        field: "written_by",
        sort: "asc",
        width: 50,
      },
      {
        label: "Content Status",
        field: "content_status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Assigned On",
        field: "assigned_on",
        sort: "asc",
        width: 100,
      },
      {
        label: "Submiited On",
        field: "submiited_on",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        width: 50,
      },

    ],
    rows: [
      {
        id: "1",
        web_page: "Home",
        topic_title: (<a href="https://docs.google.com/spreadsheets/" target="_blank"> Digital Marketing </a>),
        content_type: "Blog",
        // doc_link: (<a href="https://docs.google.com/spreadsheets/" target="_blank"> View </a>),
        // referece_links: (<a href="https://docs.google.com/spreadsheets/" target="_blank"> View </a> ),
        expected_words: "50",
        actual_words: "50",
        assigned_by: "Milan",
        written_by: "Ashish",
        content_status: (
        <span class="badge badge-soft-warning font-size-14">In Progress</span>
        ),
        assigned_on: "27-Mar-2023",
        submiited_on: "27-Mar-2023",
        action: (
          <div className="d-flex" style={{
            width: "150px"
          }}>


            {/* <div className="button-items">

              <Button
                id="Popoverdismiss"
                className="btn btn-primary"
                onClick={() => {
                  setpopoverdismiss(!popoverdismiss)
                }}
                style={{
                  cursor: "pointer",
                  marginRight: "10px"
                }}
              >
                View More
              </Button>{" "}
              <UncontrolledPopover
                trigger="focus"
                target="Popoverdismiss"
                placement="left"
              >
                <PopoverBody>
                  <p className="card-title-desc" style={{
                    width: "200px", boxShadow: '1px 2px 9px #3b5de7', padding: "10px"
                  }}>
                    <p> <h6>Assigned By:  <b>Milan</b></h6></p>
                    <p> <h6>Written By:  <b>Ashish</b></h6></p>
                    <p> <h6>Assigned On:  <b>2023/04/25</b> </h6></p>

                  </p>
                </PopoverBody>
              </UncontrolledPopover>
            </div> */}

            <div
              className="btn btn-primary"
              style={{
                cursor: "pointer",
                marginRight: "10px"
              }}
              onClick={() => updateContentScheduler()}
            >
              View
            </div>

            <div
              className="btn btn-danger"
              onClick={() => deleteContentScheduler()}
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

        <Breadcrumbs title="Pages" breadcrumbItem="Content Schedulers" />

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

                to="/create_scheduler"
                className="popup-form btn btn-primary"
              >
                Add Content Scheduler
              </Link>
            </div>
            {/* <AddSchedular  is_open={modal}/> */}
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
                    Add Content Scheduler
                    </ModalHeader>
                  <ModalBody>
                    <form>
                      <Row>
                        <Col lg={6}>
                        <div className="mb-3">
                            <label htmlFor="topic_title">Topic Title</label>
                            <input
                              type="text"
                              className="form-control"
                              id="topic_title"
                              placeholder="Enter Topic Title"
                            />
                          </div>
                        </Col>

                        
                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="doc_link">Doc Link</label>
                            <input
                              type="url"
                              className="form-control"
                              id="doc_link"
                              placeholder="Enter Doc Link"
                            />
                          </div>
                        </Col>


                      
                        <Col lg={12}>
                          <div className="mb-3">
                            <label htmlFor="referece_links">Referece Links</label>
                            <input
                              type="url"
                              className="form-control"
                              id="referece_links"
                              placeholder="Enter Referece Links"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>

                      <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="expected_words">Expected Words</label>
                            <input
                              type="number"
                              className="form-control"
                              id="expected_words"
                              placeholder="Enter Expected Words"
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="actual_words">Actual Words</label>
                            <input
                              type="number"
                              className="form-control"
                              id="actual_words"
                              placeholder="Enter Actual Words"
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="written_by">Written By</label>
                            <Select
                      id="written_by"
                      isMulti={false}
                      options={optionGroupMembers}
                      classNamePrefix="select2-selection"
                    />
                          </div>
                        </Col>


                      <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="user_type">Content Type</label>
                        <Select
                      id="user_type"
                      isMulti={false}
                      options={optionGroupType}
                      classNamePrefix="select2-selection"
                    />
                      </div>
                    </Col>

                      <Col lg={12}>
                      <div className="mb-3">
                        <label htmlFor="user_status">Status</label>
                        <Select
                      id="user_status"
                      isMulti={false}
                      options={optionGroupStaus}
                      classNamePrefix="select2-selection"
                    />
                      </div>
                    </Col>


                        <Col lg={6}>
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
                <CardTitle>Content Schedulers List </CardTitle>
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

      </div>

    </React.Fragment>
  )
}

export default ContentScheduler
