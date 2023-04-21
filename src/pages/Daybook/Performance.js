import React, { Component } from "react"
import { Button, Card, CardBody, CardTitle, Input } from "reactstrap"

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
              <div className="float-end">
                  <div className="input-group input-group">
                      <Input type="select" className="form-select form-select-sm">
                          <option>Jan</option>
                          <option value="1" selected>Dec</option>
                          <option value="2">Nov</option>
                          <option value="3">Oct</option>
                          <option value="4">Sept</option>
                          <option value="5">Aug</option>
                          <option value="6">Jul</option>
                          <option value="7">Jun</option>
                          <option value="8">May</option>
                          <option value="9">Apr</option>
                          <option value="10">Mar</option>
                          <option value="11">Feb</option>
                          <option value="12">Jan</option>

                      </Input>
                      <label className="input-group-text">Month</label>
                  </div>
              </div>
              <CardTitle className="h4 mb-4">Past 12 months performance</CardTitle>

              <div className="align-items-start d-flex">
                  <div className="flex-1">
                      <p className="mb-2">Total Links</p>
                      <h4>2,500</h4>
                      <p className="mb-0"><span className="badge badge-soft-success me-2"> 0.6% <i
                          className="mdi mdi-arrow-up"></i> </span> From previous period</p>
                  </div>
              </div>

              {/* <div className="mt-3 social-source">
                  <div className="d-flex align-items-center social-source-list">
                      <div className="avatar-xs me-4">
                          <span className="avatar-title rounded-circle">
                        
                          </span>
                      </div>
                      <div className="flex-1">
                          <p className="mb-1">Home page</p>
                          <h5 className="mb-0">2,352</h5>
                      </div>
                      <div className="ms-auto">
                          2.06 % <i className="mdi mdi-arrow-up text-success ms-1"></i>
                      </div>
                  </div>

              </div> */}

          </CardBody>
      </Card>
  </React.Fragment>
    )
  }
}

export default Performance
