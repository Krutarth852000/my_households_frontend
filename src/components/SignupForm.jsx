import React from "react";
import { GiMushroomHouse } from "react-icons/gi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../hooks/context";
import Input from "../common/input";
import Joi from "joi-browser";
import { apiUrl } from "../config";

function SignupForm() {
  const navigate = useNavigate();
  // const [FirstName, setFirstName] = useState("");
  // const [LastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  // const validate = () => {
  //   const errors = {};
  //   if (FirstName.trim() === "") errors.firstname = "FirstName is required";
  //   if (LastName.trim() === "") errors.lastname = "LastName is required";
  //   if (email.trim() === "") errors.email = "Email is required";
  //   if (password.trim() === "") errors.password = "password is required";
  //   return Object.keys(errors).length === 0 ? null : errors;
  // };
  const [account, setAccount] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
  });

  const schema = {
    FirstName: Joi.string().required().label("FirstName"),
    LastName: Joi.string().required().label("LastName"),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const validate = () => {
    const result = Joi.validate(account, schema, { abortEarly: false });
    // console.log(result);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors);
    // console.log(errors);
    if (errors) return errors;
    registerUser(account);
  };

  const handleChange = ({ currentTarget: input }) => {
    setErrors({
      FirstName: "",
      LastName: "",
      email: "",
      password: "",
    });
    const errorMessage = validateProperty(input);
    if (errorMessage) setErrors({ ...errors, [input.name]: errorMessage });
    setAccount({ ...account, [input.name]: input.value });
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const Joischema = { [name]: schema[name] };
    const result = Joi.validate(obj, Joischema);
    return result.error ? result.error.details[0].message : null;
  };

  async function registerUser({ FirstName, LastName, email, password }) {
    const errors = validate();
    // console.log(errors);
    const response = await fetch(`${apiUrl}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FirstName,
        LastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      localStorage.setItem("token", data.user);
      //login({ token: data.user });
      window.location.href = "/";
    } else {
      alert(data.error);
    }
    console.log(data);
  }
  return (
    <div className="flex flex-col justify-center py-4 sm:px-4 lg:px-6 min-w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-md justify-center ">
        <h2 className="text-6xl w-full flex justify-center">
          <GiMushroomHouse />
        </h2>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-3"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <Input
              classlabel="block text-sm font-medium text-gray-700"
              classinput="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              // value={FirstName}
              lable="First Name"
              type="text"
              name="FirstName"
              autoComplete=""
              onChange={handleChange}
              errors={errors ? errors.FirstName : ""}
            />
            <Input
              classlabel="block text-sm font-medium text-gray-700"
              classinput="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              // value={LastName}
              lable="Last Name"
              type="text"
              name="LastName"
              autoComplete=""
              onChange={handleChange}
              errors={errors ? errors.LastName : ""}
            />
            <Input
              classlabel="block text-sm font-medium text-gray-700"
              classinput="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="email"
              type="email"
              // value={email}
              onChange={handleChange}
              errors={errors ? errors.email : ""}
              lable="Email Address"
              // autoComplete="email"
            />
            <Input
              classlabel="block text-sm font-medium text-gray-700"
              classinput="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="password"
              type="password"
              // value={password}
              onChange={handleChange}
              errors={errors ? errors.password : ""}
              lable="Password"
              // autoComplete="current-password"
            />

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="py-3 text-2xl flex justify-center">
        Already have an account ?{" "}
        <Link to="/login" className="text-black">
          <span className="ml-2 text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-800">
            <u> Login</u>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SignupForm;
