
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Printer, Send, Calendar, User, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrdemServico {
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
  dataFinalizacao?: string;
  observacoes?: string;
}

type StatusType = 'Aberta' | 'Em Andamento' | 'Aguardando Peças' | 'Finalizada' | 'Cancelada';

const Ordens = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOrdem, setEditingOrdem] = useState<OrdemServico | null>(null);
  const [formData, setFormData] = useState({
    clienteId: '',
    clienteNome: '',
    servico: '',
    defeito: '',
    orcamento: '',
    custo: '',
    descricaoCusto: '',
    status: 'Aberta' as StatusType,
    observacoes: '',
  });

  const clientes = [
    { id: '1', nome: 'João Silva' },
    { id: '2', nome: 'Maria Santos' },
    { id: '3', nome: 'Pedro Costa' },
  ];

  const [ordens, setOrdens] = useState<OrdemServico[]>([
    {
      id: 'OS-001',
      clienteId: '1',
      clienteNome: 'João Silva',
      servico: 'Manutenção Notebook',
      defeito: 'Não liga, problema na fonte',
      orcamento: '150.00',
      custo: '80.00',
      descricaoCusto: 'Fonte nova + mão de obra',
      status: 'Em Andamento',
      dataAbertura: '05/01/2025',
    },
    {
      id: 'OS-002',
      clienteId: '2',
      clienteNome: 'Maria Santos',
      servico: 'Reparo Smartphone',
      defeito: 'Tela trincada',
      orcamento: '280.00',
      custo: '180.00',
      descricaoCusto: 'Tela original + película',
      status: 'Aguardando Peças',
      dataAbertura: '06/01/2025',
    },
    {
      id: 'OS-003',
      clienteId: '3',
      clienteNome: 'Pedro Costa',
      servico: 'Formatação PC',
      defeito: 'Sistema lento, vírus',
      orcamento: '80.00',
      custo: '20.00',
      descricaoCusto: 'Software antivírus + tempo técnico',
      status: 'Finalizada',
      dataAbertura: '04/01/2025',
      dataFinalizacao: '06/01/2025',
    },
  ]);

  const filteredOrdens = ordens.filter(ordem =>
    ordem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordem.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordem.servico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberta':
        return 'bg-blue-100 text-blue-800';
      case 'Em Andamento':
        return 'bg-orange-100 text-orange-800';
      case 'Aguardando Peças':
        return 'bg-yellow-100 text-yellow-800';
      case 'Finalizada':
        return 'bg-green-100 text-green-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateLucro = (orcamento: string, custo: string) => {
    const orc = parseFloat(orcamento) || 0;
    const cost = parseFloat(custo) || 0;
    return (orc - cost).toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const clienteSelecionado = clientes.find(c => c.id === formData.clienteId);
    
    if (editingOrdem) {
      // Editar ordem existente
      setOrdens(prev => prev.map(ordem => 
        ordem.id === editingOrdem.id 
          ? { 
              ...ordem, 
              ...formData,
              clienteNome: clienteSelecionado?.nome || formData.clienteNome,
              dataFinalizacao: formData.status === 'Finalizada' && editingOrdem.status !== 'Finalizada' 
                ? new Date().toLocaleDateString('pt-BR') 
                : ordem.dataFinalizacao
            }
          : ordem
      ));
      
      // Simular envio de email para mudança de status
      if (editingOrdem.status !== formData.status) {
        toast({
          title: "Status atualizado!",
          description: `Email enviado para o cliente sobre a mudança para: ${formData.status}`,
        });
      }
    } else {
      // Criar nova ordem
      const novaOrdem: OrdemServico = {
        id: `OS-${String(ordens.length + 1).padStart(3, '0')}`,
        ...formData,
        clienteNome: clienteSelecionado?.nome || '',
        dataAbertura: new Date().toLocaleDateString('pt-BR'),
      };
      setOrdens(prev => [...prev, novaOrdem]);
      toast({
        title: "Ordem criada!",
        description: "Nova ordem de serviço foi criada com sucesso.",
      });
    }

    setFormData({
      clienteId: '',
      clienteNome: '',
      servico: '',
      defeito: '',
      orcamento: '',
      custo: '',
      descricaoCusto: '',
      status: 'Aberta',
      observacoes: '',
    });
    setEditingOrdem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (ordem: OrdemServico) => {
    setEditingOrdem(ordem);
    setFormData({
      clienteId: ordem.clienteId,
      clienteNome: ordem.clienteNome,
      servico: ordem.servico,
      defeito: ordem.defeito,
      orcamento: ordem.orcamento,
      custo: ordem.custo,
      descricaoCusto: ordem.descricaoCusto,
      status: ordem.status,
      observacoes: ordem.observacoes || '',
    });
    setIsDialogOpen(true);
  };

  const handlePrint = (ordem: OrdemServico) => {
    const lucro = calculateLucro(ordem.orcamento, ordem.custo);
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #22c55e;">Robótica Sustentável</h1>
          <h2>Ordem de Serviço - ${ordem.id}</h2>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3>Dados do Cliente:</h3>
          <p><strong>Nome:</strong> ${ordem.clienteNome}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3>Dados do Serviço:</h3>
          <p><strong>Serviço:</strong> ${ordem.servico}</p>
          <p><strong>Defeito Relatado:</strong> ${ordem.defeito}</p>
          <p><strong>Orçamento:</strong> R$ ${ordem.orcamento}</p>
          <p><strong>Custo:</strong> R$ ${ordem.custo}</p>
          <p><strong>Descrição do Custo:</strong> ${ordem.descricaoCusto}</p>
          <p><strong>Lucro:</strong> R$ ${lucro}</p>
          <p><strong>Status:</strong> ${ordem.status}</p>
          <p><strong>Data de Abertura:</strong> ${ordem.dataAbertura}</p>
          ${ordem.dataFinalizacao ? `<p><strong>Data de Finalização:</strong> ${ordem.dataFinalizacao}</p>` : ''}
        </div>
        
        ${ordem.observacoes ? `
          <div style="margin-bottom: 20px;">
            <h3>Observações:</h3>
            <p>${ordem.observacoes}</p>
          </div>
        ` : ''}
        
        <div style="margin-top: 40px; text-align: center; color: #666;">
          <p>Data de impressão: ${new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const sendEmailNotification = (ordem: OrdemServico) => {
    toast({
      title: "Email enviado!",
      description: `Notificação enviada para ${ordem.clienteNome} sobre a OS ${ordem.id}`,
    });
  };

  return (
    <Layout title="Ordens de Serviço">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar ordens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Plus className="h-4 w-4 mr-2" />
                Nova Ordem
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingOrdem ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
                </DialogTitle>
                <DialogDescription>
                  {editingOrdem 
                    ? 'Atualize as informações da ordem de serviço.'
                    : 'Preencha os dados da nova ordem de serviço.'
                  }
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cliente">Cliente</Label>
                    <Select 
                      value={formData.clienteId} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, clienteId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientes.map(cliente => (
                          <SelectItem key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value: StatusType) => setFormData(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status da ordem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aberta">Aberta</SelectItem>
                        <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                        <SelectItem value="Aguardando Peças">Aguardando Peças</SelectItem>
                        <SelectItem value="Finalizada">Finalizada</SelectItem>
                        <SelectItem value="Cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="servico">Tipo de Serviço</Label>
                  <Input
                    id="servico"
                    value={formData.servico}
                    onChange={(e) => setFormData(prev => ({ ...prev, servico: e.target.value }))}
                    placeholder="Ex: Manutenção Notebook, Reparo Smartphone..."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defeito">Defeito Relatado</Label>
                  <Textarea
                    id="defeito"
                    value={formData.defeito}
                    onChange={(e) => setFormData(prev => ({ ...prev, defeito: e.target.value }))}
                    placeholder="Descreva o problema relatado pelo cliente..."
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orcamento">Orçamento (R$)</Label>
                    <Input
                      id="orcamento"
                      type="number"
                      step="0.01"
                      value={formData.orcamento}
                      onChange={(e) => setFormData(prev => ({ ...prev, orcamento: e.target.value }))}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custo">Custo (R$)</Label>
                    <Input
                      id="custo"
                      type="number"
                      step="0.01"
                      value={formData.custo}
                      onChange={(e) => setFormData(prev => ({ ...prev, custo: e.target.value }))}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descricaoCusto">Descrição do Custo</Label>
                  <Textarea
                    id="descricaoCusto"
                    value={formData.descricaoCusto}
                    onChange={(e) => setFormData(prev => ({ ...prev, descricaoCusto: e.target.value }))}
                    placeholder="Descreva os custos envolvidos..."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                    placeholder="Observações adicionais..."
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                    {editingOrdem ? 'Atualizar' : 'Criar Ordem'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Ordens Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrdens.map((ordem) => (
            <Card key={ordem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold text-primary-800">{ordem.id}</CardTitle>
                    <CardDescription>{ordem.servico}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(ordem.status)}>
                    {ordem.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{ordem.clienteNome}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">R$ {ordem.orcamento}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Lucro:</span>
                    <span className="font-medium text-blue-600">R$ {calculateLucro(ordem.orcamento, ordem.custo)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Aberta em {ordem.dataAbertura}</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Defeito:</p>
                  <p className="text-sm text-gray-600">{ordem.defeito}</p>
                </div>
                
                {ordem.descricaoCusto && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-700 mb-1">Custo:</p>
                    <p className="text-sm text-blue-600">{ordem.descricaoCusto}</p>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-2">
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(ordem)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePrint(ordem)}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => sendEmailNotification(ordem)}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrdens.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma ordem de serviço encontrada.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Ordens;
