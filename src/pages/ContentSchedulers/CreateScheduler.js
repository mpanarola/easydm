import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap"
import Select from "react-select";
import { useHistory, Link } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const AddSchedular = () => {

  const [webpage, setwebpage] = useState(null);
  const [topic_title, settopic_title] = useState(null);
  const [topic_type, settopic_type] = useState(null);
  const [doc_link, setdoc_link] = useState(null);
  // const [referece_links, setreferece_links] = useState(null);

  const inpRow = [{ ref_link: "" }]
  const [referece_links, setreferece_links] = useState(inpRow)
  const [expected_words, setexpected_words] = useState(null);
  const [actual_words, setactual_words] = useState(null);
  const [content_status, setcontent_status] = useState(null);
  const [assigned_by, setassigned_by] = useState(null);
  const [written_by, setwritten_by] = useState(null);
  const [assigned_on, setassigned_on] = useState(null);
  


  const history = useHistory();

  // Webpages
  const optionGroupWebPage = [
    {
      label: "Web Pages",
      options: [
        { label: "Home", value: "Home" , url: "https://www.home.com/"},
          { label: "About", value: "About", url: "https://www.about.com/" },
          { label: "Contact", value: "Contact", url: "https://www.contact.com/" },
          { label: "Blogs", value: "Blogs", url: "https://www.blogs.com/" },
          { label: "Events", value: "Events", url: "https://www.events.com/" },
      ],
    },

  ];


  // User Status
  const optionGroupStaus = [
    {
      label: "Status",
      options: [
        { label: "In Progress", value: "In Progress" },
        { label: "Complete", value: "Complete" },
        { label: "Input missing", value: "Input missing" },
        { label: "In review", value: " In review" },
      ],
    },

  ];

  // Users
  const optionGroupMembers = [
    {
      label: "Members",
      options: [
        { label: "Ashish", value: "Ashish" },
        { label: "Nilesh", value: "Nilesh" },
        { label: "Milan", value: "Milan" }
      ],
    },

  ];

  // User Type
  const optionGroupType = [
    {
      label: "Type",
      options: [
        { label: "Blog", value: "Blog" },
        { label: "Article", value: "Article" },
        { label: "eBook", value: "eBook" },
        { label: "Infographics", value: "Infographics" },
        { label: "PPT", value: "PPT" },
      ],
    },

  ];

  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { ref_link: "" }
    setreferece_links([...referece_links, item1])
  }

  // Function for Remove Input Fields
  function handleRemoveFields(idx) {
    document.getElementById("nested" + idx).style.display = "none"
  }

  const createScheduler = (e) => {
    history.push('/content_schedulers')
  };

  const goBack = (e) => {
    // history.goBack();
    history.push('/content_schedulers');
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

                <form>
                  <Row>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="user_type">Content Type</label>
                        <Select
                          id="user_type"
                          isMulti={false}
                          options={optionGroupType}
                          classNamePrefix="select2-selection"
                        // onChange={e => settopic_type(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="web_page">Web Page</label>
                        { webpage!== null && <Link to={webpage} style={{ float: "right"}} >View Page</Link> }
                        <Select
                          id="web_page"
                          isMulti={false}
                          options={optionGroupWebPage}
                          classNamePrefix="select2-selection"
                        onChange={e => setwebpage(e.url)}
                        />
                      </div>
                    </Col>

                    <Col lg={12} className="mb-4 mt-4">

                      <div className="inner-repeater mb-4">
                        <div className="inner form-group mb-0 row">
                          {/* <Label className="col-form-label col-lg-2">
                              Referece Links
                              </Label>   */}
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
                                  <input
                                    type="url"
                                    className="inner form-control"
                                    defaultValue={field.name}
                                    placeholder="Enter Referece Link"
                                  />
                                </Col>

                                <Col md="1">
                                  <div className="mt-2 mt-md-0 d-grid">
                                    <Button
                                      color="primary"
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
                        <label htmlFor="topic_title">Topic Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="topic_title"
                          placeholder="Enter Topic Title"
                        // onChange={e => settopic_title(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="doc_link">Doc Link</label>
                        <input
                          type="url"
                          className="form-control"
                          id="doc_link"
                          placeholder="Enter Doc Link"
                        // onChange={e => setdoc_link(e.target.value)}
                        />
                      </div>
                    </Col>


                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="expected_words">Expected Words</label>
                        <input
                          type="number"
                          className="form-control"
                          id="expected_words"
                          placeholder="Enter Expected Words"
                        // onChange={e => setexpected_words(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="actual_words">Actual Words</label>
                        <input
                          type="number"
                          className="form-control"
                          id="actual_words"
                          placeholder="Enter Actual Words"
                        // onChange={e => setactual_words(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="assigned_on">Assigned On</label>
                        <input
                          type="date"
                          className="form-control"
                          id="assigned_on"
                        // onChange={e => setassigned_on(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="assigned_by">Assigned By</label>
                        <Select
                          id="assigned_by"
                          isMulti={false}
                          options={optionGroupMembers}
                          classNamePrefix="select2-selection"
                        // onChange={e => setwritten_by(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="submitted_on">Submiited On</label>
                        <input
                          type="date"
                          className="form-control"
                          id="submitted_on"
                        // onChange={e => setassigned_on(e.target.value)}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="written_by">Written By</label>
                        <Select
                          id="written_by"
                          isMulti={false}
                          options={optionGroupMembers}
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
                        // onChange={e => setcontent_status(e.target.value)}
                        />
                      </div>
                    </Col>


                
                  </Row>

                  <Row>
                  <Col lg={6}>

<div className="text-right col-lg-10 d-flex">
  <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} onClick={() => createScheduler()}>
    Create Content Scheduler
  </button>

  <button type="button" className="btn btn-secondary" onClick={() => goBack()}>
    Back
  </button>

</div>

</Col>
                  </Row>

                </form>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default AddSchedular
