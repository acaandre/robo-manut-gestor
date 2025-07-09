
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  dataCadastro: string;
  ordensAbertas: number;
}

const Clientes = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
  });

  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: '1',
      nome: 'João Silva',
      telefone: '(11) 99999-9999',
      email: 'joao@email.com',
      endereco: 'Rua das Flores, 123, São Paulo - SP',
      dataCadastro: '01/12/2024',
      ordensAbertas: 2,
    },
    {
      id: '2',
      nome: 'Maria Santos',
      telefone: '(11) 88888-8888',
      email: 'maria@email.com',
      endereco: 'Av. Paulista, 456, São Paulo - SP',
      dataCadastro: '15/11/2024',
      ordensAbertas: 1,
    },
    {
      id: '3',
      nome: 'Pedro Costa',
      telefone: '(11) 77777-7777',
      email: 'pedro@email.com',
      endereco: 'Rua Augusta, 789, São Paulo - SP',
      dataCadastro: '20/10/2024',
      ordensAbertas: 0,
    },
  ]);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCliente) {
      // Editar cliente existente
      setClientes(prev => prev.map(cliente => 
        cliente.id === editingCliente.id 
          ? { ...cliente, ...formData }
          : cliente
      ));
      toast({
        title: "Cliente atualizado!",
        description: "Os dados do cliente foram atualizados com sucesso.",
      });
    } else {
      // Criar novo cliente
      const novoCliente: Cliente = {
        id: Date.now().toString(),
        ...formData,
        dataCadastro: new Date().toLocaleDateString('pt-BR'),
        ordensAbertas: 0,
      };
      setClientes(prev => [...prev, novoCliente]);
      toast({
        title: "Cliente cadastrado!",
        description: "Novo cliente foi adicionado com sucesso.",
      });
    }

    setFormData({ nome: '', telefone: '', email: '', endereco: '' });
    setEditingCliente(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      endereco: cliente.endereco,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setClientes(prev => prev.filter(cliente => cliente.id !== id));
    toast({
      title: "Cliente removido!",
      description: "O cliente foi removido do sistema.",
      variant: "destructive",
    });
  };

  return (
    <Layout title="Gerenciamento de Clientes">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar clientes..."
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
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCliente ? 'Editar Cliente' : 'Novo Cliente'}
                </DialogTitle>
                <DialogDescription>
                  {editingCliente 
                    ? 'Atualize as informações do cliente.'
                    : 'Preencha os dados do novo cliente.'
                  }
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => setFormData(prev => ({ ...prev, endereco: e.target.value }))}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                    {editingCliente ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Clientes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClientes.map((cliente) => (
            <Card key={cliente.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{cliente.nome}</CardTitle>
                    <CardDescription>Cliente desde {cliente.dataCadastro}</CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(cliente)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(cliente.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{cliente.telefone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{cliente.email}</span>
                </div>
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{cliente.endereco}</span>
                </div>
                <div className="pt-2">
                  <Badge variant={cliente.ordensAbertas > 0 ? "default" : "secondary"}>
                    {cliente.ordensAbertas} ordem{cliente.ordensAbertas !== 1 ? 's' : ''} ativa{cliente.ordensAbertas !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClientes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum cliente encontrado.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Clientes;
