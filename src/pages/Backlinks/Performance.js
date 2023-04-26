import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"
import ReactApexChart from "react-apexcharts"
const Performance = () => {
    // constructor(props) {
    //     super(props)
    //     this.state = {}
    // }


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
