import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import notFoundImg from '../img/orig.gif';

const NotFoundPage = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className='header-nav' href="/login">Chat-WYS</Navbar.Brand>
      </Container>
    </Navbar>
    <div className='notFoundContainer'>
      <div style={{maxWidth: '1200px'}}>
              <a href="#"><img src={notFoundImg} alt="error image here" /></a>
            </div>
      <h1>Page not found</h1>
      <p>you can go to <Link to="/">main page</Link></p>
    </div>
    </div>
  )
}

export default NotFoundPage
