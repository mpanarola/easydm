import React, { useState, useEffect } from "react"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"
import ReactApexChart from "react-apexcharts"

import {activityDaybook } from '../../helpers/backend_helper'
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

const Performance = (props) => {
    // constructor(props) {
    //     super(props)
    //     this.state = {}
    // }

    const [is_loading, setloading] = useState(true)


    if(props){

        const start_date = props.start_date
        const end_date = props.end_date
        const category = props.category
        const webpage = props.webpage
        const members = props.member_id

    }
   
    const history = useHistory();
    const alert = useAlert();
    const [activity_list, setactivity_list] = useState([]);
    
    const gethoursReports = () => {
        activityDaybook(props.id).then(resp=>{
        // console.log('datass ', resp?.data[0])
        setactivity_list(resp?.data)
        setloading(false)
        if(resp?.message == 'Unauthorized User!!')
        {          
            history.push('/logout')
            alert.error('Session timeout');
        }
      }).catch(err=>{
        
      })
      
    }
    
    // console.log('activity ', activity_list)
    
    useEffect(()=>{
    
      setTimeout(function() {
        gethoursReports()
    }, 1000);    
    },[]);


    const series = [

        {
            name: "Total Hours",
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


        return (
            <React.Fragment>
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
        </React.Fragment>
        )
    }


export default Performance
