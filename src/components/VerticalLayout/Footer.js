import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © EasyDM.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
          All Rights Reserved By - <a href="https://www.narolainfotech.com/" target="_blank">Narola Infotech</a> 
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
