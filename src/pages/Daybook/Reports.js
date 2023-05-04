import React, { useEffect, useMemo, useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
    Row, Col, Card, CardBody, CardTitle, Button
} from "reactstrap"
import Moment from 'moment';
import Select from "react-select";
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";
import { getAlldaybooks, getAllMembers, getWebsites } from '../../helpers/backend_helper'
import { memberPayload, optionGroupCategory, webpagePayload } from './Constants';
import ReactApexChart from "react-apexcharts";

const Reports = () => {

    const history = useHistory();
    const alert = useAlert();

    const [category, set_category] = useState()
    const [webpage, set_webpage] = useState()

    const [start_date, set_start_date] = useState(Moment().startOf('month').format('YYYY-MM-DD'))
    const [end_date, set_end_date] = useState(Moment().format('YYYY-MM-DD'))

    const [assigned_to, setassigned_to] = useState([])

    const [members_list, setmembers_list] = useState([])
    const [webpages_list, setwebpages_list] = useState([])

    const [daybooks_list, setdaybooks_list] = useState([])
    const get_auth_user = JSON.parse(localStorage.getItem("authUser"))
    const [is_loading, setloading] = useState(true)


    const getDaybooks = (event, values) => {
        getAlldaybooks().then(resp => {
            setdaybooks_list(resp?.data[0]?.list)
            setloading(false)
            if (resp?.message == 'Unauthorized User!!') {
                history.push('/logout')
                alert.error('Session timeout');
            }

        }).catch(err => {
            alert.error('Backend server not responding, Please try again....');
        })

    }

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

    const searchReport = () => {

        const dayBookPayload = {
            "search": {
                "dateFrom": start_date,
                "dateTo": end_date,
                "category": category,
                "webpage": webpage,
                "members": members_list && members_list.map(i => i.value ? i.value : i._id)
            }
        };

        getAlldaybooks(dayBookPayload).then(resp => {

            if (resp?.message == 'Unauthorized User!!') {
                history.push('/logout')
                alert.error('Session timeout');
            }

            setdaybooks_list(resp?.data[0]?.list)


        }).catch(err => {
            alert.error('Backend server not responding, Please try again....');
        })

    }

    useEffect(() => {
        setTimeout(function () {
            allMembers()
            allWebpages()
            setloading(false)
        }, 1000);

    }, []);


    const series = [

        {
            name: "Total Back Links",
            data: [10, 24, 17, 49, 27, 16, 28, 15, 27, 16, 28, 15, 15],
            type: 'area',
        }]

    const options = {
        chart: {
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        colors: ['#3b5de7', '#3b5de7'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: '3',
            dashArray: [4, 0],
        },

        markers: {
            size: 3
        },
        xaxis: {
            categories: ['Apr - 22', 'May - 22', 'Jun - 22', 'Jul - 22', 'Aug - 22', 'Sept - 22', 'Oct - 22', 'Nov - 22', 'Dec - 22', 'Jan - 23', 'Fab - 23', 'Mar - 23'],
            title: {
                text: 'Month'
            }
        },

        fill: {
            type: 'solid',
            opacity: [1, 0.1],
        },

        legend: {
            position: 'top',
            horizontalAlign: 'right',
        }
    }

    const report_data = {
        columns: [
            {
                label: "ID",
                field: "id",
                sort: "asc",
                width: 150,
            },
            {
                label: "Photo",
                field: "photo",
                sort: "asc",
                width: 150,
            },
            {
                label: "Name",
                field: "name",
                sort: "asc",
                width: 270,
            },
            {
                label: "Hours",
                field: "hours",
                sort: "asc",
                width: 270,
            }
        ],
        rows: [
            {
                id: "1",
                photo: (
                    <div className="d-flex align-items-start">
                        <div className="me-3 align-self-center">
                            <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" />
                        </div>
                    </div>
                ),
                // webpage_url: "",
                name: "Ashish",
                hours: (
                    <span class="bg-info badge badge-secondary" style={{ fontSize: "14px" }}>8</span>
                )
            },
            {
                id: "2",
                photo: (
                    <div className="d-flex align-items-start">
                        <div className="me-3 align-self-center">
                            <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" />
                        </div>
                    </div>
                ),
                name: "Nilesh",
                hours: (
                    <span class="bg-info badge badge-secondary" style={{ fontSize: "14px" }}>10</span>
                )
            },
            {
                id: "3",
                photo: (
                    <div className="d-flex align-items-start">
                        <div className="me-3 align-self-center">
                            <img src="/static/media/avatar-2.feb0f89d.jpg" alt="" className="avatar-sm rounded-circle" />
                        </div>
                    </div>
                ),
                name: "Milan",
                hours: (
                    <span class="bg-info badge badge-secondary" style={{ fontSize: "14px" }}>2</span>
                )
            }

        ],
    }

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
                                                defaultValue={members_list[1]}

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
                                <button type="button" className="btn btn-secondary w-auto"
                                    onClick={() => {
                                        searchReport()
                                    }} >
                                    Search
                                </button>
                            </Col>
                        </CardBody>
                    </Card>
                </Row>

                <Row>
                    <Col className="col-12">
                        <Card>
                            <CardBody>
                                <MDBDataTable responsive bordered data={report_data} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col className="col-12">
                        <Card>
                            <CardBody>
                                {
                                    is_loading == true ? <span className="spinner-grow spinner-grow-sm"></span> :
                                        <Card>
                                            <CardBody >
                                                <h4 className="card-title mb-4">Logged Hours During Past 12 months</h4>
                                                <ReactApexChart
                                                    options={options}
                                                    series={series}
                                                    height="260"
                                                    type="line"
                                                    className="apex-charts"
                                                />
                                            </CardBody>
                                        </Card>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        </React.Fragment>
    )
}

export default Reports
