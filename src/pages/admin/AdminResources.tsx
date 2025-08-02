import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Database, Cpu, Cloud, Shield, Zap } from "lucide-react";

export function AdminResources() {
  const { t } = useLanguage();
  const [resources, setResources] = useState({
    free: {
      maxFarms: 1,
      maxDiagnoses: 10,
      maxStorage: 100, // MB
      aiAnalysis: false,
      advancedReports: false,
      teamMembers: 1,
      apiCalls: 100,
      support: false
    },
    premium: {
      maxFarms: 5,
      maxDiagnoses: 100,
      maxStorage: 1000, // MB
      aiAnalysis: true,
      advancedReports: true,
      teamMembers: 3,
      apiCalls: 1000,
      support: true
    },
    professional: {
      maxFarms: 20,
      maxDiagnoses: 1000,
      maxStorage: 10000, // MB
      aiAnalysis: true,
      advancedReports: true,
      teamMembers: 10,
      apiCalls: 10000,
      support: true
    }
  });

  const updateResource = (plan: string, resource: string, value: any) => {
    setResources(prev => ({
      ...prev,
      [plan]: {
        ...prev[plan as keyof typeof prev],
        [resource]: value
      }
    }));
  };

  const ResourceCard = ({ plan, title, icon: Icon }: { plan: string, title: string, icon: any }) => {
    const planData = resources[plan as keyof typeof resources];
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`${plan}-farms`}>Máximo de Fazendas</Label>
              <Input
                id={`${plan}-farms`}
                type="number"
                value={planData.maxFarms}
                onChange={(e) => updateResource(plan, 'maxFarms', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor={`${plan}-diagnoses`}>Diagnósticos/Mês</Label>
              <Input
                id={`${plan}-diagnoses`}
                type="number"
                value={planData.maxDiagnoses}
                onChange={(e) => updateResource(plan, 'maxDiagnoses', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`${plan}-storage`}>Armazenamento (MB)</Label>
              <Input
                id={`${plan}-storage`}
                type="number"
                value={planData.maxStorage}
                onChange={(e) => updateResource(plan, 'maxStorage', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor={`${plan}-team`}>Membros da Equipe</Label>
              <Input
                id={`${plan}-team`}
                type="number"
                value={planData.teamMembers}
                onChange={(e) => updateResource(plan, 'teamMembers', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor={`${plan}-api`}>Chamadas API/Mês</Label>
            <Input
              id={`${plan}-api`}
              type="number"
              value={planData.apiCalls}
              onChange={(e) => updateResource(plan, 'apiCalls', parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor={`${plan}-ai`}>Análise com IA</Label>
              <Switch
                id={`${plan}-ai`}
                checked={planData.aiAnalysis}
                onCheckedChange={(checked) => updateResource(plan, 'aiAnalysis', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor={`${plan}-reports`}>Relatórios Avançados</Label>
              <Switch
                id={`${plan}-reports`}
                checked={planData.advancedReports}
                onCheckedChange={(checked) => updateResource(plan, 'advancedReports', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor={`${plan}-support`}>Suporte Prioritário</Label>
              <Switch
                id={`${plan}-support`}
                checked={planData.support}
                onCheckedChange={(checked) => updateResource(plan, 'support', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gerenciamento de Recursos
          </h1>
          <p className="text-muted-foreground">
            Configure limites e permissões para cada plano de assinatura
          </p>
        </div>

        <Tabs defaultValue="limits" className="space-y-6">
          <TabsList>
            <TabsTrigger value="limits">Limites por Plano</TabsTrigger>
            <TabsTrigger value="features">Recursos do Sistema</TabsTrigger>
            <TabsTrigger value="infrastructure">Infraestrutura</TabsTrigger>
          </TabsList>

          <TabsContent value="limits" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ResourceCard 
                plan="free" 
                title="Plano Gratuito" 
                icon={Database}
              />
              <ResourceCard 
                plan="premium" 
                title="Plano Premium" 
                icon={Zap}
              />
              <ResourceCard 
                plan="professional" 
                title="Plano Profissional" 
                icon={Shield}
              />
            </div>
            <div className="flex justify-end">
              <Button size="lg">Salvar Configurações</Button>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    Recursos de IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Análise de Pragas</Label>
                      <p className="text-sm text-muted-foreground">Detecção automática de pragas em imagens</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Previsão Climática</Label>
                      <p className="text-sm text-muted-foreground">Previsões baseadas em IA</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Otimização de Irrigação</Label>
                      <p className="text-sm text-muted-foreground">Sugestões inteligentes de irrigação</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Recursos Avançados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Exportação de Dados</Label>
                      <p className="text-sm text-muted-foreground">Export em diversos formatos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>API Access</Label>
                      <p className="text-sm text-muted-foreground">Acesso à API para integrações</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Backup Automático</Label>
                      <p className="text-sm text-muted-foreground">Backup diário dos dados</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Autenticação em duas etapas</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Criptografia Avançada</Label>
                      <p className="text-sm text-muted-foreground">Criptografia end-to-end</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Logs de Auditoria</Label>
                      <p className="text-sm text-muted-foreground">Registro detalhado de ações</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5" />
                    Integrações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Integração WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">Notificações via WhatsApp</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Integração Zapier</Label>
                      <p className="text-sm text-muted-foreground">Conectar com milhares de apps</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Webhooks</Label>
                      <p className="text-sm text-muted-foreground">Notificações em tempo real</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end">
              <Button size="lg">Salvar Recursos</Button>
            </div>
          </TabsContent>

          <TabsContent value="infrastructure" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Servidor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="max-users">Máximo de Usuários Simultâneos</Label>
                    <Input id="max-users" type="number" defaultValue="1000" />
                  </div>
                  <div>
                    <Label htmlFor="storage-limit">Limite de Armazenamento Total (GB)</Label>
                    <Input id="storage-limit" type="number" defaultValue="500" />
                  </div>
                  <div>
                    <Label htmlFor="backup-frequency">Frequência de Backup (horas)</Label>
                    <Input id="backup-frequency" type="number" defaultValue="24" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="api-rate-limit">Rate Limit API (req/min)</Label>
                    <Input id="api-rate-limit" type="number" defaultValue="100" />
                  </div>
                  <div>
                    <Label htmlFor="cache-ttl">Cache TTL (segundos)</Label>
                    <Input id="cache-ttl" type="number" defaultValue="300" />
                  </div>
                  <div>
                    <Label htmlFor="session-timeout">Timeout de Sessão (minutos)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Configurações de Manutenção</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Modo de Manutenção</Label>
                      <p className="text-sm text-muted-foreground">Ativar para manutenção do sistema</p>
                    </div>
                    <Switch />
                  </div>
                  <div>
                    <Label htmlFor="maintenance-message">Mensagem de Manutenção</Label>
                    <Textarea 
                      id="maintenance-message"
                      placeholder="Sistema em manutenção. Voltaremos em breve..."
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end">
              <Button size="lg">Salvar Configurações</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}