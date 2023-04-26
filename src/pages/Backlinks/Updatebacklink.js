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
import HistoryTimeline from "./Historytimeline"
import Moment from 'moment';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Updatebacklink = () => {

  var today = new Date(); //Current Date
  let today_date = Moment(today).format('YYYY-MM-DD');

  let head_published_on = Moment(today).format('DD-MMMM-YYYY');

  const [webpage, setwebpage] = useState('Home');
  const [monthyear, setmonthyear] = useState('2023-03');
  const [category, setcategory] = useState('Services');
  const [total_backlinks, settotal_backlinks] = useState('20');
  const [date, setdate] = useState(today_date);


  const history = useHistory();

  // Webpages
  const optionGroupWebPage = [
    {
      label: "Web Pages",
      options: [
        { label: "Home", value: "Home" },
        { label: "About", value: "About" ,isdisabled: true  },
        { label: "Contact", value: "Contact" ,isdisabled: true  },
        { label: "Blogs", value: "Blogs" ,isdisabled: true  },
        { label: "Events", value: "Events" ,isdisabled: true  },
      ],
    },

  ];


  const optionGroupCategory = [
    {
      label: "Category",
      options: [
        { label: "Services", value: "Services" },
        { label: "Industry", value: "Industry" ,isdisabled: true  },
        { label: "Technologies", value: "Technologies" ,isdisabled: true  },
        { label: "Career", value: "Career" ,isdisabled: true  },
        { label: "Blogs", value: "Blogs" ,isdisabled: true  }
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
        <Breadcrumbs title="Back Links" breadcrumbItem="Update Back Link" />

        <Row>
          <Card>
            <CardBody>
              <h4 className="me-4"> ID:  #1</h4>
              <label htmlFor="created_on">Created On :  {head_published_on}</label>
            </CardBody>
          </Card>

          <Col lg="12">
            <Card>
              <CardBody>

                <CardTitle className="mb-4 font-size-18">Update Back Link</CardTitle>
                <form >
                  <Row>
                    <Col lg={6} >
                      <div className="mb-3">
                        <label htmlFor="webpage">Web Page</label>
                        <Select
                          id="webpage"
                          options={optionGroupWebPage}
                          classNamePrefix="select2-selection"
                        // onChange={e => setwebpage(e.target.value)}
                        defaultValue={{ label: webpage, value: webpage }}
                        isOptionDisabled={(option) => option.isdisabled}

                        
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
                          defaultValue = {today_date}
                          max={today_date}
                          min={today_date}

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
                        defaultValue={{ label: category, value: category }}
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
                          defaultValue = {monthyear}
                          // min={monthyear}
                          max={monthyear}

                        // onChange={e => setmonthyear(e.target.value)}
                        // value={monthyear}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="total_backlinks">Number of Back Links</label>
                        <input
                          type="number"
                          className="form-control"
                          id="total_backlinks"
                        // onChange={e => settotal_backlinks(e.target.value)}
                        defaultValue = {total_backlinks}

                        />
                      </div>
                    </Col>

</Row>

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} onClick={() => updateBacklink()}>
                          Update Back Link
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

export default Updatebacklink
