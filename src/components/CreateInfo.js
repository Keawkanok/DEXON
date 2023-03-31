import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';

export default function CreateInfo() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/data`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/data/info", inputs);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  const line = data.map((number, index) => number.line_number);
  // eslint-disable-next-line
  const [show, setShow] = useState(true);
  const [showEmpty, setShowAlertEmpty] = useState(true);


  function Alert() {
    for (let i = 0; i < line.length; i++) {
      // console.log(line[i])
      // eslint-disable-next-line
      if (inputs.line_number == line[i]) {
        // console.log("ซ้ำ")
        if (show) {
          return (
            <InputGroup hasValidation >
              <Form.Control.Feedback className="InputGroup" type="text" >
                ID LINE number already exist.
              </Form.Control.Feedback>
            </InputGroup>
          );
        }
      }
    }
  }

  return (
    <>
      <div className="from">
        <Card>
          <Card.Body>
            <Modal.Header>

              <Button href={`/`} variant="light" className="mb-2" size="sm" >  BACK
                {/* <Link to={`/`}> BACK </Link> */}
              </Button>

              <Modal.Title className="Title" >ADD PIPING</Modal.Title>
            </Modal.Header>
            <Form className="createTitle">
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Line number</Form.Label>
                  <Form.Control
                    type="text"
                    name="line_number"
                    onChange={handleChange}
                  />
                  <Alert />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>from</Form.Label>
                  <Form.Control
                    type="text"
                    name="froms"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>to</Form.Label>
                  <Form.Control
                    type="text"
                    name="tos"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Drawing number</Form.Label>
                  <Form.Control
                    type="text"
                    name="drawing_number"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Service</Form.Label>
                  <Form.Control
                    type="text"
                    name="service"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Material</Form.Label>
                  <Form.Control
                    type="text"
                    name="material"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Inservice date</Form.Label>
                  <Form.Control
                    type="date"
                    name="inservice_date"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Pipe size</Form.Label>
                  <Form.Control
                    type="number"
                    name="pipe_size"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Original thickness</Form.Label>
                  <Form.Control
                    type="number"
                    name="original_thickness"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Stress</Form.Label>
                  <Form.Control
                    type="number"
                    name="stress"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Joint efficiency</Form.Label>
                  <Form.Control
                    type="number"
                    name="joint_efficiency"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Ca</Form.Label>
                  <Form.Control
                    type="number"
                    name="ca"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Design life</Form.Label>
                  <Form.Control
                    type="number"
                    name="design_life"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Design pressure</Form.Label>
                  <Form.Control
                    type="number"
                    name="design_pressure"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Operating pressure</Form.Label>
                  <Form.Control
                    type="number"
                    name="operating_pressure"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Design temperature</Form.Label>
                  <Form.Control
                    type="number"
                    name="design_temperature"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Operating temperature</Form.Label>
                  <Form.Control
                    type="number"
                    name="operating_temperature"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              {/* <Link
                onClick={handleClick}
                to={"/Piping"}
                variant="primary"
                type="submit"
              >
                Submit
              </Link> */}
              <Button onClick={handleClick} href={`/`} variant="success">Submit</Button>
              {/* <EmptyAlert /> */}

            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className="actions"></div>
    </>
  );
}
