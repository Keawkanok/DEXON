import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";

import Info from "./components/CreateInfo";

import ListCML from "./components/Detail/Cml/ListCML";
import CreateCML from "./components/Detail/Cml/CreateCML";

import Piping from "./components/Piping";

import CreateTestPoint from "./components/Detail/TestPoint/CreateTP";
import ListTestPoint from "./components/Detail/TestPoint/ListTP";

import ListTh from "./components/Detail/Thickness/ListTh";
import CreateTh from "./components/Detail/Thickness/CreateTh";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function App() {
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">DEXON</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">HOME</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          {/*  */}
          <Route index element={<Piping />}></Route>
          <Route path="/create-info" element={<Info />}></Route>
          {/*  */}
          <Route path="/create-cml/:id/" element={<CreateCML />}></Route>
          <Route path="/listcml/:id/" element={<ListCML />}></Route>

          <Route path="/Piping" element={<Piping />}></Route>

          {/*  */}
          <Route
            path="/create_tp/:id/:id/"
            element={<CreateTestPoint />}
          ></Route>
          <Route path="/list_tp/:id/:id/" element={<ListTestPoint />}></Route>

          <Route path="/list_th/:id/:id/:id/" element={<ListTh />}></Route>
          <Route path="/create_th/:id/:id/:id/" element={<CreateTh />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
