import React, { useEffect, useMemo, useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row, Col, Card, CardBody, CardTitle, Button
} from "reactstrap"
import { Link } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"
import Moment from 'moment';
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
  const [start_date, set_start_date] = useState(Moment().startOf('month').format('YYYY-MM-DD'))
  const [end_date, set_end_date] = useState(Moment().format('YYYY-MM-DD'))
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

  const resetSearch = () =>{
    setloading(true)
    set_end_date(Moment().format('YYYY-MM-DD'))
    set_start_date(Moment().startOf('month').format('YYYY-MM-DD'))
    getDaybooks(true)
  }

  const getDaybooks = (is_reset_search) => {
    const dayBookPayload = {
      "search": {
        "dateFrom": is_reset_search == true ? Moment().startOf('month').format('YYYY-MM-DD') : start_date,
        "dateTo":  is_reset_search  == true ?  Moment().format('YYYY-MM-DD') : end_date,
      }
    }
    setloading(true)
    getAlldaybooks(dayBookPayload).then(resp => {
      if(resp?.status){
        console.log('success', resp?.status )
        setdaybooks_list(resp?.data[0])
        setloading(false)
      }

      if (resp?.message == 'Unauthorized User!!') {
        history.push('/logout')
        alert.error('Session timeout');
      }

    }).catch(err => {
      alert.error('Backend server not responding, Please try again....');
    })

  }

  const rows = useMemo(() =>
    daybooks_list && daybooks_list.map((row, order) => (
      {
      ...row,
      id: order + 1,
      photo: (
        <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
            <img src={`${process.env.REACT_APP_DATABASEURL}avatar/${row['info'][0].avatar}`} title={row['info'][0].userName} alt={row['info'][0].userName} className="avatar-sm rounded-circle" />
          </div>
        </div>
      ),
      // webpage_url: "",
      name: row['info'][0].userName,
      date: start_date!== '' ||  end_date !=='' ? Moment(start_date).format('DD-MMM-YY') + ' - ' + Moment(end_date).format('DD-MMM-YY') : Moment(row['info'][0].creationDate).format('DD-MMM-YY'),
      hours: (
        <span className="bg-info badge badge-secondary" style={{ fontSize: "14px" }}>{row.totalHours}</span>
      ),
      action: (
        <div className="d-flex">
          <div
            className="btn btn-primary fas fa-edit"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => updateDaybook(row)}
            title="View Day Book"
          >
            
          </div>

          {/* <div
            className="btn btn-danger"
            onClick={() => confirmDelete()}
          >
            Delete
          </div> */}

        </div>
      )


    })), [daybooks_list])

  useEffect(() => {
    setTimeout(function () {
      getDaybooks()
    }, 1000);

  }, []);

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
              <div> <div className="card-title">Date Filter</div> </div>
              <div className="float-start  d-flex ">

                <input type="date" name="start_date" className="form-control" onChange={e => set_start_date(e.target.value) } value={start_date} />
                {/* <span>Start</span> */}
                <input type="date" name="end_date" className="form-control mx-2" onChange={e => set_end_date(e.target.value) }
                 value={end_date} max={Moment().format('YYYY-MM-DD')} />
                <button type="button" className="btn btn-secondary  mx-2" onClick={getDaybooks} >
                  Search
                </button>
                {
                  start_date !== '' && end_date !=='' && 
                  <button type="button" className="btn btn-danger" onClick={resetSearch} >
                  Reset
                </button>
                } 
              </div>
            </div>

            <div className="col-md-4 float-end mt-4 add_new">
              <div className="float-end ">
                <Link
                  onClick={() => {
                    history.push("/create_daybook")
                  }}
                  to="#"
                  className="btn btn-primary fas fa-plus"
                  title="Add New"
                >
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
                  is_loading == true ? <span className="spinner-grow spinner-grow-sm"></span> :
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
