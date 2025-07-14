import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await API.post("/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(true);
      navigate("/todos");

      // 一時的なプレースホルダー
      console.log("Login attempt:", { email, password });
      alert("ログイン機能は実装待ちです");
    } catch (e) {
      console.error(e);
      setError("メールアドレスかパスワードが正しくありません");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // 強制的にスタイルを適用するため、!important を使用
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    display: "flex",
    flexDirection: "column",
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
    width: "100%",
    position: "relative",
    zIndex: "1000",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    position: "relative",
    zIndex: "1001",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#111827",
    textDecoration: "none",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "700",
    margin: "0",
    color: "#111827",
    lineHeight: "1.2",
  };

  const mainStyle = {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    position: "relative",
    zIndex: "1001",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#ffffff",
    padding: "48px 32px",
    borderRadius: "12px",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #f3f4f6",
  };

  const welcomeStyle = {
    fontSize: "32px",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "32px",
    color: "#111827",
    lineHeight: "1.2",
  };

  const fieldStyle = {
    marginBottom: "24px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#374151",
  };

  const inputStyle = {
    width: "100%",
    height: "52px",
    padding: "0 16px",
    border: "2px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
    color: "#111827",
  };

  const buttonStyle = {
    width: "100%",
    height: "52px",
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? "0.6" : "1",
    marginBottom: "24px",
    transition: "background-color 0.2s, opacity 0.2s",
    outline: "none",
  };

  const linkStyle = {
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
    textDecoration: "underline",
    cursor: "pointer",
    margin: "0",
    display: "block",
  };

  const errorStyle = {
    padding: "16px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    marginBottom: "24px",
  };

  // const demoStyle = {
  //   marginTop: "24px",
  //   padding: "16px",
  //   backgroundColor: "#eff6ff",
  //   border: "1px solid #bfdbfe",
  //   borderRadius: "8px",
  // };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div style={logoStyle}>
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="#111827" />
          </svg>
          <h1 style={titleStyle}>TaskMaster</h1>
        </div>
      </header>

      <main style={mainStyle}>
        <div style={cardStyle}>
          <h2 style={welcomeStyle}>Welcome back</h2>

          {error && (
            <div style={errorStyle}>
              <p
                style={{
                  color: "#dc2626",
                  fontSize: "14px",
                  margin: "0",
                  fontWeight: "500",
                }}
              >
                {error}
              </p>
            </div>
          )}

          <div style={fieldStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              style={{
                ...inputStyle,
                borderColor: "#d1d5db",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              style={{
                ...inputStyle,
                borderColor: "#d1d5db",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={buttonStyle}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = "#1f2937";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = "#111827";
              }
            }}
          >
            {loading ? "ログイン中..." : "Login"}
          </button>

          <p style={linkStyle}>Don't have an account? Sign up</p>
        </div>
      </main>
    </div>
  );
}
