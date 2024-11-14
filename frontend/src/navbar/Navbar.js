import React from "react";
import "./Navbar.scss";
import { Container } from "@mui/material";

function Navbar() {
  return (
    <>
      <div className="navigation">
        <Container maxWidth="lg">
          <div className="__wrapper">
            <div className="__logo">
              <p className="logoText">Car Management</p>
            </div>
            <div className="nav"></div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Navbar;
