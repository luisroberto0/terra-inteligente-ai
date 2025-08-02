import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  TrendingUp, 
  Droplets,
  Sun,
  ThermometerSun,
  CloudRain
} from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export const Dashboard = () => {
  const [description, setDescription] = useState("")
  const [diagnosis, setDiagnosis] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleDiagnosis = async () => {
    if (!description.trim()) return

    setIsLoading(true)
    
    // Simula chamada da API da IA
    setTimeout(() => {
      setDiagnosis({
        cause: "Deficiência de nitrogênio no solo",
        recommendation: "Aplicar fertilizante rico em nitrogênio (ureia) na dosagem de 150kg/ha",
        urgency: "Média",
        urgencyLevel: 2,
        newCrop: "Considere rotação com leguminosas (feijão ou soja) na próxima safra",
        soilViability: 75,
        climateData: {
          temperature: 26,
          humidity: 65,
          rainfall: 45
        }
      })
      setIsLoading(false)
    }, 3000)
  }

  const getUrgencyColor = (level: number) => {
    switch (level) {
      case 1: return "success"
      case 2: return "warning" 
      case 3: return "destructive"
      default: return "secondary"
    }
  }

  const getUrgencyIcon = (level: number) => {
    switch (level) {
      case 1: return <CheckCircle className="h-5 w-5" />
      case 2: return <AlertTriangle className="h-5 w-5" />
      case 3: return <AlertTriangle className="h-5 w-5" />
      default: return <CheckCircle className="h-5 w-5" />
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 space-y-8">
            {/* Input Principal */}
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Diagnóstico da Plantação</CardTitle>
                  <CardDescription>
                    Descreva o que você está observando na sua plantação para receber um diagnóstico personalizado
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição do problema ou observação</Label>
                    <Textarea
                      id="description"
                      placeholder="Ex: As folhas do milho estão ficando amareladas na parte inferior da planta, principalmente nas fileiras do centro do campo. Plantei há 45 dias e a irrigação está normal..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleDiagnosis}
                    disabled={!description.trim() || isLoading}
                    size="lg"
                    variant="hero"
                    className="w-full"
                  >
                    {isLoading ? "Analisando..." : "Gerar Diagnóstico"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Resultados do Diagnóstico */}
            {diagnosis && (
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {/* Possível Causa */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                        Possível Causa
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{diagnosis.cause}</p>
                    </CardContent>
                  </Card>

                  {/* Recomendação */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        Recomendação
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{diagnosis.recommendation}</p>
                    </CardContent>
                  </Card>

                  {/* Nível de Urgência */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getUrgencyIcon(diagnosis.urgencyLevel)}
                        Urgência
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant={getUrgencyColor(diagnosis.urgencyLevel)}>
                        {diagnosis.urgency}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-2">
                        {diagnosis.urgencyLevel === 1 && "Monitoramento regular"}
                        {diagnosis.urgencyLevel === 2 && "Ação em 1-2 semanas"}
                        {diagnosis.urgencyLevel === 3 && "Ação imediata necessária"}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Nova Cultura */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Sugestão
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{diagnosis.newCrop}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Gráficos e Análises */}
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Viabilidade do Solo */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Viabilidade do Solo
                      </CardTitle>
                      <CardDescription>
                        Condição geral para cultivo baseada na análise
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Qualidade geral</span>
                          <span className="font-medium">{diagnosis.soilViability}%</span>
                        </div>
                        <Progress value={diagnosis.soilViability} className="h-3" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {diagnosis.soilViability >= 80 && "Excelente condição para cultivo"}
                        {diagnosis.soilViability >= 60 && diagnosis.soilViability < 80 && "Boa condição, com pequenos ajustes"}
                        {diagnosis.soilViability < 60 && "Necessita melhorias significativas"}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Condições Climáticas */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sun className="h-5 w-5 text-warning" />
                        Condições Climáticas
                      </CardTitle>
                      <CardDescription>
                        Dados climáticos atuais da região
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-2">
                          <ThermometerSun className="h-6 w-6 mx-auto text-warning" />
                          <div className="text-2xl font-bold">{diagnosis.climateData.temperature}°C</div>
                          <div className="text-xs text-muted-foreground">Temperatura</div>
                        </div>
                        <div className="space-y-2">
                          <Droplets className="h-6 w-6 mx-auto text-primary" />
                          <div className="text-2xl font-bold">{diagnosis.climateData.humidity}%</div>
                          <div className="text-xs text-muted-foreground">Umidade</div>
                        </div>
                        <div className="space-y-2">
                          <CloudRain className="h-6 w-6 mx-auto text-secondary" />
                          <div className="text-2xl font-bold">{diagnosis.climateData.rainfall}mm</div>
                          <div className="text-xs text-muted-foreground">Chuva (7d)</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Botão Exportar */}
                <div className="flex justify-center">
                  <Button variant="outline" size="lg">
                    <FileText className="mr-2 h-4 w-4" />
                    Exportar PDF
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}