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

import Performance from "./Performance"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Updatepageview = () => {

  const [webpage, setwebpage] = useState(null);
  const [monthyear, setmonthyear] = useState(null);
  const [category, setcategory] = useState(null);
  const [total_page_views, settotal_page_views] = useState(null);

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


  const updatePageView = (e) => {
    history.push('/page_views')
  };




  return (
    <>
      <div className="page-content">
        
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Page Views" breadcrumbItem="Update Page View" />

          <Row>

          <Performance />

            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Update Page View</CardTitle>
                  <form >
                  <Row>
                  <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="webpage">Web Page</label>
                        <Select
                      id="webpage"
                      options={optionGroupWebPage}
                      classNamePrefix="select2-selection"
                      onChange={e => setwebpage(e.target.value)}
                      value = {webpage}
                    />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <Select
                      id="category"
                      options={optionGroupCategory}
                      classNamePrefix="select2-selection"
                      onChange={e => setcategory(e.target.value)}
                      value = {category}
                    />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="month_year">Month-Year</label>
                        <input
                          type="date"
                          className="form-control"
                          id="month_year"
                          onChange={e => setmonthyear(e.target.value)}
                          value={monthyear}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="total_pageviews">Number of Page Views</label>
                        <input
                          type="number"
                          className="form-control"
                          id="total_pageviews"
                          onChange={e => settotal_page_views(e.target.value)}
                          value={total_page_views}
                        />
                      </div>
                    </Col>


                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{marginRight: "30px"}} onClick={() => updatePageView()}>
                          Create Page View
                        </button>

                        <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>
                          Back
                        </button>

                      </div>
                    </Col>

                  </Row>

                </form>
                  {/* <Row className="justify-content-end">
                    <Col lg="10">
                      <Button type="submit" color="primary">
                        Create Task
                      </Button>
                    </Col>
                  </Row> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    </>
  )
}

export default Updatepageview
