import React, { useCallback } from "react";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import InputMask from "react-input-mask";
import mainLogo from "../../Assets/Global/main_logo.png";

import Particle from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesConfig from "../../Assets/particles.json";

// Material ui
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import account from "../../Assets/Login/account.svg";
import lock from "../../Assets/Login/lock.svg";
import buttonEnd from "../../Assets/Login/button-end.svg";

import "./Login.css";
import { postLogin } from "../../Redux/both/user";
import {
  errorNotification,
  successNotification,
} from "../../Helpers/notification";

import videoSrc from "../../Assets/pexels-yan-krukov-8865634.mp4";

const Login = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.users);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      let numberPattern = /\d+/g;
      values.phoneNumber = values.phoneNumber.match(numberPattern).join("");
      if (values.password && values.phoneNumber) {
        let data_to_send = {
          password: values.password,
          phoneNumber: `${values.phoneNumber.slice(3)}`,
        };
        dispatch(postLogin(data_to_send))
          .unwrap()
          .then(() => {
            successNotification("bottomRight", "Tizimga kirildi");
          })
          .catch((err) => {
            errorNotification("bottomRight", err);
          });
      }
      return resetForm({});
    },
  });

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback((container) => {}, []);

  return (
    <>
      {role === "admin" || role === "super_admin" ? (
        <Redirect exact={true} from="*" to="/tizimli" />
      ) : null}

      <video autoPlay muted loop id="myVideo" className="video">
        <source src={videoSrc} type="video/mp4" />
      </video>

      <Particle
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesConfig}
        style={{ zIndex: 97 }}
      />

      <div className="blackContent"></div>

      <div className={"generalBackground"}>
        <div className={"contentWrapper"}>
          {/* <div className={"loginLeft"}></div> */}
          <div className={"loginRight"}>
            <img className={"loginImg"} src={mainLogo} alt="logo" />
            <form onSubmit={formik.handleSubmit} className={"loginForm"}>
              <FormControl
                className="mt-5"
                sx={{ m: 1, width: "30ch" }}
                variant="standard"
              >
                <InputMask
                  mask="+\9\98 (99) 999-99-99"
                  id="phoneNumber"
                  name="phoneNumber"
                  inputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                  type="text"
                  className={"inputMaskOutside"}
                  value={formik.values.phoneNumber}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  onChange={formik.handleChange}
                >
                  {(inputProps) => (
                    <FormControl
                      className="mt-5"
                      sx={{ m: 1, width: "30ch", margin: "0px" }}
                      variant="standard"
                    >
                      <InputLabel
                        htmlFor="standard-adornment-login"
                        style={{ color: "#fff" }}
                      >
                        Telefon raqami
                      </InputLabel>
                      <Input
                        id="standard-adornment-login"
                        type={"text"}
                        name="phoneNumber"
                        error={
                          formik.touched.phoneNumber &&
                          Boolean(formik.errors.phoneNumber)
                        }
                        className="text-white"
                        endAdornment={
                          <InputAdornment position="end">
                            <img
                              src={account}
                              alt=""
                              aria-label="toggle ch visibility"
                            />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  )}
                </InputMask>
              </FormControl>

              <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
                <InputLabel
                  style={{ color: "#fff" }}
                  htmlFor="standard-adornment-password"
                >
                  Parol
                </InputLabel>
                <Input
                  inputProps={{
                    autoComplete: "new-password",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                  className="text-white"
                  id="standard-adornment-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  type={"password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <img
                        src={lock}
                        alt=""
                        aria-label="toggle password visibility"
                      />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <button
                type="submit"
                className={"loginBtn" + " btn text-white mt-4"}
              >
                <span>Kirish</span>
                <img src={buttonEnd} alt="button" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

let initialValues = {
  password: "",
  phoneNumber: "",
};

let validationSchema = yup.object({
  phoneNumber: yup
    .string("Enter your phone number")
    .required("phone number is required"),
  password: yup
    .string("Enter your password")
    .min(5, "Password should be of minimum 5 characters length")
    .required("Password is required"),
});

export default Login;
