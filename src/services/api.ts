import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para requisições
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se necessário
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador para respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado, redirecionar para login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { api };

// Tipos para as entidades
export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  dataCadastro: string;
  ordensAbertas: number;
}

export interface OrdemServico {
  id: string;
  clienteId: string;
  clienteNome: string;
  servico: string;
  defeito: string;
  orcamento: string;
  custo: string;
  descricaoCusto: string;
  status: 'Aberta' | 'Em Andamento' | 'Aguardando Peças' | 'Finalizada' | 'Cancelada';
  dataAbertura: string;
  observacoes: string;
}

// Serviços de API
export const clienteService = {
  // Buscar todos os clientes
  async getAll(): Promise<Cliente[]> {
    try {
      const response = await api.get('/clientes');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  },

  // Buscar cliente por ID
  async getById(id: string): Promise<Cliente> {
    try {
      const response = await api.get(`/clientes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      throw error;
    }
  },

  // Criar novo cliente
  async create(cliente: Omit<Cliente, 'id' | 'dataCadastro' | 'ordensAbertas'>): Promise<Cliente> {
    try {
      const response = await api.post('/clientes', cliente);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  },

  // Atualizar cliente
  async update(id: string, cliente: Partial<Cliente>): Promise<Cliente> {
    try {
      const response = await api.put(`/clientes/${id}`, cliente);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  },

  // Deletar cliente
  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/clientes/${id}`);
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      throw error;
    }
  },
};

export const ordemServicoService = {
  // Buscar todas as ordens
  async getAll(): Promise<OrdemServico[]> {
    try {
      const response = await api.get('/ordens');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ordens:', error);
      throw error;
    }
  },

  // Buscar ordem por ID
  async getById(id: string): Promise<OrdemServico> {
    try {
      const response = await api.get(`/ordens/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ordem:', error);
      throw error;
    }
  },

  // Criar nova ordem
  async create(ordem: Omit<OrdemServico, 'id' | 'dataAbertura'>): Promise<OrdemServico> {
    try {
      const response = await api.post('/ordens', ordem);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      throw error;
    }
  },

  // Atualizar ordem
  async update(id: string, ordem: Partial<OrdemServico>): Promise<OrdemServico> {
    try {
      const response = await api.put(`/ordens/${id}`, ordem);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error);
      throw error;
    }
  },

  // Deletar ordem
  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/ordens/${id}`);
    } catch (error) {
      console.error('Erro ao deletar ordem:', error);
      throw error;
    }
  },

  // Buscar ordens por cliente
  async getByCliente(clienteId: string): Promise<OrdemServico[]> {
    try {
      const response = await api.get(`/ordens/cliente/${clienteId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ordens do cliente:', error);
      throw error;
    }
  },
};

export const authService = {
  // Login
  async login(email: string, password: string): Promise<{ user: any; token: string }> {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  },

  // Verificar token
  async verifyToken(): Promise<{ user: any }> {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      throw error;
    }
  },
};