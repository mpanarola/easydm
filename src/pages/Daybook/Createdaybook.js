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
import { useHistory } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Createdaybook = () => {
  const inpRow = [{ webpage: "", category: "", hours: "", details: "", date: "" }]

  const [inputFields, setinputFields] = useState(inpRow)


  const history = useHistory();

  // Webpages
  const optionGroupWebPage = [
    {
      label: "Web Pages",
      options: [
        { label: "Home", value: "Home" },
        { label: "About", value: "About" },
        { label: "Contact", value: "Contact" },
        { label: "Blogs", value: "Blogs" },
        { label: "Events", value: "Events" },
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


  const createDaybook = (e) => {
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
        <Breadcrumbs title="Day Books" breadcrumbItem="Create Day Book" />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4 font-size-18">Create Day Book</CardTitle>
                <form >
                  <Row>
                    <div className="inner-repeater mb-5">
                      <div className="inner form-group mb-0 row">
                        <Label className="col-form-label col-lg-2">
                          Add Day Book
                        </Label>
                        <div
                          className="inner col-lg-10 ml-md-auto"
                          id="repeater"
                        >
                          {inputFields.map((field, key) => (
                            <div
                              key={key}
                              id={"nested" + key}
                              className="mb-3 row align-items-center"
                            >
                              {/* webpage: "", category: "", hours: "", details: "" */}
                              <Col md="6">
                              <div className="mt-4 mb-4 mt-md-0">
                                <Select
                                  id="webpage"
                                  options={optionGroupWebPage}
                                  classNamePrefix="select2-selection"
                                  defaultValue={field.webpage}
                                  placeholder={<div>Select Web Page</div>}
                                // onChange={e => setwebpage(e.target.value)}
                                // value = {webpage}
                                />
                                </div>
                              </Col>
                              <Col md="6">
                                <div className="mt-4 mb-4 mt-md-0">
                                  <Select
                                    id="category"
                                    options={optionGroupCategory}
                                    classNamePrefix="select2-selection"
                                    placeholder={<div>Select Category</div>}
                                    // onChange={e => setcategory(e.target.value)}
                                    defaultValue={field.category}
                                  />
                                </div>
                              </Col>

                              <Col md="12">
                                <div className="mt-4 mb-4 mt-md-0">
                                <textarea
                                    
                                      className="inner form-control"
                                      defaultValue={field.details}
                                      placeholder="Enter Details"
                                    />
                                </div>
                              </Col>

                              <Col md="5">
                                <div className="mt-4  mt-md-0">
                                <input
                                      type="text"
                                      className="inner form-control"
                                      defaultValue={field.hours}
                                      placeholder="Enter Hours"
                                      maxLength="3"
                                    />
                                </div>
                              </Col>

                              <Col md="5">
                                <div className="mt-4  mt-md-0">
                                <input
                                      type="date"
                                      className="inner form-control"
                                      defaultValue={field.date}
                                    />
                                </div>
                              </Col>


                              <Col md="2">
                                <div className="mt-2 mt-md-0 d-grid">
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
                            </div>
                          ))}
                        </div>
                      </div>
                      <Row className="justify-content-end">
                        <Col lg="10" md="2">
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


                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} onClick={() => createDaybook()}>
                          Create Day Book
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

export default Createdaybook
