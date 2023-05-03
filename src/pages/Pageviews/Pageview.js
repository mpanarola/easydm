import React, { useEffect, useMemo, useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row, Col, Card, CardBody, CardTitle
} from "reactstrap"
import { Link } from "react-router-dom"

import SweetAlert from "react-bootstrap-sweetalert"
import { getPageViews, deletePageView } from '../../helpers/backend_helper'
import { columns, pageviews_payload } from './Constants';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import Moment from 'moment';
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';

const Backlink = () => {

  const history = useHistory();
  const alert = useAlert();
  const [selectedMulti, setselectedMulti] = useState(null);
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)

  const [pageviews_list, setpageviews_list] = useState([])
  const [record_id, set_id] = useState()
  const get_auth_user = JSON.parse(localStorage.getItem("authUser"))

  const [is_loading, setloading] = useState(true)
  
  const confirmDelete = (id) => {
    setconfirm_both(true)
    set_id(id)

  };


  const removePageview = () => {
    if (record_id !== '') {
      deletePageView(record_id).then(resp => {
        setconfirm_both(false)
        alert.success('Your pageview has been deleted.');
        getAllPageViews()
      }).catch(err => {
        alert.error('Please try again...');
      })

    }
  };

  const updatePageview = (data) => {
    history.push({
      pathname: '/update_page_view',
      state: { data: data },
    })
  };

  const getAllPageViews = (event, values) => {
    getPageViews(pageviews_payload).then(resp => {
      setpageviews_list(resp?.data[0]?.list)
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
    pageviews_list && pageviews_list.map((row, order) => ({
      ...row,
      id: order + 1,
      webpage: (
        <a href={row.webpage && row.webpage.webpageUrl} rel="noopener" target="_blank">{row.webpage && row.webpage.webpage}</a>
      ),
      date: Moment(row.publishedOn).format('DD-MMM-YY'),
      category: row.webpage && row.webpage.category,
      month_year: Moment(row.monthYear).format('MMM-YY'),
      total_pageviews: (
        <span class="bg-info badge badge-secondary" style={{ fontSize: "14px" }}>{ row.numberOfPageviews }</span>
      ),
      action: (
        <div className="d-flex" >
          <div
            className="btn btn-primary"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => updatePageview(row)}
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

    })), [pageviews_list])


  useEffect(() => {
    setTimeout(function () {
      getAllPageViews()
    }, 1000);

  }, []);

  // const data = {

  //   rows: [
  //     ,
  //     {
  //       id: "2",
  //       webpage: (
  //         <a href="https://www.about.com" target="_blank">About</a>
  //       ),
  //       date: "27-Mar-2023",
  //       category: "Industry",
  //       month_year: "Mar-23",
  //       total_pageviews: (
  //         <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>1450 +</span>
  //       ),
      
  //       action: (
  //         <div className="d-flex">
  //           <div
  //             className="btn btn-primary"
  //             style={{
  //               cursor: "pointer",
  //               marginRight: "10px"
  //             }}
  //             onClick={() => { history.push('/update_page_view') }}
  //           >
  //             View
  //           </div>

  //           <div
  //             className="btn btn-danger"
  //             onClick={() => deleteBacklink()}
  //           >
  //             Delete
  //           </div>

  //         </div>
  //       )
  //     },
  //     {
  //       id: "3",
  //       webpage: (
  //         <a href="https://www.contact.com" target="_blank">Contact</a>
  //       ),
  //       date: "27-Mar-2023",
  //       category: "Career",
  //       month_year: "Mar-23",
  //       total_pageviews: (
  //         <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>650 +</span>
  //       ),
        
  //       action: (
  //         <div className="d-flex">
  //           <div
  //             className="btn btn-primary"
  //             style={{
  //               cursor: "pointer",
  //               marginRight: "10px"
  //             }}
  //             onClick={() => { history.push('/update_page_view') }}
  //           >
  //             View
  //           </div>

  //           <div
  //             className="btn btn-danger"
  //             onClick={() => deleteBacklink()}
  //           >
  //             Delete
  //           </div>

  //         </div>
  //       )
  //     },
  //     {
  //       id: "4",
  //       webpage: (
  //         <a href="https://www.blogs.com" target="_blank">Blogs</a>
  //       ),
  //       date: "27-Mar-2023",
  //       category: "Blogs",
  //       month_year: "Mar-23",
  //       total_pageviews: (
  //         <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>200 +</span>
  //       ),
        
  //       action: (
  //         <div className="d-flex">
  //           <div
  //             className="btn btn-primary"
  //             style={{
  //               cursor: "pointer",
  //               marginRight: "10px"
  //             }}
  //             onClick={() => { history.push('/update_page_view') }}
  //           >
  //             View
  //           </div>

  //           <div
  //             className="btn btn-danger"
  //             onClick={() => deleteBacklink()}
  //           >
  //             Delete
  //           </div>

  //         </div>
  //       )
  //     },
  //     {
  //       id: "5",
  //       webpage: (
  //         <a href="https://www.events.com" target="_blank">Events</a>
  //       ),
  //       date: "27-Mar-2023",
  //       category: "Services",
  //       month_year: "Mar-23",
  //       total_pageviews: (
  //         <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>500 +</span>
  //       ),
        
  //       action: (
  //         <div className="d-flex">
  //           <div
  //             className="btn btn-primary"
  //             style={{
  //               cursor: "pointer",
  //               marginRight: "10px"
  //             }}
  //             onClick={() => { history.push('/update_page_view') }}
  //           >
  //             View
  //           </div>

  //           <div
  //             className="btn btn-danger"
  //             onClick={() => deleteBacklink()}
  //           >
  //             Delete
  //           </div>

  //         </div>
  //       )
  //     },

  //   ],
  // }

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
                  removePageview()
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
