import React from "react"
import { Card, CardBody, Table, CardTitle, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap"
import { Link } from "react-router-dom"

const Top3BackLinks = () => {
    return (
        <Col lg={12}>
            <Card>
                <CardBody>
                    <CardTitle className="h4 mb-4">Top Back Links Of Previous Month</CardTitle>
                    <div className="table-responsive">
                        <Table className="table-centered">
                            <thead>
                                <tr>
                                    <th scope="col">Id no.</th>
                                    <th scope="col">Webpage</th>
                                    <th scope="col">Back Links</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#SK1235</td>
                                    <td>
                                        <Link to="#" className="text-body fw-medium">Webpage 1</Link>
                                    </td>
                                    <td>125</td>
                                </tr>
                                <tr>
                                    <td>#SK1236</td>
                                    <td>
                                        <Link to="#" className="text-body fw-medium">Webpage 2</Link>
                                    </td>
                                    <td>118</td>
                                </tr>
                                <tr>
                                    <td>#SK1237</td>
                                    <td>
                                        <Link to="#" className="text-body fw-medium">Webpage 3</Link>
                                    </td>
                                    <td>115</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    {/* <div className="mt-3">
                        <Pagination className="pagination pagination-rounded justify-content-center mb-0">
                            <PaginationItem>
                                <PaginationLink to="#">Previous</PaginationLink>
                            </PaginationItem>
                            <PaginationItem><PaginationLink to="#">1</PaginationLink></PaginationItem>
                            <PaginationItem className="active"><PaginationLink to="#">2</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink to="#">3</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink to="#">Next</PaginationLink></PaginationItem>
                        </Pagination>
                    </div> */}
                </CardBody>
            </Card>
        </Col>
    )
}

export default Top3BackLinks