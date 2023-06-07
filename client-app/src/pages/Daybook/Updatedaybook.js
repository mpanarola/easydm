import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  Input,
  Button
} from "reactstrap"
import Select from "react-select";
import { useHistory, withRouter } from 'react-router-dom';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { optionGroupCategory } from '../../Constants'
import { updateDaybook, getWebsites, deleteDaybook, getDaybooksCurrentUser, getContentSchedulars } from '../../helpers/backend_helper'
import { useAlert } from "react-alert";
import Moment from 'moment';
import SweetAlert from "react-bootstrap-sweetalert";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import "./datatables.scss"


const Updatedaybook = (props) => {
  var today = new Date(); //Current Date
  let today_date = Moment(today).format('YYYY-MM-DD');

  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_id, setconfirm_id] = useState("")
  const [is_loading, setloading] = useState(true)
  const [is_show_contentshedular, setis_show_contentshedular] = useState(false)

  const data = props.location && props.location.state !== undefined ? props.location.state : ''; // props.location && props.location.state;
  // console.log('datassss ', data)
  const daybooks_data = data !== '' && data['data'];

  const inpRow = []
  const [inputFields, setinputFields] = useState(inpRow)
  const [date, setdate] = useState(today_date);
  const [webpages_list, setwebpages_list] = useState([]);
  const [schedulars_list, setschedulars_list] = useState([]);
  const [daybook_id, setdaybook_id] = useState(daybooks_data && daybooks_data._id);
  const [member_id, set_member_id] = useState(daybooks_data[0] && daybooks_data[0].addedBy);
  const [total_hours, settotal_hours] = useState([]);
  const [start_date, set_start_date] = useState(Moment(daybooks_data[0] && daybooks_data[0].creationDate).format('YYYY-MM-DD'))
  const [end_date, set_end_date] = useState(Moment(daybooks_data[0] && daybooks_data[0].creationDate).format('YYYY-MM-DD'))

  const alert = useAlert();
  const history = useHistory();

  const getDaybookById = (is_reset_search) => {
    setloading(true)
    const page_payload = {
      "search": {
        "dateFrom": daybooks_data[0] && daybooks_data[0].creationDate,
        "dateTo": daybooks_data[0] && daybooks_data[0].creationDate,
        "member": member_id
      }
    }

    getDaybooksCurrentUser(page_payload).then(resp => {
      setloading(true)
      if (resp?.data[0]) {
        // console.log('resp ', resp?.data[0][0]._id)
        setinputFields(resp?.data[0][0] ? resp?.data[0][0]['info'] && resp?.data[0][0]['info'] : [])
        settotal_hours(resp?.data[0][0] ? resp?.data[0][0].totalHours : 0)
        setloading(false)
      }
      if (resp?.message == 'Unauthorized User!!') {
        history.push('/EasyDM/logout')
        alert.error('Session timeout');
      }
      setloading(false)
    }).catch(err => {
      alert.error(err);
    })

  }

  const confirmDelete = (id) => {
    setconfirm_both(true)
    setconfirm_id(id)
  };

  // Function for Remove Input Fields
  function handleRemoveFields() {
    deleteDaybook(confirm_id).then(resp => {
      setconfirm_both(false)
      if (resp.status) {
        alert.success('Your daybook has been deleted.');
      }
      else {
        alert.error(resp.message);
      }
      getDaybookById();
    }).catch(err => {
      alert.error('Please try again...');
    })
  }

  const handleInput = (index, name, value) => {
    name == 'category' && value !== '' && allWebpages(value)
    name == 'category' && value == 'Blogs' ? setis_show_contentshedular(true) : setis_show_contentshedular(false)

    setinputFields(prev => prev.map((item, idx) => {
      if (index === idx && item.hasOwnProperty(name)) item[name] = value
      return item
    }))

  }

  const allWebpages = (category) => {
    const webpagesPayload = {
      "options": {
        "select": ['webpage', 'webpageUrl', 'category', 'publishedOn']
      },
      "query": {
        "category": category !== '' && category
      }
    }

    getWebsites(webpagesPayload).then(resp => {
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


  useEffect(() => {
    !daybooks_data && goBack();
    setTimeout(function () {
      allWebpages()
      getDaybookById()
      allSchedulars()
    }, 1000);
  }, []);

  const updateDayBook = (data, id) => {
    setloading(true)
    const daybook_updated_data = inputFields.filter(x => x.dayBookId === id);
    if (daybook_updated_data[0]) {
      updateDaybook(daybook_updated_data && daybook_updated_data[0], id).then(resp => {
        if (resp.status == true) {
          alert.success('Daybook Updated Successfully');
          getDaybookById()
          setloading(false)
        }
        else if (resp?.message == 'Unauthorized User!!') {
          history.push('/EasyDM/logout')
          alert.error('Session timeout');
        }
        else {
          alert.error('Already added daybook for the day.');
        }

      }).catch(err => {
        alert.error('Backend server not responding, Please try again....');
      })

    }

  };

  const goBack = (e) => {
    history.push('/EasyDM/daybooks');
  };

  return (
    <>
      <div className="page-content view_page">
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Day Books" breadcrumbItem="Update Day Book" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4 font-size-18">Update Day Book</CardTitle>
                {
                  is_loading == true ? <span className="spinner-grow spinner-grow-sm"></span> :
                    <form >
                      <Row>
                        <div className="inner-repeater mb-5">
                          <div className="inner form-group mb-0 row">
                            <div
                              className="inner col-lg-12 ml-md-auto"
                              id="repeater"
                            >

                              {inputFields && inputFields.map((field, key) => (
                                field.webpage &&
                                <div
                                  key={key}
                                  id={"nested" + key}
                                  className="mb-1 row align-items-center"
                                >
                                  <Col md="2">
                                    <div className="mb-4 mt-md-0 ">
                                      <Flatpickr
                                        className="form-control d-block"
                                        name="creationDate"
                                        id="creationDate"
                                        max={today_date}
                                        isDisabled={true}
                                        defaultValue={field.creationDate ? Moment(field.creationDate).format('YYYY-MM-DD') : today_date}
                                        onChange={date => handleInput(key, "creationDate", date[0])}
                                        options={{
                                          altInput: true,
                                          altFormat: "j-F-y",
                                          dateFormat: "Y-m-d",
                                          clickOpens: false,
                                        }}
                                      />
                                    </div>
                                  </Col>

                                  <Col md="2">
                                    <div className="mb-4 mt-md-0">
                                      <Select
                                        id="category"
                                        name="category"
                                        options={optionGroupCategory}
                                        classNamePrefix="select2-selection"
                                        placeholder="Category"
                                        defaultValue={{ label: field.category && field.category, value: field.category && field.category }}
                                        onChange={e => handleInput(key, "category", e.value)}
                                      />
                                    </div>
                                  </Col>

                                  {
                                    field.category !== 'Blogs' && is_show_contentshedular == false ?

                                      <Col md="2">
                                        <div className="mb-4 mt-md-0">
                                          <Select
                                            id="webpage"
                                            name="webpage"
                                            options={webpages_list && webpages_list.filter(website => website.category == field.category).map(website => (
                                              { label: website.webpage, value: website._id }
                                            ))}
                                            classNamePrefix="select2-selection"
                                            defaultValue={{ value: field.webpage, label: field.webpageName }}
                                            placeholder={<div>Web Page</div>}
                                            onChange={e => handleInput(key, "webpage", e.value)}

                                          />

                                        </div>
                                      </Col>
                                      :

                                      <Col md="2">
                                        <div className="mb-4 mt-md-0">
                                          <Select
                                            id="schedular"
                                            name="schedular"
                                            options={schedulars_list && schedulars_list.map(schedular => (
                                              { label: schedular.topicTitle, value: schedular._id }
                                            ))}
                                            classNamePrefix="select2-selection"
                                            defaultValue={{ value: field.contentScheduler ? field.contentScheduler : null, label: field.contentSchedulerTitle }}
                                            placeholder={<div>Select Values</div>}
                                            onChange={e => handleInput(key, "contentScheduler", e.value)}
                                          />

                                        </div>
                                      </Col>
                                  }

                                  <Col md="1">
                                    <div className="mb-4  mt-md-0">
                                      <input
                                        type="text"
                                        name="hours"
                                        className="inner form-control"
                                        defaultValue={field.hours}
                                        placeholder="Enter Hours"
                                        min={1}
                                        pattern="[0-9]+(\.[0-9]{1,2})?%?" maxlength="4"
                                        onChange={e => handleInput(key, "hours", e.target.value)}
                                      />
                                    </div>
                                  </Col>

                                  <Col md="3">
                                    <div className="mb-4 mt-md-0">
                                      <textarea
                                        rows="4" cols="5"
                                        name="details"
                                        className="inner form-control"
                                        defaultValue={field.details}
                                        placeholder="Enter Details"
                                        onChange={e => handleInput(key, "details", e.target.value)}
                                      />
                                    </div>
                                  </Col>

                                  <Col md="1">
                                    <div className="mb-4 mt-2 mt-md-0 d-grid">
                                      <Button
                                        color="primary"
                                        className="inner"
                                        onClick={() => {
                                          updateDayBook(field, field.dayBookId)
                                        }}
                                        block
                                      >
                                        Update
                                      </Button>
                                    </div>
                                  </Col>

                                  <Col md="1">
                                    <div className="mb-4 mt-2 mt-md-0 d-grid">
                                      <Button
                                        color="danger"
                                        className="inner"
                                        onClick={() => {
                                          confirmDelete(field.dayBookId)
                                        }}
                                        block
                                      >

                                        Delete
                                      </Button>
                                    </div>
                                  </Col>

                                </div>
                              ))}

                              {inputFields.length == 0 && <h5 className="text-center">Sorry, No records found....</h5>}
                            </div>
                          </div>
                        </div>

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

                        {confirm_both ? (
                          <SweetAlert
                            title="Are you sure?"
                            warning
                            showCancel
                            confirmBtnBsStyle="success"
                            cancelBtnBsStyle="danger"
                            onConfirm={() => {
                              handleRemoveFields()
                              setconfirm_both(false)
                            }}
                            onCancel={() => {
                              setconfirm_both(false)
                            }}
                          >
                            You won't be able to revert this!
                          </SweetAlert>
                        ) : null}

                        <Col lg={12}>
                          <div className="text-right d-flex col-md-12">
                            <div className="col-md-6">
                              {/* <button type="button" className="btn btn-primary" style={{ marginRight: "30px" }} onClick={() => updateDayBook()}>
                          Update Day Book
                        </button> */}
                              <button type="button" className="btn btn-secondary" onClick={() => goBack()}>
                                Back
                              </button>

                            </div>

                            {total_hours !== '' &&
                              <div className="col-md-4">
                                <button type="button" style={{ marginLeft: "50px" }} className="btn btn-info">
                                  Total Hours:  {total_hours}
                                </button>
                              </div>
                            }

                          </div>

                        </Col>

                      </Row>

                    </form>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

// export default Updatedaybook
export default withRouter(Updatedaybook)
