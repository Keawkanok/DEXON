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

export default function ListTP() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const location = useLocation();

  const IDline_number = location.pathname.split("/")[2];
  const IDCml_number = location.pathname.split("/")[3];

  const [tp_number, setId] = useState(null);
  const [editing, setEditing] = useState(false);

  const [line_number, setLine_number] = useState("");
  const [cml_number, setCml_number] = useState("");
  const [newtp_number, setTp_number] = useState("");
  const [tp_description, setTp_description] = useState("");
  const [note, setNote] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const newData = {
      line_number: line_number,
      cml_number: cml_number,
      tp_number: newtp_number,
      tp_description: tp_description,
      note: note,
    };

    axios
      .put(`http://localhost:3001/api/data/update/test_point`, newData)
      .then(() => {
        setTp_number("");
        setTp_description("");
        setNote("");

        setId(null);
        setEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (item) => {
    // console.log(item.cml_description);
    setLine_number(IDline_number);
    setCml_number(item.cml_number);
    setTp_number(item.tp_number);
    setTp_description(item.tp_description);
    setNote(item.note);

    setId(item.tp_number);
    setShow(true);

    setEditing(true);
  };

  const handleDelete = (cml_number, tp_number) => {
    axios
      .delete(
        `http://localhost:3001/api/data/delete/test_point?line_number=${IDline_number}&cml_number=${cml_number}&tp_number=${tp_number}`
      )
      .then(() => { })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="table">
        <h2 className="title">TEST POINT</h2>

        <h4 className="title">LINE NUMBER : {IDline_number} </h4>

        <Button variant="light" className="mb-2" size="sm">
          <Link to={`/create_tp/${IDline_number}/${id}`}> Add TP </Link>
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Line number</th>
              <th>Cml number</th>
              <th>TP number</th>
              <th>TP description</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.line_number}</td>
                <td>{item.cml_number}</td>
                <td>{item.tp_number}</td>
                <td>{item.tp_description}</td>
                <td>{item.note}</td>
                <td>
                  <Button variant="light" className="mb-2" size="sm">
                    <Link
                      to={`/list_th/${item.line_number}/${item.cml_number}/${item.tp_number}`}
                      state={{ from: "id" }}
                    >
                      View Thickness
                    </Link>
                  </Button>{" "}
                  <Button
                    variant="light"
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
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Line number</Form.Label>
                            <Form.Control
                              type="text"
                              value={IDline_number}
                              onChange={(e) => setLine_number(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Cml number</Form.Label>
                            <Form.Control
                              type="text"
                              value={cml_number}
                              onChange={(e) => setCml_number(e.target.value)}
                            />
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group as={Col}>
                            <Form.Label>Tp number</Form.Label>
                            <Form.Control
                              type="text"
                              value={newtp_number}
                              onChange={(e) => setTp_number(e.target.value)}
                            />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>Tp description</Form.Label>
                            <Form.Control
                              type="text"
                              value={tp_description}
                              onChange={(e) =>
                                setTp_description(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col}>
                            <Form.Label>Note</Form.Label>
                            <Form.Control
                              type="text"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                            />
                          </Form.Group>
                        </Row>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <button
                            className="button-delete"
                            variant="danger"
                            onClick={() => handleDelete(item.line_number)}
                          >
                            Delete
                          </button>
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={handleClose}
                          >
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Form>
                    </Modal.Body>
                  </Modal>{" "}
                  <Button
                    className="mb-2"
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      handleDelete(item.cml_number, item.tp_number)
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
    </>
  );
}
