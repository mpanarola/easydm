import React, { useEffect, useMemo, useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row, Col, Card, CardBody, CardTitle, Button
} from "reactstrap"
import { Link } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";
import { getAlldaybooks, deleteDaybook } from '../../helpers/backend_helper'
import { columns } from './Constants';

const Daybook = () => {

  const history = useHistory();
  const alert = useAlert();

  const [daybooks_list, setdaybooks_list] = useState([])
  const [record_id, set_id] = useState()

  const get_auth_user = JSON.parse(localStorage.getItem("authUser"))
  const [is_loading, setloading] = useState(true)

  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)


  const confirmDelete = (id) => {
    setconfirm_both(true)
    set_id(id)
  };


  const removeDaybook = () => {
    if (record_id !== '') {
      deleteDaybook(record_id).then(resp => {
        setconfirm_both(false)
        alert.success('Your daybook has been deleted.');
        getAlldaybooks()
      }).catch(err => {
        alert.error('Please try again...');
      })

    }
  };

  const updateDaybook = (data) => {
    history.push({
      pathname: '/update_daybook',
      state: { data: data },
    })
  };


 const dayBookPayload = {
    "search" : {
        "dateFrom":"2022-01-01",
        "dateTo" : "2023-05-02"
    }
}

  const getDaybooks = (event, values) => {
    getAlldaybooks(dayBookPayload).then(resp => {
      setdaybooks_list(resp?.data[0]?.list)
      setloading(false)
      if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      }

    }).catch(err => {
      alert.error('Backend server not responding, Please try again....');
    })

  }


  const rows = useMemo(() =>
  daybooks_list && daybooks_list.map((row, order) => ({
    ...row,
    id: order + 1,
      photo: (
        <div className="d-flex align-items-start">
        <div className="me-3 align-self-center">
          <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" />
        </div>
      </div>
      ),
      // webpage_url: "",
      name: "Ashish",
      date: "27-Mar-2023",
      hours: (
        <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>8</span>
      ),
      action: (
        <div className="d-flex">
          <div
            className="btn btn-primary"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => updateDaybook(row)}
          >
            View
          </div>

          <div
            className="btn btn-danger"
            onClick={() => confirmDelete()}
          >
            Delete
          </div>

        </div>
      )
    

  })), [daybooks_list])


useEffect(() => {
  setTimeout(function () {
    getDaybooks()
  }, 1000);

}, []);


  // const data = {
    
  //   rows: [
  //     {
  //       id: "1",
  //       photo: (
  //         <div className="d-flex align-items-start">
  //         <div className="me-3 align-self-center">
  //           <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" />
  //         </div>
  //       </div>
  //       ),
  //       // webpage_url: "",
  //       name: "Ashish",
  //       date: "27-Mar-2023",
  //       hours: (
  //         <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>8</span>
  //       ),
  //       action: (
  //         <div className="d-flex">
  //           <div
  //             className="btn btn-primary"
  //             style={{
  //               cursor: "pointer",
  //               marginRight: "10px"
  //             }}
  //             onClick={() => { history.push('/update_daybook') }}
  //           >
  //             View
  //           </div>

  //           <div
  //             className="btn btn-danger"
  //             onClick={() => deleteDaybook()}
  //           >
  //             Delete
  //           </div>

  //         </div>
  //       )
  //     },
  //     {
  //       id: "2",
  //       photo: (
  //         <div className="d-flex align-items-start">
  //         <div className="me-3 align-self-center">
  //         <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" />
  //         </div>
  //       </div>
  //       ),
  //       name: "Nilesh",
  //       date: "27-Mar-2023",
  //       hours: (
  //         <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>10</span>
  //       ),
  //       action: (
  //         <div className="d-flex">
  //           <div
  //             className="btn btn-primary"
  //             style={{
  //               cursor: "pointer",
  //               marginRight: "10px"
  //             }}
  //             onClick={() => { history.push('/update_daybook') }}
  //           >
  //             View
  //           </div>

  //           <div
  //             className="btn btn-danger"
  //             onClick={() => deleteDaybook()}
  //           >
  //             Delete
  //           </div>

  //         </div>
  //       )
  //     },
  //     {
  //       id: "3",
  //       photo: (
  //         <div className="d-flex align-items-start">
  //         <div className="me-3 align-self-center">
  //         <img src="/static/media/avatar-2.feb0f89d.jpg" alt="" className="avatar-sm rounded-circle" />
  //         </div>
  //       </div>
  //       ),
  //       name: "Milan",
  //       date: "27-Mar-2023",
  //       hours: (
  //         <span class="bg-info badge badge-secondary" style={{fontSize: "14px"}}>2</span>
  //       ),
  //       action: (
  //         <div className="d-flex">
  //           <div
  //             className="btn btn-primary"
  //             style={{
  //               cursor: "pointer",
  //               marginRight: "10px"
  //             }}
  //             onClick={() => { history.push('/update_daybook') }}
  //           >
  //             View
  //           </div>

  //           <div
  //             className="btn btn-danger"
  //             onClick={() => deleteDaybook()}
  //           >
  //             Delete
  //           </div>

  //         </div>
  //       )
  //     }

  //   ],
  // }

  return (
    <React.Fragment>
      <div className="page-content">

        <Breadcrumbs title="Pages" breadcrumbItem="Day Books" />

        {success_dlg ? (
          <SweetAlert
            success
            title={dynamic_title}
            onConfirm={() => {
              setsuccess_dlg(false)
            }}
          >
            {dynamic_description}
          </SweetAlert>
        ) : null}

        <Card >
          <CardBody > 
            {/* <CardTitle className="mb-4 ">Add Website</CardTitle> */}

            <div className="col-md-8 float-start">
            <div> <div class="card-title">Date Filter</div> </div>
            <div className="float-start  d-flex ">
              
              <input type="date" name="start_date" className="form-control"  />
              {/* <span>Start</span> */}
              <input type="date" name="end_date" className="form-control mx-2"/>
              <button type="button" className="btn btn-secondary" >
                         Search
                        </button>
            </div>
            </div>

            <div className="col-md-4 float-end mt-4">
            <div className="float-end ">
              <Link
                onClick={() => {
                  history.push("/create_daybook")
                }}
                to="#"
                className="btn btn-primary"
              >
                Add Day Book
              </Link>
            </div>
            </div>
          </CardBody>
        </Card>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle>Day Books List</CardTitle>
                {
                  is_loading == true ?   <span className="spinner-grow spinner-grow-sm"></span> :
                
                <MDBDataTable responsive bordered data={{ rows, columns }} />
              }
              </CardBody>
            </Card>
          </Col>

          {/* Delete popup */}
          <Col xl="3" lg="4" sm="6" className="mb-2">

            {confirm_both ? (
              <SweetAlert
                title="Are you sure?"
                warning
                showCancel
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                onConfirm={() => {
                  removeDaybook()
                  setconfirm_both(false)
                }}
                onCancel={() => {
                  setconfirm_both(false)
                }}
              >
                You won't be able to revert this!
              </SweetAlert>
            ) : null}
          </Col>
        </Row>
      </div>

    </React.Fragment>
  )
}

export default Daybook
