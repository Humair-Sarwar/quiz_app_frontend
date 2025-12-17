import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { handleError, handleSuccess } from "../../toast";

interface StateDataVal {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type ErrorState = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const signupUser = useSignup();
  const [passHS, setPassHS] = useState(false);
  const [formData, setFormData] = useState<StateDataVal>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<ErrorState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  let newErrors: ErrorState = {};

  // Required field checks
  if (!formData.name.trim()) {
    newErrors.name = "Name is required!";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required!";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password is required!";
  }

  if (!formData.confirmPassword.trim()) {
    newErrors.confirmPassword = "Confirm Password is required!";
  }

  // Password match check
  if (
    formData.password &&
    formData.confirmPassword &&
    formData.password !== formData.confirmPassword
  ) {
    newErrors.confirmPassword = "Confirm Password must match!";
  }

  setError(newErrors);

  // Submit only if no errors
  if (Object.keys(newErrors).length === 0) {
    signupUser.mutate(formData, {
      onSuccess: ()=>{
        handleSuccess("You are successfully Registered!");
        navigate("/login")
      },
      onError: (err)=>{
        if(err?.status == 409){
          handleError("Email Already Exist!")
        }else{
          handleError("Something went wrong!")
        }
        
      }
    })
    console.log("submitted");
    console.log(formData, "----------------data----------");
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  const updatedFormData = {
    ...formData,
    [name]: value,
  };

  setFormData(updatedFormData);

  setError((prevErrors) => {
    const newErrors = { ...prevErrors };

    // Name validation
    if (name === "name") {
      if (!value.trim()) {
        newErrors.name = "Name is required!";
      } else {
        delete newErrors.name;
      }
    }

    // Email validation
    if (name === "email") {
      if (!value.trim()) {
        newErrors.email = "Email is required!";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Invalid email format";
      } else {
        delete newErrors.email;
      }
    }

    // Password validation
    if (name === "password") {
      if (!value.trim()) {
        newErrors.password = "Password is required!";
      } else {
        delete newErrors.password;
      }
    }

    // Confirm password validation
    if (name === "confirmPassword") {
      if (!value.trim()) {
        newErrors.confirmPassword = "Confirm Password is required!";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    // Password match check (only if both exist)
    if (
      updatedFormData.password &&
      updatedFormData.confirmPassword &&
      updatedFormData.password !== updatedFormData.confirmPassword
    ) {
      newErrors.confirmPassword = "Confirm Password must match!";
    } else if (
      updatedFormData.password &&
      updatedFormData.confirmPassword
    ) {
      delete newErrors.confirmPassword;
    }

    return newErrors;
  });
};


  return (
    <>
      <div className="w-full h-[100vh] bg-[#fff5ed] flex justify-center items-center">
        <form
          onSubmit={handleSubmitForm}
          className="bg-white p-6 form-container-target mx-4"
        >
          <h1 className="text-3xl font-bold text-center">
            Join <span className="primary-color-text">Now</span>
          </h1>
          <div className="mt-5">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              id="name"
              className="mt-1"
              placeholder="Enter Your Full Name"
            />
            {error.name && (
              <p className="text-red-500 text-[12px] mt-1">{error.name}</p>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              id="email"
              className="mt-1"
              placeholder="Enter Your Email"
            />
            {error.email && (
              <p className="text-red-500 text-[12px] mt-1">{error.email}</p>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="password">Password:</label>
            <div className="relative">
              <div className="absolute top-5 right-[12px]">
                {passHS ? (
                  <FaRegEye
                    onClick={() => setPassHS(false)}
                    className="text-[18px] cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setPassHS(true)}
                    className="text-[18px] cursor-pointer"
                  />
                )}
              </div>
              <input
                id="password"
                type={passHS ? "text" : "password"}
                className="mt-1"
                placeholder="Enter Your Password"
                name="password"
                value={formData?.password}
                onChange={handleChange}
              />
              {error.password && (
                <p className="text-red-500 text-[12px] mt-1">
                  {error.password}
                </p>
              )}
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <div className="relative">
              <div className="absolute top-5 right-[12px]">
                {passHS ? (
                  <FaRegEye
                    onClick={() => setPassHS(false)}
                    className="text-[18px] cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setPassHS(true)}
                    className="text-[18px] cursor-pointer"
                  />
                )}
              </div>
              <input
                name="confirmPassword"
                value={formData?.confirmPassword}
                onChange={handleChange}
                id="confirm-password"
                type={passHS ? "text" : "password"}
                className="mt-1"
                placeholder="Enter Your Confirm Password"
              />
              {error.confirmPassword && (
                <p className="text-red-500 text-[12px] mt-1">
                  {error.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <button className="primary-button w-full mt-5" type="submit">
            Create Account
          </button>
          <p className="mt-5 text-center text-[14px]">
            Already have an account?{" "}
            <NavLink className={"font-bold"} to={"/login"}>
              Log In
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
