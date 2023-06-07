import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import Select from "react-select";
import { useHistory, withRouter } from 'react-router-dom';
import Performance from "./Performance"
import HistoryTimeline from "./Historytimeline"
import Moment from 'moment';
//Import Breadcrumb
import { optionGroupCategory, offPageActivityType, optionBackLinkStaus } from '../../Constants'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { useAlert } from "react-alert";
import { getWebsites, updateBackLink, getContentSchedulars, checkBacklink } from '../../helpers/backend_helper'
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import "./datatables.scss"

const Updatebacklink = (props) => {

  const history = useHistory();
  const alert = useAlert();

  const data = props.location && props.location.state;

  let head_published_on = Moment(data && data.data.date).format('DD-MMM-YY');
  const [webpage, setwebpage] = useState(data && data.data.webpage && data.data.webpage.webpage);
  const [webpage_id, setwebpage_id] = useState(data && data.data.webpage && data.data.webpage._id);
  const [webpage_url, setwebpage_url] = useState(data && data.data.webpage && data.data.webpage.webpageUrl);
  const [webpage_err, setwebpage_err] = useState(false);

  const [category, setcategory] = useState(data && data.data.category);

  const [contentScheduler, setscheduler] = useState(data && data.data.contentScheduler);
  const [contentTopicTitle, setcontentTopicTitle] = useState(data && data.data.contentTopicTitle);

  const [offPageActivity, setactivity] = useState(data && data.data.offPageActivity);
  const [domain, setdomain] = useState(data && data.data.domain);
  const [directUrl, setdirect_url] = useState(data && data.data.directUrl);
  const [id, setid] = useState(data && data.data.id);
  const [password, setpassword] = useState(data && data.data.password);
  const [notes, setnotes] = useState(data && data.data.notes);
  const [status, setstatus] = useState(data && data.data.status);

  const [is_show_contentshedular, setis_show_contentshedular] = useState(false)
  const [schedulars_list, setschedulars_list] = useState([]);

  const [total_backlinks, settotal_backlinks] = useState(data && data.data.numberOfBacklinks);
  const [published_on, setpublished_on] = useState(Moment(data && data.data.date).format('YYYY-MM-DD'));
  const [webpages_list, setwebpages_list] = useState([]);
  // const [date, setdate] = useState(today_date);
  const [backlink_id, setbacklink_id] = useState(data && data.data._id);

  const updateBacklink = (event, values) => {
    const backlink_data = {
      webpage: data && data.data.webpage._id !== webpage_id ? webpage_id : undefined,
      category: data && data.data.category !== category ? category : undefined ,
      offPageActivity: data && data.data.offPageActivity !== offPageActivity ? offPageActivity : undefined ,
      domain: data && data.data.domain !== domain ? domain : undefined,
      id: data && data.data.id !== id ? id : undefined ,
      password: data && data.data.password !== password ? password : undefined,
      notes: data && data.data.notes !== notes ? notes : undefined,
      directUrl: data && data.data.directUrl !== directUrl ? directUrl : undefined,
      contentScheduler: data && data.data.contentScheduler !== contentScheduler ? contentScheduler : undefined,
      status: data && data.data.status !== status ? status : undefined,
      // date: data && data.data.published_on !== published_on ? published_on : undefined 
    }

// console.log('backlink_data ', backlink_data)
    updateBackLink(backlink_data, backlink_id).then(resp => {

      if (resp.status == true) {
        alert.success('Backlink Updated Successfully');
        history.push('/EasyDM/backlinks')
      }
      else if (resp?.message == 'Unauthorized User!!') {
        history.push('/EasyDM/logout')
        alert.error('Session timeout');
      }
      else {
        alert.error('BackLink already exists for same webpage/contentscheduler and Direct URL.');
      }
    }).catch(err => {
      alert.error('Backend server not responding, Please try again....');
      // history.push('/EasyDM/logout')
    })

  }

  const checkIdPass = () => {
    setid(null)  
    setpassword(null) 

    const backlink_data = {
      domain: domain,
      webpage: webpage_id !== null ? webpage_id : undefined,
      contentScheduler: contentScheduler !== null ? contentScheduler : undefined
    }

    checkBacklink(backlink_data).then(resp => {
      const data = resp.data[0];
      setid(data.id)  
      setpassword(data.password) 
    }).catch(err => {
      setid(id)  
      setpassword(password) 
    })

  }


  const handleInput = (name, value) => {
    name == 'category' && value !== '' && allWebpages(value)
    name == 'category' && value == 'Blogs' ? setwebpage_id(null) && setis_show_contentshedular(true) : setscheduler(null) && setis_show_contentshedular(false)
    setcategory(value)
  }

  const allWebpages = (category) => {
    const webpages_payload = {
      "options": {
        "select": ['webpage', 'webpageUrl']
      },
      "query": {
        "category": category !== '' && category
      }
    }

    getWebsites(webpages_payload).then(resp => {
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
    !data && goBack();
    setTimeout(function () {
      allWebpages()
      allSchedulars()
    }, 500);

  }, []);

  const goBack = (e) => {
    // history.goBack();
    history.push('/EasyDM/backlinks');
  };


  return (
    <>
      <div className="page-content view_page">
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Back Links" breadcrumbItem="Update Back Link" />
        {console.log('password', password)}
        <Row>
          <Card>
            <CardBody>
              <h4 className="me-4"> ID:  {webpage_id}</h4>
              <label htmlFor="created_on">Created On :  {head_published_on}</label>
            </CardBody>
          </Card>

          <Col lg="12">
            <Card>
              <CardBody>

                <CardTitle className="mb-4 font-size-18">Update Back Link</CardTitle>
                <AvForm onValidSubmit={(e, v) => {
                  updateBacklink(e, v)
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
                          defaultValue={{ value: offPageActivity, label: offPageActivity }}
                          classNamePrefix="select2-selection"
                          onChange={e => setactivity(e.value)}
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
                          // onChange={e => setcategory(e.value)}
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
                                webpages_list && webpages_list !== null && webpages_list.map(website => (

                                  { label: website.webpage, value: website._id, id: website._id, url: website.webpageUrl, category: website.category, publishedOn: website.publishedOn }
                                )
                                )
                              }
                              defaultValue={{ value: webpage_id, label: webpage }}
                              classNamePrefix="select2-selection"
                              onChange={e => setwebpage_id(e.value)}
                            />
                            {webpage_err ? <div style={{ marginTop: '0.25rem', fontSize: '0.875em', color: '#ff715b' }}>This field is required</div> : ''}
                          </div>
                        </Col>
                        :
                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="contentscheduler" >Content Scheduler</label>
                            <Select
                              id="contentScheduler"
                              name="contentScheduler"
                              options={schedulars_list && schedulars_list.map(schedular => (
                                { label: schedular.topicTitle, value: schedular._id }
                              ))}
                              classNamePrefix="select2-selection"
                              defaultValue={{ value: contentScheduler, label: contentTopicTitle }}
                              placeholder={<div>Select Values</div>}
                              onChange={e => setscheduler(e.value)}

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

                          defaultValue={domain}

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
                          defaultValue={directUrl}
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
                          defaultValue={{ value: status, label: status }}
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
                          defaultValue={notes}

                        />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} >
                          Update Back Link
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

          {/* <Performance id={webpage_id} /> */}
          <HistoryTimeline id={backlink_id} />
        </Row>
      </div>
    </>
  )
}

// export default Updatebacklink
export default withRouter(Updatebacklink)
