import logo from '../../images/logo.png';
import './Footer.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Clock from '../Clock/Clock';

const Footer = () => {
  return (
    <Container className='footer-container'>
      <Row>
        <Col xs={6} md={3}>
          <Image className='logo' src={logo} rounded />
          <Clock/>
        </Col>
        <Col xs={6} md={3}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/review">Order Review</a></li>
            <li><a href="inventory">Manage Inventory</a></li>
          </ul>
          
        </Col>
        <Col xs={6} md={3}>
          <h3>Address</h3>
          <p>House 140<br />
            140 Franklin Road<br />
            New York<br />
            United States of America
          </p>
        </Col>
        <Col xs={6} md={3}>
          <h3>Contact Us</h3>
          <p>contact@emajohnsimple.com</p>
          <p>Mobile:+187542145</p>
        </Col>
      </Row>
      <Row className='copyright'><p>copyright©emajohn-simple</p></Row>
    </Container>
  );
};

export default Footer;