import { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

export default function CreateCML() {
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);

  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const IDline_number = location.pathname.split("/")[2];
  // eslint-disable-next-line
  // const IDCml_number = location.pathname.split("/")[3];

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/data/cml?line_number=${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3001/api/data?line_number=${id}`)
      .then((response) => {
        setDataInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const cml = data.map((number, index) => number.cml_number);
  // eslint-disable-next-line
  const [show, setShow] = useState(true);

  function Alert() {
    for (let i = 0; i < cml.length; i++) {
      // eslint-disable-next-line
      if (inputs.cml_number == cml[i]) {
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

  const handleChange = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  // console.log(inputs);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/data/post/cml`, inputs);
      navigate(`/listcml/${id}`);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const pipe_size = dataInfo.map((number, index) => number.pipe_size);
  // console.log(pipe_size)
  const Compare = [];
  // console.log(Compare)
  for (let i = 0; i < pipe_size.length; i++) {
    if (IDline_number) {
      if (pipe_size[i] == inputs.actual_outside_diameter) {
        Compare.push(pipe_size[i]);
      } else {
        Compare.push(inputs.actual_outside_diameter);
      }
    }
  }

  const design_pressure = dataInfo.map(
    (number, index) => number.design_pressure
  );

  const stress = dataInfo.map((number, index) => number.stress);
  const joint_efficiency = dataInfo.map(
    (number, index) => number.joint_efficiency
  );

  const Sumdesign_thickness = dataInfo.map(
    (number) =>
      design_pressure * Compare /
      (2 * stress * joint_efficiency) +
      (2 * design_pressure * 0.4)
  );
  // console.log(Sumdesign_thickness, "Sumdesign_thickness")

  // structural_Thickness
  const CompareS = [];
  console.log(CompareS, "CompareS")
  for (let i = 0; i < pipe_size.length; i++) {
    if (IDline_number) {
      if (pipe_size[i] == inputs.structural_thickness) {
        CompareS.push(pipe_size[i]);
      } else {
        CompareS.push(inputs.structural_thickness);
      }
    }
  }
  const structural_Thickness = CompareS;
  // console.log(structural_Thickness, "structural_Thickness")

  // Compare Max
  const Required_thickness = Math.max(Sumdesign_thickness, structural_Thickness);
  // console.log(Required_thickness)

  return (
    <>
      <div className="from">
        <Modal.Title className="Title">LINE NUMBER : {id}</Modal.Title>
        <br />
        <Card>
          <Card.Body>
            <Modal.Header>
              <Button
                href={`/listcml/${id}`}
                variant="light"
                className="mb-2"
                size="sm"
              >
                {" "}
                BACK
                {/* <Link to={`/listcml/${id}`}> BACK </Link> */}
              </Button>
              <Modal.Title className="Title">ADD CML</Modal.Title>
            </Modal.Header>
            <Form className="createTitle">
              <Row className="mb-3">
                <Form.Group as={Col}>
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
                <Form.Group as={Col}>
                  <Form.Label>Cml number</Form.Label>
                  <Form.Control
                    type="number"
                    name="cml_number"
                    onChange={handleChange}
                  />
                  <Alert />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Cml description</Form.Label>
                  <Form.Control
                    type="text"
                    name="cml_description"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Actual outside diameter</Form.Label>
                  <Form.Control
                    type="number"
                    name="actual_outside_diameter"
                    // placeholder={dataActual}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Design thickness  = {Sumdesign_thickness}</Form.Label>
                  <Form.Control
                    type="number"
                    name="design_thickness"
                    // placeholder={Required_thickness}
                    // defaultValue={Required_thickness}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Structural thickness</Form.Label>
                  <Form.Control
                    type="number"
                    name="structural_thickness"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Required thickness = {Required_thickness}</Form.Label>
                  <Form.Control
                    type="number"
                    name="required_thickness"
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
      <div className="actions"></div>
    </>
  );
}
