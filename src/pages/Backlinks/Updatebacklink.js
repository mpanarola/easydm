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
import { getWebsite, updateBackLink } from '../../helpers/backend_helper'
import { optionGroupCategory, optionGroupWebPage } from './Constants'

const Updatebacklink = (props) => {

  const history = useHistory();
  const alert = useAlert();

  const data = props.location && props.location.state;
  console.log('data ', data)
  //   var today = new Date(); //Current Date
  //   let today_date = Moment(today).format('YYYY-MM-DD');

  let head_published_on = Moment(data && data.data.createdAt).format('DD-MMM-YY');

  const [webpage, setwebpage] = useState(data && data.data.webpage.webpage);
  const [webpage_id, setwebpage_id] = useState(data && data.data.webpage._id);

  const [monthyear, setmonthyear] = useState(Moment().subtract(1, "month").format("YYYY-MM"));
  const [category, setcategory] = useState();
  const [total_backlinks, settotal_backlinks] = useState(data && data.data.numberOfBacklinks);
  const [published_on, setpublished_on] = useState(Moment(data && data.data.publishedOn).format('YYYY-MM-DD'));
  const [webpages_list, setwebpages_list] = useState([]);
  // const [date, setdate] = useState(today_date);
  const [id, setid] = useState(data && data.data._id);

  const updateBacklink = (event, values) => {
    const backlink_data = {
      // monthYear: Moment(monthyear).format('YYYY-MM-DD'),
      // category: category,
      numberOfBacklinks: data && data.data.numberOfBacklinks !== total_backlinks ? total_backlinks : undefined,
      // publishedOn: published_on
    }

    updateBackLink(backlink_data, id).then(resp => {
      if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      } else {
        alert.success('Backlink Updated Successfully');
        history.push('/backlinks')
      }
    }).catch(err => {
      alert.error('Backend server not responding, Please try again....');
      history.push('/logout')
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
    // history.goBack();
    history.push('/backlinks');
  };


  return (
    <>
      <div className="page-content">

        {/* Render Breadcrumbs */}
        {console.log('webpages_list ', webpages_list)}
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

                <CardTitle className="mb-4 font-size-18">Update Back Link</CardTitle>
                <AvForm onValidSubmit={(e, v) => {
                  updateBacklink(e, v)
                }}>
                  <Row>
                    <Col lg={6} >
                      <div className="mb-3">
                        <label htmlFor="webpage">Web Page</label>
                        <Select
                          id="webpage"
                          // options={optionGroupWebPage}
                          // options= {{ label: webpage, value: webpage_id }}
                          classNamePrefix="select2-selection"
                          // onChange={e => setwebpage_id(e.value)}
                          defaultValue={{ label: webpage, value: webpage }}
                          readOnly
                        // isOptionDisabled={(option) => option.isdisabled}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="published_on">Published On</label> */}
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
                            // defaultValue = {monthyear}
                            readOnly
                            required
                            onChange={e => setmonthyear(e.target.value)}
                            // value={monthyear}
                            defaultValue={monthyear}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          {/* <label htmlFor="total_backlinks">Number of Back Links</label> */}
                          <AvField
                            type="number"
                            name="total_backlinks"
                            label="Number of Back Links"
                            className="form-control"
                            id="total_backlinks"
                            onChange={e => settotal_backlinks(e.target.value)}
                            defaultValue={total_backlinks}
                            required
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

export default Updatebacklink
