// =========================
// src/pages/Dashboard.jsx
// =========================
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Olá! Selecione um documento e faça sua pergunta.",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const response = await api.get("/documents");
      setDocuments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao carregar documentos:", error);
    }
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/documents/upload", formData);
      await loadDocuments();
      alert("Documento enviado com sucesso!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Erro ao enviar documento."
      );
    }

    e.target.value = "";
  }

async function handleDelete(id) {
  const confirmDelete = window.confirm(
    "Deseja excluir este documento?"
  );

  if (!confirmDelete) return;

  try {
    const response = await api.delete(`/documents/${id}`);
    console.log(response.data);

    if (selectedDoc?.id === id) {
      setSelectedDoc(null);
    }

    await loadDocuments();
  } catch (error) {
    console.log("ERRO DELETE:", error);
    console.log(error.response);
    alert("Erro ao excluir documento.");
  }
}

  async function handleAsk() {
    if (!question.trim() || !selectedDoc) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await api.post("/chat/ask", {
        question,
        document_id: selectedDoc.id,
      });

      const botMessage = {
        role: "assistant",
        content: response.data.answer,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erro ao consultar IA.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleNewChat() {
    setMessages([
      {
        role: "assistant",
        content: "Novo chat iniciado. Faça sua pergunta.",
      },
    ]);
    setQuestion("");
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">AI Doc Assistant</h2>

        <button
          className="primary-btn"
          onClick={handleNewChat}
        >
          + Novo Chat
        </button>

        <label className="upload-btn">
          + Enviar Documento
          <input
            type="file"
            hidden
            onChange={handleUpload}
          />
        </label>

        <div className="section-title">Documentos</div>

        <div className="doc-list">
          {documents.length === 0 && (
            <p className="empty-text">
              Nenhum documento enviado.
            </p>
          )}

          {documents.map((doc) => (
            <div key={doc.id} className="doc-row">
              <button
                className={`doc-item ${
                  selectedDoc?.id === doc.id
                    ? "active"
                    : ""
                }`}
                onClick={() => setSelectedDoc(doc)}
              >
                {doc.title || "Sem título"}
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(doc.id)}
                title="Excluir documento"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Sair
        </button>
      </aside>

      <main className="chat-container">
        <header className="chat-header">
          {selectedDoc
            ? `Documento: ${
                selectedDoc.title || "Sem título"
              }`
            : "Selecione um documento"}
        </header>

        <section className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.role === "user"
                  ? "message-user"
                  : "message-bot"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="message message-bot">
              Pensando...
            </div>
          )}
        </section>

        <footer className="chat-footer">
          <input
            type="text"
            placeholder="Digite sua pergunta..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" && handleAsk()
            }
          />

          <button
            onClick={handleAsk}
            disabled={loading}
          >
            {loading ? "..." : "Enviar"}
          </button>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;