import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import CSS file for styling
import { signupApiFunc } from "../../api/api";
import Loading from "../../components/Loader/Loading";
import {
  recievedError,
  requestSent,
  responseRecieved,
} from "../../slices/utilsSlice";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let loadingState = useSelector((state) => state.utilsObj.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(requestSent());
      const response = await signupApiFunc(
        name,
        email,
        password,
        confirmPassword,
        phone,
        city
      );
      console.log("response=>", response);
      if (response.status === 200) {
        dispatch(responseRecieved());
        localStorage.setItem("token", response.data.data.resetToken);
        navigate("/user-tasks");
      }
    } catch (error) {
      console.log("error=>", error);
      dispatch(recievedError(error));
      dispatch(responseRecieved());
      if (error.response.status === 400) setError(error.response.data.error);
      else setError("Something went wrong");
    }
  };

  return loadingState ? (
    <Loading />
  ) : (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Register your account</h2>
        <h4 style={{ color: "red", marginTop: "5px" }}>{error}</h4>
        <div className="form-group">
          <label class="signup-form-label">Name</label>
          <input
            type="name"
            value={name}
            className="signup-input"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label class="signup-form-label">Phone</label>
          <input
            type="phone"
            value={phone}
            className="signup-input"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label class="signup-form-label">City</label>
          <input
            type="city"
            value={city}
            className="signup-input"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label class="signup-form-label">Email</label>
          <input
            type="email"
            value={email}
            className="signup-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label class="signup-form-label">Password</label>
          <input
            type="password"
            value={password}
            className="signup-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label class="signup-form-label">Confirm Password</label>
          <input
            type="confirmPassword"
            value={confirmPassword}
            className="signup-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-btn">
          Signup
        </button>
        <p className="bottom-line">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
