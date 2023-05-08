import React, { useEffect, useMemo, useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
    Row, Col, Card, CardBody, CardTitle, Button
} from "reactstrap"
import Moment from 'moment';
import Select from "react-select";
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import { reportDaybookcolumns as columns } from './Constants';

import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";
import { getAlldaybooks, getAllMembers, getWebsites, activityDaybook } from '../../helpers/backend_helper'
import { memberPayload, optionGroupCategory, webpagePayload } from './Constants';

import Performance from "./Performance"


const Reports = () => {

    const history = useHistory();
    const alert = useAlert();

    const [category_id, set_category] = useState()
    const [webpage_id, set_webpage] = useState()

    const [start_date, set_start_date] = useState(Moment().startOf('month').format('YYYY-MM-DD'))
    const [end_date, set_end_date] = useState(Moment().format('YYYY-MM-DD'))

    const [member_id, setassigned_to] = useState([])

    const [members_list, setmembers_list] = useState([])
    const [webpages_list, setwebpages_list] = useState([])

    const [daybooks_list, setdaybooks_list] = useState([])
    const get_auth_user = JSON.parse(localStorage.getItem("authUser"))
    const [is_loading, setloading] = useState(true)



    const allMembers = () => {
        getAllMembers(memberPayload).then(resp => {
            setmembers_list(resp?.data[0]?.list)

        }).catch(err => {
        })

    }

    const allWebpages = () => {
        getWebsites(webpagePayload).then(resp => {
            setwebpages_list(resp?.data[0]?.list)
        }).catch(err => {
        })

    }

    const dayBookPayload = {
        "search": {
          "dateFrom": start_date,
          "dateTo": end_date,
            // "member":members_list && members_list.map(i => i.value ? i.value : i._id),
            "category": category_id,
            "webpage": webpage_id
        }
      }
      const getDaybooks = () => {
        getAlldaybooks(dayBookPayload).then(resp => {
          console.log('rowssss ',resp?.data[0])
          setdaybooks_list(resp?.data[0])
          setloading(false)
          if (resp?.message == 'Unauthorized User!!') {
            history.push('/logout')
            alert.error('Session timeout');
          }
    
        }).catch(err => {
          alert.error('Backend server not responding, Please try again....');
        })
    
      }
    
      const resetSearch = () =>{
        set_end_date('')
        set_start_date('')
        set_category('')
        set_webpage('')
        getDaybooks()
      }


    useEffect(() => {
        setTimeout(function () {
            getDaybooks()
            allMembers()
            allWebpages()
            setloading(false)
        }, 1000);

    }, []);




    const rows = useMemo(() =>
    daybooks_list && daybooks_list.map((row, order) => (
      {
      ...row,
      id: order + 1,
      photo: (
        <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
            <img src={`${process.env.REACT_APP_DATABASEURL}avatar/${row['info'][0].avatar}`} title={row['info'][0].userName} alt={row['info'][0].userName} className="avatar-sm rounded-circle" />
          </div>
        </div>
      ),
      name: row['info'][0].userName,
      hours: (
        <span class="bg-info badge badge-secondary" style={{ fontSize: "14px" }}>{row.totalHours}</span>
      ),
    })), [daybooks_list])


    return (
        <React.Fragment>
            <div className="page-content">

                <Breadcrumbs title="Pages" breadcrumbItem="Daybooks Summary" />
                <Row>
                    <Card >
                        <CardBody >
                            {/* <CardTitle className="mb-4 ">Add Website</CardTitle> */}
                            <Col lg={12}>
                                <Row>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="assigned_by">Category</label>
                                            <Select
                                                id="assigned_by"
                                                isMulti={false}
                                                onChange={(e) => {
                                                    set_category(e.value)
                                                }}
                                                options={
                                                    optionGroupCategory
                                                }
                                                classNamePrefix="select2-selection"
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="webpage">Web Page</label>
                                            <Select
                                                id="webpage"
                                                isMulti={false}
                                                onChange={(e) => {
                                                    set_webpage(e.value)
                                                }}
                                                options={
                                                    webpages_list && webpages_list.map(website => (
                                                        { label: website.webpage, value: website._id }
                                                    )
                                                    )
                                                }

                                                classNamePrefix="select2-selection"
                                            />
                                        </div>
                                    </Col>

                                </Row>
                                <Row>

                                    <Col lg={6}>
                                        <div className="mb-3">
                                            <label htmlFor="webpage">Members</label>
                                            <Select
                                                id="webpage"
                                                isMulti={true}
                                                onChange={setassigned_to}
                                                options={
                                                    members_list && members_list.map((user) => (
                                                        { label: user.name, value: user._id, id: user._id }
                                                    )
                                                    )
                                                }
                                                value={
                                                    members_list && members_list.map((user) => (
                                                        { label: user.name, value: user._id, id: user._id }
                                                    )
                                                    )
                                                }

                                                selected='selected'
                                                classNamePrefix="select2-selection"
                                            />
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className="float-start">
                                            <div> <div class="card-title">Date Filter</div> </div>
                                            <div className="float-start  d-flex ">

                                                <input type="date" name="start_date" className="form-control" value={start_date} onChange={(e) => {
                                                    set_start_date(e.target.value)
                                                }} />
                                                {/* <span>Start</span> */}
                                                <input type="date" name="end_date" value={end_date} className="form-control mx-2" onChange={(e) => {
                                                    set_end_date(e.target.value)
                                                }} />
                                            </div>
                                        </div>
                                    </Col>

                                </Row>
                                <button type="button" className="btn btn-secondary w-auto mx-2"
                                    onClick={() => {
                                        getDaybooks()
                                    }} >
                                    Search
                                </button>

                                {
                  start_date !== '' && end_date !=='' && 
                  <button type="button" className="btn btn-danger" onClick={resetSearch} >
                  clear
                </button>
                } 

                            </Col>
                        </CardBody>
                    </Card>
                </Row>

                <Row>
                    <Col className="col-12">
                        <Card>
                            <CardBody>
                                {/* <MDBDataTable responsive bordered data={report_data} /> */}
                                {
                  is_loading == true ? <span className="spinner-grow spinner-grow-sm"></span> :

                    <MDBDataTable responsive bordered data={{ rows, columns }} />
                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Performance  category={category_id} webpage={category_id} members={member_id} start_date={start_date} end_date={end_date} />
                
            </div>

        </React.Fragment>
    )
}

export default Reports
