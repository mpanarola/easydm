import React, { useState, useEffect } from "react"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import { performancePageView } from '../../helpers/backend_helper'
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

const Performance = (props) => {
    const history = useHistory();
    const alert = useAlert();
    const [activity_list, setactivity_list] = useState([]);

    const [activity_month, setactivity_month] = useState();
    const [activity_hours, setactivity_hours] = useState();

    const getallPerformancePageviews = () => {
        performancePageView(props.id).then(resp => {
            setactivity_list(resp?.data)
            
            setactivity_hours(resp?.data.length !== 0 && resp?.data.map(i => i.totalCount ? i.totalCount : i.totalCount).join(", ").split(','))
            setactivity_month(resp?.data.length !== 0 && resp?.data.map(i => i.month ? i.month : i.month).join(", ").split(','))

            if (resp?.message == 'Unauthorized User!!') {
                history.push('/logout')
                alert.error('Session timeout');
            }
        }).catch(err => {
        })

    }

    useEffect(() => {
        setTimeout(function () {
            getallPerformancePageviews()
        }, 1000);
    }, []);

    const series = [
        {
            
            name: "Total Page Views",
            data: activity_hours, // [10, 24, 17, 49, 27, 16, 28, 15, 27, 16, 28, 15, 15],
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
            categories: activity_month, //['Apr - 22', 'May - 22', 'Jun - 22', 'Jul - 22', 'Aug - 22', 'Sept - 22', 'Oct - 22', 'Nov - 22', 'Dec - 22', 'Jan - 23', 'Fab - 23', 'Mar - 23'],
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
                <Card>
                    <CardBody >
                        <h4 className="card-title mb-4">Past 12 Months Performance</h4>
                        <ReactApexChart
                            options={options}
                            series={series}
                            height="260"
                            type="line"
                            className="apex-charts"
                        />
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    )
}


export default Performance