import { ArrowLeft, Target, Eye, Heart, Users, Leaf, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    name: "Dr. Carlos Silva",
    role: "CEO & Fundador",
    description: "Engenheiro Agrônomo com 15 anos de experiência em agricultura de precisão",
    icon: "👨‍🌾"
  },
  {
    name: "Ana Rodrigues",
    role: "CTO",
    description: "Especialista em IA e Machine Learning aplicado ao agronegócio",
    icon: "👩‍💻"
  },
  {
    name: "João Santos",
    role: "Head de Produto",
    description: "Designer de experiência focado em soluções para produtores rurais",
    icon: "👨‍💼"
  },
  {
    name: "Maria Oliveira",
    role: "Agrônoma Sênior",
    description: "Especialista em diagnóstico de culturas e manejo integrado",
    icon: "👩‍🔬"
  }
]

const values = [
  {
    icon: <Leaf className="h-8 w-8 text-success" />,
    title: "Sustentabilidade",
    description: "Promovemos práticas agrícolas sustentáveis que respeitam o meio ambiente e garantem produtividade a longo prazo."
  },
  {
    icon: <Zap className="h-8 w-8 text-warning" />,
    title: "Inovação",
    description: "Utilizamos tecnologia de ponta para democratizar o acesso à agricultura inteligente e soluções avançadas."
  },
  {
    icon: <Heart className="h-8 w-8 text-destructive" />,
    title: "Compromisso",
    description: "Nosso compromisso é com o sucesso dos produtores rurais, oferecendo suporte e soluções personalizadas."
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Comunidade",
    description: "Acreditamos na força da comunidade agrícola e no compartilhamento de conhecimento para o crescimento coletivo."
  }
]

export const About = () => {
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
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Sobre o AgroInsight AI
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Democratizando o acesso à agricultura inteligente através da tecnologia
            </p>
          </div>

          {/* Missão, Visão e História */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Nossa Missão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Democratizar o acesso à agricultura inteligente, fornecendo diagnósticos 
                  precisos e acessíveis para pequenos e médios produtores rurais através 
                  da inteligência artificial, promovendo sustentabilidade e produtividade.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-secondary" />
                  Nossa Visão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ser a principal plataforma de diagnóstico agrícola do Brasil, 
                  transformando a vida de milhares de produtores com tecnologia 
                  acessível e soluções inovadoras para uma agricultura mais 
                  inteligente e sustentável.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* História */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Nossa História</CardTitle>
              <CardDescription>
                Como nasceu o AgroInsight AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                O AgroInsight AI nasceu da percepção de que muitos pequenos e médios produtores 
                rurais enfrentam dificuldades para diagnosticar problemas em suas culturas, 
                muitas vezes tendo que esperar semanas por uma consulta agronômica ou 
                gastando recursos preciosos com visitas técnicas.
              </p>
              <p className="text-muted-foreground">
                Em 2023, nossa equipe de engenheiros agrônomos e especialistas em IA 
                se uniu com o objetivo de criar uma solução que democratizasse o acesso 
                a diagnósticos agrícolas de qualidade, usando tecnologia de ponta para 
                tornar a agricultura mais inteligente e acessível.
              </p>
              <p className="text-muted-foreground">
                Hoje, já ajudamos centenas de produtores a identificar problemas, 
                otimizar sua produção e tomar decisões mais assertivas, contribuindo 
                para uma agricultura mais sustentável e produtiva.
              </p>
            </CardContent>
          </Card>

          {/* Valores */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Nossos Valores</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {value.icon}
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Nosso Time</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{member.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          {member.role}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Compromisso com a Agricultura */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">Compromisso com a Agricultura Brasileira</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Acreditamos que a tecnologia deve estar a serviço do campo, 
                facilitando o dia a dia dos produtores e contribuindo para 
                uma agricultura mais eficiente e sustentável.
              </p>
              <p className="text-muted-foreground">
                Nosso compromisso vai além da tecnologia: trabalhamos constantemente 
                para entender as necessidades reais dos produtores e desenvolver 
                soluções que realmente façam a diferença no campo.
              </p>
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-primary mb-3">🌱 Nosso Impacto</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-bold text-lg text-primary">500+</div>
                    <div className="text-muted-foreground">Produtores atendidos</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-success">15.000+</div>
                    <div className="text-muted-foreground">Diagnósticos realizados</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-secondary">85%</div>
                    <div className="text-muted-foreground">Taxa de precisão</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              Pronto para revolucionar sua agricultura?
            </h3>
            <p className="text-muted-foreground mb-6">
              Junte-se a centenas de produtores que já confiam no AgroInsight AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-light">
                  Começar agora grátis
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Falar conosco
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}