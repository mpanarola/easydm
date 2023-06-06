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

import { getBackLinks, deleteBackLink, getAllMembers, getWebsites, getContentSchedulars } from '../../helpers/backend_helper'
import Moment from 'moment';

import { useHistory } from 'react-router-dom';

import { columns, webpage_payload } from './Constants';
import { optionGroupCategory, offPageActivityType, optionBackLinkStaus } from '../../Constants'

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import Select from "react-select";

const Backlink = () => {

  const history = useHistory();
  const alert = useAlert();
  const [is_show_contentshedular, setis_show_contentshedular] = useState(false)
  const [schedulars_list, setschedulars_list] = useState([]);
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)

  const [members_list, setmembers_list] = useState(null)
  const [default_members_list, setdefault_members_list] = useState(null)
  const [webpages_list, setwebpages_list] = useState(null)
  const [webpage_name, set_webpagename] = useState()
  const [category_id, set_category] = useState(null)
  const [contentSchedular, setcontentSchedular] = useState(null)

  const [webpage_id, set_webpage] = useState(null)
  const [domain_url, setdomain_url] = useState(null)

  const [offPageActivity, setoffPageActivity] = useState(null)
  const [status, setstatus] = useState(null)



  const [start_date, set_start_date] = useState(Moment().format('YYYY-MM-DD'))
  const [end_date, set_end_date] = useState(Moment().format('YYYY-MM-DD'))

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


  const handleWebpage = (e) => {
    set_webpage(e.value);
    set_webpagename(e.label);
  }

  // const resetSearch = () => {
  //   setloading(true)
  //   set_category('')
  //   set_webpage('')
  //   setcontentSchedular('')
  //   set_webpagename('')
  //   setmembers_list('')
  //   setstatus('')
  //   setdomain_url('')
  //   setoffPageActivity('')
  //   set_end_date(Moment().format('YYYY-MM-DD'))
  //   set_start_date(Moment().startOf('month').format('YYYY-MM-DD'))
  //   getAllBacklinks()
  // }


  const allMembers = () => {
    const memberPayload = {
      "options": {
        "select": ['name']
      }
    }

    getAllMembers(memberPayload).then(resp => {
      setmembers_list(
        resp?.data[0]?.list && resp?.data[0]?.list.map((user) => (
          get_auth_user.user_id == user._id &&
          { label: user.name, value: user._id }
        )
        )
      )

      setdefault_members_list(
        resp?.data[0]?.list && resp?.data[0]?.list.map((user) => (
          { label: user.name, value: user._id }
        )
        )
      )

    }).catch(err => {
    })

  }


  const allWebpages = (category_id) => {

    const webpagePayload = {
      "options": {
        "select": ['webpage', 'webpageUrl']
      },
      "query": {
        "category": category_id !== '' && category_id
      }
    }

    getWebsites(webpagePayload).then(resp => {
      setwebpages_list(resp?.data[0]?.list)
    }).catch(err => {
    })

  }

  const allSchedulars = () => {
    getContentSchedulars().then(resp => {
      setschedulars_list(resp?.data[0]?.list)
    }).catch(err => {
    })

  }

  const getAllBacklinks = (event, values) => {

    const webpage_payload = {
      "options": {
        "populate": [
          {
            "path": "webpage",
            "select": ["webpage", "webpageUrl"]
          },

        ]
      },

      "query": {
        "date": {
          "$gte": Moment(start_date).format('YYYY-MM-DD'),
          "$lte": Moment(end_date).format('YYYY-MM-DD')
        },
        "status": status,
        "webpage": webpage_id,
        "addedBy": members_list,
        "category": category_id,
        "contentSchedular": contentSchedular,
        "offPageActivity": offPageActivity
      },
    }

    getBackLinks(webpage_payload).then(resp => {
      setbacklinks_list(resp?.data?.list)
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
      directUrl_search: row.domain,
      domain_search: row.domain,
      webpage_search: row.webpage && row.webpage.webpageUrl,
      date: Moment(row.date).format('DD-MMM-YY'),
      offPageActivity: row.offPageActivity,

      webpage: (
        <a href={row.webpage && row.webpage.webpageUrl} rel="noopener" target="_blank">{row.webpage && row.webpage.webpage}</a>
      ),

      domain: (
        <a href={row.domain} rel="noopener" target="_blank">{row.domain}</a>
      ),

      directUrl: (
        <a href={row.directUrl} rel="noopener" target="_blank">{row.directUrl}</a>
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

          {get_auth_user.userRole == 1 &&
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
      allWebpages()
      allMembers()
      allSchedulars()
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

        <Row>
          <Card >
            <CardBody >
              <CardTitle className="mb-4 ">Search Filter</CardTitle>
              <Col lg={12}>
                <Row>
                  <Col lg={6}>
                    <div className="float-start while_bg_c col-lg-12">
                      <div> <div className="card-title">Date Filter</div> </div>
                      <div className="float-start  d-flex col-lg-12">
                        <Flatpickr
                          className="form-control d-block"
                          name="start_date"
                          id="start_date"
                          onChange={date => set_start_date(date[0])}
                          defaultValue={start_date}
                          // isDisabled={true}
                          //   placeholder="dd M,yyyy"
                          options={{
                            altInput: true,
                            altFormat: "j-F-y",
                            dateFormat: "Y-m-d",
                            clickOpens: true,
                          }}
                        />

                        <Flatpickr
                          className="form-control d-block"
                          name="end_date"
                          id="end_date"
                          onChange={date => set_end_date(date[0])}
                          defaultValue={start_date}
                          max={Moment().format('YYYY-MM-DD')}
                          // isDisabled={true}
                          //   placeholder="dd M,yyyy"
                          options={{
                            altInput: true,
                            altFormat: "j-F-y",
                            dateFormat: "Y-m-d",
                            clickOpens: true,
                          }}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col lg={3}>
                    <div className="mb-3">
                      <label htmlFor="page_activity">Off Page Activity Type</label>
                      <Select
                        id="page_activity"
                        name="page_activity"
                        label="Off Page Activity Type"
                        options={offPageActivityType}
                        classNamePrefix="select2-selection"
                        onChange={e => setoffPageActivity(e.value)}
                      />
                    </div>
                  </Col>

                  <Col lg={3}>
                    <div className="mb-3">
                      <label htmlFor="category">Category</label>
                      <Select
                        id="category"
                        isMulti={false}
                        onChange={(e) => {
                          set_category(e.value)
                        }}
                        options={
                          optionGroupCategory
                        }
                        defaultValue={{ label: category_id, value: category_id }}
                        classNamePrefix="select2-selection"
                      />
                    </div>
                  </Col>

                  {
                    category_id !== 'Blogs' && is_show_contentshedular == false ?

                      <Col lg={3}>
                        <div className="mb-3">
                          <label htmlFor="webpage">Web Page</label>
                          <Select
                            id="webpage"
                            isMulti={false}
                            onChange={e => handleWebpage(e)}
                            options={
                              webpages_list && webpages_list.map(website => (
                                { label: website.webpage, value: website._id }
                              )
                              )
                            }
                            value={{ label: webpage_name, value: webpage_id }}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      :
                      <Col lg={3}>
                        <div className="mb-3">
                          <label htmlFor="contentscheduler" >Content Scheduler</label>
                          <Select
                            id="contentScheduler"
                            name="contentScheduler"
                            options={schedulars_list && schedulars_list.map(schedular => (
                              { label: schedular.topicTitle, value: schedular._id }
                            ))}
                            classNamePrefix="select2-selection"
                            placeholder={<div>Select Values</div>}
                            onChange={e => setcontentSchedular(e.value)}

                          />
                          {/* {webpage_err ? <div style={{ marginTop: '0.25rem', fontSize: '0.875em', color: '#ff715b' }}>This field is required</div> : ''} */}
                        </div>
                      </Col>
                  }

<Col lg={3}>
                    <div className="mb-3">
                      <label htmlFor="members">Added By</label>
                      <Select
                        id="members"
                        isMulti={true}
                        onChange={setmembers_list}
                        // onChange={e => console.log(e.target.value)}
                        options={default_members_list}
                        value={members_list}
                        classNamePrefix="select2-selection"
                      />
                    </div>
                  </Col>

                  <Col lg={3}>
                    <div className="mb-3">
                      <label htmlFor="notes">Domain</label>
                      <input
                        type="url"
                        name="domain_url"
                        className="form-control"
                        id="domain_url"
                        onChange={e => setdomain_url(e.target.value)}
                      />
                    </div>
                  </Col>

                  <Col lg={3}>
                    <div className="mb-3">
                      <label htmlFor="status">Status</label>
                      <Select
                        name="status"
                        options={optionBackLinkStaus}
                        classNamePrefix="select2-selection form-control"
                        onChange={e => setstatus(e.value)}

                      />
                    </div>
                  </Col>

                </Row>

                <button type="button" className="btn btn-secondary w-auto"
                  onClick={() => {
                    getAllBacklinks()

                  }} >
                  Search
                </button>

                {/* <button type="button" className="btn btn-danger mx-2"
                  onClick={() => {
                    resetSearch()
                  }}  >
                  Reset
                </button> */}
              </Col>
            </CardBody>
          </Card>
        </Row>

        <Card >
          <CardBody>
            {/* <CardTitle className="mb-4 ">Add Website</CardTitle> */}
            <div className="float-end add_new">
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
              <CardBody className="backlink_table">
                <CardTitle>Back Links List</CardTitle>
                {
                  is_loading == true ? <span className="spinner-grow spinner-grow-sm"></span> :

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
