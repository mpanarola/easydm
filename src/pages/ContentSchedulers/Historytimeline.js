import React, { Component } from "react"
import { Button, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

class Historytimeline extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    return (
      <React.Fragment>
        <Card>
        <CardBody>
            <CardTitle className="h4 mb-5">Activity</CardTitle>
            <ul className="list-unstyled activity-wid">
              
            <li className="activity-list">
                
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <h5 className="font-size-14">22 Apr 2023 4:12 PM <i
                      className="mdi mdi-arrow-right text-primary align-middle ms-2"></i>
                    </h5>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-15">
                      <b>Ashish</b> Updated doc link
                    </div>
                  </div>
                </div>

                <div className="activity-icon avatar-xs">
                  <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                    <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" />
                  </span>
                </div>

              </li>

              <li className="activity-list">
                
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <h5 className="font-size-14">10 Mar 2023 1:12 PM <i
                      className="mdi mdi-arrow-right text-primary align-middle ms-2"></i>
                    </h5>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-15">
                      <b>Nilesh</b> Updated topic title
                    </div>
                  </div>
                </div>

                <div className="activity-icon avatar-xs">
                  <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                    <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" />
                  </span>
                </div>

              </li>

              <li className="activity-list">
                
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <h5 className="font-size-14">26 Fab 2023 6:32 PM <i
                      className="mdi mdi-arrow-right text-primary align-middle ms-2"></i>
                    </h5>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-15">
                      <b>Milan</b> Updated status
                    </div>
                  </div>
                </div>

                <div className="activity-icon avatar-xs">
                  <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                    <img src="/static/media/avatar-2.feb0f89d.jpg" alt="" className="avatar-sm rounded-circle" />
                  </span>
                </div>

              </li>

              <li className="activity-list">
                
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <h5 className="font-size-14">26 Jan 2023 6:32 PM <i
                      className="mdi mdi-arrow-right text-primary align-middle ms-2"></i>
                    </h5>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-15">
                      <b>Milan</b> Updated content type
                    </div>
                  </div>
                </div>

                <div className="activity-icon avatar-xs">
                  <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                    <img src="/static/media/avatar-2.feb0f89d.jpg" alt="" className="avatar-sm rounded-circle" />
                  </span>
                </div>

              </li>
            </ul>
            {/* <div className="text-center mt-4">
              <Link
                to="#"
                className="btn btn-primary btn-md"
              >
                View More <i className="mdi mdi-arrow-right ms-1" />
              </Link>
            </div> */}
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default Historytimeline
