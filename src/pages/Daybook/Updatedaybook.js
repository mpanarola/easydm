import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  Input,
  Button
} from "reactstrap"
import Select from "react-select";
import { useHistory, Link } from 'react-router-dom';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { optionCategory, webpagesPayload } from './Constants'
import { updateDaybook, getWebsites, deleteDaybook, getAlldaybooks } from '../../helpers/backend_helper'
import { useAlert } from "react-alert";
import Moment from 'moment';
import SweetAlert from "react-bootstrap-sweetalert";

const Updatedaybook = (props) => {
  var today = new Date(); //Current Date
  let today_date = Moment(today).format('YYYY-MM-DD');

  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)

  const [confirm_id, setconfirm_id] = useState("")

  const [userdaybooks, setuserdaybooks] = useState("")
  const [is_loading, setloading] = useState(true)
  const data = props.location && props.location.state;
  // console.log('datassss ', data.data._id)
  const daybooks_data = data['data'];
  const day_book_user_id = data && data.data._id
  const daybooks = data['data']['info'];
  const inpRow = []
  const [inputFields, setinputFields] = useState(inpRow)

  const [date, setdate] = useState(today_date);
  const [webpages_list, setwebpages_list] = useState([]);
  const [daybook_id, setdaybook_id] = useState(daybooks_data._id);
  const [member_id, set_member_id] = useState();

  const [total_hours, settotal_hours] = useState([]);

  const [start_date, set_start_date] = useState(Moment().startOf('month').format('YYYY-MM-DD'))
  const [end_date, set_end_date] = useState(Moment().format('YYYY-MM-DD'))

  const alert = useAlert();
  const history = useHistory();

  const page_payload = {
    "search": {
      "dateFrom": start_date,
      "dateTo": end_date,
      "member": data.data && data.data._id
    }
  }



  const getDaybookById = (event, values) => {
    setloading(true)
    getAlldaybooks(page_payload).then(resp => {
      console.log('infos' , resp?.data[0][0]['info'])
      setinputFields(resp?.data[0][0]['info'] )
      settotal_hours(resp?.data[0][0].totalHours )
      set_member_id(resp?.data[0][0]._id)
      setloading(false)
      if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      }

    }).catch(err => {
      alert.error('Backend server not responding, Please try again....');
    })

  }


  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { webpageId: '', dayBookCategory: '', dayBookHour: '', dayBookDetails: '', dayBookCreationDate: today_date }
    setinputFields([...inputFields, item1])
  }

  const confirmDelete = (id) => {
    setconfirm_both(true)
    setconfirm_id(id)
  };

  // Function for Remove Input Fields
  function handleRemoveFields() {
    deleteDaybook(confirm_id).then(resp => {
      setconfirm_both(false)
      if(resp.status){
        alert.success('Your daybook has been deleted.');
      }
      else{
        alert.error(resp.message);
      }


      // setinputFields(prev => prev.filter((item) => item._id == confirm_id));
      getDaybookById();

    }).catch(err => {
      alert.error('Please try again...');
    })
  }

  const handleInput = (index, name, value) => {
    setinputFields(prev => prev.map((item, idx) => {
      if (index === idx && item.hasOwnProperty(name)) item[name] = value
      return item
    }))

  }

  const allWebpages = () => {
    getWebsites(webpagesPayload).then(resp => {
      setwebpages_list(resp?.data[0]?.list)
    }).catch(err => {
    })

  }

  useEffect(() => {
    setTimeout(function () {
      allWebpages()
      getDaybookById()
    }, 1000);
  }, []);

  const updateDayBook = (data, id) => {
    setloading(true)
    const daybook_updated_data = inputFields.filter(x => x.dayBookId === id);
    console.log('daybook_updated_data ', daybook_updated_data)
    if (daybook_updated_data[0]) {

      updateDaybook(daybook_updated_data && daybook_updated_data[0], id).then(resp => {
        if (resp.status == true) {
          alert.success('Daybook Updated Successfully');
          // history.push('/daybooks')
          getDaybookById();
        }
        else if (resp?.message == 'Unauthorized User!!') {
          history.push('/logout')
          alert.error('Session timeout');
        }
        else {
          alert.error('Already added daybook for the day.');
        }

      }).catch(err => {
        alert.error('Backend server not responding, Please try again....');
      })

    }

  };

  const goBack = (e) => {
    history.push('/daybooks');
  };

  // console.log('inputFields ', inputFields)
  return (
    <>
      <div className="page-content">
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Day Books" breadcrumbItem="Update Day Book" />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <div className="col-md-8 float-start">
                  <div> <div class="card-title">Date Filter</div> </div>
                  <div className="float-start  d-flex ">

                    <input type="date" name="start_date" className="form-control" onChange={e => set_start_date(e.target.value)} defaultValue={start_date} />
                    {/* <span>Start</span> */}
                    <input type="date" name="end_date" className="form-control mx-2" onChange={e => set_end_date(e.target.value)}
                      defaultValue={end_date} />
                    <button type="button" className="btn btn-secondary" onClick={getDaybookById} >
                      Search
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4 font-size-18">Update Day Book</CardTitle>
                {
                  is_loading == true ? <span className="spinner-grow spinner-grow-sm"></span> :
                    <form >
                      <Row>

                        <div className="inner-repeater mb-5">
                          <div className="inner form-group mb-0 row">
                            <div
                              className="inner col-lg-12 ml-md-auto"
                              id="repeater"
                            >
                              {inputFields && inputFields.map((field, key) => (
                                field.webpage &&
                                <div
                                  key={key}
                                  id={"nested" + key}
                                  className="mb-1 row align-items-center"
                                >

                                  <Col md="2">
                                    <div className="mb-4 mt-md-0">
                                      <input
                                        type="date"
                                        name="creationDate"
                                        className="inner form-control"
                                        max={today_date}
                                        defaultValue={field.creationDate ? Moment(field.creationDate).format('YYYY-MM-DD') : today_date}
                                        onChange={e => handleInput(key, "creationDate", e.target.value)}
                                      />
                                    </div>
                                  </Col>

                                  <Col md="2">
                                    <div className="mb-4 mt-md-0">
                                      <Select
                                        id="category"
                                        name="category"
                                        options={optionCategory}
                                        classNamePrefix="select2-selection"
                                        placeholder="Category"
                                        defaultValue={{ label: field.category && field.category, value: field.category && field.category }}
                                        onChange={e => handleInput(key, "category", e.value)}
                                      />
                                    </div>
                                  </Col>

                                  <Col md="2">
                                    <div className="mb-4 mt-md-0">

                                      <Select
                                        id="webpage"
                                        name="webpage"
                                        options={
                                          webpages_list && webpages_list.map(website => (
                                            { label: website.webpage, value: website._id }
                                          )
                                          )
                                        }
                                        classNamePrefix="select2-selection"
                                        defaultValue={{ value: field.webpage, label: field.webpageName }}


                                        placeholder={<div>Web Page</div>}
                                        onChange={e => handleInput(key, "webpage", e.value)}

                                      />

                                    </div>
                                  </Col>

                                  <Col md="1">
                                    <div className="mb-4  mt-md-0">
                                      <input
                                        type="number"
                                        name="hours"
                                        className="inner form-control"
                                        defaultValue={field.hours}
                                        placeholder="Enter Hours"
                                        maxLength="3"
                                        onChange={e => handleInput(key, "hours", e.target.value)}
                                      />
                                    </div>
                                  </Col>

                                  <Col md="3">
                                    <div className="mb-4 mt-md-0">
                                      <textarea
                                        rows="4" cols="5"
                                        name="details"
                                        className="inner form-control"
                                        defaultValue={field.details}
                                        placeholder="Enter Details"
                                        onChange={e => handleInput(key, "details", e.target.value)}
                                      />
                                    </div>
                                  </Col>

                                  <Col md="1">
                                    <div className="mb-4 mt-2 mt-md-0 d-grid">
                                      <Button
                                        color="primary"
                                        className="inner"
                                        onClick={() => {
                                          updateDayBook(field, field.dayBookId)
                                        }}
                                        block
                                      >
                                        Update
                                      </Button>
                                    </div>
                                  </Col>

                                  <Col md="1">
                                    <div className="mb-4 mt-2 mt-md-0 d-grid">
                                      <Button
                                        color="danger"
                                        className="inner"
                                        onClick={() => {
                                          confirmDelete(field.dayBookId)
                                        }}
                                        block
                                      >

                                        Delete
                                      </Button>
                                    </div>
                                  </Col>

                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {success_dlg ? (
                          <SweetAlert
                            success
                            title={dynamic_title}
                            onConfirm={() => {
                              setsuccess_dlg(false)
                            }}
                          >
                            {dynamic_description}
                          </SweetAlert>
                        ) : null}

                        {confirm_both ? (
                          <SweetAlert
                            title="Are you sure?"
                            warning
                            showCancel
                            confirmBtnBsStyle="success"
                            cancelBtnBsStyle="danger"
                            onConfirm={() => {
                              handleRemoveFields()
                              setconfirm_both(false)
                            }}
                            onCancel={() => {
                              setconfirm_both(false)
                            }}
                          >
                            You won't be able to revert this!
                          </SweetAlert>
                        ) : null}

                        <Col lg={12}>
                          <div className="text-right d-flex col-md-12">
                            <div className="col-md-6">
                              {/* <button type="button" className="btn btn-primary" style={{ marginRight: "30px" }} onClick={() => updateDayBook()}>
                          Update Day Book
                        </button> */}
                              <button type="button" className="btn btn-secondary" onClick={() => goBack()}>
                                Back
                              </button>

                            </div>

                            <div className="col-md-4">
                              <button type="button" style={{ marginLeft: "50px" }} className="btn btn-info">
                                Total Hours:  {total_hours}
                              </button>
                            </div>


                          </div>

                        </Col>

                      </Row>

                    </form>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Updatedaybook
