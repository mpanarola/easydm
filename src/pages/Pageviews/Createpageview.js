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

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import "./datatables.scss"

const Createpageview = () => {

  const [webpage, setwebpage] = useState();
  const [webpage_err, setwebpage_err] = useState(false);
  const [monthyear, setmonthyear] = useState(Moment().subtract(1, "month").format("YYYY-MM"));
  const [category, setcategory] = useState(null);
  const [total_pageviews, settotal_pageviews] = useState();
  const [published_on, setpublished_on] = useState(null);
  const [readability_semrush, setreadability_semrush] = useState();
  const [seo_semrush, setseo_semrush] = useState();
  const [ton_voice_semrush, setton_voice_semrush] = useState();
  const [originality_semrush, setoriginality_semrush] = useState();
  const [content_score_semrush, setcontent_score_semrush] = useState();
  const [webpages_list, setwebpages_list] = useState([]);
  const history = useHistory();
  const alert = useAlert();

  const insertPageView = (event, values) => {

    const pageview_data = {
      webpage: webpage,
      monthYear: Moment(monthyear).startOf('month').format("YYYY-MM-DD"),
      category: category,
      numberOfPageviews: total_pageviews,
      publishedOn: published_on,
      readability: readability_semrush,
      seo: seo_semrush,
      toneOfVoice: ton_voice_semrush,
      originality: originality_semrush,
      contentScore: content_score_semrush
    }

    if(webpage == null){
      alert.error('Please select webpage');
      setwebpage_err(true)
    }
    else{
      addPageView(pageview_data).then(resp => {
        if (resp.status == true) {
          alert.success('Pageview Created Successfully');
          history.push('/page_views')
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
      setwebpage_err(false)
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
                      <div className='mb-3' >
                        <label htmlFor="webpage" className= {webpage_err ? ' text-danger': ''}>Web Page</label>
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
                       {webpage_err ?  <div style={{marginTop: '0.25rem', fontSize: '0.875em', color: '#ff715b'}}>This field is required</div> : '' }
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="published_on">Published On</label>
                        <Flatpickr
                        className="form-control d-block"
                        name="published_on"
                          label="Published On"
                          id="published_on"
                          // onChange={e => setpublished_on(e.target.value)}
                          value={ published_on ? Moment(published_on).format('YYYY-MM-DD') : undefined}
                          isDisabled={true}
                          // placeholder="dd M,yyyy"
                        options={{
                          altInput: true,
                          altFormat: "j-F-y",
                          dateFormat: "Y-m-d",
                          clickOpens: false,
                        }}
                      />

                        {/* <input
                          type="date"
                          name="published_on"
                          label="Published On"
                          className="form-control"
                          id="published_on"
                          onChange={e => setpublished_on(e.target.value)}
                          value={Moment(published_on).format('YYYY-MM-DD')}
                          readOnly
                          required
                        /> */}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <Select
                          id="category"
                          name="category"
                          label="Category"
                          classNamePrefix="select2-selection"
                          onChange={e => setcategory(e.value)}
                          value={{ label: category, value: category }}
                          isDisabled={true}
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
                            // placeholder={'Select'}
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
                            min={1}
                            required
                            onChange={e => settotal_pageviews(e.target.value)}
                          />
                        </div>
                      </Col>

                    </Row>

                    <Row className="mt-4">
                    <h5 className="mb-4">Content Quality</h5>
                      <Col lg={6}>
                        <div className="mb-3">
                          {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
                          <AvField
                            id="readability_semrush"
                            name="readability_semrush"
                            label="Readability (SEMRush)"
                            type="number"
                            classNamePrefix="form-control"
                            onChange={e => setreadability_semrush(e.target.value)}
                          />
                        </div>
                      </Col>


                      <Col lg={6}>
                        <div className="mb-3">
                          {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
                          <AvField
                            id="SEO_semrush"
                            name="SEO_semrush"
                            type="number"
                            label="SEO (SEMRush)"
                            classNamePrefix="form-control"
                            onChange={e => setseo_semrush(e.target.value)}
                          />
                        </div>
                      </Col>


                      <Col lg={6}>
                        <div className="mb-3">
                          {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
                          <AvField
                            id="ton_voice_semrush"
                            name="ton_voice_semrush"
                            label="Tone of Voice (SEMRush)"
                            type="number"
                            classNamePrefix="form-control"
                            onChange={e => setton_voice_semrush(e.target.value)}
                          />
                        </div>
                      </Col>


                      <Col lg={6}>
                        <div className="mb-3">
                          {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
                          <AvField
                            id="originality_semrush"
                            name="originality_semrush"
                            label="Originality (SEMRush)"
                            classNamePrefix="form-control"
                            onChange={e => setoriginality_semrush(e.target.value)}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          {/* <label htmlFor="content_status">Readability (SEMRush)</label> */}
                          <AvField
                            id="content_score_semrush"
                            name="content_score_semrush"
                            label="Content Score (Surfer SEO)"
                            type="number"
                            classNamePrefix="form-control"
                            onChange={e => setcontent_score_semrush(e.target.value)}
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
