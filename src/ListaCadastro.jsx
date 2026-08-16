import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ListaCadastros() {
  const [cadastros, setCadastros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const buscarCadastros = async () => {
      try {
        const response = await axios.get('http://localhost:8080/formulario-cadastro');
        setCadastros(response.data);
      } catch (err) {
        setErro('Erro ao carregar a lista de cadastros.');
      } finally {
        setLoading(false);
      }
    };

    buscarCadastros();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '24px', backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Pessoas Cadastradas</h2>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Voltar / Sair
        </button>
      </div>

      {loading && <p>Carregando registros...</p>}
      {erro && <p style={{ color: '#f87171' }}>{erro}</p>}

      {!loading && !erro && (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '12px' }}>Nome</th>
              <th style={{ padding: '12px' }}>E-mail</th>
              <th style={{ padding: '12px' }}>Data de Nascimento</th>
            </tr>
          </thead>
          <tbody>
            {cadastros.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '12px' }}>{item.nome}</td>
                <td style={{ padding: '12px' }}>{item.email}</td>
                <td style={{ padding: '12px' }}>{item.dataDeNascimento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}