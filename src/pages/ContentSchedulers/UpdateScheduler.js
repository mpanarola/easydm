import React, { useState, useEffect } from "react"
import Moment from 'moment';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap"
import Select from "react-select";
import { useHistory, withRouter } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { optionGroupType, optionGroupStaus, isArrayEquals } from './Constants'
import { updateSchedular, getWebsites, getAllMembers } from '../../helpers/backend_helper'
import { AvForm, AvField } from "availity-reactstrap-validation"
import { useAlert } from "react-alert";
import Historytimeline from "./Historytimeline"

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import "./datatables.scss"

const UpdateSchedular = (props) => {

  const schedular_data = props.location && props.location.state !== undefined ? props.location.state.data : '';
  // console.log('schedular_datass ', schedular_data)
  const history = useHistory();
  const alert = useAlert();
  const [id, setid] = useState(schedular_data && schedular_data._id);
  const [webpage, setwebpage] = useState(schedular_data && schedular_data.webpage && schedular_data.webpage.webpage);
  const [webpage_id, setwebpage_id] = useState(schedular_data && schedular_data.webpage && schedular_data.webpage._id);
  const [webpage_url, setwebpageurl] = useState(schedular_data && schedular_data.webpage && schedular_data.webpage.webpageUrl);
  const [topic_title, settopic_title] = useState(schedular_data && schedular_data.topicTitle);
  const [topic_type, settopic_type] = useState(schedular_data && schedular_data.contentType);
  const [doc_link, setdoc_link] = useState(schedular_data && schedular_data.docLink);
  const [ref_links, setref_links] = useState([]);

  const [deleted_ref_links, setdeleted_ref_links] = useState([]);
  const [updated_ref_links, setupdated_ref_links] = useState([]);
  const [added_ref_links, setadded_ref_links] = useState([]);




  let inpRow = []

  if (!schedular_data == '' && schedular_data.refereceLinks.length > 0) {
    inpRow = schedular_data && schedular_data.refereceLinks
  }
  let head_published_on = Moment(schedular_data && schedular_data.submitedOn).format('DD-MMM-YY');
  const [referece_links, setreferece_links] = useState(inpRow)
  const [expected_words, setexpected_words] = useState(schedular_data && schedular_data.expectedWords);
  const [actual_words, setactual_words] = useState(schedular_data && schedular_data.actualWords);
  const [content_status, setcontent_status] = useState(schedular_data && schedular_data.contentStatus);
  const [assigned_by, setassigned_by] = useState(schedular_data && schedular_data.assignedBy && schedular_data.assignedBy._id);
  const [written_by, setwritten_by] = useState(schedular_data && schedular_data.writtenBy && schedular_data.writtenBy._id);
  const [assigned_by_name, setassigned_by_name] = useState(schedular_data && schedular_data.assignedBy && schedular_data.assignedBy.name);
  const [written_by_name, setwritten_by_name] = useState(schedular_data && schedular_data.writtenBy && schedular_data.writtenBy.name);
  const [assigned_on, setassigned_on] = useState(schedular_data && schedular_data.assignedOn);
  const [submited_on, setsubmited_on] = useState(schedular_data && schedular_data.submitedOn);
  const [readability_semrush, setreadability_semrush] = useState(schedular_data && schedular_data.readability);
  const [seo_semrush, setseo_semrush] = useState(schedular_data && schedular_data.seo);
  const [ton_voice_semrush, setton_voice_semrush] = useState(schedular_data && schedular_data.toneOfVoice);
  const [originality_semrush, setoriginality_semrush] = useState(schedular_data && schedular_data.originality);
  const [content_score_semrush, setcontent_score_semrush] = useState(schedular_data && schedular_data.contentScore);
  const [members_list, setmembers_list] = useState([])
  const [webpages_list, setwebpages_list] = useState([])

  const member_payload = {
    "options": {
      "select": ['name']
    }
  }

  const allMembers = () => {
    getAllMembers(member_payload).then(resp => {
      setmembers_list(resp?.data[0]?.list)
    }).catch(err => {
    })

  }

  const webpages_payload = {
    "options": {
      "select": ['webpage', 'webpageUrl']
    }
  }

  const allWebpages = () => {
    getWebsites(webpages_payload).then(resp => {
      setwebpages_list(resp?.data[0]?.list)

    }).catch(err => {
    })

  }

  useEffect(() => {
    !schedular_data && goBack();
    setTimeout(function () {
      allMembers()
      allWebpages()

    }, 1000);

  }, []);


  const handleWebpage = (e) => {
    setwebpage(e.value);
    setwebpage_id(e.value);
    setwebpageurl(e.url);

  }

  const handleChange = (index, evnt) => {
    // console.log('ok')
    const { value } = evnt.target;

    const updated_link = referece_links.filter(function (val, id) {
      if (index == id) {
        return val
      }
    });

    if( updated_link[0].ref_link !== '') {
    updated_ref_links.push(updated_link[0])
    }
    const added_links = referece_links.filter(function (val, id) {
      if (index == id) {
        return val
      }
    });
    
   if( added_links[0].ref_link == '') {
    added_ref_links.push(value)
   }
    
    if (value) {
      const list = [...referece_links];
      list[index] = value;
      setreferece_links(list);
    }
  }

  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { ref_link: "", id: Date.now() }
    setreferece_links([...referece_links, item1])
  }

  // Function for Remove Input Fields
  function handleRemoveFields(e, idx) {
    const new_ref = referece_links.filter(function (key, obj) {
      return obj == idx;
    });
    deleted_ref_links.push(new_ref[0])

    const rows = [...referece_links];
    rows.splice(idx, 1);
    setreferece_links(rows);
  }

  const updateScheduler = (e) => {
    // const original_data = schedular_data.refereceLinks;
    // var updated_ref_link = referece_links.filter( function(n) { return !this.has(n) }, new Set(original_data) );
    // console.log('deleted_ref_links ', );
    const is_assigned_equal = isArrayEquals(referece_links, schedular_data.refereceLinks);
    // console.log('webpage_id ',webpage_id)
    const schedularData = {
      contentType: schedular_data && schedular_data.contentType !== topic_type ? topic_type : undefined,
      webpage: schedular_data && schedular_data.webpage && schedular_data.webpage._id !== webpage_id ? !schedular_data.webpage ? webpage_id : webpage_id : webpage_id == '' ? webpage_id : schedular_data.webpage == null ? webpage : undefined,
      refereceLinks: schedular_data && !is_assigned_equal ? referece_links : undefined,
      topicTitle: schedular_data && schedular_data.topicTitle !== topic_title ? topic_title : undefined,
      docLink: schedular_data && schedular_data.docLink !== doc_link ? doc_link : undefined,
      expectedWords: schedular_data && schedular_data.expectedWords !== expected_words ? expected_words : undefined,
      actualWords: schedular_data && schedular_data.actualWords !== actual_words ? actual_words : undefined,
      assignedOn: schedular_data && schedular_data.assignedOn !== assigned_on ? assigned_on : undefined,
      assignedBy: schedular_data && schedular_data.assignedBy && schedular_data.assignedBy._id !== assigned_by ? !schedular_data.assignedBy ? assigned_by : assigned_by : schedular_data.assignedBy == null ? assigned_by : undefined,
      submitedOn: schedular_data && schedular_data.submitedOn !== submited_on ? submited_on : undefined,

      writtenBy: schedular_data && schedular_data.writtenBy && schedular_data.writtenBy._id !== written_by ? !schedular_data.writtenBy ? written_by : written_by : schedular_data.writtenBy == null ? written_by : undefined,
      updated_ref_link: updated_ref_links,
      deleted_ref_link: deleted_ref_links,
      added_ref_link: added_ref_links,

      // writtenBy: schedular_data && schedular_data.writtenBy && schedular_data.writtenBy._id !== written_by && schedular_data.written_by == null ? written_by : undefined,
      contentStatus: schedular_data && schedular_data.contentStatus !== content_status ? content_status : undefined,
      readability: schedular_data && schedular_data.readability !== readability_semrush ? readability_semrush : undefined,
      seo: schedular_data && schedular_data.seo !== seo_semrush ? seo_semrush : undefined,
      toneOfVoice: schedular_data && schedular_data.toneOfVoice !== ton_voice_semrush ? ton_voice_semrush : undefined,
      originality: schedular_data && schedular_data.originality !== originality_semrush ? originality_semrush : undefined,
      contentScore: schedular_data && schedular_data.contentScore !== content_score_semrush ? content_score_semrush : undefined,
    }

    // console.log('schedularData ', schedularData)

    updateSchedular(schedularData, id).then(resp => {
      if (resp?.status == true) {
        alert.success('Content Schedular Updated Successfully');
        history.push('/content_schedulers')
      }
      else if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      }
      else {
        alert.error('Something Went Wrong!!');
      }
    }).catch(err => {
      alert.error('Backend server not responding, Please try again....');
    })

  };

  const goBack = (e) => {
    history.push('/content_schedulers');
  };

  return (
    <>
      <div className="page-content view_page">

        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Content Schedulers" breadcrumbItem="Update Content Scheduler" />

        <Row>
          <Card>
            <CardBody>
              <h4 className="me-4"> ID:  {id}</h4>
              <label htmlFor="created_on">Submiited On :  {head_published_on}</label>
            </CardBody>
          </Card>

          <Col lg="12">
            <Card>
              <CardBody>

                <AvForm onValidSubmit={(e, v) => {
                  updateScheduler(e, v)
                }}>
                  <Row>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="user_type">Content Type</label>
                        <Select
                          id="user_type"
                          isMulti={false}
                          options={optionGroupType}
                          classNamePrefix="select2-selection"
                          onChange={e => settopic_type(e.value)}
                          defaultValue={{ label: topic_type ? topic_type : 'Blog' }}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="web_page">Web Page</label>
                        {webpage_url !== null && <a href={webpage_url} target="_blank" style={{ float: "right" }} >View Page</a>}
                        <Select
                          id="web_page"
                          isMulti={false}
                          // options={optionGroupWebPage}
                          options={
                            webpages_list && webpages_list.map(website => (

                              { label: website.webpage, value: website._id, id: website._id, url: website.webpageUrl }
                            )
                            )

                          }
                          classNamePrefix="select2-selection"
                          onChange={e => handleWebpage(e)}
                          defaultValue={{ label: webpage }}
                        />
                      </div>
                    </Col>

                    <Col lg={12} className="mb-4 mt-4">

                      <div className="inner-repeater mb-4">
                        <div className="inner form-group mb-0 row">
                          <label htmlFor="doc_link"> Referece Links</label>
                          <div
                            className="inner col-lg-12 ml-md-auto"
                            id="repeater"
                          >
                            {referece_links && referece_links.map((field, key) => (

                              <div
                                key={key}
                                id={key}
                                className="mb-3 row align-items-center"
                              >
                                <Col md="11">

                                  <AvField
                                    type="url"
                                    name={"url" + key}
                                    id={key}
                                    className="inner form-control"
                                    required
                                    defaultValue={typeof field !== 'object' ? field : ''}
                                    placeholder="Enter Referece Link"
                                    onBlur={(evnt) => handleChange(key, evnt)}
                                  />
                                  {typeof field !== 'object' && <a href={field} target="_blank" style={{ float: "right" }} >View Link</a>}
                                </Col>

                                {key != 0 &&
                                  <Col md="1">
                                    <div className="mt-2 mt-md-0 d-grid">
                                      <Button
                                        color="danger"
                                        className="btn btn-danger fas fa-trash"
                                        onClick={(e) => {
                                          handleRemoveFields(e, key)
                                        }}

                                      >
                                      </Button>
                                    </div>
                                  </Col>
                                }
                              </div>
                            ))}
                          </div>
                        </div>
                        <Row className="justify-content-start">
                          <Col lg="5">
                            <Button
                              color="success"
                              className="inner"
                              onClick={() => {
                                handleAddFields()
                              }}
                            >
                              Add
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>



                  </Row>

                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="topic_title">Topic Title</label> */}
                        <AvField
                          type="text"
                          name="topic_title"
                          label="Topic Title"
                          className="form-control"
                          id="topic_title"
                          placeholder="Enter Topic Title"
                          onChange={e => settopic_title(e.target.value)}
                          defaultValue={topic_title}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="doc_link">Doc Link</label> */}
                        <AvField
                          type="url"
                          name="doc_link"
                          label="Doc Link"
                          className="form-control"
                          id="doc_link"
                          required
                          placeholder="Enter Doc Link"
                          onChange={e => setdoc_link(e.target.value)}
                          defaultValue={doc_link}
                        />
                      </div>
                    </Col>


                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="expected_words">Expected Words</label> */}
                        <AvField
                          type="number"
                          name="expected_words"
                          label="Expected Words"
                          className="form-control"
                          id="expected_words"
                          min={1}
                          placeholder="Enter Expected Words"
                          onChange={e => setexpected_words(e.target.value)}
                          defaultValue={expected_words}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="actual_words">Actual Words</label> */}
                        <AvField
                          type="number"
                          name="actual_words"
                          label="Actual Words"
                          className="form-control"
                          id="actual_words"
                          min={1}
                          placeholder="Enter Actual Words"
                          onChange={e => setactual_words(e.target.value)}
                          defaultValue={actual_words}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3 while_bg_c">
                        <label htmlFor="assigned_on">Assigned On</label>

                        <Flatpickr
                          className="form-control d-block"
                          name="assigned_on"
                          id="assigned_on"
                          onChange={date => setassigned_on(date[0])}
                          defaultValue={assigned_on}
                          // isDisabled={true}
                          // placeholder="dd M,yyyy"
                          options={{
                            altInput: true,
                            altFormat: "j-F-y",
                            dateFormat: "Y-m-d",
                            clickOpens: true,
                          }}
                        />

                        {/* <AvField
                          type="date"
                          name="assigned_on"
                          label="Assigned On"
                          className="form-control"
                          id="assigned_on"
                          onChange={e => setassigned_on(e.target.value)}
                          defaultValue={Moment(assigned_on).format('YYYY-MM-DD')}
                        /> */}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="assigned_by">Assigned By</label>
                        <Select
                          id="assigned_by"
                          isMulti={false}
                          options={
                            members_list && members_list.map(user => (

                              { label: user.name, value: user._id, id: user._id }
                            )
                            )

                          }
                          onChange={(e) => {
                            setassigned_by(e.value)
                          }}
                          classNamePrefix="select2-selection"
                          // onChange={e => setwritten_by(e.target.value)}
                          defaultValue={{ value: assigned_by, label: assigned_by_name }}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3 while_bg_c">
                        <label htmlFor="submitted_on">Submiited On</label>

                        <Flatpickr
                          className="form-control d-block"
                          name="submitted_on"
                          id="submitted_on"
                          onChange={date => setsubmited_on(date[0])}
                          defaultValue={submited_on}
                          // isDisabled={true}
                          // placeholder="dd M,yyyy"
                          options={{
                            altInput: true,
                            altFormat: "j-F-y",
                            dateFormat: "Y-m-d",
                            clickOpens: true,
                          }}
                        />

                        {/* <AvField
                          type="date"
                          name="submitted_on"
                          label="Submiited On"
                          className="form-control"
                          id="submitted_on"
                          onChange={e => setsubmited_on(e.target.value)}
                          defaultValue={Moment(submited_on).format('YYYY-MM-DD')}
                        /> */}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="written_by">Written By</label>
                        <Select
                          id="written_by"
                          isMulti={false}
                          options={
                            members_list && members_list.map(user => (

                              { label: user.name, value: user._id, id: user._id }
                            )
                            )

                          }
                          onChange={(e) => {

                            setwritten_by(e.value)
                          }}
                          defaultValue={{ value: written_by, label: written_by_name }}
                          classNamePrefix="select2-selection"
                        // onChange={e => setwritten_by(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="content_status">Content Status</label>
                        <Select
                          id="content_status"
                          isMulti={false}
                          options={optionGroupStaus}
                          classNamePrefix="select2-selection"
                          onChange={e => setcontent_status(e.value)}
                          defaultValue={{ label: content_status ? content_status : 'In Progress' }}
                        />
                      </div>
                    </Col>
                  </Row>


                  <Row className="mt-4">
                    <h5 className="mb-4">Content Quality</h5>
                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
                        <AvField
                          id="readability_semrush"
                          name="readability_semrush"
                          label="Readability (SEMRush)"
                          type="number"
                          min={1}
                          classNamePrefix="form-control"
                          onChange={e => setreadability_semrush(e.target.value)}
                          defaultValue={readability_semrush}
                        />
                      </div>
                    </Col>


                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
                        <AvField
                          id="SEO_semrush"
                          name="SEO_semrush"
                          type="number"
                          label="SEO (SEMRush)"
                          min={1}
                          classNamePrefix="form-control"
                          onChange={e => setseo_semrush(e.target.value)}
                          defaultValue={seo_semrush}
                        />
                      </div>
                    </Col>


                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
                        <AvField
                          id="ton_voice_semrush"
                          name="ton_voice_semrush"
                          label="Tone of Voice (SEMRush)"
                          type="number"
                          min={1}
                          classNamePrefix="form-control"
                          onChange={e => setton_voice_semrush(e.target.value)}
                          defaultValue={ton_voice_semrush}
                        />
                      </div>
                    </Col>


                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
                        <AvField
                          type="number"
                          min={1}
                          id="originality_semrush"
                          name="originality_semrush"
                          label="Originality (SEMRush)"
                          classNamePrefix="form-control"
                          onChange={e => setoriginality_semrush(e.target.value)}
                          defaultValue={originality_semrush}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
                        <AvField
                          id="content_score_semrush"
                          name="content_score_semrush"
                          label="Content Score (Surfer SEO)"
                          type="number"
                          min={1}
                          classNamePrefix="form-control"
                          onChange={e => setcontent_score_semrush(e.target.value)}
                          defaultValue={content_score_semrush}
                        />
                      </div>
                    </Col>

                  </Row>

                  <Row>
                    <Col lg={6}>

                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} >
                          Update Content Scheduler
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
        <Historytimeline id={id} />

      </div>
    </>
  )
}

// export default UpdateSchedular
export default withRouter(UpdateSchedular)
