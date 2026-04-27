// =========================
// src/pages/Register.jsx
// =========================
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
// import "./Register.css";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);

      setSuccess("Conta criada com sucesso!");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError("Não foi possível criar a conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Criar Conta</h1>
        <p className="auth-subtitle">
          Cadastre-se para usar o AI Document Assistant.
        </p>

        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          value={form.name}
          onChange={handleChange}
          required
        />

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
          placeholder="Crie uma senha"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Cadastrar"}
        </button>

        {error && <span className="error-text">{error}</span>}
        {success && <span className="success-text">{success}</span>}

        <p className="auth-link">
          Já possui conta? <Link to="/">Entrar</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;