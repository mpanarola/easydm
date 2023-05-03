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

import { addPageView, getWebsites } from '../../helpers/backend_helper'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { useAlert } from "react-alert";
import Moment from 'moment';
import { webpages_payload } from './Constants'

const Createpageview = () => {

  const [webpage, setwebpage] = useState();
  const [monthyear, setmonthyear] = useState(Moment().subtract(1, "month").format("YYYY-MM"));
  const [category, setcategory] = useState(null);
  const [total_pageviews, settotal_pageviews] = useState();
  const [published_on, setpublished_on] = useState(null);
  const [webpages_list, setwebpages_list] = useState([]);
  const history = useHistory();
  const alert = useAlert();

  const insertPageView = (event, values) => {

    const pageview_data = {
      webpage: webpage,
      monthYear: monthyear,
      category: category,
      numberOfPageviews: total_pageviews,
      publishedOn: published_on
    }

    addPageView(pageview_data).then(resp => {
      // websiteUpdate((website_data, website_id)).then(resp=>{
      if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      }

      // console.log('resp?.data ', resp?.data)
      alert.success('Pageview Created Successfully');
      history.push('/page_views')

    }).catch(err => {
      alert.error('Backend server not responding, Please try again....');
    })

  }

  const allWebpages = () => {
    getWebsites(webpages_payload).then(resp => {
      setwebpages_list(resp?.data[0]?.list)
    }).catch(err => {
    })
  }

  const handleWebpage = (e) => {
    if (e) {
      setwebpage(e.value);
      setcategory(e.category);
      setpublished_on(e.publishedOn);
    }

  }

  useEffect(() => {
    setTimeout(function () {
      allWebpages()
    }, 1000);

  }, []);


  const goBack = (e) => {
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
              <CardBody >
                <CardTitle className="mb-4">Create Page View</CardTitle>
                <AvForm onValidSubmit={(e, v) => {
                  insertPageView(e, v)
                }}>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="webpage">Web Page</label>
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
                          required
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
                          {/* <label htmlFor="total_pageviews">Number of Backlinks</label> */}
                          <AvField
                            type="number"
                            name="total_pageviews"
                            label="Number of Page Views"
                            className="form-control"
                            id="total_pageviews"
                            required
                            onChange={e => settotal_pageviews(e.target.value)}
                          // value={total_pageviews}
                          />
                        </div>
                      </Col>

                    </Row>
                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} >
                          Create Page View
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

export default Createpageview
