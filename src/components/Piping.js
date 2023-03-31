import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../css/table.scss";

import moment from "moment";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

export default function Piping() {
  const [show, setShow] = useState(false);

  // const handleShow = () => setShow(true);

  const [data, setData] = useState([]);
  // const [id, setId] = useState([]);

  const [date, setDate] = useState({});
  const [idLine, setIdLine] = useState({});

  //   console.log(date);
  const [newline_number, setLine_number] = useState("");
  const [location, setLocation] = useState("");
  const [froms, setFrom] = useState("");
  const [tos, setTo] = useState("");
  const [drawing_number, setDrawing_number] = useState("");
  const [service, setService] = useState("");
  const [material, setMaterial] = useState("");
  const [inservice_date, setInservice_date] = useState("");
  const [pipe_size, setPipe_size] = useState("");
  const [original_thickness, setOriginal_thickness] = useState("");
  const [stress, setStress] = useState("");
  const [joint_efficiency, setJoint_efficiency] = useState("");
  const [ca, setCa] = useState("");
  const [design_life, setDesign_life] = useState("");
  const [design_pressure, setDesign_pressure] = useState("");
  const [operating_pressure, setOperating_pressure] = useState("");
  const [design_temperature, setDesign_temperature] = useState("");
  const [operating_temperature, setOperating_temperature] = useState("");

  const [editing, setEditing] = useState(false);
  const [line_number, setId] = useState(null);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const newData = {
      line_number: newline_number,
      location: location,
      froms: froms,
      tos: tos,
      drawing_number: drawing_number,
      service: service,
      material: material,
      inservice_date: inservice_date,
      pipe_size: pipe_size,
      original_thickness: original_thickness,
      stress: stress,
      joint_efficiency: joint_efficiency,
      ca: ca,
      design_life: design_life,
      design_pressure: design_pressure,
      operating_pressure: operating_pressure,
      design_temperature: design_temperature,
      operating_temperature: operating_temperature,
    };
    axios
      .put(`http://localhost:3001/api/data/update/info`, newData)
      .then(() => {
        setLine_number("");
        setLocation("");
        setFrom("");
        setTo("");
        setDrawing_number("");
        setService("");
        setMaterial("");
        setInservice_date("");
        setPipe_size("");
        setOriginal_thickness("");
        setStress("");
        setJoint_efficiency("");
        setCa("");
        setDesign_life("");
        setDesign_pressure("");
        setOperating_pressure("");
        setDesign_temperature("");
        setOperating_temperature("");

        setId(null);
        setEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (line_number) => {
    axios
      .delete(
        "http://localhost:3001/api/data/delete/info?line_number=" + line_number
      )
      .then(() => {
        // setData(line_number);
        // console.log(line_number, "line_number");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (item) => {
    setLine_number(item.line_number);
    setLocation(item.location);
    setFrom(item.froms);
    setTo(item.tos);
    setDrawing_number(item.drawing_number);
    setService(item.service);
    setMaterial(item.material);
    setInservice_date(item.inservice_date);
    setPipe_size(item.pipe_size);
    setOriginal_thickness(item.original_thickness);
    setStress(item.stress);
    setJoint_efficiency(item.joint_efficiency);
    setCa(item.ca);
    setDesign_life(item.design_life);
    setDesign_pressure(item.design_pressure);
    setOperating_pressure(item.operating_pressure);
    setDesign_temperature(item.design_temperature);
    setOperating_temperature(item.operating_temperature);

    setId(item.line_number);
    setShow(true);
    setEditing(true);
  };
  const handleClose = () => setShow(false);

  const handleData = (item) => {
    console.log(item.line_number);
    setIdLine(item.line_number);
  };

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
    console.log("page to reload");
  }
  return (
    <>
      <br />
      <div className="Card">
        <h1 className="title">PIPING</h1>
        <br />
        <Card>
          <Card.Body className="card-body">
            {/* <Button variant="light" className="mb-2" size="sm">
              <Link className="Link" type="text" to={`/create-info`}>
                ADD PIPING
              </Link>
            </Button> */}
            <div className="table">
              <Modal.Header>
                <Button
                  href={`/create-info`}
                  variant="light"
                  className="mb-2 Title"
                >
                  ADD PIPING
                </Button>
              </Modal.Header>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Line number</th>
                    <th>Iocation</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Pipe size (inch)</th>
                    <th>Service</th>
                    <th>Material</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.line_number}</td>
                      <td>{item.location}</td>
                      <td>{item.froms}</td>
                      <td>{item.tos}</td>
                      <td>{item.pipe_size}</td>
                      <td>{item.service}</td>
                      <td>{item.material}</td>
                      <td>
                        <Button
                          variant="secondary"
                          className="mb-2"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          info
                        </Button>{" "}
                        <Modal
                          dialogClassName="modal-90w"
                          show={show}
                          onHide={handleClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>EDIT INFORMATION</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>Line number</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={newline_number}
                                    onChange={(e) =>
                                      setLine_number(e.target.value)
                                    }
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>location</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={location}
                                    onChange={(e) =>
                                      setLocation(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>From</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={froms}
                                    onChange={(e) => setFrom(e.target.value)}
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>To</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={tos}
                                    onChange={(e) => setTo(e.target.value)}
                                  />
                                </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>Drawing number</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={drawing_number}
                                    onChange={(e) =>
                                      setDrawing_number(e.target.value)
                                    }
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>service</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                  />
                                </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>Material</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={material}
                                    onChange={(e) =>
                                      setMaterial(e.target.value)
                                    }
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>Inservice date</Form.Label>
                                  <Form.Control
                                    type="date"
                                    value={inservice_date}
                                    onChange={(e) =>
                                      setInservice_date(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>Pipe size</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={pipe_size}
                                    onChange={(e) =>
                                      setPipe_size(e.target.value)
                                    }
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>Original thickness</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={original_thickness}
                                    onChange={(e) =>
                                      setOriginal_thickness(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>Stress</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={stress}
                                    onChange={(e) => setStress(e.target.value)}
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>Joint efficiency</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={joint_efficiency}
                                    onChange={(e) =>
                                      setJoint_efficiency(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>Ca</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={ca}
                                    onChange={(e) => setCa(e.target.value)}
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>Design life</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={design_life}
                                    onChange={(e) =>
                                      setDesign_life(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>Design pressure</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={design_pressure}
                                    onChange={(e) =>
                                      setDesign_pressure(e.target.value)
                                    }
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>Operating pressure</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={operating_pressure}
                                    onChange={(e) =>
                                      setOperating_pressure(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>Design temperature</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={design_temperature}
                                    onChange={(e) =>
                                      setDesign_temperature(e.target.value)
                                    }
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>Operating temperature</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={operating_temperature}
                                    onChange={(e) =>
                                      setOperating_temperature(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </Row>

                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  className="button-delete"
                                  variant="danger"
                                  onClick={() => handleDelete(item.line_number)}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="primary"
                                  type="submit"
                                  onClick={refreshPage}
                                // onClick={handleClose}
                                >
                                  Save Changes
                                </Button>
                              </Modal.Footer>
                            </Form>
                          </Modal.Body>
                        </Modal>{" "}
                        <Button
                          href={`/listcml/${item.line_number}`}
                          onClick={() => handleData(item.line_number)}
                          variant="info"
                          className="mb-2"
                          size="sm"
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
