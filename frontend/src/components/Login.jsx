import React, { useEffect, useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setToken } from "../apis/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const result = await login(email, password);
        if (result.token) {
          setToken(result.token, result.expiresIn);
          dispatch({ type: "user/login", payload: result });
          navigate("/");
        } else {
          const errorData = await result.message;
          setLoginError(errorData);
        }
      } catch (error) {
        setLoginError("An unexpected error occurred. Please try again.");
      }
    },
    [dispatch, email, password, navigate]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        {loginError && <div className="auth-invalid-input">{loginError}</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="login-email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default memo(Login);
