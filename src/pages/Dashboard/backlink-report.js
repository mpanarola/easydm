import React, { useState, useEffect } from "react"
import { Card, CardBody, Col, Row } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import { userDashboard } from '../../helpers/backend_helper'
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

const BackLinkHistoryReport = (props) => {
    const history = useHistory();
    const alert = useAlert();
    const [is_loading, setloading] = useState(true);
    const [backlinks_months, setbacklinks_months] = useState([]);
    const [total_backlinks, settotal_backlinks] = useState([]);


    const getallPerformanceBacklink = () => {
        userDashboard().then(resp => {
            setbacklinks_months(resp?.data.totalBackLinks && resp?.data.totalBackLinks.length !== 0 && resp?.data.totalBackLinks.map(i => i.month ? i.month : i.month).join(", ").split(','))
            settotal_backlinks(resp?.data.totalBackLinks && resp?.data.totalBackLinks.length !== 0 && resp?.data.totalBackLinks.map(i => i.totalBackLinks ? i.totalBackLinks : i.totalBackLinks).join(", ").split(','))
            setloading(false)

            if (resp?.message == 'Unauthorized User!!') {
                history.push('/logout')
                alert.error('Session timeout');
            }
        }).catch(err => {

        })

    }


    useEffect(() => {

        setTimeout(function () {
            getallPerformanceBacklink()
        }, 1000);
    }, []);


    const series = [

        {
            name: "Total Back Links",
            data: total_backlinks, //[10, 24, 17, 49, 27, 16, 28, 15, 27, 16, 28, 15, 15],
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
            categories: backlinks_months, //['Apr - 22', 'May - 22', 'Jun - 22', 'Jul - 22', 'Aug - 22', 'Sept - 22', 'Oct - 22', 'Nov - 22', 'Dec - 22', 'Jan - 23', 'Fab - 23', 'Mar - 23'],
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

    return (
        <React.Fragment>
            <Col lg="12">
                {
                    is_loading == true ? <span className="spinner-grow spinner-grow-sm"></span> :
                        <Card>
                            <CardBody >
                                <h4 className="card-title mb-4"><b>Back Links :</b> Past 12 Months Performance</h4>

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
            </Col>
        </React.Fragment>
    )
}


export default BackLinkHistoryReport
