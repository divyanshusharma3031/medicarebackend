const express = require("express");

const Patients = require("./Model/Patients");
const connectmongo = require("./db");
connectmongo();

require("dotenv").config();
const app = express();

const disease = require("./utils/disease.js");

const parser = require("body-parser");

app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post("/getdisease", async (req, res) => {
  let symptom = req.body.symptom;
  console.log(symptom);
  for (let i = 0; i < disease.length; i++) {
    console.log(disease[i]);
    if (disease[i].symptom === symptom) {
      return res
        .status(200)
        .send({ dis: disease[i].disease, precaution: disease[i].precaution });
    }
  }
  res.status(404).send("Disease Not Out");
});

app.post("/getappointment", async (req, res) => {
  let data = await Patients.create({
    patient: req.body.name,
    email: req.body.email,
    address: req.body.add,
    doa: req.body.doa,
    doctor: req.body.doc,
  });
  res.status(200).send(data);
});

app.get("/", async (req, res) => {
  res.status(200).send("Working fine");
});
app.listen(process.env.PORT || 4000, (req, res) => {
  console.log("Server running");
});
