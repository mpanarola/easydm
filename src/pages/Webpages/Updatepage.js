import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Moment from 'moment';
import { connect } from "react-redux"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"
import Select from "react-select";
import { useHistory } from 'react-router-dom';
import Historytimeline from "./Historytimeline"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { updateWebsite } from "../../store/websites/actions"
import {optionGroupCategory, optionGroup} from './Constants'
import { AvForm, AvField } from "availity-reactstrap-validation"

const Updatepage = (props) => {

  const data =   props.location && props.location.state;
let published_on_format = Moment(data.data.publishedOn).format('YYYY-MM-DD')
let effective_from_format = Moment(data.data.effectiveFrom).format('YYYY-MM-DD')

let head_published_on = Moment(data.data.publishedOn).format('DD-MMMM-YYYY');

const [webpage, setwebpage] = useState(data.data.webpage);
const [webpage_url, setwebpage_url] = useState(data.data.webpageUrl);
const [category, setcategory] = useState(data.data.category);
const [assigned_to, setassigned_to] = useState(data.data.assignedTo);
const [effective_from, seteffective_from] = useState(effective_from_format);
const [published_on, setpublished_on] = useState(published_on_format);


console.log('webpage ', webpage)
  const history = useHistory();


  const updateWebsite = (e) => {
    const { onAddNewEvent, onUpdateWebsite } = props

    const updateWebsite = {
      webpage: webpage,
      webpage_url: webpage_url,
      category: category,
      assigned_to: assigned_to,
      effective_from: effective_from,
    }
    // update event
  const save_update_website =   onUpdateWebsite(updateWebsite)
   
  };


  const goBack = (e) => {
    // history.goBack();
    history.push('/webpages');
  };


  return (
    <>
      <div className="page-content">
        
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Websites" breadcrumbItem="Update Website" />

          <Row>

          <Card>
            <CardBody>
              <h4 className="me-4"> ID:  #1</h4>
              <label htmlFor="published_on">Published On :  {head_published_on ? head_published_on : '-'}</label>
            </CardBody>
          </Card>

            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4 font-size-18">Update Website</CardTitle>
                  <AvForm  onValidSubmit={(e, v) => {
                        updateWebsite(e, v)
                      }}>

                  <Row>

                  <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <Select
                      id="category"
                      options={optionGroupCategory}
                      classNamePrefix="select2-selection"
                      onChange={e => setcategory(e.value)}
                      // value = {category}
                      defaultValue={{ label: category, value: category }}
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
                          defaultValue = {webpage}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="webpage_url">Web Page URL</label> */}
                        <AvField
                          label="Web Page URL"
                          name="webpage_url"
                          type="url"
                          className="form-control"
                          id="webpage_url"
                          placeholder="Enter Web Page URL"
                          onChange={e => setwebpage_url(e.target.value)}
                          defaultValue = {webpage_url}
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="published_on">Published On</label> */}
                        <AvField
                          type="date"
                          label="Published On"
                          name="published_on"
                          className="form-control"
                          id="published_on"
                          onChange={e => setpublished_on(e.target.value)}
                          defaultValue = {published_on}
                        />
                      </div>
                    </Col>

                  </Row>

                  <Row className="mt-4">

                  <Col lg={6}>
                      <div className="mb-3">
                        <label htmlFor="assigned_to">Assigned To</label>
                        <Select
                      // value={}
                      defaultValue={{ label: assigned_to, value: assigned_to }}
                      id="assigned_to"

                      isMulti={true}
                      onChange={(e) => {
                        // handleMulti();
                        setassigned_to(e.value)
                      }}
                      options={optionGroup}
                      classNamePrefix="select2-selection"
                    />
                      </div>
                    </Col>


                    <Col lg={6}>
                      <div className="mb-3">
                        {/* <label htmlFor="effective_from">Effective From</label> */}
                        <AvField
                        label="Effective From"
                        name="effective_from"
                          type="date"
                          className="form-control"
                          id="effective_from"
                          onChange={e => seteffective_from(e.target.value)}
                          // value={effective_from}
                          defaultValue = {effective_from}
                        />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="text-right col-lg-10 d-flex">
                        <button type="submit" className="btn btn-primary" style={{marginRight: "30px"}} >
                          Update Website
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

            <Historytimeline />
          </Row>
      </div>
    </>
  )
}



Updatepage.propTypes = {
  onUpdateWebsite: PropTypes.func,
}
const mapStateToProps = ({ website }) => ({
})
const mapDispatchToProps = dispatch => ({
  onUpdateWebsite: website => dispatch(updateWebsite(website)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Updatepage)


// export default Updatepage
