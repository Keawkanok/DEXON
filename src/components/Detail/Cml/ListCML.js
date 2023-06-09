import { Link, useLocation, useParams } from "react-router-dom";
// import "../../../css/table.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

export default function ListCML() {
  const [data, setData] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);
  const { id } = useParams();
  // console.log(id, "id");
  const location = useLocation();

  const IDline_number = location.pathname.split("/")[2];
  const [cml_number, setId] = useState(null);
  const [editing, setEditing] = useState(false);

  const [line_number, setLine_number] = useState("");
  const [newcml_number, setCml_number] = useState("");
  const [cml_description, setCml_description] = useState("");
  const [actual_outside_diameter, setActual_outside_diameter] = useState("");
  const [design_thickness, setDesign_thickness] = useState("");
  const [structural_thickness, setStructural_thickness] = useState("");
  const [required_thickness, setRequired_thickness] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // const pipe_size = dataInfo.map(
  //   (number, index) => number.pipe_size
  // );
  // console.log(6 <= pipe_size <= 18);

  // const design_pressure = dataInfo.map(
  //   (number, index) => number.design_pressure
  // );

  // const stress = dataInfo.map((number, index) => number.stress);
  // const joint_efficiency = dataInfo.map(
  //   (number, index) => number.joint_efficiency
  // );

  // const Sumdesign_thickness = data.map(
  //   (number) =>
  //     design_pressure * number.actual_outside_diameter /
  //     (2 * stress * joint_efficiency) + (2 * design_pressure * 0.4)
  // );

  // structural_Thickness
  // const structural_Thickness = data.map(
  //   (number) => number.structural_thickness);
  // const Required_thickness = Math.max(Sumdesign_thickness, structural_Thickness);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/data/cml?line_number=${IDline_number}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3001/api/data?line_number=${IDline_number}`)
      .then((response) => {
        setDataInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newData = {
      line_number: line_number,
      cml_number: newcml_number,
      cml_description: cml_description,
      actual_outside_diameter: actual_outside_diameter,
      design_thickness: design_thickness,
      structural_thickness: structural_thickness,
      required_thickness: required_thickness,
    };

    axios
      .put(`http://localhost:3001/api/data/update/cml`, newData)
      .then(() => {
        setCml_number("");
        setCml_description("");
        setActual_outside_diameter("");
        setDesign_thickness("");
        setStructural_thickness("");
        setRequired_thickness("");

        setId(null);
        setEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (item) => {
    // console.log(id, "id");
    setLine_number(id);
    setCml_number(item.cml_number);
    setCml_description(item.cml_description);
    setActual_outside_diameter(item.actual_outside_diameter);
    setDesign_thickness(item.design_thickness);
    setStructural_thickness(item.structural_thickness);
    setRequired_thickness(item.required_thickness);

    setId(item.cml_number);
    setShow(true);
    setEditing(true);
  };

  const handleDelete = (line_number, cml_number) => {
    axios
      .delete(
        `http://localhost:3001/api/data/delete/cml?line_number=${line_number}&cml_number=${cml_number}`
      )
      .then(() => {
        // setData(data.filter((item) => item.line_number));
        window.location.reload(false);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
    console.log("page to reload");
  }

  return (
    <>
      <div className="Card">
        <h2 className="title">CML</h2>
        <br />
        <h4 className="title">LINE NUMBER : {id} </h4> <br />
        <Card>
          <Card.Body className="card-body">
            <div className="table">
              <Modal.Header className="Title">
                <Button href={`/`} variant="light" className="mb-2" size="sm">
                  {" "}
                  BACK PIPING{" "}
                </Button>

                <Button
                  href={`/create-cml/${id}`}
                  variant="light"
                  className="mb-2"
                >
                  ADD CML
                </Button>
                {/* <Modal.Title className="Title" >ADD CML</Modal.Title> */}
              </Modal.Header>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>CML number</th>
                    <th>CML description</th>
                    <th>Actual ouside diameter</th>
                    <th>Design thickness (mm)</th>
                    <th>Structural thickness (mm)</th>
                    <th>Required thickness (mm)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      {/* <td>{item.line_number}</td> */}
                      <td>{item.cml_number}</td>
                      <td>{item.cml_description}</td>
                      <td>{item.actual_outside_diameter}</td>
                      <td>{item.design_thickness} </td>
                      <td>{item.structural_thickness}</td>
                      <td>{item.required_thickness}</td>

                      <td>
                        <Button
                          href={`/list_tp/${item.line_number}/${item.cml_number}`}
                          state={{ from: "id" }}
                          variant="info"
                          className="mb-2"
                          size="sm"
                        >
                          {" "}
                          View TP
                          {/* <Link
                            className="Link"
                            to={`/list_tp/${item.line_number}/${item.cml_number}`}
                            state={{ from: "id" }}
                          >
                            {" "}
                            View TP
                          </Link> */}
                        </Button>{" "}
                        <Button
                          variant="secondary"
                          className="mb-2"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
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
                                    value={id}
                                    onChange={(e) =>
                                      setLine_number(e.target.value)
                                    }
                                    disabled
                                  />
                                </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>Cml number</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={newcml_number}
                                    onChange={(e) =>
                                      setCml_number(e.target.value)
                                    }
                                    disabled
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>Cml description</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={cml_description}
                                    onChange={(e) =>
                                      setCml_description(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group as={Col}>
                                  <Form.Label>
                                    Actual outside diameter
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={actual_outside_diameter}
                                    onChange={(e) =>
                                      setActual_outside_diameter(e.target.value)
                                    }
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>Design thickness</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={design_thickness}
                                    onChange={(e) =>
                                      setDesign_thickness(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </Row>

                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>Structural thickness</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={structural_thickness}
                                    onChange={(e) =>
                                      setStructural_thickness(e.target.value)
                                    }
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>Required thickness</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={required_thickness}
                                    onChange={(e) =>
                                      setRequired_thickness(e.target.value)
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
                        </Modal>
                        <Button
                          className="mb-2"
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.line_number, item.cml_number)}
                        >
                          Delete
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
