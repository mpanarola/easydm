import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import Select from "react-select";
import { useHistory } from 'react-router-dom';

import { addBackLink, getWebsites } from '../../helpers/backend_helper'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { useAlert } from "react-alert";
import Moment from 'moment';
import { optionGroupCategory, optionGroupWebPage } from './Constants'

const Createbacklink = () => {
  const [webpage, setwebpage] = useState();
  const [webpage_err, setwebpage_err] = useState(false);
  const [monthyear, setmonthyear] = useState(Moment().subtract(1, "month").format("YYYY-MM"));

  const [category, setcategory] = useState(null);
  const [total_backlinks, settotal_backlinks] = useState();
  const [published_on, setpublished_on] = useState(null);
  const [webpages_list, setwebpages_list] = useState([]);
  const history = useHistory();
  const alert = useAlert();

  const insertBackLink = (event, values) => {

    const backlink_data = {
      webpage: webpage,
      monthYear: Moment(monthyear).startOf('month').format("YYYY-MM-DD"),
      category: category,
      numberOfBacklinks: total_backlinks,
      publishedOn: published_on
    }

    if (webpage == null) {
      alert.error('Please select webpage');
      setwebpage_err(true)
    }
    else {
      addBackLink(backlink_data).then(resp => {
        if (resp.status == true) {
          alert.success('Backlink Created Successfully');
          history.push('/backlinks')
        }
        else if (resp?.message == 'Unauthorized User!!') {
          history.push('/logout')
          alert.error('Session timeout');
        }
        else {
          alert.error('Month-Year already added for this page.');
        }

      }).catch(err => {
        alert.error('Backend server not responding, Please try again....');
      })
    }
  }

  const webpages_payload = {
    "options": {
      "select": ['webpage', 'webpageUrl', 'category', 'publishedOn']
    }
  }

  const allWebpages = () => {
    getWebsites(webpages_payload).then(resp => {
      setwebpages_list(resp?.data[0]?.list)

    }).catch(err => {
    })

  }

  const handleWebpage = (e) => {
    if (e) {
      console.log(' e ', e)
      setwebpage(e.value);
      setcategory(e.category);
      setpublished_on(e.publishedOn);
      setwebpage_err(false);
    }
    // setwebpageurl(e.url);
  }
  useEffect(() => {

    setTimeout(function () {
      allWebpages()
      // handleWebpage()
    }, 1000);

  }, []);


  const goBack = (e) => {
    history.push('/backlinks');
  };

  return (

    <>
      {console.log('category ', category)}
      <div className="page-content">

        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Back Links" breadcrumbItem="Create Back Link" />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody >
                <CardTitle className="mb-4">Create Back Link</CardTitle>
                <AvForm onValidSubmit={(e, v) => {
                  insertBackLink(e, v)
                }}>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="webpage" className={webpage_err ? ' text-danger' : ''}>Web Page</label>
                        <Select
                          id="webpage"
                          options={
                            webpages_list && webpages_list.map(website => (

                              { label: website.webpage, value: website._id, id: website._id, url: website.webpageUrl, category: website.category, publishedOn: website.publishedOn }
                            )
                            )
                          }
                          classNamePrefix="select2-selection"
                          onChange={e => handleWebpage(e)}
                        />
                        {webpage_err ? <div style={{ marginTop: '0.25rem', fontSize: '0.875em', color: '#ff715b' }}>This field is required</div> : ''}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="published_on">Published On</label>
                        <input
                          type="date"
                          name="published_on"
                          label="Published On"
                          className="form-control"
                          id="published_on"
                          onChange={e => setpublished_on(e.target.value)}
                          value={Moment(published_on).format('YYYY-MM-DD')}
                          readOnly
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <Select
                          id="category"
                          name="category"
                          label="Category"
                          // options={optionGroupCategory}
                          classNamePrefix="select2-selection"
                          onChange={e => setcategory(e.value)}
                          // value = {category}
                          value={{ label: category, value: category }}
                        />
                      </div>
                    </Col>

                    <Row className="mt-4">

                      <Col lg={6}>
                        <div className="mb-3">
                          {/* <label htmlFor="month_year">Month-Year</label> */}
                          <AvField
                            type="month"
                            name="month_year"
                            label="Month-Year"
                            className="form-control"
                            id="month_year"
                            required
                            onChange={e => setmonthyear(e.target.value)}
                            defaultValue={monthyear}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          {/* <label htmlFor="total_backlinks">Number of Backlinks</label> */}
                          <AvField
                            type="number"
                            name="total_backlinks"
                            label="Number of Backlinks"
                            className="form-control"
                            id="total_backlinks"
                            min={1}
                            required
                            onChange={e => settotal_backlinks(e.target.value)}
                          // value={total_backlinks}
                          />
                        </div>
                      </Col>

                    </Row>

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} >
                          Create Backlink
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
      </div>
    </>
  )
}

export default Createbacklink
