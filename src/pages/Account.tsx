import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Building, 
  Crown, 
  Settings, 
  LogOut,
  MapPin,
  Sprout,
  Mail,
  Calendar
} from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export const Account = () => {
  const userData = {
    fullName: "João Silva",
    email: "joao.silva@email.com",
    farmName: "Fazenda São João",
    location: "São Paulo, SP",
    cropType: "Soja e Milho",
    farmSize: "150",
    joinDate: "Janeiro 2024",
    plan: "Gratuito"
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Configurações da Conta</h1>
                <p className="text-muted-foreground">
                  Gerencie suas informações pessoais e configurações da propriedade
                </p>
              </div>

              {/* Informações do Usuário */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Perfil do Usuário
                  </CardTitle>
                  <CardDescription>
                    Suas informações pessoais e de contato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        {getInitials(userData.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{userData.fullName}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {userData.plan}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Membro desde {userData.joinDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome completo</Label>
                      <Input
                        id="fullName"
                        defaultValue={userData.fullName}
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          defaultValue={userData.email}
                          className="pl-10"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informações da Propriedade */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Informações da Propriedade
                  </CardTitle>
                  <CardDescription>
                    Dados da sua fazenda e cultivos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="farmName">Nome da fazenda</Label>
                      <Input
                        id="farmName"
                        defaultValue={userData.farmName}
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="farmSize">Tamanho da propriedade (ha)</Label>
                      <Input
                        id="farmSize"
                        type="number"
                        defaultValue={userData.farmSize}
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">Localização</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          defaultValue={userData.location}
                          className="pl-10"
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cropType">Tipo de cultivo principal</Label>
                      <div className="relative">
                        <Sprout className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="cropType"
                          defaultValue={userData.cropType}
                          className="pl-10"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferências */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Preferências
                  </CardTitle>
                  <CardDescription>
                    Configure suas preferências do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select defaultValue="pt-BR">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Plano Premium */}
              <Card className="border-2 border-warning">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-warning" />
                    Plano Premium
                  </CardTitle>
                  <CardDescription>
                    Desbloqueie recursos avançados com o plano Premium
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center p-4 bg-accent/50 rounded-lg">
                      <div className="text-2xl font-bold text-warning mb-2">∞</div>
                      <div className="font-medium">Diagnósticos ilimitados</div>
                      <div className="text-xs text-muted-foreground">Sem limite mensal</div>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4 bg-accent/50 rounded-lg">
                      <div className="text-2xl font-bold text-warning mb-2">24/7</div>
                      <div className="font-medium">Suporte prioritário</div>
                      <div className="text-xs text-muted-foreground">Atendimento especializado</div>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4 bg-accent/50 rounded-lg">
                      <div className="text-2xl font-bold text-warning mb-2">AI+</div>
                      <div className="font-medium">IA Avançada</div>
                      <div className="text-xs text-muted-foreground">Análises mais precisas</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="warning" size="lg" className="px-8">
                      <Crown className="mr-2 h-4 w-4" />
                      Assinar Premium - R$ 29,90/mês
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Ações da Conta */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações da Conta</CardTitle>
                  <CardDescription>
                    Gerencie sua conta e dados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="flex-1">
                      Editar Informações
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Baixar Dados
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => window.location.href = "/"}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair da Conta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}