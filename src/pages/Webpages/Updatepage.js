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
import { useHistory, withRouter } from 'react-router-dom';
import Historytimeline from "./Historytimeline"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { updateWebsite as websiteUpdate } from '../../helpers/backend_helper'
import {optionGroupCategory, optionGroup} from './Constants'
import { AvForm, AvField } from "availity-reactstrap-validation"
import { useAlert } from "react-alert";
import {getAllMembers } from '../../helpers/backend_helper'



const Updatepage = (props) => {

  const data =   props.location && props.location.state;
let published_on_format = Moment(data.data.publishedOn).format('YYYY-MM-DD')
let effective_from_format = Moment(data.data.effectiveFrom).format('YYYY-MM-DD')

let head_published_on = Moment(data.data.publishedOn).format('DD-MMMM-YYYY');

const [webpage, setwebpage] = useState(data.data.webpage);
const [webpage_url, setwebpage_url] = useState(data.data.webpageUrl);
const [category, setcategory] = useState(data.data.category);
const [assigned_to, setassigned_to] = useState([]);

const [effective_from, seteffective_from] = useState(effective_from_format);
const [published_on, setpublished_on] = useState(published_on_format);
const [id, setwebsite_id] = useState(data.data._id);
const [members_list, setmembers_list] = useState([])


const member_payload =  {
  "options": {
    "select": ['name']
  }
}

const allMembers = () => {
  getAllMembers(member_payload).then(resp=>{
    setmembers_list(resp?.data?.list)
  
  }).catch(err=>{
  })
  
}

useEffect(()=>{

  data.data.assignedTo && data.data.assignedTo.map( user => (
    setassigned_to( prev =>  ([...prev,user._id ]))
  )
  )

  setTimeout(function() {
    allMembers()
}, 1000);

},[]);


const history = useHistory();
const alert = useAlert();

  const updateWebsite = (event, values) => {

    const website_data = {
      webpage: webpage,
      webpageUrl: webpage_url,
      category: category,
      assignedTo: assigned_to,
      effectiveFrom: effective_from,
      publishedOn: published_on
    }

    // console.log('update website ', website_id)
    websiteUpdate(website_data, id).then(resp=>{
    // websiteUpdate((website_data, website_id)).then(resp=>{

      // console.log('resp?.data ', resp?.data)
     
      if(resp?.message == 'Unauthorized User!!')
      {          
          history.push('/logout')
          alert.error('Session timeout');
      }else{
        alert.success('Member Updated Successfully');
        history.push('/webpages')
      }
      

    }).catch(err=>{
      alert.error('Backend server not responding, Please try again....');
    })
    
  }


  const goBack = (e) => {
    // history.goBack();
    history.push('/webpages');
  };


  // const optionGroup = [
  //   {
  //     label: "Members",
  //     options: 
        
      
  //   }

  // ];


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
                      defaultValue={
                        data.data.assignedTo && data.data.assignedTo.map( user => (
                          { label: user.name, value: user._id}
                        )
                        )
                      }
                      id="assigned_to"
                      isMulti={true}
                      onChange={(e, val) => {

                        console.log('event ', val.option.value)
                        // setassigned_to(e.value);
                        setassigned_to( prev =>  ([...prev, val.option.value ]))

                        // console.log('event ', e.target)
                      }}
                      options= {

                        members_list && members_list.map( user => ( 
      
                          { label: user.name, value: user._id, id: user._id }
                        )
                        )

                      }
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

            <Historytimeline id={id} />
          </Row>
      </div>
    </>
  )
}



// Updatepage.propTypes = {
//   onUpdateWebsite: PropTypes.func,
// }
// const mapStateToProps = ({ website }) => ({
// })
// const mapDispatchToProps = dispatch => ({
//   onUpdateWebsite: website => dispatch(updateWebsite(website)),
// })



// export default connect(mapStateToProps, mapDispatchToProps)(Updatepage)
export default withRouter(Updatepage)

// export default Updatepage
