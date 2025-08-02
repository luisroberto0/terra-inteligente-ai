import { ArrowLeft, Mail, Phone, Clock, MessageSquare, HelpCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const faqs = [
  {
    question: "Como funciona o diagnóstico por IA?",
    answer: "Você descreve o problema da sua cultura em linguagem simples, nossa IA analisa as informações e fornece diagnóstico com possíveis causas e recomendações personalizadas."
  },
  {
    question: "Preciso ser especialista para usar?",
    answer: "Não! O AgroInsight foi desenvolvido para ser simples. Basta descrever o que você está vendo na sua plantação usando suas próprias palavras."
  },
  {
    question: "Qual a precisão dos diagnósticos?",
    answer: "Nossa IA tem precisão de 85% baseada em milhares de casos. Sempre recomendamos confirmar diagnósticos críticos com agrônomo local."
  },
  {
    question: "Posso cancelar minha assinatura quando quiser?",
    answer: "Sim! Você pode cancelar a qualquer momento sem multas. O acesso continua até o final do período já pago."
  },
  {
    question: "Vocês atendem todas as regiões do Brasil?",
    answer: "Sim, atendemos todo o território nacional. Nossa IA é treinada com dados de diferentes regiões e tipos de clima do Brasil."
  }
]

export const Contact = () => {
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
              Fale Conosco
            </h1>
            <p className="text-muted-foreground text-lg">
              Estamos aqui para ajudar você a ter sucesso na sua agricultura
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulário de Contato */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Envie uma Mensagem
                  </CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e nossa equipe entrará em contato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o assunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Suporte técnico</SelectItem>
                        <SelectItem value="sales">Informações sobre planos</SelectItem>
                        <SelectItem value="billing">Questões de cobrança</SelectItem>
                        <SelectItem value="partnership">Parcerias</SelectItem>
                        <SelectItem value="feedback">Feedback/Sugestões</SelectItem>
                        <SelectItem value="other">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Descreva sua dúvida, problema ou sugestão..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-light">
                    Enviar mensagem
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Responderemos em até 24 horas durante dias úteis
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-6">
              {/* Contato Direto */}
              <Card>
                <CardHeader>
                  <CardTitle>Contato Direto</CardTitle>
                  <CardDescription>
                    Prefere falar diretamente? Use um dos canais abaixo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-success/5 rounded-lg border border-success/20">
                    <Phone className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-success">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">Preferencial</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-primary">E-mail de Suporte</p>
                      <p className="text-sm text-muted-foreground">suporte@agroinsight.ai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                    <Clock className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="font-medium text-secondary">Horário de Atendimento</p>
                      <p className="text-sm text-muted-foreground">
                        Segunda à Sexta: 8h às 18h<br />
                        Sábado: 8h às 12h
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tempo de Resposta */}
              <Card>
                <CardHeader>
                  <CardTitle>Tempo de Resposta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">WhatsApp</span>
                    <Badge variant="outline" className="text-success border-success">
                      15 min (horário comercial)
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">E-mail</span>
                    <Badge variant="outline" className="text-primary border-primary">
                      24h (dias úteis)
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Formulário</span>
                    <Badge variant="outline" className="text-secondary border-secondary">
                      24h (dias úteis)
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Planos Premium */}
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-primary text-primary-foreground">Premium</Badge>
                    Suporte Prioritário
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Clientes Premium e Profissional têm atendimento prioritário com 
                    resposta em até 1 hora durante horário comercial.
                  </p>
                  <Link to="/pricing">
                    <Button variant="outline" size="sm">
                      Ver planos
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              Perguntas Frequentes
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Ainda não encontrou o que procura?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nossa central de ajuda tem mais informações e tutoriais detalhados
            </p>
            <Button variant="outline" size="lg">
              Acessar Central de Ajuda
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}