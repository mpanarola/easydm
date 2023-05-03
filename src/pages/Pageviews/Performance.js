import React, { useState, useEffect } from "react"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"
import ReactApexChart from "react-apexcharts"

import {performancePageView } from '../../helpers/backend_helper'
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

const Performance = (props) => {

    const history = useHistory();
    const alert = useAlert();
    
      const [activity_list, setactivity_list] = useState([]);
    
    const getallPerformancePageviews = () => {
        performancePageView(props.id).then(resp=>{
        // console.log('datass ', resp?.data[0])
        setactivity_list(resp?.data)
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
        getallPerformancePageviews()
    }, 1000);
    
    },[]);
console.log(' p data ', activity_list)

    const series = [
           
        {
            name: "Total Page Views",
            data: activity_list.data, // [10, 24, 17, 49, 27, 16, 28, 15, 27, 16, 28, 15, 15],
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
                categories: activity_list.months, //['Apr - 22', 'May - 22', 'Jun - 22', 'Jul - 22', 'Aug - 22', 'Sept - 22', 'Oct - 22', 'Nov - 22', 'Dec - 22', 'Jan - 23', 'Fab - 23', 'Mar - 23'],
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
