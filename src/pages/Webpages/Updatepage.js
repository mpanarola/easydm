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
import { websites } from "../../common/data";


const Updatepage = (props) => {

  const data =   props.location && props.location.state;
console.log('data ', data)
let published_on_format = Moment(data.data.date).format('YYYY-MM-DD')
let effective_from_format = Moment(data.data.effective_from).format('YYYY-MM-DD')

let head_published_on = Moment(data.data.date).format('DD-MMMM-YYYY');

const [webpage, setwebpage] = useState(data.data.webpage);
const [webpage_url, setwebpage_url] = useState(data.data.webpage_url);
const [category, setcategory] = useState(data.data.category);
const [assigned_to, setassigned_to] = useState("Milan");
const [effective_from, seteffective_from] = useState(effective_from_format);
const [published_on, setpublished_on] = useState(published_on_format);

const [selectedMulti, setselectedMulti] = useState(null);


console.log('webpage ', webpage)
  const history = useHistory();

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }

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

  const optionGroup = [
    {
      label: "Members",
      options: [
        { label: "Ashish", value: "Ashish" },
        { label: "Nilesh", value: "Nilesh" },
        { label: "Milan", value: "Milan" },
      ],
    },
   
  ];

  const updateMember = (e) => {
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
                  <form >
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
                        <label htmlFor="name">Web Page</label>
                        <input
                          type="text"
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
                        <label htmlFor="webpage_url">Web Page URL</label>
                        <input
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
                        <label htmlFor="published_on">Published On</label>
                        <input
                          type="date"
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
                        <label htmlFor="effective_from">Effective From</label>
                        <input
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
                        <button type="button" className="btn btn-primary" style={{marginRight: "30px"}} onClick={() => updateMember()}>
                          Update Website
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
