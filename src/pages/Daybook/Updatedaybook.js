import React, { useState } from "react"
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

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Updatedaybook = () => {
  const inpRow = [{ webpage: "", category: "", hours: "", details: "", date: "" }]

  const [inputFields, setinputFields] = useState(inpRow)
  const [webpage, setwebpage] = useState(null);

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


  const optionGroupCategory = [
    {
      label: "Category",
      options: [
        { label: "Services", value: "Services" },
        { label: "Industry", value: "Industry" },
        { label: "Technologies", value: "Technologies" },
        { label: "Career", value: "Career" },
        { label: "Blogs", value: "Blogs" }
      ],
    },

  ];


  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { webpage: "", category: "", hours: "", details: "", date: "" }
    setinputFields([...inputFields, item1])
  }

  // Function for Remove Input Fields
  function handleRemoveFields(idx) {
    document.getElementById("nested" + idx).style.display = "none"
  }


  const updateDaybook = (e) => {
    history.push('/daybooks')
  };


  const goBack = (e) => {
    // history.goBack();
    history.push('/daybooks');
  };

  return (
    <>
      <div className="page-content">

        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Day Books" breadcrumbItem="Update Day Book" />

        {/* <Card>
            <CardBody>
              <h4 className="me-4"> ID:  #1</h4>
              <label htmlFor="published_on">Submiited On :  27-Mar-2023</label>
            </CardBody>
          </Card> */}

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4 font-size-18">Update Day Book</CardTitle>
                <form >
                <Row>
                    <div className="inner-repeater mb-5">
                      <div className="inner form-group mb-0 row">
                        {/* <Label className="col-form-label col-lg-2">
                          Add Day Book
                        </Label> */}
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
                              {/* webpage: "", category: "", hours: "", details: "" */}

                              <Col md="2">
                                <div className="mb-4 mt-md-0">
                                <input
                                      type="date"
                                      className="inner form-control"
                                      defaultValue={field.date}
                                    />
                                </div>
                              </Col>

                              <Col md="2">
                                <div className="mb-4 mt-md-0">
                                  <Select
                                    id="category"
                                    options={optionGroupCategory}
                                    classNamePrefix="select2-selection"
                                    placeholder={<div>Category</div>}
                                    // onChange={e => setcategory(e.target.value)}
                                    defaultValue={field.category}
                                  />
                                </div>
                              </Col>
                              
                              <Col md="2">
                              <div className="mb-4 mt-md-0">
                              
                                <Select
                                  id="webpage"
                                  options={optionGroupWebPage}
                                  classNamePrefix="select2-selection"
                                  defaultValue={field.webpage}
                                  placeholder={<div>Web Page</div>}
                                onChange={e => setwebpage(e.url)}
                                // value = {webpage}
                                />
                                {/* { webpage!== null &&  field.webpage !== "" && <Link to={webpage} style={{ float: "right" , marginTop: "5px"}} >View Page</Link> } */}
                                </div>
                              </Col>

                              <Col md="2">
                                <div className="mb-4  mt-md-0">
                                <input
                                      type="text"
                                      className="inner form-control"
                                      defaultValue={field.hours}
                                      placeholder="Enter Hours"
                                      maxLength="3"
                                    />
                                </div>
                              </Col>

                              <Col md="3">
                                <div className="mb-4 mt-md-0">
                                <textarea
                                     rows="4" cols="5"
                                      className="inner form-control"
                                      defaultValue={field.details}
                                      placeholder="Enter Details"
                                    />
                                </div>
                              </Col>

                              {
                                key !== 0 &&
                             
                              <Col md="1">
                                <div className="mb-4 mt-2 mt-md-0 d-grid">
                                  <Button
                                    color="primary"
                                    className="inner"
                                    onClick={() => {
                                      handleRemoveFields(key)
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
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} onClick={() => updateDaybook()}>
                          Update Day Book
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

export default Updatedaybook
