import React, { useEffect, useMemo, useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row, Col, Card, CardBody, CardTitle
} from "reactstrap"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert";
import SweetAlert from "react-bootstrap-sweetalert"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

import { getBackLinks, deleteBackLink } from '../../helpers/backend_helper'
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
import { columns, webpage_payload } from './Constants';


const Backlink = () => {

  const history = useHistory();
  const alert = useAlert();

  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)

  const [backlinks_list, setbacklinks_list] = useState([])
  const [record_id, set_id] = useState()
  const get_auth_user = JSON.parse(localStorage.getItem("authUser"))
  const [is_loading, setloading] = useState(true)
  
  const confirmDelete = (id) => {
    setconfirm_both(true)
    set_id(id)

  };

  const removeBacklink = () => {
    if (record_id !== '') {
      deleteBackLink(record_id).then(resp => {
        setconfirm_both(false)
        alert.success('Your backlink has been deleted.');
        getAllBacklinks()
      }).catch(err => {
        alert.error('Please try again...');
      })

    }
  };

  const updateBacklink = (data) => {
    history.push({
      pathname: '/update_backlink',
      state: { data: data },
    })
  };

  const getAllBacklinks = (event, values) => {
    getBackLinks(webpage_payload).then(resp => {
      setbacklinks_list(resp?.data[0]?.list)
      setloading(false)
      if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      }

    }).catch(err => {
      alert.error('Backend server not responding, Please try again....');
    })

  }

  const rows = useMemo(() =>
    backlinks_list && backlinks_list.map((row, order) => ({
      ...row,
      id: order + 1,
      webpage: (
        <a href={row.webpage && row.webpage.webpageUrl} rel="noopener" target="_blank">{row.webpage && row.webpage.webpage}</a>
      ),
      date: row.webpage && Moment(row.webpage.publishedOn).format('DD-MMM-YY'),
      // webpage_url: "",
      category: row.webpage && row.webpage.category,
      month_year: Moment(row.monthYear).format('MMM-YY'),
      total_backlinks: (
        <span class="bg-info badge badge-secondary" style={{ fontSize: "14px" }}>{row.numberOfBacklinks}</span>
      ),
      action: (
        <div className="d-flex" >
          <div
            className="btn btn-primary fas fa-edit"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => updateBacklink(row)}
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

    })), [backlinks_list])

  useEffect(() => {
    setTimeout(function () {
      getAllBacklinks()
    }, 1000);

  }, []);

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
                <CardTitle>Back Links List</CardTitle>
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
                  removeBacklink()
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
        </Row>
      </div>

    </React.Fragment>
  )
}

export default Backlink
