import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

export default function CreateTP() {
  const [inputs, setInputs] = useState({});

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  //   console.log(id);
  const location = useLocation();
  const IDline_number = location.pathname.split("/")[2];
  const IDCml_number = location.pathname.split("/")[3];

  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
    // console.log(e.target.name);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3001/api/data/post/test_point`,
        inputs
      );
      navigate(`/list_tp/${IDline_number}/${IDCml_number}`);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      <div className="from">
        <Card>
          <Card.Body>
            <Modal.Header>
              <Button variant="outline-secondary" className="mb-2" size="sm" >
                <Link to={`/list_tp/${IDline_number}/${IDCml_number}`}> BACK </Link>
              </Button>
              <Modal.Title className="Title">CREATE TEST POINT</Modal.Title>
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
                  <Form.Label>Tp description</Form.Label>
                  <Form.Control
                    type="text"
                    name="tp_description"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    type="text"
                    name="note"
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
    </>
  );
}
