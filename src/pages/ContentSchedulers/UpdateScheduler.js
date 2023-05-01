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
import { useHistory, Link } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { optionGroupType, optionGroupStaus } from './Constants'
import {updateSchedular, getWebsites, getAllMembers } from '../../helpers/backend_helper'
import { AvForm, AvField } from "availity-reactstrap-validation"
import { useAlert } from "react-alert";
import Historytimeline from "./Historytimeline"

const UpdateSchedular = (props) => {

  const schedular_data =   props.location && props.location.state.data;
console.log('schedular_data ', schedular_data)
  const history = useHistory();
  const alert = useAlert();

  const [id, setid] = useState(schedular_data && schedular_data._id);

  const [webpage, setwebpage] = useState(schedular_data && schedular_data.webpage.webpage);
  const [webpage_id, setwebpage_id] = useState(schedular_data && schedular_data.webpage._id);

  const [webpage_url, setwebpageurl] = useState(schedular_data && schedular_data.webpage.webpageUrl);

  const [topic_title, settopic_title] = useState(schedular_data && schedular_data.topicTitle);
  const [topic_type, settopic_type] = useState(schedular_data && schedular_data.contentType);
  const [doc_link, setdoc_link] = useState(schedular_data && schedular_data.docLink);
  const [ref_links, setref_links] = useState([]);

  const inpRow = schedular_data && schedular_data.refereceLinks
  const [referece_links, setreferece_links] = useState(inpRow)
  const [expected_words, setexpected_words] = useState(schedular_data && schedular_data.expectedWords);
  const [actual_words, setactual_words] = useState(schedular_data && schedular_data.actualWords);
  const [content_status, setcontent_status] = useState(schedular_data && schedular_data.contentStatus);
  const [assigned_by, setassigned_by] = useState(schedular_data && schedular_data.assignedBy);
  const [written_by, setwritten_by] = useState(schedular_data && schedular_data.writtenBy);
  const [assigned_on, setassigned_on] = useState(schedular_data && schedular_data.assignedOn);
  const [submited_on, setsubmited_on] = useState(schedular_data && schedular_data.submitedOn);


  const [readability_semrush, setreadability_semrush] = useState(schedular_data && schedular_data.readability);
  const [seo_semrush, setseo_semrush] = useState(schedular_data && schedular_data.seo);
  const [ton_voice_semrush, setton_voice_semrush] = useState(schedular_data && schedular_data.toneOfVoice);
  const [originality_semrush, setoriginality_semrush] = useState(schedular_data && schedular_data.originality);
  const [content_score_semrush, setcontent_score_semrush] = useState(schedular_data && schedular_data.contentScore);
  
  const [members_list, setmembers_list] = useState([])
  const [webpages_list, setwebpages_list] = useState([])



  const member_payload =  {
    "options": {
      "select": ['name']
    }
  }
  
  const allMembers = () => {
    getAllMembers(member_payload).then(resp=>{
      setmembers_list(resp?.data[0]?.list)
    
    }).catch(err=>{
    })
    
  }
  
  const webpages_payload =  {
    "options": {
      "select": ['webpage', 'webpageUrl']
    }
  }
  
  const allWebpages = () => {
    getWebsites(webpages_payload).then(resp=>{
      setwebpages_list(resp?.data[0]?.list)
    
    }).catch(err=>{
    })
    
  }

  useEffect(()=>{
  
    setTimeout(function() {
      allMembers()
      allWebpages()

  }, 1000);
  
  },[]);




  // Webpages
  // const optionGroupWebPage = [
  //   {
  //     label: "Web Pages",
  //     options: [
  //       { label: "Home", value: "Home" , url: "https://www.home.com/"},
  //         { label: "About", value: "About", url: "https://www.about.com/" },
  //         { label: "Contact", value: "Contact", url: "https://www.contact.com/" },
  //         { label: "Blogs", value: "Blogs", url: "https://www.blogs.com/" },
  //         { label: "Events", value: "Events", url: "https://www.events.com/" },
  //     ],
  //   },

  // ];


  const handleWebpage = (e)=>{
    setwebpage(e.value);
    setwebpage_id(e.value);
    setwebpageurl(e.url);

}



  const handleChange = (index, evnt)=>{
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

  const updateScheduler = (e) => {
    // alert(id)
    // console.log('id ', id)
    const schedular_data = {
      contentType : topic_type,
      webpage: webpage_id,
      refereceLinks: ref_links,
      topicTitle: topic_title,
      docLink: doc_link,
      expectedWords: expected_words,
      actualWords: actual_words,
      assignedOn: assigned_on,
      assignedBy: assigned_by,
      submitedOn: submited_on ,
      writtenBy: written_by,
      contentStatus: content_status,
    readability: readability_semrush,
    seo: seo_semrush,
    toneOfVoice: ton_voice_semrush,
    originality: originality_semrush,
    contentScore: content_score_semrush

    //   id: id
    }

    // console.log('update schedular_data ', schedular_data)
    updateSchedular(schedular_data, id).then(resp=>{
    // websiteUpdate((website_data, website_id)).then(resp=>{
      // console.log('resp ', resp)
      if(resp?.message == 'Unauthorized User!!')
      {          
          history.push('/logout')
          alert.error('Session timeout');
      }

      // console.log('resp?.data ', resp?.data)
      alert.success('Content Schedular Create Successfully');
      history.push('/content_schedulers')

    }).catch(err=>{
      alert.error('Backend server not responding, Please try again....');
    })

  };

  const goBack = (e) => {
    // history.goBack();
    history.push('/content_schedulers');
  };

  return (
    <>
      <div className="page-content">

        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Content Schedulers" breadcrumbItem="Update Content Scheduler" />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Update Content Scheduler</CardTitle>

                <AvForm  onValidSubmit={(e, v) => {
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
                        defaultValue= {{label : topic_type ? topic_type : 'Blog'}}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="web_page">Web Page</label>
                        { webpage_url!== null && <a href={webpage_url} target="_blank" style={{ float: "right"}} >View Page</a> }
                        <Select
                          id="web_page"
                          isMulti={false}
                          // options={optionGroupWebPage}
                          options= {
                            webpages_list && webpages_list.map( website => ( 
          
                              { label: website.webpage, value: website._id, id: website._id, url: website.webpageUrl }
                            )
                            )
    
                          }
                          classNamePrefix="select2-selection"
                          onChange={e => handleWebpage(e)}
                          defaultValue= { { label: webpage}}
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
                            {referece_links.map((field, key) => (
                              <div
                                key={key}
                                id={"nested" + key}
                                className="mb-3 row align-items-center"
                              >
                                <Col md="11">
                                <AvField
                                    type="url"
                                    name="url"
                                    className="inner form-control"
                                    defaultValue={field}
                                    placeholder="Enter Referece Link"
                                    onChange={(evnt)=>handleChange(key, evnt)}
                                    // onChange={(e) => {
                                    //   setref_links( ...ref_links,  e.target.value)
                                    // }}
                                  />
                                </Col>

                              { key != 0 &&
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
                        defaultValue = {topic_title}
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
                        defaultValue = {doc_link}
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
                          placeholder="Enter Expected Words"
                        onChange={e => setexpected_words(e.target.value)}
                        defaultValue = {expected_words}
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
                          placeholder="Enter Actual Words"
                        onChange={e => setactual_words(e.target.value)}
                        defaultValue = {actual_words}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="assigned_on">Assigned On</label> */}
                        <AvField
                          type="date"
                          name="assigned_on"
                          label="Assigned On"
                          className="form-control"
                          id="assigned_on"
                        onChange={e => setassigned_on(e.target.value)}
                        defaultValue = { Moment(assigned_on).format('YYYY-MM-DD') }
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="assigned_by">Assigned By</label>
                        <Select
                          id="assigned_by"
                          isMulti={false}
                          onChange={(e) => {
                            setassigned_by( e.value )
                          }}
                          options= {
                            members_list && members_list.map( user => ( 
          
                              { label: user.name, value: user._id, id: user._id }
                            )
                            )
    
                          }
                          classNamePrefix="select2-selection"
                        // onChange={e => setwritten_by(e.target.value)}
                        defaultValue = {{label : assigned_by.name}}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="submitted_on">Submiited On</label> */}
                        <AvField
                          type="date"
                          name="submitted_on"
                          label="Submiited On"
                          className="form-control"
                          id="submitted_on"
                          onChange={e => setsubmited_on(e.target.value)}
                          defaultValue = {Moment(submited_on).format('YYYY-MM-DD') }
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="written_by">Written By</label>
                        <Select
                          id="written_by"
                          isMulti={false}
                          onChange={(e) => {
                            
                            setwritten_by( e.value )
                          }}
                          options= {
                            members_list && members_list.map( user => ( 
          
                              { label: user.name, value: user._id, id: user._id }
                            )
                            )
    
                          }
                          defaultValue = {{label : written_by.name}}
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
                        defaultValue = { {label : content_status ? content_status : 'In Progress'} }
                        />
                      </div>
                    </Col>
                  </Row>


                  <Row className="mt-4">

<Col lg={6}>
    <div className="mb-3">
      {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
      <AvField
        id="readability_semrush"
        name="readability_semrush"
        label="Readability (SEMRush)"
        type="number"
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
        classNamePrefix="form-control"
        onChange={e => setcontent_score_semrush(e.target.value)}
        defaultValue = {content_score_semrush}
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
                          <Historytimeline id={id}/>

      </div>
    </>
  )
}

export default UpdateSchedular
