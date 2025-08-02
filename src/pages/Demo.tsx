import { ArrowLeft, Gauge, TrendingUp, Droplets, AlertTriangle } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export const Demo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30">
      <div className="container py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o início
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Demonstração do AgroInsight AI
            </h1>
            <p className="text-muted-foreground text-lg">
              Veja como nossa IA analisa e diagnostica problemas em sua cultura
            </p>
          </div>

          {/* Problema Simulado */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                Descrição do Problema (Simulado)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-foreground">
                  "Minhas plantas de milho estão com folhas amareladas na parte inferior, 
                  começando a se espalhar para cima. O solo parece mais seco que o normal 
                  e algumas plantas estão menores que as outras. Plantei há 45 dias e 
                  tem chovido pouco na região."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Viabilidade do Solo */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                Viabilidade do Solo
              </CardTitle>
              <CardDescription>
                Análise baseada nas condições descritas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Viabilidade Geral</span>
                  <span className="text-2xl font-bold text-warning">72%</span>
                </div>
                <Progress value={72} className="h-3" />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">pH</div>
                    <div className="font-semibold text-success">6.5</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Umidade</div>
                    <div className="font-semibold text-warning">45%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Nutrientes</div>
                    <div className="font-semibold text-success">Bom</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cards de Diagnóstico */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Causa Provável
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-3">
                  <strong>Deficiência de Nitrogênio + Estresse Hídrico</strong>
                </p>
                <p className="text-muted-foreground text-sm">
                  As folhas amareladas começando pela parte inferior indicam falta de nitrogênio, 
                  agravada pela baixa umidade do solo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-warning" />
                  Nível de Urgência
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="destructive">Médio-Alto</Badge>
                  <span className="text-2xl">⚠️</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Ação necessária nos próximos 7-10 dias para evitar perdas significativas na produtividade.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recomendações */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recomendações da IA</CardTitle>
              <CardDescription>
                Ações sugeridas para resolver o problema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">1. Irrigação Imediata</h4>
                  <p className="text-sm text-muted-foreground">
                    Aplicar 25-30mm de água por irrigação, 2x por semana até normalizar.
                  </p>
                </div>
                <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                  <h4 className="font-semibold text-secondary mb-2">2. Adubação Nitrogenada</h4>
                  <p className="text-sm text-muted-foreground">
                    Aplicar ureia (45% N) - 150kg/ha em cobertura, próximo às raízes.
                  </p>
                </div>
                <div className="bg-success/5 p-4 rounded-lg border border-success/20">
                  <h4 className="font-semibold text-success mb-2">3. Monitoramento</h4>
                  <p className="text-sm text-muted-foreground">
                    Acompanhar evolução das folhas nos próximos 15 dias.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sugestão de Nova Cultura */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sugestão de Cultura Alternativa</CardTitle>
              <CardDescription>
                Para próximas safras ou rotação de culturas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">🌱 Sorgo Granífero</h4>
                <p className="text-muted-foreground mb-3">
                  Baseado no perfil do seu solo e clima da região, o sorgo seria uma excelente 
                  opção por sua resistência à seca e menor exigência nutricional.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">Resistente à seca</Badge>
                  <Badge variant="outline">Menos insumos</Badge>
                  <Badge variant="outline">Boa rentabilidade</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              Pronto para ter diagnósticos assim para sua propriedade?
            </h3>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-light hover:opacity-90">
                Comece agora grátis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}