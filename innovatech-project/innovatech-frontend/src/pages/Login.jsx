import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      login(form.username, form.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Fondo con puntos animados */}
      <div style={styles.bgGrid}></div>

      {/* Orbe de fondo */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>
            <i className="bi bi-hexagon-fill" style={{ fontSize: '1.4rem', color: '#fff' }}></i>
          </div>
          <div>
            <div style={styles.brand}>
              Innovatech<span style={{ color: 'var(--accent)' }}>.</span>
            </div>
            <div style={styles.brandSub}>Solutions Platform</div>
          </div>
        </div>

        <h2 style={styles.title}>Bienvenido de vuelta</h2>
        <p style={styles.subtitle}>Ingresa tus credenciales para acceder al portal</p>

        <form onSubmit={handleSubmit} style={{ marginTop: '28px' }}>
          {/* Usuario */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Usuario</label>
            <div style={styles.inputWrap}>
              <i
                className="bi bi-person"
                style={styles.inputIcon}
              ></i>
              <input
                style={styles.input}
                type="text"
                placeholder="Ej: admin"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.inputWrap}>
              <i
                className="bi bi-lock"
                style={styles.inputIcon}
              ></i>
              <input
                style={styles.input}
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
              >
                <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={styles.errorBox}>
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: '14px', height: '14px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid #fff',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                    display: 'inline-block',
                    marginRight: '8px',
                  }}
                ></span>
                Ingresando...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Ingresar al Portal
              </>
            )}
          </button>
        </form>

        {/* Hint de credenciales */}
        <div style={styles.hintBox}>
          <i className="bi bi-info-circle me-2" style={{ color: 'var(--accent)' }}></i>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
            Demo: <b style={{ color: 'var(--text)' }}>admin</b> / <b style={{ color: 'var(--text)' }}>innovatech2024</b>
          </span>
        </div>

        <div style={styles.footer}>
          Innovatech Solutions © {new Date().getFullYear()}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 30px) scale(1.08); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
  },
  bgGrid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(79,140,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(79,140,255,0.04) 1px, transparent 1px)
    `,
    backgroundSize: '48px 48px',
    pointerEvents: 'none',
  },
  orb1: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(79,140,255,0.12) 0%, transparent 70%)',
    top: '-100px',
    right: '-100px',
    animation: 'float1 8s ease-in-out infinite',
    pointerEvents: 'none',
  },
  orb2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,229,176,0.08) 0%, transparent 70%)',
    bottom: '-80px',
    left: '-80px',
    animation: 'float2 10s ease-in-out infinite',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  logoIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  brand: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.25rem',
    color: '#fff',
    lineHeight: 1.2,
  },
  brandSub: {
    fontSize: '11px',
    color: 'var(--muted)',
    marginTop: '2px',
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.5rem',
    color: '#fff',
    margin: 0,
  },
  subtitle: {
    color: 'var(--muted)',
    fontSize: '13px',
    marginTop: '6px',
    marginBottom: 0,
  },
  formGroup: {
    marginBottom: '18px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--muted)',
    letterSpacing: '0.3px',
    display: 'block',
    marginBottom: '6px',
  },
  inputWrap: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--muted)',
    fontSize: '15px',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    padding: '11px 44px',
    color: 'var(--text)',
    fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    transition: 'border-color 0.18s',
  },
  eyeBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'var(--muted)',
    cursor: 'pointer',
    fontSize: '15px',
    padding: '4px',
  },
  errorBox: {
    background: 'rgba(255,107,107,0.1)',
    border: '1px solid rgba(255,107,107,0.25)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: 'var(--accent3)',
    fontSize: '13px',
    marginBottom: '16px',
  },
  submitBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, var(--accent), #7c6fff)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '13px',
    fontSize: '14px',
    fontWeight: 700,
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.18s, transform 0.18s',
    marginTop: '8px',
    letterSpacing: '0.2px',
  },
  hintBox: {
    marginTop: '20px',
    background: 'rgba(79,140,255,0.06)',
    border: '1px solid rgba(79,140,255,0.15)',
    borderRadius: '10px',
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
  },
  footer: {
    textAlign: 'center',
    color: 'var(--muted)',
    fontSize: '11px',
    marginTop: '24px',
  },
};