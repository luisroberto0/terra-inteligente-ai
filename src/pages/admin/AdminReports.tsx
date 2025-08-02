import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, Calendar as CalendarIcon, FileText, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function AdminReports() {
  const { t } = useLanguage();
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedPlans, setSelectedPlans] = useState<string[]>(["all"]);
  const [reportType, setReportType] = useState("usage");

  // Mock data para relatórios
  const usageData = [
    { month: "Jan", diagnoses: 1200, users: 45, premium: 15, professional: 8 },
    { month: "Fev", diagnoses: 1450, users: 52, premium: 18, professional: 12 },
    { month: "Mar", diagnoses: 1680, users: 58, premium: 22, professional: 15 },
    { month: "Abr", diagnoses: 1920, users: 65, premium: 25, professional: 18 },
    { month: "Mai", diagnoses: 2100, users: 71, premium: 28, professional: 21 },
    { month: "Jun", diagnoses: 2350, users: 78, premium: 32, professional: 24 }
  ];

  const revenueData = [
    { month: "Jan", revenue: 4500, mrr: 4200, churn: 2.1 },
    { month: "Fev", revenue: 5200, mrr: 4800, churn: 1.8 },
    { month: "Mar", revenue: 6100, mrr: 5600, churn: 1.5 },
    { month: "Abr", revenue: 7200, mrr: 6800, churn: 1.2 },
    { month: "Mai", revenue: 8100, mrr: 7600, churn: 1.4 },
    { month: "Jun", revenue: 9200, mrr: 8800, churn: 0.9 }
  ];

  const planDistribution = [
    { name: "Gratuito", value: 65, color: "#8884d8" },
    { name: "Premium", value: 25, color: "#82ca9d" },
    { name: "Profissional", value: 10, color: "#ffc658" }
  ];

  const handlePlanChange = (plan: string, checked: boolean) => {
    if (plan === "all") {
      setSelectedPlans(checked ? ["all"] : []);
    } else {
      setSelectedPlans(prev => {
        const filtered = prev.filter(p => p !== "all");
        if (checked) {
          return [...filtered, plan];
        } else {
          return filtered.filter(p => p !== plan);
        }
      });
    }
  };

  const ReportFilters = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filtros do Relatório</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Período de:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "dd/MM/yyyy", { locale: ptBR }) : "Data Início"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Período até:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "dd/MM/yyyy", { locale: ptBR }) : "Data Fim"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Tipo de Relatório:</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usage">Uso da Plataforma</SelectItem>
                <SelectItem value="revenue">Financeiro</SelectItem>
                <SelectItem value="users">Usuários</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Planos:</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="all-plans"
                  checked={selectedPlans.includes("all")}
                  onCheckedChange={(checked) => handlePlanChange("all", checked as boolean)}
                />
                <Label htmlFor="all-plans">Todos os Planos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free-plan"
                  checked={selectedPlans.includes("free")}
                  onCheckedChange={(checked) => handlePlanChange("free", checked as boolean)}
                />
                <Label htmlFor="free-plan">Gratuito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="premium-plan"
                  checked={selectedPlans.includes("premium")}
                  onCheckedChange={(checked) => handlePlanChange("premium", checked as boolean)}
                />
                <Label htmlFor="premium-plan">Premium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="professional-plan"
                  checked={selectedPlans.includes("professional")}
                  onCheckedChange={(checked) => handlePlanChange("professional", checked as boolean)}
                />
                <Label htmlFor="professional-plan">Profissional</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            <Button variant="outline">Limpar Filtros</Button>
            <Button>Aplicar Filtros</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar Excel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Relatórios Personalizados
          </h1>
          <p className="text-muted-foreground">
            Gere relatórios detalhados sobre uso, receita e performance da plataforma
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="usage">Uso da Plataforma</TabsTrigger>
            <TabsTrigger value="financial">Relatório Financeiro</TabsTrigger>
            <TabsTrigger value="custom">Relatório Personalizado</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-green-500">+12% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 45.231</div>
                  <p className="text-xs text-green-500">+18% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Diagnósticos</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18,294</div>
                  <p className="text-xs text-green-500">+25% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.8%</div>
                  <p className="text-xs text-green-500">+3.2% em relação ao mês anterior</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Evolução de Usuários</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Plano</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={planDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {planDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <ReportFilters />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Diagnósticos por Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="diagnoses" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Crescimento de Usuários por Plano</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="premium" fill="#82ca9d" />
                      <Bar dataKey="professional" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <ReportFilters />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Evolução da Receita</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="mrr" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Taxa de Churn (%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="churn" stroke="#ff7300" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <ReportFilters />
            
            <Card>
              <CardHeader>
                <CardTitle>Configurar Relatório Personalizado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="report-name">Nome do Relatório</Label>
                    <Input id="report-name" placeholder="Ex: Relatório Mensal de Performance" />
                  </div>
                  <div>
                    <Label htmlFor="report-frequency">Frequência</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diário</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                        <SelectItem value="quarterly">Trimestral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Métricas a Incluir:</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {[
                      "Usuários Ativos",
                      "Novos Cadastros", 
                      "Receita",
                      "MRR",
                      "Churn Rate",
                      "Diagnósticos",
                      "Uso de Storage",
                      "Chamadas API"
                    ].map((metric) => (
                      <div key={metric} className="flex items-center space-x-2">
                        <Checkbox id={metric} />
                        <Label htmlFor={metric} className="text-sm">{metric}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Visualizar Preview</Button>
                  <Button>Salvar Relatório</Button>
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