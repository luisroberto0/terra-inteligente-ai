import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, BarChart3, MapPin, Calendar, Award } from "lucide-react";

export function ExecutiveDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("12m");

  // Dados simulados para os gráficos
  const productivityData = [
    { month: "Jan", soja: 85, milho: 78, cafe: 92 },
    { month: "Fev", soja: 88, milho: 82, cafe: 89 },
    { month: "Mar", soja: 92, milho: 85, cafe: 94 },
    { month: "Abr", soja: 89, milho: 88, cafe: 91 },
    { month: "Mai", soja: 94, milho: 91, cafe: 96 },
    { month: "Jun", soja: 91, milho: 87, cafe: 93 },
    { month: "Jul", soja: 96, milho: 93, cafe: 98 },
    { month: "Ago", soja: 93, milho: 89, cafe: 95 },
    { month: "Set", soja: 97, milho: 94, cafe: 99 },
    { month: "Out", soja: 95, milho: 92, cafe: 97 },
    { month: "Nov", soja: 98, milho: 96, cafe: 100 },
    { month: "Dez", soja: 96, milho: 94, cafe: 98 }
  ];

  const roiData = [
    { cultura: "Café", roi: 285, investment: 45000, return: 128250 },
    { cultura: "Soja", roi: 198, investment: 32000, return: 63360 },
    { cultura: "Milho", roi: 156, investment: 28000, return: 43680 },
    { cultura: "Cana", roi: 134, investment: 52000, return: 69680 }
  ];

  const farmComparison = [
    { fazenda: "Fazenda Norte", area: 1200, produtividade: 94, receita: 1850000 },
    { fazenda: "Fazenda Sul", area: 980, produtividade: 87, receita: 1520000 },
    { fazenda: "Fazenda Oeste", area: 1450, produtividade: 91, receita: 2100000 },
    { fazenda: "Fazenda Leste", area: 760, produtividade: 89, receita: 1180000 }
  ];

  const financialPieData = [
    { name: "Café", value: 45, color: "#22c55e" },
    { name: "Soja", value: 28, color: "#84cc16" },
    { name: "Milho", value: 18, color: "#eab308" },
    { name: "Cana", value: 9, color: "#f97316" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Painel Executivo</h1>
            <p className="text-muted-foreground">Dashboard estratégico para tomada de decisão</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">Últimos 3 meses</SelectItem>
                <SelectItem value="6m">Últimos 6 meses</SelectItem>
                <SelectItem value="12m">Últimos 12 meses</SelectItem>
                <SelectItem value="24m">Últimos 2 anos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPIs Principais */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">R$ 6.65M</div>
              <p className="text-xs text-muted-foreground">
                +12.5% em relação ao período anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">193%</div>
              <p className="text-xs text-muted-foreground">
                +8.2% em relação ao período anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Área Total</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">4.390 ha</div>
              <p className="text-xs text-muted-foreground">
                Distribuídas em 4 fazendas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtividade</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">90.3%</div>
              <p className="text-xs text-muted-foreground">
                Média geral das culturas
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Evolução da Produtividade */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução da Produtividade por Cultura</CardTitle>
              <CardDescription>
                Performance mensal das principais culturas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']}
                    labelFormatter={(label) => `Mês: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cafe" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    name="Café"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="soja" 
                    stroke="#84cc16" 
                    strokeWidth={3}
                    name="Soja"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="milho" 
                    stroke="#eab308" 
                    strokeWidth={3}
                    name="Milho"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Distribuição de Receita */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Receita por Cultura</CardTitle>
              <CardDescription>
                Participação percentual na receita total
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={financialPieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {financialPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Participação']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ROI por Cultura */}
          <Card>
            <CardHeader>
              <CardTitle>ROI por Cultura</CardTitle>
              <CardDescription>
                Retorno sobre investimento detalhado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cultura" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'ROI']}
                  />
                  <Bar dataKey="roi" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Comparativo entre Fazendas */}
          <Card>
            <CardHeader>
              <CardTitle>Comparativo entre Fazendas</CardTitle>
              <CardDescription>
                Performance e métricas por propriedade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {farmComparison.map((farm, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{farm.fazenda}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{farm.area} ha</span>
                        <span>•</span>
                        <span>{farm.produtividade}% produtividade</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        R$ {(farm.receita / 1000000).toFixed(2)}M
                      </div>
                      <div className="text-sm text-muted-foreground">
                        R$ {Math.round(farm.receita / farm.area)}/ha
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}