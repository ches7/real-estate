import axios from "axios";
import { AuthContext } from "../utils/AuthContext";
import { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function ReactNavbar() {

    const { user, loading, error, dispatch } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "SIGNIN_START" });
        try {
            await axios.get("/api/signout");
            dispatch({ type: "SIGNOUT" });
        } catch (err) {
            dispatch({ type: "SIGNIN_FAILURE", payload: err.response.data });
        }
    };


  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Real Estate Company</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
        <Nav>
        <Nav.Link href="/for-sale">For Sale</Nav.Link>
        <Nav.Link href="/to-rent">To Rent</Nav.Link>
        </Nav>
          { user !== null ? (
          <Nav className="ms-auto">
            <NavDropdown
              align={{ lg: 'end' }}
              id="nav-dropdown-dark-example"
              title={user._id}
              menuVariant="dark"
            >
              <NavDropdown.Item href="/account">Account</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSubmit}>
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> ) : (
            <Nav className="ms-auto">
                    <Nav.Link href="/signin">Sign in</Nav.Link>
            </Nav>
          ) }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};