import React, { useEffect, useMemo, useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row, Col, Card, CardBody, CardTitle, Button, UncontrolledPopover,
  PopoverBody, Modal, ModalHeader, ModalBody
} from "reactstrap"
import Select from "react-select";
import { Link } from "react-router-dom"
import AddSchedular from "./CreateScheduler"
import { useAlert } from "react-alert";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import SweetAlert from "react-bootstrap-sweetalert"
import { useHistory } from 'react-router-dom';
import { columns, payload } from './Constants'
import Moment from 'moment';
import { getContentSchedulars, deleteSchedular } from '../../helpers/backend_helper'


const ContentScheduler = () => {
  const history = useHistory();
  const alert = useAlert();

  const [schedulars_list, setSchedulars_list] = useState([])
  const [record_id, set_id] = useState()
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [sweet_timer, setSweet_timer] = useState(false)
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)
  const get_auth_user = JSON.parse(localStorage.getItem("authUser"))
  const [is_loading, setloading] = useState(true)

  const updateContentScheduler = (data) => {
    history.push({
      pathname: '/update_schedular',
      state: { data: data },
    })

  };


  const confirmDelete = (id) => {
    setconfirm_both(true)
    set_id(id)

  };

  const deleteContentScheduler = (e) => {
    // setconfirm_both(true)

    if (record_id !== '') {
      deleteSchedular(record_id).then(resp => {
        setconfirm_both(false)
        alert.success('Scheduler has been deleted.');
        getAllSchedulars()
        if (resp?.message == 'Unauthorized User!!') {
          history.push('/logout')
          alert.error('Session timeout');
        }
      }).catch(err => {
        alert.error('Please try again...');
      })

    }

  };

  const getAllSchedulars = (event, values) => {
    getContentSchedulars(payload).then(resp => {
      setSchedulars_list(resp?.data[0]?.list)
      setloading(false)
      if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      }

    }).catch(err => {
      alert.error('Backend server not responding, Please try again....');
    })

  }

  useEffect(() => {
    setTimeout(function () {
      getAllSchedulars()
    }, 1000);

  }, []);


  const rows = useMemo(() =>
    schedulars_list && schedulars_list.map((row, order) => ({
      ...row,
      id: order + 1,
      content_type: row.contentType,
      web_page: (<a href={row.webpage && row.webpage.webpageUrl} target="_blank"> {row.webpage && row.webpage.webpage} </a>),
      topic_title: (<a href={row.docLink} target="_blank"> {row.topicTitle} </a>),
      expected_words: (
        <span class="bg-primary badge badge-secondary" style={{ fontSize: "14px" }}>{row.expectedWords}</span>
      ),
      actual_words: (
        <span class="bg-info badge badge-secondary" style={{ fontSize: "14px" }}>{row.actualWords}</span>
      ),
      assigned_on: Moment(row.assignedOn).format('DD-MMM-YYYY'),
      assigned_by: row.assignedBy && row.assignedBy.name,
      submiited_on: Moment(row.submitedOn).format('DD-MMM-YYYY'),
      written_by: row.assignedBy && row.assignedBy.name,
      content_status: (
        row.contentStatus == "Complete" ?
          <span class="bg-success badge badge-success font-size-13">{row.contentStatus}</span>
          :
          row.contentStatus == "Input-missing" ?
            <span class="bg-danger badge badge-danger font-size-13">{row.contentStatus}</span>
            : <span class="bg-warning badge badge-secondary font-size-13">{row.contentStatus}</span>
      ),

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
            onClick={() => updateContentScheduler(row)}
          >
            View
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


    })), [schedulars_list])


  // rows: [
  //   {

  //   },
  // ]

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
                deleteContentScheduler()
                setconfirm_both(false)
              }}
              onCancel={() => {
                setconfirm_both(false)
                // setsuccess_dlg(true)
                // setdynamic_title("Cancelled")
                // setdynamic_description("Your content schedular is safe :)")
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
