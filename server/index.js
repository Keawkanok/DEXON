const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "developing_test",
});

// ************************************************************************************************************************* //

// DataBase INFO
app.get("/api/data", (req, res) => {
  const { line_number } = req.query;
  // console.log(line_number, location, "get info");
  let sql = "SELECT * FROM info WHERE 1=1";
  if (line_number) {
    sql += ` AND line_number = "${line_number}"`;
  }
  // if (location) {
  //   sql += ` AND location = "${location}"`;
  // }
  // if (service) {
  //   sql += ` AND service = "${service}"`;
  // }
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/data/info", (req, res) => {
  console.log(req.query);
  const {
    line_number,
    location,
    froms,
    tos,
    drawing_number,
    service,
    material,
    inservice_date,
    pipe_size,
    original_thickness,
    stress,
    joint_efficiency,
    ca,
    design_life,
    design_pressure,
    operating_pressure,
    design_temperature,
    operating_temperature,
  } = req.body;
  console.log(
    line_number,
    location,
    froms,
    tos,
    drawing_number,
    service,
    material,
    inservice_date,
    pipe_size,
    original_thickness,
    stress,
    joint_efficiency,
    ca,
    design_life,
    design_pressure,
    operating_pressure,
    design_temperature,
    operating_temperature,
    "post info"
  );
  let sql = `INSERT INTO info(
    line_number,
    location,
    froms,
    tos,
    drawing_number,
    service,
    material,
    inservice_date,
    pipe_size,
    original_thickness,
    stress,
    joint_efficiency,
    ca,
    design_life,
    design_pressure,
    operating_pressure,
    design_temperature,
    operating_temperature) 
    VALUES ("${line_number}","${location}","${froms}","${tos}","${drawing_number}","${service}","${material}",
    "${inservice_date}",${pipe_size},${original_thickness},
    ${stress},${joint_efficiency},${ca},${design_life},${design_pressure},
    ${operating_pressure},${design_temperature},${operating_temperature})`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  });
});

app.put("/api/data/update/info", (req, res) => {
  // const infoId = req.params.line_number;
  console.log(req.body);
  const {
    line_number,
    location,
    froms,
    tos,
    drawing_number,
    service,
    material,
    inservice_date,
    pipe_size,
    original_thickness,
    stress,
    joint_efficiency,
    ca,
    design_life,
    design_pressure,
    operating_pressure,
    design_temperature,
    operating_temperature,
  } = req.body;
  console.log(
    line_number,
    location,
    froms,
    tos,
    drawing_number,
    service,
    material,
    inservice_date,
    pipe_size,
    original_thickness,
    stress,
    joint_efficiency,
    ca,
    design_life,
    design_pressure,
    operating_pressure,
    design_temperature,
    operating_temperature,
    "update info"
  );
  let sql = "UPDATE info SET ";
  if (location) {
    sql += ` location = "${location}"`;
  }
  if (froms) {
    sql += ` , froms = "${froms}"`;
  }
  if (tos) {
    sql += ` , tos = "${tos}"`;
  }
  if (drawing_number) {
    sql += ` , drawing_number = "${drawing_number}"`;
  }
  if (service) {
    sql += ` , service = "${service}"`;
  }
  if (material) {
    sql += ` , material = "${material}"`;
  }
  if (inservice_date) {
    sql += ` , inservice_date = "${inservice_date}"`;
  }
  if (pipe_size) {
    sql += ` , pipe_size = ${pipe_size}`;
  }
  if (original_thickness) {
    sql += ` , original_thickness = ${original_thickness}`;
  }
  if (stress) {
    sql += ` , stress = ${stress}`;
  }
  if (joint_efficiency) {
    sql += ` , joint_efficiency = ${joint_efficiency}`;
  }
  if (ca) {
    sql += ` , ca = ${ca}`;
  }
  if (design_life) {
    sql += ` , design_life = ${design_life}`;
  }
  if (design_pressure) {
    sql += ` , design_pressure = ${design_pressure}`;
  }
  if (operating_pressure) {
    sql += ` , operating_pressure = ${operating_pressure}`;
  }
  if (design_temperature) {
    sql += ` , design_temperature = ${design_temperature}`;
  }
  if (operating_temperature) {
    sql += ` , operating_temperature = ${operating_temperature}`;
  }
  sql += ` WHERE 1=1`;
  if (line_number) {
    sql += ` AND line_number = "${line_number}"`;
  }

  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/api/data/delete/info", (req, res) => {
  // const line_number = req.params.line_number;
  console.log(req.query, "delete info");

  const { line_number } = req.query;
  console.log(line_number, "delete info");
  let sql = "DELETE FROM info WHERE 1=1";
  if (line_number) {
    sql += ` AND line_number = "${line_number}"`;
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// ************************************************************************************************************************* //

// CML
app.get("/api/data/cml", (req, res) => {
  const { line_number, cml_number } = req.query;
  // console.log(line_number, cml_number, "query");
  let sql = "SELECT * FROM cml WHERE 1=1";
  if (line_number) {
    sql += ` AND line_number = "${line_number}"`;
  }
  if (cml_number) {
    sql += ` AND cml_number = "${cml_number}"`;
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/data/post/cml", (req, res) => {
  console.log(req.body);
  const {
    line_number,
    cml_number,
    cml_description,
    actual_outside_diameter,
    design_thickness,
    structural_thickness,
    required_thickness,
  } = req.body;
  console.log(
    line_number,
    cml_number,
    cml_description,
    actual_outside_diameter,
    design_thickness,
    structural_thickness,
    required_thickness,
    "post cml"
  );
  let sql = `INSERT INTO cml(line_number, cml_number, cml_description, actual_outside_diameter, design_thickness, structural_thickness, required_thickness) 
VALUES ("${line_number}",${cml_number},"${cml_description}",${actual_outside_diameter},${design_thickness},${structural_thickness},${required_thickness})`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  });
});

app.put("/api/data/update/cml", (req, res) => {
  // const cmlId = req.params.line_number;
  // const q =
  //   "UPDATE cml SET cml_number = ?, cml_description = ?, actual_outside_diameter = ?, design_thickness = ?, structural_thickness = ?, required_thickness = ? WHERE cml_number = ?";
  // console.log(req.query);
  const {
    line_number,
    cml_number,
    cml_description,
    actual_outside_diameter,
    design_thickness,
    structural_thickness,
    required_thickness,
  } = req.body;
  // console.log(
  //   line_number,
  //   cml_number,
  //   cml_description,
  //   actual_outside_diameter,
  //   design_thickness,
  //   structural_thickness,
  //   required_thickness,
  //   "update cml"
  // );
  let sql = "UPDATE cml SET ";
  if (cml_description) {
    sql += ` cml_description = "${cml_description}"`;
  }
  if (actual_outside_diameter) {
    sql += ` , actual_outside_diameter = ${actual_outside_diameter}`;
  }
  if (design_thickness) {
    sql += ` , design_thickness = ${design_thickness}`;
  }
  if (structural_thickness) {
    sql += ` , structural_thickness = ${structural_thickness}`;
  }
  if (required_thickness) {
    sql += ` , required_thickness = ${required_thickness}`;
  }
  sql += ` WHERE 1=1`;
  if (line_number) {
    sql += ` AND line_number = "${line_number}"`;
  }
  if (cml_number) {
    sql += ` AND cml_number = ${cml_number}`;
  }

  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/api/data/delete/cml", (req, res) => {
  // const cml_number = req.params.cml_number;
  const { line_number, cml_number } = req.query;
  console.log(line_number, cml_number, "delete cml");
  let sql = "DELETE FROM cml WHERE 1=1";
  if (line_number) {
    sql += ` AND line_number = "${line_number}"`;
  }
  if (cml_number) {
    sql += ` AND cml_number = ${cml_number}`;
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// ************************************************************************************************************************* //

// TEST POINT
app.get("/api/data/test_point", (req, res) => {
  const { line_number, cml_number, tp_number } = req.query;
  // console.log(line_number, cml_number, tp_number, "get test_point");
  let sql = "SELECT * FROM test_point WHERE 1=1";
  if (line_number) {
    sql += ` AND line_number = "${line_number}"`;
  }
  if (cml_number) {
    sql += ` AND cml_number = "${cml_number}"`;
  }
  if (tp_number) {
    sql += ` AND tp_number = "${tp_number}"`;
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/data/post/test_point", (req, res) => {
  console.log(req.body);
  const { line_number, cml_number, tp_number, tp_description, note } = req.body;
  console.log(
    line_number,
    cml_number,
    tp_number,
    tp_description,
    note,
    "post test_point"
  );
  let sql = `INSERT INTO test_point(line_number, cml_number, tp_number, tp_description, note) VALUES ("${line_number}",${cml_number},${tp_number},"${tp_description}","${note}")`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  });
});

app.put("/api/data/update/test_point", (req, res) => {
  console.log(req.body);
  const { line_number, cml_number, tp_number, tp_description, note } = req.body;
  console.log(
    line_number,
    cml_number,
    tp_number,
    tp_description,
    note,
    "update test_point"
  );
  let sql = "UPDATE test_point SET ";
  if (tp_description) {
    sql += ` tp_description = "${tp_description}"`;
  }
  if (note) {
    sql += ` , note = "${note}"`;
  }
  sql += ` WHERE 1=1`;
  if (line_number) {
    sql += ` AND line_number = "${line_number}"`;
  }
  if (cml_number) {
    sql += ` AND cml_number = ${cml_number}`;
  }
  if (tp_number) {
    sql += ` AND tp_number = ${tp_number}`;
  }
  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/api/data/delete/test_point", (req, res) => {
  const { line_number, cml_number, tp_number } = req.query;
  console.log(line_number, cml_number, tp_number, "delete test_point");
  // let sql = "DELETE FROM test_point WHERE 1=1";
  // if (line_number) {
  //   sql += ` AND line_number = "${line_number}"`;
  // }
  // if (cml_number) {
  //   sql += ` AND cml_number = ${cml_number}`;
  // }
  // if (tp_number) {
  //   sql += ` AND tp_number = ${tp_number}`;
  // }
  // db.query(sql, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send(result);
  //   }
  // });
});

// ************************************************************************************************************************* //

// thickness
app.get("/api/data/thickness", (req, res) => {
  const { line_number, cml_number, tp_number } = req.query;
  // console.log(line_number, cml_number, "get thickness");
  let sql = "SELECT * FROM thickness WHERE 1=1";
  if (line_number) {
    sql += ` AND line_number = "${line_number}"`;
  }
  if (cml_number) {
    sql += ` AND cml_number = "${cml_number}"`;
  }
  if (tp_number) {
    sql += ` AND tp_number = "${tp_number}"`;
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/data/post/thickness", (req, res) => {
  console.log(req.query);
  const {
    line_number,
    cml_number,
    tp_number,
    inspection_date,
    actual_thickness,
  } = req.body;
  console.log(
    line_number,
    cml_number,
    tp_number,
    inspection_date,
    actual_thickness,
    "post thickness"
  );
  let sql = `INSERT INTO thickness(line_number, cml_number, tp_number, inspection_date, actual_thickness) 
            VALUES ("${line_number}",${cml_number},${tp_number},"${inspection_date}",${actual_thickness})`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  });
});

app.put("/api/data/update/thickness", (req, res) => {
  console.log(req.body);
  const {
    line_number,
    cml_number,
    tp_number,
    inspection_date,
    actual_thickness,
  } = req.body;
  // console.log(
  //   line_number,
  //   cml_number,
  //   tp_number,
  //   inspection_date,
  //   actual_thickness,
  //   "update update"
  // );
  let sql = "UPDATE thickness SET ";
  if (inspection_date) {
    sql += ` inspection_date = "${inspection_date}"`;
  }
  if (actual_thickness) {
    sql += ` , actual_thickness = ${actual_thickness}`;
  }
  sql += ` WHERE 1=1`;
  if (line_number) {
    sql += ` AND line_number = "${line_number}"`;
  }
  if (cml_number) {
    sql += ` AND cml_number = ${cml_number}`;
  }
  if (tp_number) {
    sql += ` AND tp_number = ${tp_number}`;
  }
  db.query(sql, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/api/data/delele/thickness", (req, res) => {
  // const line_number = req.params.line_number;
  // const cml_number = req.params.cml_number;
  // const tp_number = req.params.tp_number;

  const { line_number, cml_number, tp_number } = req.query;
  console.log(line_number, cml_number, tp_number, "delete thickness");
  let sql = "DELETE FROM thickness WHERE 1=1";
  if (line_number) {
    sql += ` AND line_number = "${line_number}"`;
  }
  if (cml_number) {
    sql += ` AND cml_number = "${cml_number}"`;
  }
  if (tp_number) {
    sql += ` AND tp_number = "${tp_number}"`;
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
