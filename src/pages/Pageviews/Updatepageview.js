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

import Performance from "./Performance"
import HistoryTimeline from "./Historytimeline"
import Moment from 'moment';


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Updatepageview = () => {

  var today = new Date(); //Current Date
  let today_date = Moment(today).format('YYYY-MM-DD');

  let head_published_on = Moment(today).format('DD-MMMM-YYYY');


  const [webpage, setwebpage] = useState('Home');
  const [monthyear, setmonthyear] = useState('2023-03');
  const [category, setcategory] = useState('Services');
  const [total_page_views, settotal_page_views] = useState('10');
  const [date, setdate] = useState(today_date);


  const history = useHistory();

  const defaultValue="2020-06-06";

    // Webpages
    const optionGroupWebPage = [
      {
        label: "Web Pages",
        options: [
          { label: "Home", value: "Home" , url: "https://www.home.com/" },
          { label: "About", value: "About", url: "https://www.about.com/", isdisabled: true },
          { label: "Contact", value: "Contact", url: "https://www.contact.com/",isdisabled: true },
          { label: "Blogs", value: "Blogs", url: "https://www.blogs.com/",isdisabled: true  },
          { label: "Events", value: "Events", url: "https://www.events.com/", isdisabled: true },
        ],
      },
  
    ];


  const optionGroupCategory = [
    {
      label: "Category",
      options: [
        { label: "Services", value: "Services",  },
        { label: "Industry", value: "Industry", isdisabled: true},
        { label: "Technologies", value: "Technologies", isdisabled: true},
        { label: "Career", value: "Career", isdisabled: true},
        { label: "Blogs", value: "Blogs", isdisabled: true}
      ],
    },
   
  ];


  const updatePageView = (e) => {
    history.push('/page_views')
  };


  const goBack = (e) => {
    // history.goBack();
    history.push('/page_views');
  };


  return (
    <>
      <div className="page-content">
        
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Page Views" breadcrumbItem="Update Page View" />

          <Row>

          <Card>
            <CardBody>
              <h4 className="me-4"> ID:  #1</h4>
              <label htmlFor="published_on">Created On :  {head_published_on}</label>
            </CardBody>
          </Card>

            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4 font-size-18">Update Page View</CardTitle>
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
                      onChange={(e) => setwebpage(e.url) }
                      // onChange={e => alert(e.target.options)}
                      defaultValue={{ label: webpage, value: webpage }}
                      isOptionDisabled={(option) => option.isdisabled}

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
                          defaultValue={date}
                          max={date}
                          min={date}
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
                      defaultValue={{ label: 'Services', value: 'Services' }}
                      isOptionDisabled={(option) => option.isdisabled}
                    />
                      </div>
                    </Col>

                   <Row className="mt-4">
                   <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="month_year">Month-Year</label>
                        <input
                          type="month"
                          className="form-control"
                          id="month_year"
                          // onChange={e => setmonthyear(e.target.value)}
                          // value={monthyear}
                          defaultValue = {monthyear}
                          max={monthyear}

                          
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
                          // onChange={e => settotal_page_views(e.target.value)}
                          defaultValue = {total_page_views}

                        />
                      </div>
                    </Col>
                   </Row>

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{marginRight: "30px"}} onClick={() => updatePageView()}>
                          Update Page View
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

            <Performance />
            <HistoryTimeline />

          </Row>
      </div>
    </>
  )
}

export default Updatepageview
