import React, { useEffect, useMemo, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"
import { reportDaybookcolumns as columns } from './Constants';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

const DaybookMembers = (props) => {
    const [is_loading, setloading] = useState(true)
    const dayBookPayload = props.dayBookPayload
    const daybooksList = props.daybooksList

    console.log('daybooksList ', daybooksList)
    const [total_hours, settotal_hours] = useState([])

    const history = useHistory();
    const alert = useAlert();

    // const rows = useMemo(() =>
    // daybooksList && daybooksList.map((row, order) => (
    //     {
    //         ...row,
    //         id: order + 1,
    //         photo: (
    //             <div className="d-flex align-items-start">
    //                 <div className="me-3 align-self-center">
    //                     <img src={`${process.env.REACT_APP_BACKEND}avatar/${row['info'][0].avatar}`} title={row['info'][0].userName} alt={row['info'][0].userName} className="avatar-sm rounded-circle" />
    //                 </div>
    //             </div>
    //         ),
    //         name: row['info'][0].userName,
    //         hours: (
    //             // hours_arr.push(row.totalHours),
    //             total_hours.push(row.totalHours),
    //             <span className="bg-info badge badge-secondary" style={{ fontSize: "14px" }}>{row.totalHours}</span>
    //         ),
    //     })), [daybooksList])

    return (
        <React.Fragment>
            <Row>
                    <Col className="col-12">
                        <Card>
                            <CardBody>
                                {
                                    is_loading == true ? <span className="spinner-grow spinner-grow-sm"></span> :
                                        <>
                                          <CardTitle>Members List</CardTitle>
                                            <MDBDataTable responsive bordered data={{ daybooksList, columns }} />
                                            { total_hours !== 0 &&
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
        </React.Fragment>
    )
}


export default DaybookMembers
