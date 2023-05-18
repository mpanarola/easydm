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
import { optionCategory, webpagesPayload } from './Constants'
import { updateDaybook, getWebsites, deleteDaybook, getDaybooksCurrentUser } from '../../helpers/backend_helper'
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
  const data = props.location && props.location.state !== undefined ? props.location.state : ''; // props.location && props.location.state;
  // console.log('datassss ', data)
  const daybooks_data = data !== '' && data['data'];
  // console.log('daybooks_data ', daybooks_data[0].creationDate)
  const inpRow = []
  const [inputFields, setinputFields] = useState(inpRow)

  const [date, setdate] = useState(today_date);
  const [webpages_list, setwebpages_list] = useState([]);
  const [daybook_id, setdaybook_id] = useState(daybooks_data._id);
  const [member_id, set_member_id] = useState(daybooks_data[0].addedBy);
  const [total_hours, settotal_hours] = useState([]);
  const [start_date, set_start_date] = useState(Moment(daybooks_data[0].creationDate).startOf('month').format('YYYY-MM-DD'))
  const [end_date, set_end_date] = useState(Moment(daybooks_data[0].creationDate).format('YYYY-MM-DD'))

  const alert = useAlert();
  const history = useHistory();

  const getDaybookById = (is_reset_search) => {
    setloading(true)

    const page_payload = {
      "search": {
        "dateFrom":  start_date,
        "dateTo": end_date,
        "member": member_id
      }
    }

    getDaybooksCurrentUser(page_payload).then(resp => {
      setloading(true)
      if (resp?.data[0]) {
        console.log('resp ', resp?.data[0][0]._id)
        setinputFields(resp?.data[0][0] ? resp?.data[0][0]['info'] && resp?.data[0][0]['info'] : [])
        settotal_hours(resp?.data[0][0] ? resp?.data[0][0].totalHours : 0)
        // set_member_id(resp?.data[0][0] ? resp?.data[0][0]._id : [])
        // member_id.push(resp?.data[0][0] ? resp?.data[0][0]._id : [])
        setloading(false)
      }
      if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
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
    setinputFields(prev => prev.map((item, idx) => {
      if (index === idx && item.hasOwnProperty(name)) item[name] = value
      return item
    }))

  }

  const allWebpages = () => {
    getWebsites(webpagesPayload).then(resp => {
      setwebpages_list(resp?.data[0]?.list)
    }).catch(err => {
    })

  }

  useEffect(() => {
    !data && goBack();
    setTimeout(function () {
      allWebpages()
      getDaybookById()
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
          history.push('/logout')
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

  // const resetSearch = () => {
  //   setloading(true)
  //   set_end_date(Moment().format('YYYY-MM-DD'))
  //   set_start_date(Moment().startOf('month').format('YYYY-MM-DD'))
  //   getDaybookById(true)
  // }

  const goBack = (e) => {
    history.push('/daybooks');
  };

  return (
    <>
      <div className="page-content view_page">
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Day Books" breadcrumbItem="Update Day Book" />
        {/* <Row className="d-none">
          <Col lg="12">
            <Card>
              <CardBody>
                <div className="col-md-8 float-start d-none">
                  <div> <div class="card-title">Date Filter</div> </div>
                  <div className="float-start  d-flex ">

                    <input type="date" name="start_date" className="form-control" onChange={e => set_start_date(e.target.value)} defaultValue={start_date} />
                    <input type="date" name="end_date" className="form-control mx-2" onChange={e => set_end_date(e.target.value)}
                      defaultValue={end_date} max={Moment().format('YYYY-MM-DD')} />

                    <button type="button" className="btn btn-secondary mx-2" onClick={getDaybookById} >
                      Search
                    </button>
                    <button type="button" className="btn btn-danger" onClick={resetSearch} >
                      Reset
                    </button>

                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
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
                                    <div className="mb-4 mt-md-0 while_bg_c">
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

                                      {/* <input
                                        type="date"
                                        name="creationDate"
                                        className="inner form-control"
                                        max={today_date}
                                        defaultValue={field.creationDate ? Moment(field.creationDate).format('YYYY-MM-DD') : today_date}
                                        onChange={e => handleInput(key, "creationDate", e.target.value)}
                                      /> */}
                                    </div>
                                  </Col>

                                  <Col md="2">
                                    <div className="mb-4 mt-md-0">
                                      <Select
                                        id="category"
                                        name="category"
                                        options={optionCategory}
                                        classNamePrefix="select2-selection"
                                        placeholder="Category"
                                        defaultValue={{ label: field.category && field.category, value: field.category && field.category }}
                                        onChange={e => handleInput(key, "category", e.value)}
                                      />
                                    </div>
                                  </Col>

                                  <Col md="2">
                                    <div className="mb-4 mt-md-0">

                                      <Select
                                        id="webpage"
                                        name="webpage"
                                        options={
                                          webpages_list && webpages_list.map(website => (
                                            { label: website.webpage, value: website._id }
                                          )
                                          )
                                        }
                                        classNamePrefix="select2-selection"
                                        defaultValue={{ value: field.webpage, label: field.webpageName }}


                                        placeholder={<div>Web Page</div>}
                                        onChange={e => handleInput(key, "webpage", e.value)}

                                      />

                                    </div>
                                  </Col>

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
