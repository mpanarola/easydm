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
    const [webpage_name, set_webpagename] = useState()

    const [start_date, set_start_date] = useState(Moment().startOf('month').format('YYYY-MM-DD'))
    const [end_date, set_end_date] = useState(Moment().format('YYYY-MM-DD'))
    const [member_id, setassigned_to] = useState()
    const [members_list, setmembers_list] = useState([])
    const [default_members_list, setdefault_members_list] = useState()

    const [webpages_list, setwebpages_list] = useState([])

    const [daybooks_list, setdaybooks_list] = useState([])
    const get_auth_user = JSON.parse(localStorage.getItem("authUser"))
    const [is_loading, setloading] = useState(true)
    const [total_hours, settotal_hours] = useState([])


    const allMembers = () => {
        getAllMembers(memberPayload).then(resp => {
            setmembers_list(
                    resp?.data[0]?.list && resp?.data[0]?.list.map((user) => (
                        { label: user.name, value: user._id }
                    )
                    )
            )
        }).catch(err => {
        })

    }

    const allWebpages = () => {
        getWebsites(webpagePayload).then(resp => {
            setwebpages_list(resp?.data[0]?.list)
        }).catch(err => {
        })

    }
    const member_lists_comma_sep = members_list && members_list.map(i => i.value ? i.value : i.value).join(", ").split(',');

    const dayBookPayload = {
        "search": {
            "dateFrom": start_date,
            "dateTo": end_date,
            "member": member_lists_comma_sep,
            "category": category_id,
            "webpage": webpage_id
        }
    }
    const getDaybooks = () => {
        settotal_hours([])
        getAlldaybooks(dayBookPayload).then(resp => {
            // console.log('rowssss ', resp?.data[0])
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

    const resetSearch = () => {
        set_end_date(Moment().format('YYYY-MM-DD'))
        set_start_date(Moment().startOf('month').format('YYYY-MM-DD'))
        set_category('')
        set_webpage('')
        set_webpagename('')
        getDaybooks()
    }

    const handleWebpage = (e) => {
        set_webpage(e.value);
        set_webpagename(e.label);
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
                    // hours_arr.push(row.totalHours),
                    total_hours.push(row.totalHours),
                    <span className="bg-info badge badge-secondary" style={{ fontSize: "14px" }}>{row.totalHours}</span>
                ),
            })), [daybooks_list])

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Pages" breadcrumbItem="Daybooks Summary" />
                <Row>
                    <Card >
                        <CardBody >
                            <CardTitle className="mb-4 ">Search Filter</CardTitle>
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
                                                 value={{ label: category_id, value: category_id}}
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
                                                onChange={e => handleWebpage(e)}
                                                options={
                                                    webpages_list && webpages_list.map(website => (
                                                        { label: website.webpage, value: website._id }
                                                    )
                                                    )
                                                }
                                                value={{ label: webpage_name, value: webpage_id}}
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
                                                onChange={setmembers_list}
                                                // onChange={e => console.log(e.target.value)}
                                                options={members_list}
                                                value={members_list}
                                                defaultValue={members_list}
                                                classNamePrefix="select2-selection"
                                            />
                                        </div>
                                    </Col>

                                    <Col lg={6}>
                                        <div className="float-start">
                                            <div> <div className="card-title">Date Filter</div> </div>
                                            <div className="float-start  d-flex ">

                                                <input type="date" name="start_date" className="form-control" value={start_date} onChange={(e) => {
                                                    set_start_date(e.target.value)
                                                }} />
                                                {/* <span>Start</span> */}
                                                <input type="date" name="end_date" value={end_date} className="form-control mx-2" onChange={(e) => {
                                                    set_end_date(e.target.value)
                                                }} max={Moment().format('YYYY-MM-DD')} />
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
                                    start_date !== '' && end_date !== '' &&
                                    <button type="button" className="btn btn-danger" onClick={resetSearch} >
                                        Reset
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
                                {
                                    is_loading == true ? <span className="spinner-grow spinner-grow-sm"></span> :
                                        <>
                                          <CardTitle>Members List</CardTitle>
                                            <MDBDataTable responsive bordered data={{ rows, columns }} />
                                            { total_hours !== '' || total_hours !== 0 &&
                                            <div className="col-md-4" style={{ float: "right", marginLeft: "50px", marginTop: "-50px", marginRight: "-40px" }}>
                                                <button type="button" className="btn btn-info">
                                                    Total Hours:  {
                                                 total_hours.reduce((a, v) => a = a + v, 0)
                                                    }
                                                </button>
                                            </div>
                                            }
                                        </>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Performance category={category_id} webpage={category_id} members={member_id} start_date={start_date} end_date={end_date} />

            </div>

        </React.Fragment>
    )
}

export default Reports
