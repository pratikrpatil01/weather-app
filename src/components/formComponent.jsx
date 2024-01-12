import React from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { useContectData } from "../context";
import axios from "axios";

const validateSchema = yup.object().shape({
  latitude: yup
    .number()
    .min(-90, "Latitude must be at least -90")
    .max(90, "Latitude must be at most 90")
    .required("Latitude is required"),
  longitude: yup
    .number()
    .min(-180, "Longitude must be at least -180")
    .max(180, "Longitude must be at most 180")
    .required("Longitude is required"),
});

const FormComponent = () => {
  const { weatherData, handleWeatherData } = useContectData();

  async function handleSubmit(data) {
    await axios
      .get("https://weatherapi-com.p.rapidapi.com/current.json", {
        params: { q: `${data?.latitude},${data?.longitude}` },
        headers: {
          "X-RapidAPI-Key":
            "677fa8ef55msh12c799620d55df4p13296djsn3a8a9901fac2",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      })
      .then((res) => {
        handleWeatherData(res?.data);
        window.localStorage.setItem("@weatherData", JSON.stringify(res?.data));
        alert(res?.data?.location?.name + " data get succesfuuly ");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleCurrentLocationData = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleSubmit({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("data not found!");
    }

    handleSubmit();
  };

  const formik = useFormik({
    initialValues: {
      latitude: "",
      longitude: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values, { resetForm }) => {
      await handleSubmit(values);
      resetForm();
    },
  });

  return (
    <React.Fragment>
      <div className="section is-fullheight">
        <div
          className="container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="column is-6 is-offset-3">
            <div className="box">
              <h1>Get Weather Data</h1>

              <form onSubmit={formik.handleSubmit}>
                <div className="field">
                  {" "}
                  <label htmlFor="latitude">Latitude </label>
                  <div className="control">
                    {" "}
                    <input
                      id="latitude"
                      type="number"
                      name="latitude"
                      className="field"
                      value={formik.values.latitude}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.latitude && formik.errors.latitude ? (
                      <div>{formik.errors.latitude}</div>
                    ) : null}
                  </div>
                </div>{" "}
                <div className="field">
                  {" "}
                  <label htmlFor="longitude">Longitude </label>
                  <div className="control">
                    {" "}
                    <input
                      className="field"
                      id="longitude"
                      type="number"
                      name="longitude"
                      value={formik.values.longitude}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.longitude && formik.errors.longitude ? (
                      <div>{formik.errors.longitude}</div>
                    ) : null}
                  </div>
                </div>
                <button type="submit" className="submitButton">
                  Submit
                </button>
                <br />
                <button
                  onClick={handleCurrentLocationData}
                  className="currentLocDataButton"
                  type="button"
                >
                  Current Location Data
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </React.Fragment>
  );
};

export default FormComponent;
