import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

  localStorage.setItem("user", JSON.stringify(res.data.user));  
navigate("/feed");

  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};
  return (
    <div className="container">
      <div className="card">
        <h1>Connectly</h1>

        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

        <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account? <Link to="/">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;