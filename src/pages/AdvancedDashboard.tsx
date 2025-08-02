import { useState } from "react"
import { 
  TrendingUp, 
  Droplets, 
  Thermometer, 
  AlertTriangle, 
  MapPin,
  BarChart3,
  Activity,
  Leaf
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { SidebarProvider } from "@/components/ui/sidebar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const productivityData = [
  { safra: '2020/21', milho: 4200, soja: 3100, sorgo: 2800 },
  { safra: '2021/22', milho: 4500, soja: 3400, sorgo: 3000 },
  { safra: '2022/23', milho: 4100, soja: 3200, sorgo: 2900 },
  { safra: '2023/24', milho: 4800, soja: 3600, sorgo: 3200 },
  { safra: '2024/25', milho: 5000, soja: 3800, sorgo: 3400 }
]

const cultureComparisonData = [
  { cultura: 'Milho', produtividade: 5000, viabilidade: 85 },
  { cultura: 'Soja', produtividade: 3800, viabilidade: 78 },
  { cultura: 'Sorgo', produtividade: 3400, viabilidade: 92 },
  { cultura: 'Feijão', produtividade: 1200, viabilidade: 65 }
]

const soilHealthData = [
  { name: 'Saudável', value: 65, color: 'hsl(var(--success))' },
  { name: 'Atenção', value: 25, color: 'hsl(var(--warning))' },
  { name: 'Crítico', value: 10, color: 'hsl(var(--destructive))' }
]

export const AdvancedDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('produtividade')

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          
          <main className="flex-1 overflow-auto bg-gradient-to-br from-background to-accent/20">
            <div className="container py-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Dashboard Avançado
                </h1>
                <p className="text-muted-foreground">
                  Análise completa da sua propriedade rural
                </p>
              </div>

              {/* KPIs principais */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Áreas em Atenção</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-warning">3.2 ha</div>
                    <p className="text-xs text-muted-foreground">
                      12% da propriedade
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Produtividade Atual</CardTitle>
                    <TrendingUp className="h-4 w-4 text-success" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">4.8 t/ha</div>
                    <p className="text-xs text-muted-foreground">
                      +15% vs ano anterior
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Viabilidade do Solo</CardTitle>
                    <Activity className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">84%</div>
                    <p className="text-xs text-muted-foreground">
                      Condição muito boa
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saúde da Cultura</CardTitle>
                    <Leaf className="h-4 w-4 text-success" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">91%</div>
                    <Progress value={91} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Gráfico de Produtividade por Safra */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Produtividade por Safra
                    </CardTitle>
                    <CardDescription>
                      Evolução da produtividade (kg/ha) nas últimas 5 safras
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={productivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="safra" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Line type="monotone" dataKey="milho" stroke="hsl(var(--primary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="soja" stroke="hsl(var(--secondary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="sorgo" stroke="hsl(var(--success))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Comparação entre Culturas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-secondary" />
                      Comparação entre Culturas
                    </CardTitle>
                    <CardDescription>
                      Produtividade e viabilidade por cultura
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={cultureComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="cultura" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Bar dataKey="produtividade" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Painel do Clima */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="h-5 w-5 text-warning" />
                      Condições Climáticas
                    </CardTitle>
                    <CardDescription>
                      Dados meteorológicos atuais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-warning" />
                        <span className="text-sm">Temperatura</span>
                      </div>
                      <span className="font-semibold">28°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-primary" />
                        <span className="text-sm">Umidade</span>
                      </div>
                      <span className="font-semibold">72%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-success" />
                        <span className="text-sm">Precipitação (7d)</span>
                      </div>
                      <span className="font-semibold">15mm</span>
                    </div>
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm text-primary font-medium">
                        ☀️ Previsão: Sol com nuvens nos próximos 3 dias
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Saúde do Solo (Pizza) */}
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição da Saúde do Solo</CardTitle>
                    <CardDescription>
                      Por área da propriedade
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={soilHealthData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {soilHealthData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                      {soilHealthData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Mapa Simulado */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-destructive" />
                      Mapa da Propriedade
                    </CardTitle>
                    <CardDescription>
                      Marcadores de atenção
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-success/20 to-primary/10 h-48 rounded-lg relative border-2 border-border">
                      {/* Simulação de mapa */}
                      <div className="absolute top-4 left-4 w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                      <div className="absolute top-12 right-8 w-3 h-3 bg-warning rounded-full animate-pulse"></div>
                      <div className="absolute bottom-8 left-1/3 w-3 h-3 bg-warning rounded-full animate-pulse"></div>
                      
                      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur p-2 rounded text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-destructive rounded-full"></div>
                          <span>Crítico (1)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-warning rounded-full"></div>
                          <span>Atenção (2)</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>📍 Área Total</span>
                        <span className="font-semibold">26.5 ha</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>🌽 Área Cultivada</span>
                        <span className="font-semibold">23.2 ha</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}