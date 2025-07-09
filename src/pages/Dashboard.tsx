
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ClipboardList, 
  Users, 
  DollarSign, 
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Wrench
} from 'lucide-react';

const Dashboard = () => {
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
      title: 'Faturamento Mensal',
      value: 'R$ 12.450',
      description: 'Este mês',
      icon: DollarSign,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
  ];

  const recentOrders = [
    {
      id: 'OS-001',
      cliente: 'João Silva',
      servico: 'Manutenção Notebook',
      status: 'Em Andamento',
      valor: 'R$ 150,00',
      data: '07/01/2025',
    },
    {
      id: 'OS-002',
      cliente: 'Maria Santos',
      servico: 'Reparo Smartphone',
      status: 'Aguardando Peças',
      valor: 'R$ 280,00',
      data: '07/01/2025',
    },
    {
      id: 'OS-003',
      cliente: 'Pedro Costa',
      servico: 'Formatação PC',
      status: 'Finalizada',
      valor: 'R$ 80,00',
      data: '06/01/2025',
    },
  ];

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

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
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
                <span>Ordens Recentes</span>
              </CardTitle>
              <CardDescription>
                Últimas ordens de serviço registradas
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
                <span>Estatísticas do Mês</span>
              </CardTitle>
              <CardDescription>
                Resumo de performance mensal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ordens Finalizadas</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Taxa de Satisfação</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tempo Médio de Reparo</span>
                  <span className="font-medium">2.3 dias</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
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
