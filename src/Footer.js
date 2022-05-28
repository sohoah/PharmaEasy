import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles.js";

const Footer = () => {
  return (
    <div className="footerColor" style={{ backgroundColor: "#008000" }}>
      <Box className="foot-box" style={{ backgroundColor: "#008000" }}>
        <h1
          style={{ color: "green", textAlign: "center", marginTop: "-50px" }}
        ></h1>
        <Container className="foot-container">
          <Row className="foot-row">
            <Column className="foot-column">
              <Heading className="foot-heading">PharmaEasy</Heading>
              <p style={{ color: "#c2c2a3" }}>
                Online Medicine in Islamabad. Seller meets the Buyer Online.
              </p>
            </Column>
            <Column className="foot-column">
              <Heading className="foot-heading">Information</Heading>
              <FooterLink href="#">Vision</FooterLink>
              <FooterLink href="#">Feedback</FooterLink>
              <FooterLink href="#">Technical Support</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Term and Conditions</FooterLink>
            </Column>
            <Column className="foot-column">
              <Heading className="foot-heading">Services</Heading>
              <FooterLink href="#">Track Order</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">Shipping and Returns</FooterLink>
              <FooterLink href="#">Payment Options</FooterLink>
              <FooterLink href="#">Help Center</FooterLink>
            </Column>
            <Column className="foot-column">
              <Heading className="foot-heading">Quick Links</Heading>
              <p style={{ color: "#c2c2a3" }}>
                +923345189878 info@PharmaEasy.pk Contact Us.
                <br />
                Islamabad
              </p>
            </Column>

            <div bg="dark" variant="dark" style={{ marginRight: "0" }}>
              <p className="text-xs-center" style={{ color: "#c2c2a3" }}>
                &copy;{new Date().getFullYear()} PharmaEasy App
                <br />
                All Rights Reserved
              </p>
            </div>
          </Row>
        </Container>
      </Box>
    </div>
  );
};
export default Footer;
