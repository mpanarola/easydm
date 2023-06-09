import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import Select from "react-select";
import { useHistory } from 'react-router-dom';

import { addBackLink, getWebsites, getContentSchedulars, checkBacklink } from '../../helpers/backend_helper'

import { optionGroupCategory, offPageActivityType, optionBackLinkStaus } from '../../Constants'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { useAlert } from "react-alert";
import Moment from 'moment';
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import "./datatables.scss"


const Createbacklink = () => {
  let today = new Date(); //Current Date
  let today_date = Moment(today).format('YYYY-MM-DD');

  const [webpage, setwebpage] = useState(null);
  const [webpage_err, setwebpage_err] = useState(false);
  const [monthyear, setmonthyear] = useState(Moment().subtract(1, "month").format("YYYY-MM"));
  const [category, setcategory] = useState('Services');
  const [scheduler, setscheduler] = useState(null);
  const [activity, setactivity] = useState('Social Bookmarking');
  const [domain, setdomain] = useState(null);
  const [direct_url, setdirect_url] = useState(null);
  const [id, setid] = useState(null);
  const [password, setpassword] = useState(null);
  const [notes, setnotes] = useState(null);
  const [status, setstatus] = useState('In Review');
  const [is_show_contentshedular, setis_show_contentshedular] = useState(false)
  const [schedulars_list, setschedulars_list] = useState([]);
  const [total_backlinks, settotal_backlinks] = useState();
  const [published_on, setpublished_on] = useState(today_date);
  const [webpages_list, setwebpages_list] = useState([]);
  const history = useHistory();
  const alert = useAlert();

  const insertBackLink = () => {
    const backlink_data = {
      webpage: scheduler == null ? webpage : null,
      contentScheduler: webpage == null ? scheduler : null,
      category: category,
      offPageActivity: activity,
      domain: domain,
      id: id,
      password: password,
      notes: notes,
      directUrl: direct_url,
      status: status,
      date: published_on
    }

      addBackLink(backlink_data).then(resp => {
        if (resp.status == true) {
          alert.success('Backlink Created Successfully');
          history.push('/backlinks')
        }
        else if (resp?.message == 'Unauthorized User!!') {
          history.push('/logout')
          alert.error('Session timeout');
        }
        else {
          alert.error('BackLink already exists for same webpage/contentscheduler and Direct URL.');
        }

      }).catch(err => {
        alert.error('Backend server not responding, Please try again....');
      })
    
    
  }

  const handleInput = (name, value) => {
    name == 'category' && value !== '' && allWebpages(value)
    name == 'category' && value == 'Blogs' ? setwebpage(null) && setis_show_contentshedular(true) : setscheduler(null) && setis_show_contentshedular(false)
    setcategory(value)
  }

  const allWebpages = (category) => {
    const webpages_payload = {
      "options": {
        "select": ['webpage', 'webpageUrl', 'category', 'publishedOn']
      },
      "query": {
        "category": category
      }
    }

    getWebsites(webpages_payload).then(resp => {
      setwebpages_list(resp?.data[0]?.list)

    }).catch(err => {
    })

  }

  const handleWebpage = (e) => {
    checkIdPass()
    if (e) {
      setwebpage(e.value);
      setwebpage_err(false);
      setscheduler(null)
      setid(null)  
      setpassword(null) 
    }
    // setwebpageurl(e.url);
  }

  const handleScheduler = (e) => {
    checkIdPass()
    if (e) {
      setscheduler(e.value);
      setwebpage(null)
      setid(null)  
      setpassword(null) 
    }
    // setwebpageurl(e.url);
  }

  const allSchedulars = () => {

    getContentSchedulars().then(resp => {
      setschedulars_list(resp?.data[0]?.list)
    }).catch(err => {
    })

  }

  useEffect(() => {
    setTimeout(function () {
      allWebpages(category)
      allSchedulars()
      // handleWebpage()
    }, 1000);

  }, []);


  const checkIdPass = () => {
    setid(null)  
    setpassword(null) 

    const backlink_data = {
      domain: domain,
      webpage: webpage !== null ? webpage : undefined,
      contentScheduler: scheduler !== null ? scheduler : undefined
    }

checkBacklink(backlink_data).then(resp => {
      const data = resp.data[0];
      if(resp.data !== null){
        setid(data.id)  
        setpassword(data.password)
      }
      else{
        setid(null)  
        setpassword(null) 
      }

    }).catch(err => {
      setid('')  
      setpassword('') 
    })
  }

  const goBack = (e) => {
    history.push('/backlinks');
  };

  return (
    <>
      <div className="page-content">
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Back Links" breadcrumbItem="Create Back Link" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody >
                <CardTitle className="mb-4">Create Back Link</CardTitle>
                <AvForm onValidSubmit={(e, v) => {
                  insertBackLink()
                }}>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="published_on">Date</label>

                        <Flatpickr
                          className="form-control d-block"
                          name="published_on"
                          label="Published On"
                          id="published_on"
                          // onChange={e => setpublished_on(e.target.value)}
                          value={published_on ? Moment(published_on).format('YYYY-MM-DD') : undefined}
                          isDisabled={true}
                          // placeholder="dd M,yyyy"
                          options={{
                            altInput: true,
                            altFormat: "j-F-y",
                            dateFormat: "Y-m-d",
                            clickOpens: false,
                          }}
                        />

                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="page_activity">Off Page Activity Type</label>
                        <Select
                          id="page_activity"
                          name="page_activity"
                          label="Off Page Activity Type"
                          options={offPageActivityType}
                          classNamePrefix="select2-selection"
                          onChange={e => setactivity(e.value)}
                          defaultValue={{ value: 'Social Bookmarking', label: 'Social Bookmarking' }}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <Select
                          id="category"
                          name="category"
                          label="Category"
                          options={optionGroupCategory}
                          classNamePrefix="select2-selection"
                          defaultValue={{ value: category, label: category }}
                          onChange={e => handleInput("category", e.value)}
                        />
                      </div>
                    </Col>

                    {
                      category !== 'Blogs' && is_show_contentshedular == false ?

                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="webpage" className={webpage_err ? ' text-danger' : ''}>Web Page</label>
                            <Select
                              id="webpage"
                              options={
                                webpages_list && webpages_list.map(website => (

                                  { label: website.webpage, value: website._id, id: website._id, url: website.webpageUrl, category: website.category, publishedOn: website.publishedOn }
                                )
                                )
                              }
                              classNamePrefix="select2-selection"
                              onChange={e => handleWebpage(e)}
                            />
                            {webpage_err ? <div style={{ marginTop: '0.25rem', fontSize: '0.875em', color: '#ff715b' }}>This field is required</div> : ''}
                          </div>
                        </Col>
                        :
                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="contentscheduler" className={webpage_err ? ' text-danger' : ''}>Content Scheduler</label>
                            <Select
                              id="contentScheduler"
                              name="contentScheduler"
                              options={schedulars_list && schedulars_list.map(schedular => (
                                { label: schedular.topicTitle, value: schedular._id }
                              ))}
                              classNamePrefix="select2-selection"
                              // defaultValue={{ value: field.webpage, label: field.webpageName }}
                              placeholder={<div>Select Values</div>}
                              // onChange={e => handleInput(key, "contentScheduler", e.value)}
                              onChange={e => handleScheduler(e)}
                              // onChange={e => setscheduler(e.value) && checkIdPass()}

                            />
                            {/* {webpage_err ? <div style={{ marginTop: '0.25rem', fontSize: '0.875em', color: '#ff715b' }}>This field is required</div> : ''} */}
                          </div>
                        </Col>

                    }

                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="month_year">Month-Year</label> */}
                        <AvField
                          type="url"
                          name="domain"
                          label="Domain"
                          className="form-control"
                          id="domain"
                          required
                          onChange={e => setdomain(e.target.value)}
                          onBlur={e => checkIdPass()}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <AvField
                          type="url"
                          name="direct_url"
                          label="Direct URL"
                          className="form-control"
                          id="direct_url"
                          required
                          onChange={e => setdirect_url(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="status">Status</label>
                        <Select
                          name="status"
                          options={optionBackLinkStaus}
                          classNamePrefix="select2-selection form-control"
                          onChange={e => setstatus(e.value)}
                          defaultValue={{ value: 'In Review', label: 'In Review'}}
                        />
                      </div>
                    </Col>
                    </Row>

                    <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <AvField
                          type="text"
                          name="id"
                          label="ID"
                          className="form-control"
                          id="id"
                          required
                          onChange={e => setid(e.target.value)}
                          value={id}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <AvField
                          type="text"
                          name="password"
                          label="Password"
                          className="form-control"
                          id="password"
                          required
                          onChange={e => setpassword(e.target.value)}
                          value={password}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                          rows="4" cols="5"
                          name="notes"
                          className="inner form-control"
                          placeholder="Enter Notes"
                          onChange={e => setnotes(e.target.value)}

                        />
                      </div>
                    </Col>



                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} >
                          Create Backlink
                        </button>

                        <button type="button" className="btn btn-secondary" onClick={() => goBack()}>
                          Back
                        </button>

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

export default Createbacklink
