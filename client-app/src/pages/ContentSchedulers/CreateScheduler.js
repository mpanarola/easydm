import React, { useState, useEffect } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap"
import Select from "react-select";
import { useHistory, Link } from 'react-router-dom';
import Moment from 'moment';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { optionGroupType, optionGroupStaus } from './Constants'
import { addNewSchedular, getWebsites, getAllMembers } from '../../helpers/backend_helper'
import { AvForm, AvField } from "availity-reactstrap-validation"
import { useAlert } from "react-alert";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import "./datatables.scss"

const AddSchedular = () => {

  const history = useHistory();
  const alert = useAlert();

  const [webpage, setwebpage] = useState(null);
  const [webpage_err, setwebpage_err] = useState(false);
  const [assigned_by_err, setassigned_by_err] = useState(false);
  const [written_by_err, setwritten_by_err] = useState(false);

  const [webpage_url, setwebpageurl] = useState(null);

  const [topic_title, settopic_title] = useState(null);
  const [topic_type, settopic_type] = useState('Article');
  const [doc_link, setdoc_link] = useState(null);
  const [ref_links, setref_links] = useState([]);

  const inpRow = [{ ref_link: "" }]
  const [referece_links, setreferece_links] = useState(inpRow)
  const [expected_words, setexpected_words] = useState(null);
  const [actual_words, setactual_words] = useState(null);
  const [content_status, setcontent_status] = useState('In-progress');
  const [assigned_by, setassigned_by] = useState();
  const [written_by, setwritten_by] = useState();
  const [assigned_on, setassigned_on] = useState(Moment().format('YYYY-MM-DD'));
  const [submited_on, setsubmited_on] = useState(Moment().format('YYYY-MM-DD'));
  const [readability_semrush, setreadability_semrush] = useState();
  const [seo_semrush, setseo_semrush] = useState();
  const [ton_voice_semrush, setton_voice_semrush] = useState();
  const [originality_semrush, setoriginality_semrush] = useState();
  const [content_score_semrush, setcontent_score_semrush] = useState();
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
    setTimeout(function () {
      allMembers()
      allWebpages()

    }, 1000);

  }, []);


  const handleWebpage = (e) => {
    setwebpage(e.value);
    setwebpageurl(e.url);
    webpage == null && setwebpage_err(false)
  }

  const handleChange = (index, evnt) => {
    const { value } = evnt.target;
    const list = [...ref_links];
    list[index] = value;
    setref_links(list);
  }

  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { ref_link: "" }
    setreferece_links([...referece_links, item1])
  }

  // Function for Remove Input Fields
  function handleRemoveFields(idx) {
    document.getElementById("nested" + idx).style.display = "none"
    const rows = [...ref_links];
    rows.splice(idx, 1);
    setref_links(rows);
  }

  const createScheduler = (e) => {
    // console.log('referece_links ', ref_links)
    const schedular_data = {
      contentType: topic_type,
      webpage: webpage,
      refereceLinks: ref_links,
      topicTitle: topic_title,
      docLink: doc_link,
      expectedWords: expected_words,
      actualWords: actual_words,
      assignedOn: assigned_on,
      assignedBy: assigned_by,
      submitedOn: submited_on,
      writtenBy: written_by,
      contentStatus: content_status,
      readability: readability_semrush,
      seo: seo_semrush,
      toneOfVoice: ton_voice_semrush,
      originality: originality_semrush,
      contentScore: content_score_semrush
    }

    if (webpage == null || written_by == null || assigned_by == null) {
      alert.error('Please select required fields');
      webpage == null && setwebpage_err(true)
      assigned_by == null && setassigned_by_err(true)
      written_by == null && setwritten_by_err(true)

    }
    else {
      addNewSchedular(schedular_data).then(resp => {
        if (resp?.status == true) {
          alert.success('Content Schedular Created Successfully');
          history.push('/EasyDM/content_schedulers')
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
    }



  };

  const goBack = (e) => {
    // history.goBack();
    history.push('/EasyDM/content_schedulers');
  };


  return (
    <>
      <div className="page-content">
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Content Schedulers" breadcrumbItem="Create Content Scheduler" />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Create Content Scheduler</CardTitle>

                <AvForm onValidSubmit={(e, v) => {
                  createScheduler(e, v)
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
                          defaultValue={{ label: 'Article' }}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="webpage" className={webpage_err ? ' text-danger' : ''}>Web Page</label>
                        {webpage_url !== null && <a href={webpage_url} target="_blank" style={{ float: "right" }} >View Page</a>}
                        <Select
                          id="web_page"
                          isMulti={false}
                          options={
                            webpages_list && webpages_list.map(website => (
                              { label: website.webpage, value: website._id, id: website._id, url: website.webpageUrl }
                            )
                            )
                          }
                          classNamePrefix="select2-selection"
                          onChange={e => handleWebpage(e)}
                        />
                        {webpage_err ? <div style={{ marginTop: '0.25rem', fontSize: '0.875em', color: '#ff715b' }}>This field is required</div> : ''}
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
                            {referece_links.map((field, key) => (
                              <div
                                key={key}
                                id={"nested" + key}
                                className="mb-3 row align-items-center"
                              >
                                <Col md="11">
                                  <AvField
                                    type="url"
                                    name={"url"+key}
                                    id={key}
                                   
                                    required
                                    className="inner form-control"
                                    defaultValue={field.name}
                                    placeholder="Enter Referece Link"
                                    onChange={(evnt) => handleChange(key, evnt)}
                                  />
                                </Col>

                                {key != 0 &&
                                  <Col md="1">
                                    <div className="mt-2 mt-md-0 d-grid">
                                      <Button
                                        color="danger"
                                        className="inner"
                                        onClick={() => {
                                          handleRemoveFields(key)
                                        }}
                                        block
                                      >
                                        Remove
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
                          required
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
                          placeholder="Enter Doc Link"
                          onChange={e => setdoc_link(e.target.value)}
                          required
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
                          required
                          onChange={e => setexpected_words(e.target.value)}
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
                          // required
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
                          value={assigned_on}
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
                          defaultValue={assigned_on}
                          onChange={e => setassigned_on(e.target.value)}
                          required
                        /> */}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="assigned_by" className={assigned_by_err ? ' text-danger' : ''}>Assigned By</label>
                        <Select
                          id="assigned_by"
                          isMulti={false}
                          onChange={(e) => {
                            setassigned_by_err(false)
                            setassigned_by(e.value)
                          }}
                          options={
                            members_list && members_list.map((user) => (
                              { label: user.name, value: user._id, id: user._id }
                            )
                            )
                          }

                          classNamePrefix="select2-selection"
                        />
                        {assigned_by_err ? <div style={{ marginTop: '0.25rem', fontSize: '0.875em', color: '#ff715b' }}>This field is required</div> : ''}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3 while_bg_c">
                        <label htmlFor="submitted_on">To Be Submitted On</label>

                        <Flatpickr
                        className="form-control d-block"
                        name="submitted_on"
                          id="submitted_on"
                          onChange={date => setsubmited_on(date[0])}
                          defaultValue={submited_on}
                          value={assigned_on}
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
                          defaultValue={submited_on}
                          onChange={e => setsubmited_on(e.target.value)}
                          required
                        /> */}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="written_by" className={written_by_err ? ' text-danger' : ''}>Written By</label>
                        <Select
                          id="written_by"
                          isMulti={false}
                          onChange={(e) => {
                            setwritten_by_err(false)
                            setwritten_by(e.value)
                          }}
                          options={
                            members_list && members_list.map(user => (
                              { label: user.name, value: user._id, id: user._id }
                            )
                            )
                          }
                          classNamePrefix="select2-selection"
                        />
                        {written_by_err ? <div style={{ marginTop: '0.25rem', fontSize: '0.875em', color: '#ff715b' }}>This field is required</div> : ''}
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
                          defaultValue={{ label: "In-progress" }}
                          required
                        />
                      </div>
                    </Col>

                  </Row>



                  <Row className="mt-4">
                  <h5 className="mb-4">Content Quality</h5>
                  {/* <CardTitle className="mb-4">Content Quality</CardTitle> */}

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
                          min={1}
                          label="SEO (SEMRush)"
                          classNamePrefix="form-control"
                          onChange={e => setseo_semrush(e.target.value)}
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
                        />
                      </div>
                    </Col>


                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
                        <AvField
                          type="number"
                          id="originality_semrush"
                          name="originality_semrush"
                          label="Originality (SEMRush)"
                          min={1}
                          classNamePrefix="form-control"
                          onChange={e => setoriginality_semrush(e.target.value)}
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
                        />
                      </div>
                    </Col>

                  </Row>

                  <Row>
                    <Col lg={6}>

                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} >
                          Create Content Scheduler
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

export default AddSchedular
