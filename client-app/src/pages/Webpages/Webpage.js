// import React, { useState } from "react"
import React, { useEffect, useMemo, useState } from "react"
// import PropTypes from "prop-types"
import Moment from 'moment';
import { MDBDataTable } from "mdbreact"
import {
  Row, Col, Card, CardBody, CardTitle
} from "reactstrap"
import { Link, withRouter } from "react-router-dom"

import SweetAlert from "react-bootstrap-sweetalert"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import { useHistory } from 'react-router-dom';
import { getWebsites, deleteWebsite } from '../../helpers/backend_helper'

import { optionGroupCategory, optionGroup, payload, columns } from './Constants'
import { useAlert } from "react-alert";

const Webpage = props => {
  const history = useHistory();
  const alert = useAlert();
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [websites_list, setWebsites_list] = useState([])
  const [record_id, set_id] = useState()
  const get_auth_user = JSON.parse(localStorage.getItem("authUser"))
  const [is_loading, setloading] = useState(true)

  const confirmDelete = (id) => {
    setconfirm_both(true)
    set_id(id)

  };

  const deleteWebpage = () => {
    if (record_id !== '') {
      deleteWebsite(record_id).then(resp => {
        setconfirm_both(false)
        alert.success('Your webpage has been deleted.');
        getAllWebsites()
      }).catch(err => {
        alert.error('Please try again...');
      })

    }
  };

  const updateWebsite = (data) => {
    history.push({
      pathname: '/easyDM/update_website',
      state: { data: data },
    })
  };

  const rows = useMemo(() =>
    websites_list && websites_list.map((row, order) => ({
      ...row,
      id: order + 1,
      category: row.category,
      webpage: (
        <a href={row.webpageUrl} rel="noopener" target="_blank">{row.webpage}</a>
      ),
      // webpage_url: "",
      assigned_to: (
        <div className="d-flex align-items-start">
          {
            row.assignedTo.length > 0 &&
              row.assignedTo && row.assignedTo.map(data => (
                <div className="me-3 align-self-center">
                  <img src={`${process.env.REACT_APP_BACKEND}avatar/${data.avatar}`} alt={data.name} className="avatar-sm rounded-circle" title={data.name} />
                </div>
              ))
          }
        </div>
      ),
      effective_from: Moment(row.effectiveFrom).format('DD-MMM-YY'),
      date: Moment(row.publishedOn).format('DD-MMM-YY'),
      action: (
        <div className="d-flex">
          <div
            className="btn btn-primary fas fa-edit"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => updateWebsite(row)}
          >
          </div>
          { get_auth_user.userRole == 1 &&
              <div
                className="btn btn-danger fas fa-trash"
                onClick={() => confirmDelete(row._id)}
              >
              </div>
          }
        </div>
      )
    })), [websites_list])

  const getAllWebsites = (event, values) => {
    getWebsites(payload).then(resp => {
      setWebsites_list(resp?.data[0]?.list)
      setloading(false)
      // console.log('resp?.data ', resp?.data[0]?.list)
      // dispatch(getMembers(resp?.data))
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
      getAllWebsites()
    }, 1000);

  }, []);

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
            <div className="float-end add_new">
              <Link
                onClick={() => {
                  history.push("/easyDM/create_website")
                }}
                to="#"
                className="btn btn-primary fas fa-plus"
                title="Add New"
              >
              </Link>
            </div>
          </CardBody>
        </Card>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle>Websites List </CardTitle>
                {
                  is_loading == true ?   <span className="spinner-grow spinner-grow-sm"></span> :
                
                <MDBDataTable responsive bordered data={{ rows, columns }} />
              }
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
                  deleteWebpage()
                  setconfirm_both(false)
                  // setsuccess_dlg(true)
                  // setdynamic_title("Deleted")
                  // setdynamic_description("Your webpage has been deleted.")
                }}
                onCancel={() => {
                  setconfirm_both(false)
                  // setsuccess_dlg(true)
                  // setdynamic_title("Cancelled")
                  // setdynamic_description("Your webpage is safe :)")
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

export default withRouter(Webpage)
