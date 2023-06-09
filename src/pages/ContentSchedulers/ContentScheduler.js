import React, { useEffect, useMemo, useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row, Col, Card, CardBody, CardTitle
} from "reactstrap"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert";
//Import Breadcrumb
import "./datatables.scss"
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
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
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
      webpage_search: row.webpage && row.webpage.webpage,
      webpage_url_search: row.webpage && row.webpage.webpageUrl,
      topic_title: (<div style={{
        width: "150px"
      }}> <a href={row.docLink} target="_blank"> {row.topicTitle} </a></div>),
      expected_words: (
        // <span class="bg-primary badge badge-secondary" style={{ fontSize: "14px" }}>{row.expectedWords}</span>
        row.expectedWords
      ),
      actual_words: (
        // <span class="bg-info badge badge-secondary" style={{ fontSize: "14px" }}>{row.actualWords}</span>
        row.actualWords
      ),
      assigned_on: Moment(row.assignedOn).format('DD-MMM-YY'),
      assigned_by:  <div className="d-flex align-items-start">
      <div className="me-3 align-self-center">
        <img src={`${process.env.REACT_APP_BACKEND}avatar/${row.assignedBy.avatar}`} title={ row.assignedBy && row.assignedBy.name} alt={ row.assignedBy && row.assignedBy.name} className="avatar-sm rounded-circle" />
      </div>
    </div>,
      submiited_on: Moment(row.submitedOn).format('DD-MMM-YY'),
      written_by: <div className="d-flex align-items-start">
      <div className="me-3 align-self-center">
        <img src={`${process.env.REACT_APP_BACKEND}avatar/${row.writtenBy.avatar}`} title={ row.writtenBy && row.writtenBy.name} alt={ row.assignedBy && row.assignedBy.name} className="avatar-sm rounded-circle" />
      </div>
    </div>,
      content_status: (
        row.contentStatus == "Complete" ?
          <span class="bg-success badge badge-success font-size-13">{row.contentStatus}</span>
          :
          row.contentStatus == "Input-missing" ?
            <span class="bg-danger badge badge-danger font-size-13">{row.contentStatus}</span>
            : row.contentStatus == "In-review" ?
              <span class="bg-info badge badge-info font-size-13">{row.contentStatus}</span>
              :
              <span class="bg-warning badge badge-secondary font-size-13">{row.contentStatus}</span>
      ),

      action: (
        <div className="d-flex">
          <div
            className="btn btn-primary fas fa-edit"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => updateContentScheduler(row)}
          >
          </div>

          {get_auth_user.userRole == 1 &&
            <div
              className="btn btn-danger fas fa-trash"
              onClick={() => confirmDelete(row._id)}
            >
            </div>
          }
        </div>
      )
    })), [schedulars_list])

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
            <div className="float-end add_new">
              <Link

                to="/create_scheduler"
                className="popup-form btn btn-primary fas fa-plus"
                title="Add New"
              >
              </Link>
            </div>
          </CardBody>
        </Card>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody className="schedular_table">
                <CardTitle>Content Schedulers List </CardTitle>
                {
                  is_loading == true ? <span className="spinner-grow spinner-grow-sm"></span> :

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
