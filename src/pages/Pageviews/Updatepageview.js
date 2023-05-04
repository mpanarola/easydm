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

import Performance from "./Performance"
import HistoryTimeline from "./Historytimeline"
import Moment from 'moment';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"


import { AvForm, AvField } from "availity-reactstrap-validation"
import { useAlert } from "react-alert";
import { getWebsite, updatePageView as updatePageview } from '../../helpers/backend_helper'
import { optionGroupCategory, optionGroupWebPage } from './Constants'

const Updatepageview = (props) => {

  const history = useHistory();
  const alert = useAlert();

  const data = props.location && props.location.state;
  let head_published_on = Moment(data && data.data.createdAt).format('DD-MMM-YY');

  // console.log('data ',data)
  const [webpage, setwebpage] = useState(data.data.webpage && data.data.webpage.webpage);
  const [webpage_id, setwebpage_id] = useState(data.data.webpage && data.data.webpage._id);

  const [monthyear, setmonthyear] = useState(Moment(data && data.data.monthYear).format("YYYY-MM"));

  const [monthyear_full, setmonthyear_full] = useState(Moment(data && data.data.monthYear).startOf('month').format("YYYY-MM-DD"));

  const [category, setcategory] = useState();
  const [total_pageviews, settotal_pageviews] = useState(data && data.data.numberOfPageviews);
  const [published_on, setpublished_on] = useState(Moment(data && data.data.publishedOn).format('YYYY-MM-DD'));
  const [webpages_list, setwebpages_list] = useState([]);

  const [readability_semrush, setreadability_semrush] = useState(data && data.data.readability);
  const [seo_semrush, setseo_semrush] = useState(data && data.data.seo);
  const [ton_voice_semrush, setton_voice_semrush] = useState(data && data.data.toneOfVoice);
  const [originality_semrush, setoriginality_semrush] = useState(data && data.data.originality);
  const [content_score_semrush, setcontent_score_semrush] = useState(data && data.data.contentScore);

  const [is_set_webpage_required, setis_set_webpage_required] = useState(false);

  const [id, setid] = useState(data && data.data._id);

  const updatePageView = (event, values) => {
    const pageview_data = {
      // monthYear: monthyear_full,
      // category: category,
      numberOfPageviews: total_pageviews,
      readability: readability_semrush,
      seo: seo_semrush,
      toneOfVoice: ton_voice_semrush,
      originality: originality_semrush,
      contentScore: content_score_semrush
      // publishedOn: published_on
    }

    updatePageview(pageview_data, id).then(resp => {
      if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      } else {
        alert.success('Pageview Updated Successfully');
        history.push('/page_views')
      }
    }).catch(err => {
      alert.error('Backend server not responding, Please try again....');
    })


  }

  // const webpages_payload =  {
  //   "options": {
  //     "select": ['webpage', 'webpageUrl', 'category']
  //   }
  // }

  const allWebpages = () => {

    getWebsite(webpage_id).then(resp => {
      const data = resp?.data[0];

      setpublished_on(data.publishedOn)
      setwebpage(data.webpage)
      setwebpage_id(data._id)

      setcategory(data.category)
      setwebpages_list(resp?.data[0])
    }).catch(err => {
    })

  }

  useEffect(() => {

    setTimeout(function () {
      allWebpages()
    }, 500);

  }, []);

  const goBack = (e) => {
    history.push('/page_views');
  };


  return (
    <>
      <div className="page-content">

        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Back Links" breadcrumbItem="Update Back Link" />

        <Row>
          <Card>
            <CardBody>
              <h4 className="me-4"> ID:  {id}</h4>
              <label htmlFor="created_on">Created On :  {head_published_on}</label>
            </CardBody>
          </Card>

          <Col lg="12">
            <Card>
              <CardBody>

                <CardTitle className="mb-4 font-size-18">Update Page View</CardTitle>
                <AvForm onValidSubmit={(e, v) => {
                  updatePageView(e, v)
                }}>
                  <Row>
                    <Col lg={6} >
                      <div className="mb-3">
                        <label htmlFor="webpage">Web Page</label>
                        <Select
                          id="webpage"
                          classNamePrefix="select2-selection"
                          defaultValue={{ label: webpage, value: webpage }}
                          readOnly

                        />
                        {is_set_webpage_required == true &&
                          <div class="d-block">This field is required</div>
                        }
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <AvField
                          type="date"
                          name="published_on"
                          label="Published On"
                          className="form-control"
                          id="published_on"
                          defaultValue={published_on}
                          onChange={e => setpublished_on(e.target.value)}
                          readOnly
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <Select
                          id="category"
                          classNamePrefix="select2-selection"
                          value={{ label: category && category, value: category && category }}
                        // defaultValue={{ label: category, value: category }}
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
                            readOnly
                            required
                            onChange={e => setmonthyear(e.target.value)}
                            defaultValue={monthyear}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          {/* <label htmlFor="total_pageviews">Number of Back Links</label> */}
                          <AvField
                            type="number"
                            name="total_pageviews"
                            label="Number of Page Views"
                            className="form-control"
                            id="total_pageviews"
                            onChange={e => settotal_pageviews(e.target.value)}
                            defaultValue={total_pageviews}
                            required
                          />
                        </div>
                      </Col>

                    </Row>

                    <Row className="mt-4">

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
                            defaultValue={readability_semrush}
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
                            defaultValue={seo_semrush}
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
                            defaultValue={ton_voice_semrush}
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
                            defaultValue={originality_semrush}
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
                            defaultValue={content_score_semrush}
                            onChange={e => setcontent_score_semrush(e.target.value)}
                          />
                        </div>
                      </Col>

                    </Row>

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }} >
                          Update Back Link
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

          <Performance id={webpage_id} />
          <HistoryTimeline id={id} />
        </Row>
      </div>
    </>
  )
}

export default Updatepageview
