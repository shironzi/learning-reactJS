import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../reducers/userReducer";
import { login } from "../apis/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(email, password);
      if (result.status === 200) {
        console.log("Login successful");
        dispatch(loginSuccess({ email }));
        navigate("/");
      } else {
        result.json().then((data) => {
          setErrorMsg(data["message"]);
        });
        setIsInvalid(true);
      }
    } catch (error) {
      setErrorMsg("An error occurred while trying to log in.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {isInvalid ? (
          <label className="auth-invalid-input">{errorMsg}</label>
        ) : null}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="Password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default memo(Login);
