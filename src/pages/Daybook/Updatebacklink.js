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

const Updatebacklink = () => {

  const [webpage, setwebpage] = useState(null);
  const [monthyear, setmonthyear] = useState(null);
  const [category, setcategory] = useState(null);
  const [total_backlinks, settotal_backlinks] = useState(null);

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


  const updateBacklink = (e) => {
    history.push('/backlinks')
  };

  const goBack = (e) => {
    // history.goBack();
    history.push('/backlinks');
  };


  return (
    <>
      <div className="page-content">
        
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Backlinks" breadcrumbItem="Update Backlink" />

          <Row>

          <Performance />

            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Update Backlink</CardTitle>
                  <form >
                  <Row>
                  <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="webpage">Web Page</label>
                        <Select
                      id="webpage"
                      options={optionGroupWebPage}
                      classNamePrefix="select2-selection"
                      // onChange={e => setwebpage(e.target.value)}
                      // value = {webpage}
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
                      // onChange={e => setcategory(e.target.value)}
                      // value = {category}
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
                          // onChange={e => setmonthyear(e.target.value)}
                          // value={monthyear}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="total_backlinks">Number of Backlinks</label>
                        <input
                          type="number"
                          className="form-control"
                          id="total_backlinks"
                          // onChange={e => settotal_backlinks(e.target.value)}
                          // value={total_backlinks}
                        />
                      </div>
                    </Col>


                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{marginRight: "30px"}} onClick={() => updateBacklink()}>
                          Create Backlinks
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

export default Updatebacklink