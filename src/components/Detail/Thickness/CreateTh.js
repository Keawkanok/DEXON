import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
export default function CreateTh() {
  const [inputs, setInputs] = useState({});

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  // const { id } = useParams();

  const location = useLocation();
  const IDline_number = location.pathname.split("/")[2];
  const IDCml_number = location.pathname.split("/")[3];
  const IDTp_number = location.pathname.split("/")[4];

  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/data/post/thickness`, inputs);
      navigate(`/list_th/${IDline_number}/${IDCml_number}/${IDTp_number}`);
    } catch (err) {
      console.log('ไม่ไป');
      setError(true);
    }
  };

  return (
    <>
      <div className="from">
        <Card>
          <Card.Body>
            <Modal.Header>
              <Button variant="outline-secondary" className="mb-2" size="sm" >
                <Link to={`/list_th/${IDline_number}/${IDCml_number}/${IDTp_number}`}> BACK </Link>
              </Button>
              <Modal.Title className="Title">CREATE THICKNESS</Modal.Title>
            </Modal.Header>
            <Form className="createTitle">
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Line number</Form.Label>
                  <Form.Control
                    type="text"
                    name="line_number"
                    onChange={handleChange}
                  // defaultValue={IDline_number}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Cml number</Form.Label>
                  <Form.Control
                    // defaultValue={IDCml_number}
                    type="number"
                    name="cml_number"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Tp number</Form.Label>
                  <Form.Control
                    type="number"
                    name="tp_number"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Inspection date</Form.Label>
                  <Form.Control
                    type="date"
                    name="inspection_date"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Actual thickness</Form.Label>
                  <Form.Control
                    type="number"
                    name="actual_thickness"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Link onClick={handleClick} variant="primary" type="submit">
                Submit
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className="actions"></div>
    </>
  );
}
