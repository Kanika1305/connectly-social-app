import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleSignup = async () => {
  try {
    const res = await API.post("/auth/signup", {
      username,
      email,
      password,
    });

    navigate("/login");

  } catch (error) {
  console.log(error);
  alert(error.response?.data?.message || "Signup Failed");
}
};

  return (
    <div className="container">
      <div className="card">
        <h1>Connectly</h1>
        

        <input type="text" placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} />

        <input type="email"placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" placeholder="Password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)} />

        <button onClick={handleSignup}> Create Account</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;