import React, { useState, useEffect } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import Select from "react-select";
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { optionGroupCategory } from './Constants'
import { getAllMembers, addNewWebsite } from '../../helpers/backend_helper'
import { AvForm, AvField } from "availity-reactstrap-validation"
import { useAlert } from "react-alert";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import "./datatables.scss"

const Createpage = () => {
  const [webpage, setwebpage] = useState(null);
  const [webpage_url, setwebpage_url] = useState(null);
  const [category, setcategory] = useState('Services');
  const [assigned_to, setassigned_to] = useState([]);
  const [effective_from, seteffective_from] = useState(Moment().format('YYYY-MM-DD'));
  const [selectedMulti, setselectedMulti] = useState(null);
  const [published_on, setpublished_on] = useState(Moment().format('YYYY-MM-DD'));
  const [members_list, setmembers_list] = useState([])

  const history = useHistory();
  const alert = useAlert();


  const member_payload = {
    "options": {
      "select": ['name']
    }
  }

  const allMembers = () => {
    getAllMembers(member_payload).then(resp => {
      setmembers_list(resp?.data[0].list)
    }).catch(err => {
    })
  }

  useEffect(() => {

    setTimeout(function () {
      allMembers()
    }, 1000);

  }, []);

  const addWebsite = (event, values) => {

    const website_data = {
      webpage: webpage,
      webpageUrl: webpage_url,
      category: category,
      assignedTo: assigned_to.map(i => i.value ? i.value : i._id),
      effectiveFrom: Moment(effective_from).format('YYYY-MM-DD') ,
      publishedOn: Moment(published_on).format('YYYY-MM-DD')
    }

    addNewWebsite(website_data).then(resp => {
      if (resp?.status == true) {
        alert.success('Website Created Successfully');
        history.push('/easyDM/webpages')
      }
      else if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      }
      else {
        alert.error('Webpage name already exists.');
      }
    }).catch(err => {
      alert.error('Backend server not responding, Please try again....');
    })
  }

  const goBack = (e) => {
    // history.goBack();
    history.push('/easyDM/webpages');
  };

  return (
    <>
      <div className="page-content">
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Websites" breadcrumbItem="Create Website" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4 font-size-18">Create Website</CardTitle>
                <AvForm onValidSubmit={(e, v) => {
                  addWebsite(e, v)
                }}>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <Select
                          id="category"
                          defaultValue={{ label: category, value: category }}
                          options={optionGroupCategory}
                          classNamePrefix="select2-selection"
                          onChange={e => setcategory(e.value)}
                        // value = {category}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="name">Web Page</label> */}
                        <AvField
                          type="text"
                          label="Web Page"
                          name="webpage"
                          className="form-control"
                          id="webpage"
                          placeholder="Enter Web Page"
                          onChange={e => setwebpage(e.target.value)}
                          required
                        // value={webpage}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="webpage_url">Web Page URL</label> */}
                        <AvField
                          type="url"
                          label="Web Page URL"
                          name="webpage_url"
                          className="form-control"
                          id="webpage_url"
                          placeholder="Enter Web Page URL"
                          onChange={e => setwebpage_url(e.target.value)}
                          required
                        />
                      </div>
                    </Col>


                    <Col lg={6}>
                      <div className="mb-3 while_bg_c">
                        <label htmlFor="Published_on">Published On</label>

                        <Flatpickr
                        className="form-control d-block"
                        name="published_on"
                          id="published_on"
                          onChange={date => setpublished_on(date[0])}
                          value={ published_on ? Moment(published_on).format('YYYY-MM-DD') : undefined}
                          // isDisabled={true}
                          // placeholder="dd M,yyyy"
                        options={{
                          altInput: true,
                          altFormat: "j-F-y",
                          dateFormat: "Y-m-d",
                          // clickOpens: false,
                        }}
                      />

                        {/* <AvField
                          type="date"
                          label="Published On"
                          name="published_on"
                          className="form-control"
                          id="published_on"
                          onChange={e => setpublished_on(e.target.value)}
                          defaultValue={published_on}
                          required
                        /> */}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3 ">
                        <label htmlFor="assigned_to">Assigned To</label>
                        <Select
                          id="assigned_to"
                          isMulti={true}
                          onChange={setassigned_to}
                          options={
                            members_list && members_list.map(user => (
                              { label: user.name, value: user._id, id: user._id }
                            )
                            )
                          }
                          classNamePrefix="select2-selection"
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3 while_bg_c">
                        <label htmlFor="effective_from">Effective From</label>

                        <Flatpickr
                        className="form-control d-block"
                        name="effective_from"
                          id="effective_from"
                          onChange={date => seteffective_from(date[0])}
                          defaultValue={effective_from}
                          // isDisabled={true}
                          // placeholder="dd M,yyyy"
                        options={{
                          altInput: true,
                          altFormat: "j-F-y",
                          dateFormat: "Y-m-d",
                          // clickOpens: false,
                        }}
                      />

                        {/* <AvField
                          type="date"
                          label="Effective From"
                          name="effective_from"
                          className="form-control"
                          id="effective_from"
                          onChange={e => seteffective_from(e.target.value)}
                          defaultValue={effective_from}
                          required
                        /> */}
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "30px" }}>
                          Create Website
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

export default Createpage
