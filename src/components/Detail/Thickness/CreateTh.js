import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

export default function CreateTh() {
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const IDline_number = location.pathname.split("/")[2];
  const IDCml_number = location.pathname.split("/")[3];
  const IDTp_number = location.pathname.split("/")[4];

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/data/thickness?line_number=${IDline_number}`
      )
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
      await axios.post(`http://localhost:3001/api/data/post/thickness`, inputs);
      navigate(`/list_th/${IDline_number}/${IDCml_number}/${IDTp_number}`);
    } catch (err) {
      console.log("ไม่ไป");
      setError(true);
    }
  };

  const cml = data.map((number, index) => number.cml_number);

  const tp_number = data.map((number, index) => number.tp_number);
  // // eslint-disable-next-line
  const [show, setShow] = useState(true);

  function AlertCml_number() {
    for (let i = 0; i < tp_number.length; i++) {
      if (inputs.cml_number == cml[i]) {
        if (inputs.tp_number == tp_number[i]) {
          if (show) {
            return (
              <InputGroup hasValidation>
                <Form.Control.Feedback className="InputGroup" type="text">
                  ID CML number already exist.
                </Form.Control.Feedback>
              </InputGroup>
            );
          }
        }
      }
    }
  }

  function AlertTp_number() {
    for (let i = 0; i < tp_number.length; i++) {
      if (inputs.tp_number == tp_number[i]) {
        if (inputs.cml_number == cml[i]) {
          if (show) {
            return (
              <InputGroup hasValidation>
                <Form.Control.Feedback className="InputGroup" type="text">
                  ID TP number already exist.
                </Form.Control.Feedback>
              </InputGroup>
            );
          }
        }
      }
    }
  }

  return (
    <>
      <div className="from">
        <Modal.Title className="Title">
          LINE NUMBER : {IDline_number}
        </Modal.Title>
        <br />
        <Card>
          <Card.Body>
            <Modal.Header>
              <Button
                href={`/list_th/${IDline_number}/${IDCml_number}/${IDTp_number}`}
                variant="light"
                className="mb-2"
                size="sm"
              >
                {" "}
                BACK TH
                {/* <Link to={`/list_th/${IDline_number}/${IDCml_number}/${IDTp_number}`}> BACK </Link> */}
              </Button>
              <Modal.Title className="Title">CREATE THICKNESS</Modal.Title>
            </Modal.Header>
            <Form className="createTitle">
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Line number</Form.Label>
                  <Form.Control
                    type="text"
                    name="line_number"
                    onChange={handleChange}
                  // defaultValue={IDline_number}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Cml number</Form.Label>
                  <Form.Control
                    // defaultValue={IDCml_number}
                    type="number"
                    name="cml_number"
                    onChange={handleChange}
                  />
                  <AlertCml_number />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Tp number</Form.Label>
                  <Form.Control
                    type="number"
                    name="tp_number"
                    onChange={handleChange}
                  />
                  <AlertTp_number />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Inspection date</Form.Label>
                  <Form.Control
                    type="date"
                    name="inspection_date"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Actual thickness</Form.Label>
                  <Form.Control
                    type="number"
                    name="actual_thickness"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              {/* <Link onClick={handleClick} variant="primary" type="submit">
                Submit
              </Link> */}
              <Button onClick={handleClick} type="submit" variant="success">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className="actions"></div>
    </>
  );
}
