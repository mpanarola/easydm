import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import Select from "react-select";
import { useHistory } from 'react-router-dom';
import Historytimeline from "./Historytimeline"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Updatepage = () => {

  const [webpage, setwebpage] = useState(null);
  const [webpage_url, setwebpage_url] = useState(null);
  const [category, setcategory] = useState(null);
  const [assigned_to, setassigned_to] = useState(null);
  const [effective_from, seteffective_from] = useState(null);
  const [selectedMulti, setselectedMulti] = useState(null);

console.log('webpage ', webpage)
  const history = useHistory();

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }

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

  const optionGroup = [
    {
      label: "Members",
      options: [
        { label: "Ashish", value: "Ashish" },
        { label: "Nilesh", value: "Nilesh" },
        { label: "Milan", value: "Milan" },
      ],
    },
   
  ];

  const updateMember = (e) => {
    history.push('/webpages')
  };


  const goBack = (e) => {
    // history.goBack();
    history.push('/webpages');
  };


  return (
    <>
      <div className="page-content">
        
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Websites" breadcrumbItem="Update Website" />

          <Row>

          <Card>
            <CardBody>
              <h4 className="me-4"> ID:  #1</h4>
              <label htmlFor="published_on">Published On :  27-Mar-2023</label>
            </CardBody>
          </Card>

            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4 font-size-18">Update Website</CardTitle>
                  <form >
                  <Row>

                  <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <Select
                      id="category"
                      options={optionGroupCategory}
                      classNamePrefix="select2-selection"
                      // onChange={e => setcategory(e.target.value)}
                      // value = {category}
                    />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="name">Web Page</label>
                        <input
                          type="text"
                          className="form-control"
                          id="webpage"
                          placeholder="Enter Web Page"
                          onChange={e => setwebpage(e.target.value)}
                          // value={webpage}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="webpage_url">Web Page URL</label>
                        <input
                          type="url"
                          className="form-control"
                          id="webpage_url"
                          placeholder="Enter Web Page URL"
                          // onChange={e => setwebpage_url(e.target.value)}
                          // value={webpage_url}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="published_on">Published On</label>
                        <input
                          type="date"
                          className="form-control"
                          id="published_on"
                          // onChange={e => seteffective_from(e.target.value)}
                          // value={effective_from}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="assigned_to">Assigned To</label>
                        <Select
                      value={selectedMulti}
                      id="assigned_to"

                      isMulti={true}
                      onChange={() => {
                        handleMulti();
                      }}
                      options={optionGroup}
                      classNamePrefix="select2-selection"
                    />
                      </div>
                    </Col>


                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="effective_from">Effective From</label>
                        <input
                          type="date"
                          className="form-control"
                          id="effective_from"
                          // onChange={e => seteffective_from(e.target.value)}
                          // value={effective_from}
                        />
                      </div>
                    </Col>


                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{marginRight: "30px"}} onClick={() => updateMember()}>
                          Update Website
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

            <Historytimeline />
          </Row>
      </div>
    </>
  )
}

export default Updatepage
