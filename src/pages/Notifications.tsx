import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Mail, MessageSquare, Thermometer, AlertTriangle, TrendingDown } from "lucide-react";
import { toast } from "sonner";

export function Notifications() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [viabilityThreshold, setViabilityThreshold] = useState("50");
  const [productivityThreshold, setProductivityThreshold] = useState("60");

  const handleSaveSettings = () => {
    toast.success("Configurações de notificações salvas com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Notificações Personalizadas</h1>
          <p className="text-muted-foreground">Configure como e quando receber alertas importantes sobre suas culturas</p>
        </div>

        <div className="grid gap-6">
          {/* Canais de Notificação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Canais de Notificação
              </CardTitle>
              <CardDescription>
                Escolha como deseja receber os alertas do AgroInsight AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <Label htmlFor="email-notifications" className="text-base font-medium">E-mail</Label>
                    <p className="text-sm text-muted-foreground">Receba alertas por e-mail</p>
                  </div>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <div>
                    <Label htmlFor="sms-notifications" className="text-base font-medium">SMS</Label>
                    <p className="text-sm text-muted-foreground">Receba alertas por mensagem de texto</p>
                  </div>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={smsEnabled}
                  onCheckedChange={setSmsEnabled}
                />
              </div>

              {smsEnabled && (
                <div className="ml-8 space-y-2">
                  <Label htmlFor="phone">Número do telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(11) 99999-9999"
                    className="max-w-xs"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tipos de Alertas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Tipos de Alertas
              </CardTitle>
              <CardDescription>
                Configure quais eventos devem gerar notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                    <div>
                      <h4 className="font-medium">Viabilidade Baixa</h4>
                      <p className="text-sm text-muted-foreground">Quando a viabilidade do solo estiver abaixo do limite</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="h-5 w-5 text-destructive" />
                    <div>
                      <h4 className="font-medium">Clima Extremo</h4>
                      <p className="text-sm text-muted-foreground">Alertas sobre condições climáticas adversas</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                      <h4 className="font-medium">Falha na Análise</h4>
                      <p className="text-sm text-muted-foreground">Quando houver problemas no processamento</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limites de Alerta */}
          <Card>
            <CardHeader>
              <CardTitle>Configurar Limites</CardTitle>
              <CardDescription>
                Defina os valores que irão disparar os alertas automáticos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="viability">Viabilidade do Solo (%)</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Alertar quando &lt;</span>
                    <Input
                      id="viability"
                      type="number"
                      value={viabilityThreshold}
                      onChange={(e) => setViabilityThreshold(e.target.value)}
                      className="w-20"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productivity">Produtividade (%)</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Alertar quando &lt;</span>
                    <Input
                      id="productivity"
                      type="number"
                      value={productivityThreshold}
                      onChange={(e) => setProductivityThreshold(e.target.value)}
                      className="w-20"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-conditions">Condições Personalizadas</Label>
                <Textarea
                  id="custom-conditions"
                  placeholder="Descreva outras condições específicas para sua propriedade..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline">Cancelar</Button>
            <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}