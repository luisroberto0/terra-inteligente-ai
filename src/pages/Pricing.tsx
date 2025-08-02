import { ArrowLeft, Check, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Para começar a conhecer o AgroInsight AI",
    features: [
      "3 diagnósticos por mês",
      "Análise básica de culturas",
      "Relatórios simples",
      "Suporte por email"
    ],
    limitations: [
      "Sem IA avançada",
      "Sem exportação PDF",
      "Suporte limitado"
    ],
    buttonText: "Começar grátis",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Premium",
    price: "R$ 29,90",
    period: "/mês",
    description: "Para produtores que querem maximizar sua produtividade",
    features: [
      "Diagnósticos ilimitados",
      "IA avançada com recomendações",
      "Gráficos e análises detalhadas",
      "Exportação em PDF",
      "Histórico completo",
      "Suporte prioritário",
      "Alertas por WhatsApp",
      "Análise climática"
    ],
    limitations: [],
    buttonText: "Assinar agora",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Profissional",
    price: "R$ 89,90",
    period: "/mês",
    description: "Para cooperativas e grandes produtores",
    features: [
      "Tudo do Premium",
      "Múltiplas fazendas (até 10)",
      "Acesso em equipe (até 5 usuários)",
      "API para integração",
      "Relatórios personalizados",
      "Consultoria especializada",
      "Suporte 24/7",
      "Análise de viabilidade econômica",
      "Dashboard executivo"
    ],
    limitations: [],
    buttonText: "Falar com vendas",
    buttonVariant: "outline" as const,
    popular: false
  }
]

export const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30">
      <div className="container py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o início
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Planos e Preços
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Escolha o plano ideal para sua propriedade rural
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-primary font-medium">
                🎉 Primeira semana grátis em todos os planos pagos
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-xs text-muted-foreground font-medium mb-2">Limitações:</p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="text-xs text-muted-foreground">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Button 
                    variant={plan.buttonVariant} 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-primary-light' : ''}`}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Seção */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Perguntas Frequentes</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Posso mudar de plano a qualquer momento?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                    As mudanças entram em vigor no próximo ciclo de cobrança.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Como funciona a garantia?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oferecemos garantia de 30 dias. Se não ficar satisfeito, devolvemos 100% do valor pago.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">O que são "diagnósticos ilimitados"?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No plano Premium e Profissional, você pode fazer quantas análises quiser, 
                    sem limite mensal de diagnósticos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preciso de conhecimento técnico para usar?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Não! O AgroInsight AI foi desenvolvido para ser intuitivo e fácil de usar. 
                    Basta descrever o que está observando na sua cultura em linguagem simples.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Ainda tem dúvidas sobre qual plano escolher?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe está pronta para ajudar você a encontrar a melhor solução
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Falar com especialista
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="default" size="lg">
                  Ver demonstração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}