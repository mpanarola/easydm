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
import { useHistory, Link } from 'react-router-dom';
import { optionGroupCategory } from '../../Constants'
import { AvForm, AvField } from "availity-reactstrap-validation"
import { useAlert } from "react-alert";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Moment from 'moment';

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import { addDaybook, getWebsites, deleteDaybook, getContentSchedulars } from '../../helpers/backend_helper'

const Createdaybook = () => {
  let today = new Date(); //Current Date
  let today_date = Moment(today).format('YYYY-MM-DD');
  const alert = useAlert();
  const history = useHistory();
  const [webpage_err, setwebpage_err] = useState(false);
  const [category_err, setcategory_err] = useState(false);
  const [hours_err, sethours_err] = useState(false);
  const [is_show_contentshedular, setis_show_contentshedular] = useState(false)
  const inpRow = [{ webpage: null, category: "", hours: "", details: "", creationDate: today_date, id: Date.now(), contentScheduler: null }]
  const [inputFields, setinputFields] = useState(inpRow)
  const [webpages_list, setwebpages_list] = useState([]);
  const [schedulars_list, setschedulars_list] = useState([]);

  const [webpage, setwebpage] = useState(null);
  const [date, setdate] = useState(today_date);
  const [category, setcategory] = useState(null);
  const [hours, setHours] = useState(null);
  const [details, setdetails] = useState(null);
  const [totalHours, settotalHours] = useState(0);



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

  useEffect(() => {
    setTimeout(function () {
      allWebpages()
      allSchedulars()
    }, 1000);
  }, []);

  // Function for Create Input Fields
  function handleAddFields() {

    const item1 = { webpage: null, category: "", hours: "", details: "", creationDate: today_date, id: Date.now(), contentScheduler: null }
    setinputFields([...inputFields, item1])
  }

  // Function for Remove Input Fields
  function handleRemoveFields(id) {
    setinputFields(prev => prev.filter((item) => item.id !== id));
  }

  const createDaybook = (e) => {
    const result = {
      data: inputFields
    }

    if (inputFields[0].category == '' || inputFields[0].hours == '') {

      inputFields[0].category.length == 0 && setcategory_err(true)
      inputFields[0].hours.length == 0 && sethours_err(true)
      inputFields[0].webpage.length == 0 && setwebpage_err(true)
    }
    else {
      addDaybook(result).then(resp => {
        if (resp.status == true) {
          alert.success('Daybook Added Successfully');
          history.push('/EasyDM/daybooks')
        }
        else if (resp?.message == 'Unauthorized User!!') {
          history.push('/EasyDM/logout')
          alert.error('Session timeout');
        }
        else {
          alert.error(resp.message);
        }
      }).catch(err => {
        alert.error('Backend server not responding, Please try again....');
      })
    }
  };


  const handleInput = (index, name, value) => {

    name == 'category' && value !== '' && setcategory_err(false)
    name == 'hours' && value !== '' && sethours_err(false)
    name == 'webpage' && value !== '' && setwebpage_err(false)
    name == 'category' && value !== '' && allWebpages(value)
    name == 'category' && value == 'Blogs' ? setis_show_contentshedular(true) : setis_show_contentshedular(false)

    setinputFields(prev => prev.map((item, idx) => {
      if (index === idx && item.hasOwnProperty(name)) item[name] = value
      return item
    }))

  }

  const allSchedulars = () => {

    getContentSchedulars().then(resp => {
      setschedulars_list(resp?.data[0]?.list)
    }).catch(err => {
    })

  }


  const goBack = (e) => {
    history.push('/EasyDM/daybooks');
  };

  return (
    <>
      <div className="page-content">
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Day Books" breadcrumbItem="Add Day Book" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4 font-size-18">Add Day Book</CardTitle>
                <AvForm onValidSubmit={(e, v) => {
                  createDaybook(e, v)
                }}>
                  <Row>
                    <div className="inner-repeater mb-5">
                      <div className="inner form-group mb-0 row">
                        <div
                          className="inner col-lg-12 ml-md-auto"
                          id="repeater"
                        >
                          {inputFields.map((field, key) => (
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
                                    defaultValue={field.creationDate}
                                    onChange={date => handleInput(key, "creationDate", date[0])}
                                    options={{
                                      altInput: true,
                                      altFormat: "j-F-y",
                                      dateFormat: "Y-m-d",
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
                                    placeholder={<div>Category</div>}
                                    defaultValue={field.category}
                                    onChange={e => handleInput(key, "category", e.value)}
                                  />
                                  {category_err ? <p style={{ fontSize: '0.875em', color: '#ff715b' }}>This field is required</p> : ''}
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
                                        defaultValue={field.webpage}
                                        placeholder={<div>Web Page</div>}
                                        onChange={e => handleInput(key, "webpage", e.value)}
                                      />
                                      {webpage_err ? <div style={{ fontSize: '0.875em', color: '#ff715b' }}>This field is required</div> : ''}

                                      {/* { webpage!== null && <Link to={webpage} style={{ float: "right", marginTop: "5px"}} >View Page</Link> } */}
                                    </div>

                                  </Col>
                                  :
                                  <Col md="2">
                                    <div className="mb-4 mt-md-0">
                                      <Select
                                        id="contentScheduler"
                                        name="contentScheduler"
                                        options={schedulars_list && schedulars_list.map(schedular => (
                                          { label: schedular.topicTitle, value: schedular._id }
                                        ))}
                                        classNamePrefix="select2-selection"
                                        // defaultValue={{ value: field.webpage, label: field.webpageName }}
                                        placeholder={<div>Select Values</div>}
                                        onChange={e => handleInput(key, "contentScheduler", e.value)}
                                      />

                                    </div>
                                  </Col>
                              }
                              <Col md="2">
                                <div className="mb-4  mt-md-0">
                                  <input
                                    type="text"
                                    name="hours"
                                    className="inner form-control"
                                    defaultValue={field.hours}
                                    placeholder="Enter Hours"
                                    pattern="[0-9]+(\.[0-9]{1,2})?%?" maxlength="4"
                                    min={1}
                                    // onChange={e => settotalHours(e.target.value)}
                                    onChange={e => handleInput(key, "hours", e.target.value)}
                                  />
                                  {hours_err ? <div style={{ fontSize: '0.875em', color: '#ff715b' }}>This field is required</div> : ''}

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
                              {
                                key !== 0 &&

                                <Col md="1">
                                  <div className="mb-4 mt-2 mt-md-0 d-grid">
                                    <Button
                                      color="danger"
                                      className="inner"
                                      onClick={() => {
                                        handleRemoveFields(field.id)
                                      }}
                                      block
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </Col>
                              }
                            </div>
                          ))}
                        </div>
                      </div>
                      <Row className="justify-content-end m" style={{ marginTop: "-10px " }}>
                        <Col lg="12" md="2">
                          <Button
                            color="success"
                            className="inner"
                            onClick={() => {
                              handleAddFields()
                            }}
                          >
                            Add More
                          </Button>
                        </Col>
                      </Row>
                    </div>
                    <Col lg={12}>
                      <div className="text-right d-flex col-md-12">
                        <div className="col-md-6">
                          <button type="button" className="btn btn-primary" style={{ marginRight: "30px" }} onClick={() => createDaybook()}>
                            Save Day Book
                          </button>
                          <button type="button" className="btn btn-secondary" onClick={() => goBack()}>
                            Back
                          </button>
                        </div>
                        {/* <div className="col-md-4">
                          <button type="button" style={{ marginLeft: "50px" }} className="btn btn-info">
                            Total Hours:  {totalHours}
                          </button>
                        </div> */}
                      </div>
                    </Col>
                  </Row>
                </AvForm>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Createdaybook
