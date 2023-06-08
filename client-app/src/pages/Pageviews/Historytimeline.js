import React, { useState, useEffect } from "react"
import { Button, Card, CardBody, CardTitle } from "reactstrap"
import { activityPageView } from '../../helpers/backend_helper'
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

const HistoryTimeline = (props) => {

  const history = useHistory();
  const alert = useAlert();

  const [is_loading, setloading] = useState(true)
  const [activity_list, setactivity_list] = useState([]);

  const getallActivityPageviews = () => {
    activityPageView(props.id).then(resp => {
      // console.log('datass ', resp?.data[0])
      if (resp?.data[0] !== null) {
        setactivity_list(resp?.data[0])
        setloading(false)
      }

      if (resp?.message == 'Unauthorized User!!') {
        history.push('/EasyDM/logout')
        alert.error('Session timeout');
      }
    }).catch(err => {

    })
  }

  useEffect(() => {
    setTimeout(function () {
      getallActivityPageviews()
    }, 1000);

  }, []);

  function insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="h4 mb-5 font-size-18">Activities</CardTitle>
          {is_loading ? <span className="spinner-grow spinner-grow-sm"></span> : activity_list && activity_list.length == 0 ? <h5>Sorry, No Activities Found....</h5> : ''}

          <ul className="list-unstyled activity-wid">
            {activity_list && activity_list.map(activity => (
              <li className="activity-list">
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <h5 className="font-size-14">{Moment(activity.updatedAt).format('DD-MMM-YY HH:mm a')} <i
                      className="mdi mdi-arrow-right text-primary align-middle ms-2"></i>
                    </h5>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-15">
                    <b>{activity.addedBy.name}</b> {activity.activityName == 'Updated' ? " Updated Updated Following Field's : " : 'Created'}
                      <ul>
                        {
                          activity.newData ?
                            Object.keys(activity.newData).map(key => (
                              <li key={key} className="mt-2 mb-2" >
                                {insertSpaces(key)+ ' To : '}
                                {
                                  <b>{activity.newData[key] == '' ? 'Removed'  : activity.newData[key] }</b>
                                }

                              </li>
                            )) : activity.activityName == 'Created' ? <li>This Page View</li> : ''}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="activity-icon avatar-xs">
                  <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                    <img src={`${process.env.REACT_APP_BACKEND}avatar/${activity.addedBy.avatar}`} alt={activity.addedBy.name} className="avatar-sm rounded-circle" title={activity.addedBy.name} />
                    {/* <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" /> */}
                  </span>
                </div>

              </li>
            )
            )
            }
          </ul>
        </CardBody>
      </Card>
    </React.Fragment>
  )

}

export default HistoryTimeline
