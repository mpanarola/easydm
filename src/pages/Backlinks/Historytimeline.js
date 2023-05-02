import React, { useState, useEffect } from "react"
import { Button, Card, CardBody, CardTitle } from "reactstrap"
import {activityBackLink } from '../../helpers/backend_helper'
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

const HistoryTimeline = (props) => {

  const history = useHistory();
const alert = useAlert();

  const [activity_list, setactivity_list] = useState([]);

const getallActivityBacklink = () => {
  activityBackLink(props.id).then(resp=>{
    // console.log('datass ', resp?.data[0])
    setactivity_list(resp?.data[0])
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
    getallActivityBacklink()
}, 1000);

},[]);


// console.log('dsad ', activity_list.length)
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle className="h4 mb-5 font-size-18">Activity</CardTitle>
            <ul className="list-unstyled activity-wid">
              
              { activity_list && activity_list.length == 0 ? <h5>Sorry, no records found...</h5> : '' }

            {  activity_list && activity_list.map( activity => ( 
      
      <li className="activity-list">
      <div className="d-flex align-items-start">
        <div className="me-3">
          <h5 className="font-size-14">{ Moment(activity.time).format('DD-MMMM-YYYY') } <i
            className="mdi mdi-arrow-right text-primary align-middle ms-2"></i>
          </h5>
        </div>
        <div className="flex-1">
          <div className="font-size-15">
            <b>{activity.addedBy.name}</b> {activity.details}
          </div>
        </div>
      </div>

      <div className="activity-icon avatar-xs">
        <span className="avatar-title bg-soft-primary text-primary rounded-circle">
        <img src={`${process.env.REACT_APP_DATABASEURL}avatar/${activity.addedBy.avatar}`} alt={activity.addedBy.name} className="avatar-sm rounded-circle" title={activity.addedBy.name} />
          {/* <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" /> */}
        </span>
      </div>

    </li>        
    )
    )
          }

            

              {/* <li className="activity-list">
                
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <h5 className="font-size-14">10 Mar 2023 1:12 PM <i
                      className="mdi mdi-arrow-right text-primary align-middle ms-2"></i>
                    </h5>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-15">
                      <b>Nilesh</b> Updated webpage category
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
                      <b>Milan</b> Updated webpage title
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
                      <b>Milan</b> Updated webpage url
                    </div>
                  </div>
                </div>

                <div className="activity-icon avatar-xs">
                  <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                    <img src="/static/media/avatar-2.feb0f89d.jpg" alt="" className="avatar-sm rounded-circle" />
                  </span>
                </div>

              </li> */}
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

export default HistoryTimeline
