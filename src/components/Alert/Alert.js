import { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Alert() {
  const [inputs, setInputs] = useState({});
  const [show, setShow] = useState(true);
  const [data, setData] = useState([]);
  const location = useLocation();

  const IDline_number = location.pathname.split("/")[2];
  const cml = data.map((number, index) => number.cml_number);

  const tp_number = data.map((number, index) => number.tp_number);
  // // eslint-disable-next-line

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
}

export default Alert;
