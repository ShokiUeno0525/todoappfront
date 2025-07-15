import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // パスワードリセット要求をサーバーに送信
      await API.post("/forgot-password", { email });
      setSuccess(true);
    } catch (e) {
      console.error(e);
      if (e.code === "ERR_NETWORK" || e.message === "Network Error") {
        setError(
          "サーバーに接続できません。サーバーが起動していることを確認してください。"
        );
      } else {
        setError(
          e.response?.status === 404
            ? "このメールアドレスは登録されていません"
            : "リセット要求の送信に失敗しました"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // 統一されたスタイル定義
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

  const subtitleStyle = {
    fontSize: "14px",
    color: "#6b7280",
    textAlign: "center",
    marginBottom: "32px",
    lineHeight: "1.4",
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

  const successStyle = {
    padding: "16px",
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "8px",
    marginBottom: "24px",
  };

  if (success) {
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
            <h2 style={welcomeStyle}>送信完了</h2>
            <p style={subtitleStyle}>パスワードリセット要求を受け付けました</p>

            <div style={successStyle}>
              <p
                style={{
                  color: "#16a34a",
                  fontSize: "14px",
                  margin: "0",
                  fontWeight: "500",
                }}
              >
                パスワードリセット用のリンクをメールで送信しました。メールをご確認ください。
              </p>
            </div>

            <button
              onClick={() => navigate("/login")}
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
              ログイン画面に戻る
            </button>
          </div>
        </main>
      </div>
    );
  }

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
          <h2 style={welcomeStyle}>Forgot Password</h2>
          <p style={subtitleStyle}>
            登録されているメールアドレスを入力してください。
            パスワードリセット用のリンクをお送りします。
          </p>

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
            {loading ? "送信中..." : "Send Reset Link"}
          </button>

          <p style={linkStyle} onClick={() => navigate("/login")}>
            Back to Login
          </p>
        </div>
      </main>
    </div>
  );
}
