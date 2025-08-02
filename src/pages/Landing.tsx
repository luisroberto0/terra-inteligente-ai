import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { 
  Leaf, 
  Brain, 
  BarChart3, 
  Users, 
  Upload, 
  Lightbulb, 
  CheckCircle,
  ArrowRight,
  Sprout,
  MapPin,
  TrendingUp
} from "lucide-react"
import { Link } from "react-router-dom"
import heroImage from "@/assets/hero-agriculture.jpg"

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="container relative z-10 px-4 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  <span className="text-primary">Diagnóstico Inteligente</span>{" "}
                  para Suas Culturas
                </h1>
                <p className="text-xl text-muted-foreground md:text-2xl">
                  Descubra o que está acontecendo com sua plantação em segundos 
                  com ajuda de IA.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="xl" variant="hero" className="w-full sm:w-auto">
                    Comece agora grátis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto">
                    Ver demonstração
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Campo agrícola com tecnologia" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-card">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Por que escolher o AgroInsight AI?
            </h2>
            <p className="text-xl text-muted-foreground">
              Tecnologia que transforma sua agricultura
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Sem precisar de agrônomo</CardTitle>
                <CardDescription>
                  Análises profissionais instantâneas direto no seu celular
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                  <BarChart3 className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>Dashboard intuitivo</CardTitle>
                <CardDescription>
                  Interface simples e clara, desenvolvida para produtores rurais
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <Lightbulb className="h-8 w-8 text-success" />
                </div>
                <CardTitle>Sugestões personalizadas</CardTitle>
                <CardDescription>
                  Recomendações específicas para sua região e tipo de cultivo
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Mockup Dashboard */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Veja como funciona na prática
            </h2>
            <p className="text-xl text-muted-foreground">
              Dashboard completo com insights em tempo real
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-card to-accent/20">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sprout className="h-5 w-5 text-success" />
                      Saúde da Cultura
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">92%</div>
                    <p className="text-sm text-muted-foreground">Boa condição geral</p>
                  </CardContent>
                </Card>
                
                <Card className="p-4">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-warning" />
                      Áreas de Atenção
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-warning">2</div>
                    <p className="text-sm text-muted-foreground">Necessitam cuidado</p>
                  </CardContent>
                </Card>
                
                <Card className="p-4">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Produtividade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">+15%</div>
                    <p className="text-sm text-muted-foreground">vs. safra anterior</p>
                  </CardContent>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 bg-card">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Como funciona
            </h2>
            <p className="text-xl text-muted-foreground">
              Apenas 3 passos para diagnosticar sua plantação
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                1
              </div>
              <div className="space-y-2">
                <Upload className="mx-auto h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold">Descreva o problema</h3>
                <p className="text-muted-foreground">
                  Conte para nossa IA o que você está observando na sua plantação
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-2xl font-bold">
                2
              </div>
              <div className="space-y-2">
                <Brain className="mx-auto h-8 w-8 text-secondary mb-4" />
                <h3 className="text-xl font-semibold">IA analisa</h3>
                <p className="text-muted-foreground">
                  Nossa inteligência artificial processa as informações em segundos
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success text-success-foreground text-2xl font-bold">
                3
              </div>
              <div className="space-y-2">
                <CheckCircle className="mx-auto h-8 w-8 text-success mb-4" />
                <h3 className="text-xl font-semibold">Receba o diagnóstico</h3>
                <p className="text-muted-foreground">
                  Obtenha recomendações personalizadas e plano de ação
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Pronto para revolucionar sua agricultura?
            </h2>
            <p className="text-xl text-muted-foreground">
              Junte-se a centenas de produtores que já usam o AgroInsight AI
            </p>
            <Link to="/register">
              <Button size="xl" variant="hero">
                Começar agora grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}