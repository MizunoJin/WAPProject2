import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserProfile } from '../../actions/userActions';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user.isAuth);

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    dispatch(clearUserProfile());
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-5">
      <Container>
        <Navbar.Brand href="/">Tender</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuth ? (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/like">Like</Nav.Link>
                <Nav.Link href="/chat">ChatRoom</Nav.Link>
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
