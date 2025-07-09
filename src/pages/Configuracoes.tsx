
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Mail, Bell, Shield, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Configuracoes = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  return (
    <Layout title="Configurações">
      <div className="space-y-6">
        {/* Email Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Configurações de Email</span>
            </CardTitle>
            <CardDescription>
              Configure os parâmetros para envio de notificações por email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-server">Servidor SMTP</Label>
                <Input
                  id="smtp-server"
                  placeholder="smtp.gmail.com"
                  defaultValue="smtp.gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">Porta</Label>
                <Input
                  id="smtp-port"
                  placeholder="587"
                  defaultValue="587"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email-username">Email de Envio</Label>
                <Input
                  id="email-username"
                  type="email"
                  placeholder="contato@roboticasustentavel.com"
                  defaultValue="contato@roboticasustentavel.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-password">Senha do App</Label>
                <Input
                  id="email-password"
                  type="password"
                  placeholder="••••••••••••••••"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="enable-ssl" defaultChecked />
              <Label htmlFor="enable-ssl">Usar SSL/TLS</Label>
            </div>

            <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700">
              Salvar Configurações de Email
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notificações</span>
            </CardTitle>
            <CardDescription>
              Configure quando e como as notificações devem ser enviadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Mudança de Status</Label>
                  <p className="text-sm text-gray-500">
                    Enviar email quando o status da OS for alterado
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Nova Ordem Criada</Label>
                  <p className="text-sm text-gray-500">
                    Notificar cliente sobre nova ordem de serviço
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Ordem Finalizada</Label>
                  <p className="text-sm text-gray-500">
                    Notificar quando a ordem estiver pronta para retirada
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Lembrete de Orçamento</Label>
                  <p className="text-sm text-gray-500">
                    Lembrar cliente sobre orçamentos pendentes
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700">
              Salvar Configurações de Notificação
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Configurações do Sistema</span>
            </CardTitle>
            <CardDescription>
              Configurações gerais da plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da Empresa</Label>
                <Input
                  id="company-name"
                  defaultValue="Robótica Sustentável"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-phone">Telefone</Label>
                <Input
                  id="company-phone"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-address">Endereço</Label>
              <Input
                id="company-address"
                placeholder="Endereço completo da empresa"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warranty-period">Período de Garantia (dias)</Label>
              <Input
                id="warranty-period"
                type="number"
                defaultValue="90"
                placeholder="90"
              />
            </div>

            <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700">
              Salvar Configurações do Sistema
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Segurança</span>
            </CardTitle>
            <CardDescription>
              Configurações de segurança e backup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Backup Automático</Label>
                <p className="text-sm text-gray-500">
                  Realizar backup diário dos dados
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="session-timeout">Timeout de Sessão (minutos)</Label>
              <Input
                id="session-timeout"
                type="number"
                defaultValue="30"
                placeholder="30"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700">
                Salvar Configurações de Segurança
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>Fazer Backup Agora</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Configuracoes;
