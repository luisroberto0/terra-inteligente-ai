import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { 
  Webhook, 
  Zap, 
  Mail, 
  MessageSquare, 
  Database, 
  Cloud, 
  Settings, 
  Copy, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

export function AdminIntegrations() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [zapierWebhook, setZapierWebhook] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data para integrações
  const integrations = [
    {
      id: "int-001",
      name: "Zapier Integration",
      type: "zapier",
      status: "active",
      description: "Conectar com mais de 5000 aplicações",
      lastUsed: "2024-01-15 14:30",
      webhookUrl: "https://hooks.zapier.com/hooks/catch/123456/abcdef/"
    },
    {
      id: "int-002", 
      name: "Email Notifications",
      type: "email",
      status: "active",
      description: "Notificações por email para usuários",
      lastUsed: "2024-01-15 15:20",
      webhookUrl: "https://api.sendgrid.com/v3/mail/send"
    },
    {
      id: "int-003",
      name: "WhatsApp Business",
      type: "whatsapp",
      status: "inactive",
      description: "Envio de alertas via WhatsApp",
      lastUsed: "2024-01-10 10:15",
      webhookUrl: "https://graph.facebook.com/v17.0/messages"
    },
    {
      id: "int-004",
      name: "Backup Storage",
      type: "storage",
      status: "active", 
      description: "Backup automático para AWS S3",
      lastUsed: "2024-01-15 02:00",
      webhookUrl: "https://s3.amazonaws.com/bucket/backup/"
    }
  ];

  const webhooks = [
    {
      id: "wh-001",
      name: "User Registration",
      url: "https://api.cliente.com/webhooks/user-created",
      events: ["user.created", "user.activated"],
      status: "active",
      lastTriggered: "2024-01-15 14:30",
      attempts: 1250,
      failures: 3
    },
    {
      id: "wh-002",
      name: "Payment Notifications", 
      url: "https://crm.cliente.com/hooks/payment",
      events: ["payment.completed", "payment.failed"],
      status: "active",
      lastTriggered: "2024-01-15 15:45",
      attempts: 892,
      failures: 12
    },
    {
      id: "wh-003",
      name: "Diagnosis Completed",
      url: "https://analytics.cliente.com/diagnosis",
      events: ["diagnosis.completed"],
      status: "inactive",
      lastTriggered: "2024-01-10 10:20",
      attempts: 456,
      failures: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inativo</Badge>;
      case "error":
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "zapier":
        return <Zap className="h-5 w-5 text-orange-500" />;
      case "email":
        return <Mail className="h-5 w-5 text-blue-500" />;
      case "whatsapp":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "storage":
        return <Database className="h-5 w-5 text-purple-500" />;
      default:
        return <Cloud className="h-5 w-5 text-gray-500" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "URL copiada para a área de transferência",
    });
  };

  const handleTriggerZapier = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zapierWebhook) {
      toast({
        title: "Erro",
        description: "Por favor, insira a URL do webhook do Zapier",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(zapierWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: "AgroInsight Admin Panel",
          test_data: {
            user_count: 2847,
            revenue: 45231,
            diagnoses: 18294
          }
        }),
      });

      toast({
        title: "Webhook Acionado",
        description: "O webhook foi enviado com sucesso. Verifique o histórico no Zapier.",
      });
    } catch (error) {
      console.error("Erro ao acionar webhook:", error);
      toast({
        title: "Erro",
        description: "Falha ao acionar o webhook. Verifique a URL e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Integrações e Webhooks
          </h1>
          <p className="text-muted-foreground">
            Configure integrações externas e webhooks para conectar o AgroInsight com outras plataformas
          </p>
        </div>

        <Tabs defaultValue="integrations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="zapier">Zapier</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Integrações Ativas</h2>
                <p className="text-muted-foreground">Gerencie conexões com serviços externos</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Integração
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <Card key={integration.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(integration.type)}
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                      </div>
                      {getStatusBadge(integration.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {integration.description}
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Último uso:</span>
                        <span>{integration.lastUsed}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(integration.webhookUrl)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copiar URL
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Logs
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Webhooks Configurados</h2>
                <p className="text-muted-foreground">URLs que recebem notificações de eventos do sistema</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Webhook
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Eventos</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tentativas</TableHead>
                      <TableHead>Falhas</TableHead>
                      <TableHead>Último Disparo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {webhooks.map((webhook) => (
                      <TableRow key={webhook.id}>
                        <TableCell className="font-medium">{webhook.name}</TableCell>
                        <TableCell className="max-w-xs truncate font-mono text-xs">
                          {webhook.url}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {webhook.events.map((event) => (
                              <Badge key={event} variant="outline" className="text-xs">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(webhook.status)}</TableCell>
                        <TableCell>{webhook.attempts.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {webhook.failures > 0 ? (
                              <XCircle className="h-3 w-3 text-red-500" />
                            ) : (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            )}
                            {webhook.failures}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">{webhook.lastTriggered}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Logs
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Webhook className="mr-2 h-4 w-4" />
                                Testar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remover
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zapier" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  Integração com Zapier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Conecte o AgroInsight com mais de 5000 aplicações através do Zapier. 
                  Configure um webhook no Zapier e teste a integração abaixo.
                </p>
                
                <form onSubmit={handleTriggerZapier} className="space-y-4">
                  <div>
                    <Label htmlFor="zapier-webhook">URL do Webhook do Zapier</Label>
                    <Input
                      id="zapier-webhook"
                      type="url"
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                      value={zapierWebhook}
                      onChange={(e) => setZapierWebhook(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Dados de Teste que serão enviados:</h4>
                    <pre className="text-sm text-muted-foreground">
{`{
  "timestamp": "${new Date().toISOString()}",
  "triggered_from": "AgroInsight Admin Panel",
  "test_data": {
    "user_count": 2847,
    "revenue": 45231,
    "diagnoses": 18294
  }
}`}
                    </pre>
                  </div>
                  
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Testar Webhook"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações do Zapier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Envio Automático de Dados</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar dados automaticamente quando eventos ocorrerem
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div>
                  <Label htmlFor="zapier-events">Eventos para Enviar</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione os eventos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user.created">Novo Usuário</SelectItem>
                      <SelectItem value="payment.completed">Pagamento Realizado</SelectItem>
                      <SelectItem value="diagnosis.completed">Diagnóstico Concluído</SelectItem>
                      <SelectItem value="subscription.changed">Mudança de Plano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Chaves de API
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="api-key">Chave da API Pública</Label>
                    <div className="flex">
                      <Input
                        id="api-key"
                        value="agro_live_pk_1234567890abcdef"
                        readOnly
                        className="font-mono"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => copyToClipboard("agro_live_pk_1234567890abcdef")}
                        className="ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="secret-key">Chave Secreta</Label>
                    <div className="flex">
                      <Input
                        id="secret-key"
                        type="password"
                        value="agro_live_sk_abcdef1234567890"
                        readOnly
                        className="font-mono"
                      />
                      <Button 
                        variant="outline"
                        onClick={() => copyToClipboard("agro_live_sk_abcdef1234567890")}
                        className="ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Importante</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Mantenha suas chaves de API seguras. Nunca as compartilhe em código público ou repositórios.
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="api-docs">Documentação da API</Label>
                  <Textarea
                    id="api-docs"
                    readOnly
                    value={`Base URL: https://api.agroinsight.ai/v1

Endpoints principais:
- GET /users - Listar usuários
- POST /diagnoses - Criar diagnóstico  
- GET /reports - Obter relatórios
- POST /webhooks - Configurar webhook

Autenticação: Bearer Token na header Authorization`}
                    className="font-mono text-xs"
                    rows={8}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline">Regenerar Chaves</Button>
                  <Button variant="outline">Ver Documentação Completa</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}