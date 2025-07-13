
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList, 
  Users, 
  DollarSign, 
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Wrench,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();

  // Dados das ordens para calcular lucros (organizados por semana)
  const ordensSemanais = [
    {
      id: 'OS-001',
      cliente: 'João Silva',
      servico: 'Manutenção Notebook',
      status: 'Em Andamento',
      orcamento: 150.00,
      custo: 80.00,
      data: '13/01/2025',
      semana: 'atual'
    },
    {
      id: 'OS-002',
      cliente: 'Maria Santos',
      servico: 'Reparo Smartphone',
      status: 'Aguardando Peças',
      orcamento: 280.00,
      custo: 180.00,
      data: '12/01/2025',
      semana: 'atual'
    },
    {
      id: 'OS-003',
      cliente: 'Pedro Costa',
      servico: 'Formatação PC',
      status: 'Finalizada',
      orcamento: 80.00,
      custo: 20.00,
      data: '10/01/2025',
      semana: 'atual'
    },
    {
      id: 'OS-004',
      cliente: 'Ana Oliveira',
      servico: 'Instalação SSD',
      status: 'Finalizada',
      orcamento: 200.00,
      custo: 120.00,
      data: '06/01/2025',
      semana: 'anterior'
    },
    {
      id: 'OS-005',
      cliente: 'Carlos Silva',
      servico: 'Limpeza Notebook',
      status: 'Finalizada',
      orcamento: 60.00,
      custo: 15.00,
      data: '05/01/2025',
      semana: 'anterior'
    },
  ];

  const calcularLucroSemanal = (semana: string) => {
    return ordensSemanais.filter(ordem => ordem.semana === semana)
      .reduce((total, ordem) => {
        return total + (ordem.orcamento - ordem.custo);
      }, 0).toFixed(2);
  };

  const calcularFaturamentoSemanal = (semana: string) => {
    return ordensSemanais.filter(ordem => ordem.semana === semana)
      .reduce((total, ordem) => {
        return total + ordem.orcamento;
      }, 0).toFixed(2);
  };

  const stats = [
    {
      title: 'Ordens Abertas',
      value: '23',
      description: 'Aguardando atendimento',
      icon: ClipboardList,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Em Andamento',
      value: '12',
      description: 'Sendo executadas',
      icon: Wrench,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Finalizadas Hoje',
      value: '8',
      description: 'Concluídas hoje',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Lucro Semanal',
      value: `R$ ${calcularLucroSemanal('atual')}`,
      description: 'Faturamento - Custos',
      icon: DollarSign,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
  ];

  const recentOrders = ordensSemanais.filter(ordem => ordem.semana === 'atual').map(ordem => ({
    ...ordem,
    valor: `R$ ${ordem.orcamento.toFixed(2)}`,
    lucro: `R$ ${(ordem.orcamento - ordem.custo).toFixed(2)}`,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento':
        return 'bg-orange-100 text-orange-800';
      case 'Aguardando Peças':
        return 'bg-yellow-100 text-yellow-800';
      case 'Finalizada':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Header com botão de logout */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Visão Geral</h2>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5" />
                <span>Ordens desta Semana</span>
              </CardTitle>
              <CardDescription>
                Ordens de serviço da semana atual com lucro calculado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{order.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.cliente}</p>
                      <p className="text-sm text-gray-500">{order.servico}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">{order.valor}</p>
                      <p className="text-sm text-blue-600">Lucro: {order.lucro}</p>
                      <p className="text-xs text-gray-500">{order.data}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Estatísticas Semanais</span>
              </CardTitle>
              <CardDescription>
                Comparativo de performance semanal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Faturamento - Semana Atual</span>
                    <span className="font-medium">R$ {calcularFaturamentoSemanal('atual')}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Faturamento - Semana Anterior</span>
                    <span className="font-medium">R$ {calcularFaturamentoSemanal('anterior')}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Lucro - Semana Atual</span>
                    <span className="font-medium text-primary-600">R$ {calcularLucroSemanal('atual')}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Lucro - Semana Anterior</span>
                    <span className="font-medium text-primary-600">R$ {calcularLucroSemanal('anterior')}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Tempo Médio de Reparo</span>
                    <span className="font-medium">2.3 dias</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
