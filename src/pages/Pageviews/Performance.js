import React, { Component } from "react"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"

class Performance extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    return (
        
        <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle className="h2 mb-4 font-size-18">Past 12 Months Performance</CardTitle>
                        {/* <Row>
                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>April - 22</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>1,368</h4>
                                                </div>
                                            </Col>

                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.8% <i
                                            className="mdi mdi-arrow-up"></i> </span> </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            
                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>May - 22</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>32,695</h4>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>Jun - 22</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>32,695</h4>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>Jul - 22</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>32,695</h4>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>Aug - 22</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>32,695</h4>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>Sept - 22</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>32,695</h4>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>Oct - 22</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>32,695</h4>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>Nov - 22</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>32,695</h4>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>Dec - 22</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>32,695</h4>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>Jan - 23</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>32,695</h4>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>Fab - 23</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>32,695</h4>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={3} style={{ border: "1px solid", padding: "10px", boxShadow: "5px 7px #888888"}}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                <h4>Mar - 23</h4>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h4>32,695</h4>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-15"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                            </Col>

                        </Row> */}



<Row>
                                <Col className="col-md-12 d-flex">   
                                <Card >
                                    <CardBody>
                                        <Row >
                                            <Col xs={12} >
                                                <div>
                                                <h6>April - 22</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>1,368</h6>
                                                </div>
                                            </Col>

                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.8% <i
                                            className="mdi mdi-arrow-up"></i> </span> </p>
                                    </CardBody>
                                </Card>
                    
                                <Card >
                                    <CardBody>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                <h6>May - 22</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>32,695</h6>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                        
                                <Card >
                                    <CardBody>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                <h6>Jun - 22</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>32,695</h6>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                <h6>Jul - 22</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>32,695</h6>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                           
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                <h6>Aug - 22</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>32,695</h6>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                           
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                <h6>Sept - 22</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>32,695</h6>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                           
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                <h6>Oct - 22</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>32,695</h6>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                           
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                <h6>Nov - 22</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>32,695</h6>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                           
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                <h6>Dec - 22</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>32,695</h6>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                           
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                <h6>Jan - 23</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>32,695</h6>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                          
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                <h6>Fab - 23</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>32,695</h6>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                           
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                <h6>Mar - 23</h6>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Total Views</p>
                                                    <h6>32,695</h6>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="mb-0"><span className="badge badge-soft-success me-2 font-size-13"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span></p>
                                    </CardBody>
                                </Card>
                           
                            </Col> 
                        </Row>
                    </CardBody>
                </Card>

            </React.Fragment>


    )
  }
}

export default Performance
