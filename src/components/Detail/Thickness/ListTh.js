import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import Card from "react-bootstrap/Card";

export default function ListTH() {
  const [data, setData] = useState([]);

  const location = useLocation();

  const IDline_number = location.pathname.split("/")[2];
  const IDCml_number = location.pathname.split("/")[3];
  const IDTp_number = location.pathname.split("/")[4];

  const [line_number, setLine_number] = useState("");
  const [cml_number, setCml_number] = useState("");
  // eslint-disable-next-line
  const [tp_number, setId] = useState(null);
  // eslint-disable-next-line
  const [editing, setEditing] = useState(false);
  const [newtp_number, setTp_number] = useState("");
  const [inspection_date, setInspection_date] = useState("");
  const [actual_thickness, setActual_thickness] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/data/thickness?tp_number=${IDTp_number}`
      )
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
      line_number: line_number,
      cml_number: cml_number,
      tp_number: newtp_number,
      inspection_date: inspection_date,
      actual_thickness: actual_thickness,
    };

    axios
      .put(`http://localhost:3001/api/data/update/thickness`, newData)
      .then(() => {
        setInspection_date("");
        setActual_thickness("");

        setId(null);
        setEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (item) => {
    setLine_number(IDline_number);
    setCml_number(item.cml_number);
    setTp_number(item.tp_number);
    setInspection_date(moment(item.inspection_date).format("yyyy/MM/DD"));
    setActual_thickness(item.actual_thickness);

    setId(item.tp_number);
    setShow(true);
    setEditing(true);
  };

  const handleDelete = (line_number, tp_number, cml_number) => {
    axios
      .delete(
        `http://localhost:3001/api/data/delele/thickness?line_number=${line_number}&cml_number=${cml_number}&tp_number=${tp_number}`
      )
      .then(() => {
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
        <h2 className="title">THICKNESS</h2>
        <br />
        <h4 className="title">LINE NUMBER : {IDline_number} </h4>
        <br />
        {/* <Button variant="light" className="mb-2" size="sm">
            <Link
              to={`/create_th/${IDline_number}/${IDCml_number}/${IDTp_number}`}
            >
              Add Thickness{" "}
            </Link>
          </Button> */}
        <Card>
          <Card.Body className="card-body">
            <div className="table">
              <Modal.Header className="Title">
                <Button
                  href={`/list_tp/${IDline_number}/${IDCml_number}`}
                  variant="light"
                  className="mb-2"
                  size="sm"
                >
                  {" "}
                  BACK TP
                </Button>
                <Button
                  href={`/create_th/${IDline_number}/${IDCml_number}/${IDTp_number}`}
                  variant="light"
                  className="mb-2"
                  size="sm"
                >
                  {" "}
                  ADD THICKNESS
                </Button>
              </Modal.Header>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Line number</th>
                    <th>CML number</th>
                    <th>TP number</th>
                    <th>Inspection date</th>
                    <th>Actual thickness</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.line_number}</td>
                      <td>{item.cml_number}</td>
                      <td>{item.tp_number}</td>
                      <td>{moment(item.inspection_date).format("L")}</td>
                      <td>{item.actual_thickness}</td>
                      <td>
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
                                    value={IDline_number}
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
                                    value={cml_number}
                                    onChange={(e) =>
                                      setCml_number(e.target.value)
                                    }
                                    disabled

                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>Tp number:</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={newtp_number}
                                    onChange={(e) =>
                                      setTp_number(e.target.value)
                                    }
                                    disabled

                                  />
                                </Form.Group>
                              </Row>
                              <Row className="mb-3">
                                <Form.Group as={Col}>
                                  <Form.Label>Inspection date</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={inspection_date}
                                    onChange={(e) =>
                                      setInspection_date(e.target.value)
                                    }
                                  />
                                </Form.Group>

                                <Form.Group as={Col}>
                                  <Form.Label>Actual thickness</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={actual_thickness}
                                    onChange={(e) =>
                                      setActual_thickness(e.target.value)
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
                                  // onClick={handleClose}
                                  onClick={refreshPage}
                                >
                                  Save Changes
                                  {/* <BasicExample /> */}
                                </Button>
                              </Modal.Footer>
                            </Form>
                          </Modal.Body>
                        </Modal>
                        {/* <button onClick={() => handleDelete(item.tp_number)}>
                    Delete
                  </button> */}
                        <Button
                          className="mb-2"
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            handleDelete(item.line_number, item.tp_number, item.cml_number)
                          }
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
