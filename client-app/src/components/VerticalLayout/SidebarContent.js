import PropTypes from "prop-types"
import React, { useEffect, useRef, useCallback } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"
// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }
    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement
      if (parent2) {
        parent2.classList.add("mm-show") // ul tag
        const parent3 = parent2.parentElement // li tag
        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }, []);
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname
    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname, activateParentDropdown])
  useEffect(() => {
    ref.current.recalculate()
  }, []);
  const scrollElement = (item) => {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  const get_auth_user = JSON.parse(localStorage.getItem("authUser"))

  return (
    <React.Fragment>
      <SimpleBar ref={ref} className="vertical-simplebar">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/EasyDM/dashboard" className="waves-effect">
                <i className="mdi mdi-airplay"></i><span className="badge rounded-pill bg-info float-end"></span>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            {get_auth_user.userRole == 1 &&
              <>
                <li>
                  <Link to="/EasyDM/webpages" className=" waves-effect">
                    <i className="mdi mdi-web"></i>
                    <span>{props.t("Websites")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/EasyDM/members" className=" waves-effect">
                    <i className="mdi mdi-account-circle"></i>
                    <span>{props.t("Members")}</span>
                  </Link>
                </li>
              </>
            }

            <li>
              <Link to="/EasyDM/content_schedulers" className=" waves-effect">
                <i className="mdi mdi-calendar-text"></i>
                <span>{props.t("Content Schedulers")}</span>
              </Link>
            </li>

            <li>
              <Link to="/EasyDM/backlinks" className=" waves-effect">
                <i className="mdi mdi-link-variant-plus"></i>
                <span>{props.t("Back Links")}</span>
              </Link>
            </li>

            <li>
              <Link to="/EasyDM/page_views" className=" waves-effect">
                <i className="mdi mdi-file-find"></i>
                <span>{props.t("Page Views")}</span>
              </Link>
            </li>

            <li>
              <Link to="/EasyDM/daybooks" className=" waves-effect">
                <i className="mdi mdi-calendar-today"></i>
                <span>{props.t("Day Books")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-inbox-full"></i>
                <span>Reports</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/EasyDM/daybooks_report">Daybook Summary</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))