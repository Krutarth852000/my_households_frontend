import React from "react";
import { GiMushroomHouse } from "react-icons/gi";
import { useState } from "react";
import Input from "../common/input";
import Joi, { schema } from "joi-browser";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../hooks/context";
import { apiUrl } from "../config";
import { loginUser } from "../services/authServics";
// import jwtDecode from "jwt-decode";

export default function LoginForm() {
  const { user } = useContext(AuthContext);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const schema = {
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .label("email"),
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
    LoginUser(account);
  };

  const handleChange = ({ currentTarget: input }) => {
    setErrors({
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

  async function LoginUser({ email, password }) {
    const data= await loginUser({
      email: email,
      password:password
    })
    //   await fetch(`${apiUrl}/api/auth`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // });

    // const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      window.location.href = "/";
    } else {
      alert("please check your credentials");
      console.log(data.error);
    }
  };

  if (user) {
    window.location.href = "/";
    return;
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md justify-center ">
          <h2 className="text-6xl w-full flex justify-center">
            <GiMushroomHouse />
          </h2>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <Input
                classlabel="block text-sm font-medium text-gray-700"
                classinput="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="email"
                type="email"
                // value="email"
                onChange={handleChange}
                lable="Email Address"
                // autoComplete="email"
                errors={errors ? errors.email : ""}
              />
              <Input
                classlabel="block text-sm font-medium text-gray-700"
                classinput="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="password"
                type="password"
                // value="password"
                onChange={handleChange}
                lable="Password"
                // autoComplete="current-password"
                errors={errors ? errors.password : ""}
              />
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <div className="py-3 text-2xl flex justify-center">
            Don't have an account ?{" "}
            <Link to="/signup" className="text-black">
              <span className="ml-2 text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-800">
                <u> SignUp</u>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
