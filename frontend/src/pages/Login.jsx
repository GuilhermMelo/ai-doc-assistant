// =========================
// src/pages/Login.jsx
// =========================
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
// import "./Login.css";
import "./Login.css";
function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Entrar</h1>
        <p className="auth-subtitle">
          Acesse sua conta para conversar com seus documentos.
        </p>

        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Sua senha"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {error && <span className="error-text">{error}</span>}

        <p className="auth-link">
          Não possui conta? <Link to="/register">Criar conta</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;