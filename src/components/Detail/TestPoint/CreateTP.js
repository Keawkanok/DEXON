import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

// import AlertCml_number from "../../../components/Alert/Alert";
// import AlertTp_number from "../../../components/Alert/Alert";

export default function CreateTP() {
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  //   console.log(id);
  const location = useLocation();
  const IDline_number = location.pathname.split("/")[2];
  const IDCml_number = location.pathname.split("/")[3];

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/data/test_point?line_number=${IDline_number}`
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
                href={`/list_tp/${IDline_number}/${IDCml_number}`}
                variant="light"
                className="mb-2"
                size="sm"
              >
                {" "}
                BACK
                {/* <Link to={`/list_tp/${IDline_number}/${IDCml_number}`}> BACK </Link> */}
              </Button>
              <Modal.Title className="Title">CREATE TEST POINT</Modal.Title>
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
                  <Form.Label>Tp description</Form.Label>
                  <Form.Control
                    type="text"
                    name="tp_description"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    type="text"
                    name="note"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              {/* <Link
                onClick={handleClick}
                // to={`/listcml/${id}`}
                variant="primary"
                type="submit"
              >
                Submit
              </Link> */}
              <Button
                onClick={handleClick}
                href={`/listcml/${id}`}
                variant="success"
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
