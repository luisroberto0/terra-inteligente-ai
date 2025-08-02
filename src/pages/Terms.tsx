import { ArrowLeft, FileText } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"

export const Terms = () => {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30">
      <div className="container py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('legal.backToHome')}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                {t('legal.termsTitle')}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {t('legal.lastUpdated')}: Janeiro de 2024
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Aceitação dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Ao acessar e utilizar a plataforma AgroInsight AI, você concorda em cumprir e estar 
                  vinculado aos presentes Termos de Uso. Se você não concordar com qualquer parte 
                  destes termos, não deve utilizar nossos serviços.
                </p>
                <p className="text-muted-foreground">
                  Estes termos se aplicam a todos os usuários da plataforma, incluindo visitantes, 
                  usuários registrados e assinantes de planos pagos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Descrição do Serviço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  O AgroInsight AI é uma plataforma SaaS que oferece diagnósticos agrícolas através 
                  de inteligência artificial, fornecendo análises, recomendações e insights para 
                  produtores rurais.
                </p>
                <p className="text-muted-foreground">
                  Nossos serviços incluem, mas não se limitam a:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Diagnóstico automático de problemas em culturas</li>
                  <li>Recomendações personalizadas baseadas em IA</li>
                  <li>Dashboard com métricas e análises</li>
                  <li>Histórico de diagnósticos e relatórios</li>
                  <li>Suporte técnico especializado</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Registro e Responsabilidades do Usuário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Para utilizar nossos serviços, você deve:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Fornecer informações precisas e atualizadas durante o registro</li>
                  <li>Manter a confidencialidade de suas credenciais de acesso</li>
                  <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta</li>
                  <li>Ser responsável por todas as atividades realizadas em sua conta</li>
                  <li>Usar os serviços apenas para fins legítimos e agronômicos</li>
                </ul>
                <p className="text-muted-foreground">
                  Você é responsável por manter suas informações de conta atualizadas e por 
                  todas as consequências resultantes de informações imprecisas ou desatualizadas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Uso da Inteligência Artificial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Nossa plataforma utiliza algoritmos de inteligência artificial para fornecer 
                  diagnósticos e recomendações. É importante entender que:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Os diagnósticos são baseados nas informações fornecidas pelo usuário</li>
                  <li>A precisão pode variar dependendo da qualidade e completude dos dados</li>
                  <li>As recomendações são sugestões e não substituem consulta profissional</li>
                  <li>Sempre consulte um agrônomo para confirmação de diagnósticos críticos</li>
                  <li>Não nos responsabilizamos por decisões baseadas exclusivamente na IA</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Planos e Pagamentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Oferecemos diferentes planos de serviço com funcionalidades variadas:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Plano Gratuito: limitado a 3 diagnósticos mensais</li>
                  <li>Planos Pagos: cobrança recorrente mensal conforme plano escolhido</li>
                  <li>Upgrades/downgrades entram em vigor no próximo ciclo de cobrança</li>
                  <li>Não há reembolso proporcional para downgrades dentro do ciclo atual</li>
                </ul>
                <p className="text-muted-foreground">
                  Os preços podem ser alterados mediante aviso prévio de 30 dias aos usuários ativos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cancelamento e Encerramento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Você pode cancelar sua assinatura a qualquer momento:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>O cancelamento não gera multas ou taxas adicionais</li>
                  <li>O acesso aos serviços pagos continua até o final do período pago</li>
                  <li>Após o vencimento, a conta retorna automaticamente ao plano gratuito</li>
                  <li>Dados podem ser mantidos conforme nossa Política de Privacidade</li>
                </ul>
                <p className="text-muted-foreground">
                  Reservamos o direito de encerrar contas que violem estes termos, mediante 
                  notificação prévia quando possível.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Limitações de Responsabilidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  O AgroInsight AI é fornecido "como está" e "conforme disponível". 
                  Não garantimos que:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Os serviços atenderão suas necessidades específicas</li>
                  <li>Os diagnósticos serão 100% precisos em todos os casos</li>
                  <li>A plataforma estará disponível ininterruptamente</li>
                  <li>Todos os erros serão corrigidos imediatamente</li>
                </ul>
                <p className="text-muted-foreground">
                  Nossa responsabilidade máxima será limitada ao valor pago pelos serviços 
                  nos últimos 12 meses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Propriedade Intelectual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Todo o conteúdo da plataforma, incluindo algoritmos, interface, textos, 
                  gráficos e marca, são propriedade da AgroInsight AI ou de nossos licenciadores.
                </p>
                <p className="text-muted-foreground">
                  Os dados que você insere na plataforma permanecem de sua propriedade, 
                  mas você nos concede licença para processá-los conforme necessário para 
                  fornecer nossos serviços.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Alterações nos Termos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Reservamos o direito de modificar estes Termos de Uso a qualquer momento. 
                  Alterações significativas serão notificadas através de:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>E-mail para usuários registrados</li>
                  <li>Notificação na plataforma</li>
                  <li>Atualização da data de "última modificação"</li>
                </ul>
                <p className="text-muted-foreground">
                  O uso continuado da plataforma após as alterações constitui aceitação 
                  dos novos termos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Lei Aplicável e Foro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa 
                  relacionada a estes termos será resolvida no foro da comarca de São Paulo/SP, 
                  com exclusão de qualquer outro, por mais privilegiado que seja.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Contato</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Para dúvidas sobre estes Termos de Uso, entre em contato conosco através de:
                </p>
                <div className="mt-3 space-y-1 text-muted-foreground">
                  <p>E-mail: legal@agroinsight.ai</p>
                  <p>WhatsApp: (11) 99999-9999</p>
                  <p>Endereço: São Paulo, SP - Brasil</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Ao utilizar o AgroInsight AI, você confirma que leu, compreendeu e concorda 
              com estes Termos de Uso.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}