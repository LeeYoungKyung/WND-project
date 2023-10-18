import React from "react";
import logo from "./img/logo.png";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./nav.css";

// import { Navbar as BootstrapNavbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function MyNavbar() {
  return (
    <>
      <div className="logoBox">
        <Navbar expand="xl" className="bg-body-tertiary">
          {/* <div className="content">DDDD</div> */}
          <Container className="lo">
            <img
              src={logo}
              width="80"
              height="60"
              className="d-inline-block align-top"
            />
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default MyNavbar;
