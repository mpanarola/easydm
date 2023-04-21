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
        expected_words: (
          <span class="bg-primary badge badge-secondary" style={{fontSize: "14px"}}>1450</span>
        ),
        actual_words: (
          <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>50</span>
        ),
        assigned_by: "Milan",
        written_by: "Ashish",
        content_status: (
        <span class="bg-warning badge badge-secondary font-size-13">In Progress</span>
        ),
        assigned_on: "27-Mar-2023",
        submiited_on: "27-Mar-2023",
        action: (
          <div className="d-flex" style={{
            width: "150px"
          }}>

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
                setdynamic_description("Your content schedular has been deleted.")
              }}
              onCancel={() => {
                setconfirm_both(false)
                setsuccess_dlg(true)
                setdynamic_title("Cancelled")
                setdynamic_description("Your content schedular is safe :)")
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
