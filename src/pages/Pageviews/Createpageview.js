import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import Select from "react-select";
import { useHistory, Link } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Createpageview = () => {

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


  const createPageView = (e) => {
    history.push('/page_views');
  };

  const goBack = (e) => {
    // history.goBack();
    history.push('/page_views');
  };


  return (
    <>
      <div className="page-content">
        
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Page Views" breadcrumbItem="Create Page View" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4 font-size-18">Create Page View</CardTitle>
                  <form >
                  <Row>
                  <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="webpage">Web Page</label>
                        { webpage!== null && <Link to={webpage} style={{ float: "right"}} >View Page</Link> }
                        <Select
                      id="webpage"
                      options={optionGroupWebPage}
                      classNamePrefix="select2-selection"
                      onChange={e => setwebpage(e.url)}
                      // value = {webpage}
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
                          // onChange={e => setassigned_on(e.target.value)}
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
                          type="month"
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
                          // onChange={e => settotal_page_views(e.target.value)}
                          // value={total_page_views}
                        />
                      </div>
                    </Col>


                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{marginRight: "30px"}} onClick={() => createPageView()}>
                          Create Page View
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

export default Createpageview
