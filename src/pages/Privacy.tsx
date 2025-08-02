import { ArrowLeft, Shield } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const Privacy = () => {
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
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                Política de Privacidade
              </h1>
            </div>
            <p className="text-muted-foreground">
              Última atualização: Janeiro de 2024
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compromisso com sua Privacidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A AgroInsight AI está comprometida em proteger e respeitar sua privacidade. 
                  Esta Política de Privacidade explica como coletamos, usamos, armazenamos e 
                  protegemos suas informações pessoais em conformidade com a Lei Geral de 
                  Proteção de Dados (LGPD) e melhores práticas de segurança.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>1. Dados Coletados</CardTitle>
                <CardDescription>
                  Informações que coletamos quando você usa nossa plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Dados de Identificação:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Nome completo</li>
                    <li>E-mail</li>
                    <li>Telefone (quando fornecido)</li>
                    <li>Nome da fazenda/propriedade</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Dados da Propriedade:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Localização (estado e cidade)</li>
                    <li>Tipo de cultivo</li>
                    <li>Tamanho da propriedade</li>
                    <li>Descrições de problemas e diagnósticos</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Dados Técnicos:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Endereço IP</li>
                    <li>Informações do navegador</li>
                    <li>Dados de uso da plataforma</li>
                    <li>Cookies e tecnologias similares</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Finalidade do Tratamento</CardTitle>
                <CardDescription>
                  Como usamos suas informações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Utilizamos seus dados pessoais para as seguintes finalidades:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><strong>Prestação de serviços:</strong> Fornecer diagnósticos e recomendações através da IA</li>
                  <li><strong>Melhoria da plataforma:</strong> Aprimorar algoritmos e funcionalidades</li>
                  <li><strong>Comunicação:</strong> Enviar notificações, atualizações e suporte</li>
                  <li><strong>Cobrança:</strong> Processar pagamentos e emitir faturas</li>
                  <li><strong>Segurança:</strong> Proteger a plataforma contra fraudes e abusos</li>
                  <li><strong>Cumprimento legal:</strong> Atender obrigações legais e regulamentares</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Base Legal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  O tratamento de seus dados pessoais é baseado nas seguintes bases legais da LGPD:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><strong>Execução de contrato:</strong> Para cumprimento dos Termos de Uso</li>
                  <li><strong>Consentimento:</strong> Para comunicações de marketing (quando aplicável)</li>
                  <li><strong>Legítimo interesse:</strong> Para melhoria dos serviços e segurança</li>
                  <li><strong>Cumprimento de obrigação legal:</strong> Para atendimento de requisitos fiscais e legais</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Compartilhamento de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Seus dados pessoais podem ser compartilhados nas seguintes situações:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><strong>Prestadores de serviços:</strong> Parceiros que nos auxiliam na prestação de serviços (processamento de pagamento, hospedagem)</li>
                  <li><strong>Cumprimento legal:</strong> Quando exigido por lei ou ordem judicial</li>
                  <li><strong>Proteção de direitos:</strong> Para proteger nossos direitos, propriedade ou segurança</li>
                  <li><strong>Consentimento:</strong> Com seu consentimento expresso para finalidades específicas</li>
                </ul>
                <p className="text-muted-foreground">
                  <strong>Nunca vendemos seus dados pessoais</strong> para terceiros para fins comerciais.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Segurança dos Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Criptografia de dados em trânsito e em repouso</li>
                  <li>Controles de acesso rigorosos</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Backups seguros e redundantes</li>
                  <li>Treinamento regular de nossa equipe</li>
                  <li>Auditoria e testes de segurança periódicos</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Retenção de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><strong>Dados de conta:</strong> Enquanto sua conta estiver ativa</li>
                  <li><strong>Dados de diagnóstico:</strong> Por até 5 anos após a exclusão da conta</li>
                  <li><strong>Dados de cobrança:</strong> Conforme exigido pela legislação fiscal</li>
                  <li><strong>Dados de segurança:</strong> Por até 2 anos para fins de auditoria</li>
                </ul>
                <p className="text-muted-foreground">
                  Após os períodos de retenção, os dados são anonimizados ou excluídos permanentemente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Seus Direitos</CardTitle>
                <CardDescription>
                  De acordo com a LGPD, você tem os seguintes direitos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
                  <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li><strong>Anonimização ou exclusão:</strong> Solicitar anonimização ou exclusão de dados desnecessários</li>
                  <li><strong>Portabilidade:</strong> Solicitar a portabilidade de seus dados para outro fornecedor</li>
                  <li><strong>Eliminação:</strong> Solicitar a eliminação de dados tratados com base no consentimento</li>
                  <li><strong>Revogação do consentimento:</strong> Retirar consentimento a qualquer momento</li>
                  <li><strong>Oposição:</strong> Se opor ao tratamento baseado em legítimo interesse</li>
                </ul>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary font-medium">
                    Para exercer seus direitos, entre em contato conosco através de privacidade@agroinsight.ai
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Cookies e Tecnologias Similares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Utilizamos cookies e tecnologias similares para:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Manter você logado na plataforma</li>
                  <li>Lembrar suas preferências</li>
                  <li>Analisar o uso da plataforma</li>
                  <li>Melhorar a experiência do usuário</li>
                </ul>
                <p className="text-muted-foreground">
                  Você pode gerenciar cookies através das configurações do seu navegador.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Transferência Internacional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Seus dados podem ser transferidos e processados em servidores localizados fora do Brasil, 
                  sempre com garantias adequadas de proteção conforme a LGPD. Utilizamos apenas 
                  prestadores de serviços que atendem padrões internacionais de segurança.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Menores de Idade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nossos serviços não são direcionados a menores de 18 anos. Não coletamos 
                  intencionalmente dados pessoais de menores. Se tomarmos conhecimento de que 
                  coletamos dados de um menor, tomaremos medidas para excluir essas informações.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Alterações na Política</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos 
                  sobre alterações significativas através de e-mail ou notificação na plataforma. 
                  Recomendamos revisar esta política regularmente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Contato e Encarregado de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Para questões relacionadas à privacidade e proteção de dados:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Encarregado de Dados (DPO):</strong> Maria Silva</p>
                  <p><strong>E-mail:</strong> privacidade@agroinsight.ai</p>
                  <p><strong>Telefone:</strong> (11) 99999-9999</p>
                  <p><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
                </div>
                <div className="mt-4 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                  <p className="text-sm text-secondary font-medium">
                    Você também pode registrar uma reclamação junto à Autoridade Nacional 
                    de Proteção de Dados (ANPD) caso considere que seus direitos não foram respeitados.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Esta Política de Privacidade foi atualizada em Janeiro de 2024 e está em conformidade 
              com a Lei Geral de Proteção de Dados (LGPD) brasileira.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}