import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Calendar, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  FileText
} from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

const mockHistory = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Folhas amareladas na plantação de milho",
    cause: "Deficiência de nitrogênio",
    urgency: "Média",
    urgencyLevel: 2,
    recommendation: "Aplicar fertilizante nitrogenado"
  },
  {
    id: 2,
    date: "2024-01-10", 
    description: "Manchas escuras nas folhas de soja",
    cause: "Ferrugem asiática",
    urgency: "Alta",
    urgencyLevel: 3,
    recommendation: "Aplicação imediata de fungicida"
  },
  {
    id: 3,
    date: "2024-01-05",
    description: "Crescimento lento da cultura de café",
    cause: "pH do solo inadequado",
    urgency: "Baixa",
    urgencyLevel: 1,
    recommendation: "Correção do pH com calcário"
  },
  {
    id: 4,
    date: "2024-01-02",
    description: "Pragas nas folhas de tomate",
    cause: "Ataque de pulgões",
    urgency: "Média",
    urgencyLevel: 2,
    recommendation: "Aplicar inseticida biológico"
  }
]

export const History = () => {
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
      case 1: return <CheckCircle className="h-4 w-4" />
      case 2: return <Clock className="h-4 w-4" />
      case 3: return <AlertTriangle className="h-4 w-4" />
      default: return <CheckCircle className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Histórico de Diagnósticos</h1>
                  <p className="text-muted-foreground">
                    Visualize todos os diagnósticos realizados na sua propriedade
                  </p>
                </div>
                
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar Relatório
                </Button>
              </div>

              <div className="grid gap-4">
                {mockHistory.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {formatDate(item.date)}
                            </span>
                            <Badge variant={getUrgencyColor(item.urgencyLevel) as any} className="flex items-center gap-1">
                              {getUrgencyIcon(item.urgencyLevel)}
                              {item.urgency}
                            </Badge>
                          </div>
                          
                          <h3 className="font-semibold text-lg">{item.description}</h3>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-muted-foreground">Causa identificada:</span>
                              <p className="mt-1">{item.cause}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Recomendação:</span>
                              <p className="mt-1">{item.recommendation}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalhes
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Diagnóstico Detalhado</DialogTitle>
                              <DialogDescription>
                                {formatDate(item.date)} - Relatório completo
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              <div className="grid gap-4">
                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                      <AlertTriangle className="h-5 w-5 text-warning" />
                                      Problema Identificado
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p>{item.description}</p>
                                  </CardContent>
                                </Card>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                  <Card>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-primary" />
                                        Causa Raiz
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p>{item.cause}</p>
                                    </CardContent>
                                  </Card>
                                  
                                  <Card>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-success" />
                                        Solução Recomendada
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p>{item.recommendation}</p>
                                    </CardContent>
                                  </Card>
                                </div>
                                
                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Nível de Urgência</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex items-center gap-2">
                                      <Badge variant={getUrgencyColor(item.urgencyLevel) as any} className="flex items-center gap-1">
                                        {getUrgencyIcon(item.urgencyLevel)}
                                        {item.urgency}
                                      </Badge>
                                      <span className="text-sm text-muted-foreground">
                                        {item.urgencyLevel === 1 && "Ação pode ser planejada"}
                                        {item.urgencyLevel === 2 && "Ação recomendada em 1-2 semanas"}
                                        {item.urgencyLevel === 3 && "Ação imediata necessária"}
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                              
                              <div className="flex justify-end gap-2">
                                <Button variant="outline">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Exportar PDF
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {mockHistory.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                  <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                    <h3 className="text-lg font-semibold mb-2">Nenhum diagnóstico ainda</h3>
                    <p className="text-muted-foreground mb-4">
                      Faça seu primeiro diagnóstico para começar a acompanhar o histórico
                    </p>
                    <Button>Fazer Diagnóstico</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}