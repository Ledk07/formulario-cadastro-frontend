import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    dataDeNascimento: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const endpoint = isLogin
      ? 'http://localhost:8080/formulario-cadastro/login'
      : 'http://localhost:8080/formulario-cadastro';

    const payload = isLogin
      ? { email: formData.email, senha: formData.senha }
      : formData;

    try {
      await axios.post(endpoint, payload);
      // Redireciona para a rota /cadastros após o login ou cadastro com sucesso
      navigate('/cadastros');
    } catch (error) {
      setMessage(error.response?.data || 'Erro ao processar a requisição.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '24px', border: '1px solid #334155', borderRadius: '8px', color: '#fff', backgroundColor: '#1e293b', fontFamily: 'sans-serif' }}>
      <h2>{isLogin ? 'Faça login aqui' : 'Cadastre-se'}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {!isLogin && (
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Nome Completo:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        {!isLogin && (
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Data de Nascimento:</label>
            <input
              type="date"
              name="dataDeNascimento"
              value={formData.dataDeNascimento}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>
        )}

        <button type="submit" style={{ padding: '12px', backgroundColor: 'green', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '8px' }}>
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      {message && <p style={{ marginTop: '16px', fontSize: '14px', color: '#f87171' }}>{message}</p>}

      <button
        type="button"
        onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
        style={{ marginTop: '16px', background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
      >
        {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
      </button>
    </div>
  );
}