"use client";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    console.log("Login");
    e.preventDefault();
  };

  const handleSignupSubmit = async (e) => {
    console.log("Signup");
    e.preventDefault();
  };

  return (
    <div className="flex flex-col bg-base-200 relative min-h-screen items-center justify-center">
      <div className="card min-w-[300px] lg:min-w-[600px] bg-base-100 p-8">
        {isLogin ? (
          <div className="card-body">
            <h2 className="card-title text-center text-base-800 mb-4">Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label-text">Email:</label>
                <input
                  className="input input-bordered w-full"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">Password:</label>
                <input
                  className="input input-bordered w-full"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-control flex items-center">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary mr-2"
                    checked={showPassword}
                    onChange={handleShowPassword}
                  />
                  Show Password
                </label>
              </div>
              <button className="btn btn-active btn-primary w-full">
                Login
              </button>
            </form>
            <div className="mt-4">
              <button
                className="btn btn-active btn-secondary w-full"
                onClick={handleSwitchForm}
              >
                Switch to Signup
              </button>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <h2 className="card-title text-center text-base mb-4">Signup</h2>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label-text">Name:</label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">Email:</label>
                <input
                  className="input input-bordered w-full"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">Password:</label>
                <input
                  className="input input-bordered w-full"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label-text">User Type:</label>
                <div className="flex items-center">
                  <div className="flex items-center gap-4 mr-6">
                    <input
                      type="radio"
                      value="user"
                      className="radio radio-primary"
                      checked={userType === "user"}
                      onChange={handleUserTypeChange}
                    />
                    User
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      value="admin"
                      className="radio radio-primary"
                      checked={userType === "admin"}
                      onChange={handleUserTypeChange}
                    />
                    Admin
                  </div>
                </div>
              </div>
              <div className="form-control flex items-center">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary mr-2"
                    checked={showPassword}
                    onChange={handleShowPassword}
                  />
                  Show Password
                </label>
              </div>
              <button className="btn btn-active btn-primary w-full">
                Signup
              </button>
            </form>
            <div className="mt-4">
              <button
                className="btn btn-active btn-secondary w-full"
                onClick={handleSwitchForm}
              >
                Switch to Login
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
