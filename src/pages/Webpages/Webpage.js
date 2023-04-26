// import React, { useState } from "react"


import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"

import { MDBDataTable } from "mdbreact"
import {
  Row, Col, Card, CardBody, CardTitle
} from "reactstrap"
import { Link, withRouter } from "react-router-dom"

import SweetAlert from "react-bootstrap-sweetalert"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import { connect } from "react-redux"
import { useHistory } from 'react-router-dom';
import { getWebsites, deleteWebsite } from "../../store/websites/actions"
// import { websitesData } from "../../common/data/websites"

const Webpage = props => {
  const history = useHistory();

  const { websites, onGetWebsites } = props

  const [selectedMulti, setselectedMulti] = useState(null);
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [confirm_both, setconfirm_both] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)




  const deleteWebpage = (e) => {
    // alert('')
 
    const { onDeleteWebsite } = props
    // const deleted = onDeleteWebsite(e)
    confirm_both && console.log(onDeleteWebsite(e))
   
    setconfirm_both(true)
  };

  const website_data = {category: "Services", webpage: "Home", webpage_url: "www.home.com", assigned_to: "Milan", effective_from: "2023-03-27", published_on: "2023-03-27"}

  
  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }

  const optionGroupCategory = [
    {
      label: "Category",
      options: [
        { label: "Services", value: "Services" },
        { label: "Industry", value: "Industry" },
        { label: "Technologies", value: "Technologies" },
        { label: "Career", value: "Career" },
        { label: "Blogs", value: "Blogs" }
      ],
    },

  ];

  const optionGroup = [
    {
      label: "Members",
      options: [
        { label: "Ashish", value: "Ashish" },
        { label: "Nilesh", value: "Nilesh" },
        { label: "Milan", value: "Milan" },
      ],
    },

  ];

  const columns = [
    {
      label: "ID",
      field: "id",
      sort: "asc",
      width: 150,
    },
    {
      label: "Category",
      field: "category",
      sort: "asc",
      width: 270,
    },
    {
      label: "Web Page",
      field: "webpage",
      sort: "asc",
      width: 150,
    },
    {
      label: "Published On",
      field: "date",
      sort: "asc",
      width: 200,
    },
    {
      label: "Assigned To",
      field: "assigned_to",
      sort: "asc",
      width: 200,
    },
    {
      label: "Effective From",
      field: "effective_from",
      sort: "asc",
      width: 270,
    },

    {
      label: "Action",
      field: "action",
      width: 200,
    },

  ];

  const rows = [
    {
      id: "1",
      category: "Services",
      webpage: (
        <a href="https://www.home.com/" rel="noopener" target="_blank">Home</a>
      ),
      // webpage_url: "",
      assigned_to: (
        <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
            <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" title="Ashish" />
          </div>
          {/* <div className="me-3 align-self-center">
            <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" title="Nilesh" />
          </div> */}
        </div>
      ),
      effective_from: "30-Mar-2023",
      date: "27-Mar-2023",
      action: (
        <div className="d-flex">
          <div
            className="btn btn-primary"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => { history.push({
                pathname: '/update_website',
                state: { data: website_data },
              }) }}
          >
            View
          </div>

          <div
            className="btn btn-danger"
            onClick={() => deleteWebpage()}
          >
            Delete
          </div>

        </div>
      )
    },
    {
      id: "2",
      category: "Industry",
      webpage: (
        <a href="https://www.about.com" target="_blank">About</a>
      ),
      assigned_to: (
        <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
            <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" title="Ashish" />
          </div>
          {/* <div className="me-3 align-self-center">
            <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" title="Nilesh" />
          </div> */}
        </div>
      ),
      effective_from: "30-Mar-2023",
      date: "29-Mar-2023",
      action: (
        <div className="d-flex">
          <div
            className="btn btn-primary"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => { history.push({
                pathname: '/update_website',
                state: { data: website_data },
              }) }}
          >
            View
          </div>

          <div
            className="btn btn-danger"
            onClick={() => deleteWebpage()}
          >
            Delete
          </div>

        </div>
      )
    },
    {
      id: "3",
      category: "Technologies",
      webpage: (
        <a href="https://www.contact.com" target="_blank">Contact</a>
      ),
      assigned_to: (
        <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
            <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle"  title="Ashish" />
          </div>
          {/* <div className="me-3 align-self-center">
            <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" title="Nilesh" />
          </div> */}
        </div>
      ),
      effective_from: "1-Apr-2023",
      date: "28-Mar-2023",
      action: (
        <div className="d-flex">
          <div
            className="btn btn-primary"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => { history.push({
                pathname: '/update_website',
                state: { data: website_data },
              }) }}
          >
            View
          </div>

          <div
            className="btn btn-danger"
            onClick={() => deleteWebpage()}
          >
            Delete
          </div>

        </div>
      )
    },
    {
      id: "4",
      category: "Career",
      webpage: (
        <a href="https://www.blogs.com" target="_blank">Blogs</a>
      ),
      assigned_to: (
        <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
            <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" title="Ashish" />
          </div>
          {/* <div className="me-3 align-self-center">
            <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" title="Nilesh" />
          </div> */}
        </div>
      ),
      effective_from: "28-Mar-2023",
      date: "27-Mar-2023",
      action: (
        <div className="d-flex">
          <div
            className="btn btn-primary"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => { history.push({
                pathname: '/update_website',
                state: { data: website_data },
              }) }}
          >
            View
          </div>

          <div
            className="btn btn-danger"
            onClick={() => deleteWebpage()}
          >
            Delete
          </div>

        </div>
      )
    },
    {
      id: "5",
      category: "Blogs",
      webpage: (
        <a href="https://www.events.com" target="_blank">Events</a>
      ),
      assigned_to: (
        <div className="d-flex align-items-start">
          <div className="me-3 align-self-center">
            <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" title="Ashish" />
          </div>
          {/* <div className="me-3 align-self-center">
            <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" title="Nilesh" />
          </div> */}

        </div>
      ),
      effective_from: "30-Mar-2023",
      date: "27-Mar-2023",
      action: (
        <div className="d-flex">
          <div
            className="btn btn-primary"
            style={{
              cursor: "pointer",
              marginRight: "10px"
            }}
            onClick={() => { history.push({
                pathname: '/update_website',
                state: { data: website_data },
              }) }}
          >
            View
          </div>

          <div
            className="btn btn-danger"
            onClick={() => deleteWebpage()}
          >
            Delete
          </div>

        </div>
      )
    }

  ];

  // const rows = useMemo(() => 
  // websites.map((row, order) => ({
  //   ...row,
  //       id: row.id,
  //     category: row.category,
  //     webpage: (
  //       <a href={row.webpage_url} rel="noopener" target="_blank">{row.webpage}</a>
  //     ),
  //     date: row.date,
  //     // webpage_url: "",
  //     assigned_to: (
  //       <div className="d-flex align-items-start ">
  //         <div className="me-3 align-self-center">
  //           <img src="/static/media/avatar-3.2cfd5ba6.jpg" alt="" className="avatar-sm rounded-circle" title="Ashish" />
  //         </div>
  //         {/* <div className="me-3 align-self-center">
  //           <img src="/static/media/avatar-5.a5c59cee.jpg" alt="" className="avatar-sm rounded-circle" title="Nilesh" />
  //         </div> */}
  //       </div>
  //     ),
  //     effective_from: row.effective_from,
      
  //     action: (
  //       <div className="d-flex">
  //         <div
  //           className="btn btn-primary"
  //           style={{
  //             cursor: "pointer",
  //             marginRight: "10px"
  //           }}
            
  //           onClick={() => { 
              
  //             history.push({
  //               pathname: '/update_website',
  //               state: { data: row },
  //             })
              
  //            }}
  //         >
  //           View
  //         </div>

  //         <div
  //           className="btn btn-danger"
  //           onClick={() => deleteWebpage(row.id)}
  //         >
  //           Delete
  //         </div>

  //       </div>
  //     )
  // })), [websites])

console.log('rows ', rows)
  const getWebsites = () => {

    console.log('websites ', websites)

  }



useEffect(() => {
  onGetWebsites()
}, [onGetWebsites])


// const recentTasks = tasks.find(task => task.title === "Recent Tasks")

console.log('websites ', getWebsites())
return (
  <React.Fragment>
    <div className="page-content">

      <Breadcrumbs title="Pages" breadcrumbItem="Websites" />

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
        <CardBody>
          {/* <CardTitle className="mb-4 ">Add Website</CardTitle> */}
          <div className="float-end">
            <Link
              onClick={() => {
                history.push("/create_website")
              }}
              to="#"
              className="btn btn-primary"
            >
              Add Website
            </Link>
          </div>
        </CardBody>
      </Card>

      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <CardTitle>Websites List </CardTitle>
              <MDBDataTable responsive bordered data={{ rows, columns }} />
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
                setconfirm_both(false)
                setsuccess_dlg(true)
                setdynamic_title("Deleted")
                setdynamic_description("Your webpage has been deleted.")
              }}
              onCancel={() => {
                setconfirm_both(false)
                setsuccess_dlg(true)
                setdynamic_title("Cancelled")
                setdynamic_description("Your webpage is safe :)")
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

Webpage.propTypes = {
  websites: PropTypes.array,
  onGetWebsites: PropTypes.func,
  onDeleteWebsite: PropTypes.func,

}

const mapStateToProps = ({ websites }) => ({
  websites: websites.websites,
})

const mapDispatchToProps = dispatch => ({
  onGetWebsites: () => dispatch(getWebsites()),
  onDeleteWebsite: website => dispatch(deleteWebsite(website)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Webpage))
