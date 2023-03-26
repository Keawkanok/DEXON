import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

export default function CreateCML() {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // const from = location.state;
  const IDline_number = location.pathname.split("/")[2];
  const IDCml_number = location.pathname.split("/")[3];

  const [line_number, setLine_number] = useState("");

  // console.log(IDline_number, "line_number");
  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/data/post/cml`, inputs);
      console.log(inputs);
      navigate(`/listcml/${id}`);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      <div className="from">
        {/* <div className='button'>
          <Link to={`/listcml/${id}`}> Add TP </Link>
        </div> */}
        <Card>
          <Card.Body>
            <Modal.Header>

              <Button variant="outline-secondary" className="mb-2" size="sm" >
                <Link to={`/listcml/${id}`}> BACK </Link>
              </Button>

              <Modal.Title className="Title" >ADD CML</Modal.Title>
            </Modal.Header>
            <Form className="createTitle">
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Line number</Form.Label>
                  <Form.Control
                    type="text"
                    name="line_number"
                    // defaultValue={id}
                    // onChange={handleChange}
                    // value={id}
                    onChange={handleChange}
                  // disabled
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Cml number</Form.Label>
                  <Form.Control
                    type="number"
                    name="cml_number"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Cml description</Form.Label>
                  <Form.Control
                    type="text"
                    name="cml_description"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Actual outside diameter</Form.Label>
                  <Form.Control
                    type="number"
                    name="actual_outside_diameter"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Design thickness</Form.Label>
                  <Form.Control
                    type="number"
                    name="design_thickness"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Structural thickness</Form.Label>
                  <Form.Control
                    type="number"
                    name="structural_thickness"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Required thickness</Form.Label>
                  <Form.Control
                    type="number"
                    name="required_thickness"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Link
                onClick={handleClick}
                // to={`/listcml/${id}`}
                variant="primary"
                type="submit"
              >
                Submit
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className="actions">
      </div>
    </>
  );
}
