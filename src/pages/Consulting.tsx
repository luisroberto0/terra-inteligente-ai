import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Clock, User, FileText, CheckCircle, AlertCircle, Calendar, CreditCard, ExternalLink, DollarSign } from "lucide-react";
import { toast } from "sonner";

export function Consulting() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [consultingType, setConsultingType] = useState("");
  const [urgency, setUrgency] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error("Arquivo muito grande. O limite é de 10MB.");
        return;
      }
      setSelectedFile(file);
      toast.success("Arquivo anexado com sucesso!");
    }
  };

  const handleSubmitRequest = () => {
    if (!consultingType) {
      toast.error("Por favor, selecione o tipo de consultoria.");
      return;
    }
    // Redirecionar para checkout/pagamento
    toast.success("Redirecionando para pagamento...");
    // Aqui seria implementada a integração com Stripe/gateway de pagamento
  };

  const getEstimatedPrice = (type: string) => {
    const prices = {
      "soil": "R$ 150 a R$ 300",
      "phytosanitary": "R$ 200 a R$ 400", 
      "planning": "R$ 300 a R$ 600",
      "irrigation": "R$ 400 a R$ 600",
      "complete": "R$ 500 a R$ 1.000",
      "nutrition": "R$ 200 a R$ 400"
    };
    return prices[type as keyof typeof prices] || "R$ 150 a R$ 600";
  };

  const consultingServices = [
    {
      title: "Análise de Solo",
      description: "Interpretação detalhada de laudos laboratoriais com recomendações específicas",
      icon: FileText,
      timeEstimate: "24-48h úteis",
      price: "R$ 150 a R$ 300"
    },
    {
      title: "Consultoria Fitossanitária", 
      description: "Identificação de pragas e doenças com plano de manejo integrado",
      icon: AlertCircle,
      timeEstimate: "24-48h úteis",
      price: "R$ 200 a R$ 400"
    },
    {
      title: "Planejamento Agrícola",
      description: "Estratégia completa para próxima safra baseada em dados históricos",
      icon: Calendar,
      timeEstimate: "48-72h úteis",
      price: "R$ 300 a R$ 600"
    },
    {
      title: "Otimização de Irrigação",
      description: "Análise do sistema de irrigação e recomendações de melhoria",
      icon: CheckCircle,
      timeEstimate: "48-72h úteis",
      price: "R$ 400 a R$ 600"
    },
    {
      title: "Consultoria Completa",
      description: "Análise abrangente de todos os aspectos da propriedade",
      icon: User,
      timeEstimate: "3-5 dias úteis",
      price: "R$ 500 a R$ 1.000"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Consultoria Especializada</h1>
            <Button variant="outline" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Ver Tabela de Preços
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">Acesso direto aos nossos especialistas agronômicos para análises personalizadas</p>
          
          {/* Aviso de Cobrança Avulsa */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">Serviço Avulso</span>
            </div>
            <p className="text-sm text-blue-800 mt-1">
              Este serviço é cobrado de forma avulsa e não está incluso em nenhum plano mensal.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Formulário de Solicitação */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Solicitar Análise Especializada
                </CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para receber uma consultoria personalizada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(11) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="property">Nome da Propriedade</Label>
                    <Input id="property" placeholder="Nome da fazenda" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="consulting-type">Tipo de Consultoria</Label>
                    <Select value={consultingType} onValueChange={setConsultingType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soil">Análise de Solo</SelectItem>
                        <SelectItem value="phytosanitary">Consultoria Fitossanitária</SelectItem>
                        <SelectItem value="planning">Planejamento Agrícola</SelectItem>
                        <SelectItem value="irrigation">Otimização de Irrigação</SelectItem>
                        <SelectItem value="complete">Consultoria Completa</SelectItem>
                        <SelectItem value="nutrition">Nutrição de Plantas</SelectItem>
                        <SelectItem value="other">Outro (especificar na descrição)</SelectItem>
                      </SelectContent>
                    </Select>
                    {consultingType && (
                      <div className="flex items-center gap-2 mt-2 p-2 bg-green-50 border border-green-200 rounded">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">
                          Valor estimado: {getEstimatedPrice(consultingType)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgência</Label>
                    <Select value={urgency} onValueChange={setUrgency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a urgência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa (até 72h)</SelectItem>
                        <SelectItem value="medium">Média (até 48h)</SelectItem>
                        <SelectItem value="high">Alta (até 24h)</SelectItem>
                        <SelectItem value="critical">Crítica (até 12h)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição do Problema</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhadamente o problema ou situação que precisa de análise especializada..."
                    className="min-h-[120px]"
                  />
                </div>

                {/* Upload de Arquivos */}
                <div className="space-y-2">
                  <Label>Anexar Documentos</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-foreground">
                            Clique para fazer upload ou arraste os arquivos
                          </span>
                          <span className="mt-1 block text-sm text-muted-foreground">
                            PDF, TXT, JPG, PNG até 10MB
                          </span>
                        </label>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.txt,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                        />
                      </div>
                    </div>
                  </div>
                  {selectedFile && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{selectedFile.name}</span>
                      <span>({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  )}
                </div>

                <Button onClick={handleSubmitRequest} className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Prosseguir para Pagamento
                </Button>
                
                {/* Informações sobre Pagamento */}
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-medium text-amber-900 mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Informações sobre Pagamento
                  </h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• O pagamento é realizado após a confirmação do especialista</li>
                    <li>• A consultoria será iniciada somente após o pagamento</li>
                    <li>• Taxa da plataforma: 15% sobre o valor total</li>
                    <li>• Cancelamentos em até 12h podem ser reembolsados</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com Informações */}
          <div className="space-y-6">
            {/* Tabela de Preços */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Preços e Prazos
                </CardTitle>
                <CardDescription>
                  Valores e tempo de resposta por tipo de consultoria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {consultingServices.map((service, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <service.icon className="h-4 w-4 text-primary" />
                      <h4 className="font-medium text-sm">{service.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-green-700">{service.price}</span>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.timeEstimate}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Informações de Contato */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Tempo de Resposta</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Até 48h úteis para análise completa
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Especialistas Qualificados</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Engenheiros agrônomos com experiência em campo
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Relatório Detalhado</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Análise completa com recomendações práticas
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contato Direto */}
            <Card>
              <CardHeader>
                <CardTitle>Contato Direto</CardTitle>
                <CardDescription>
                  Para casos urgentes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <strong>WhatsApp:</strong> (11) 9 8765-4321
                </div>
                <div className="text-sm">
                  <strong>E-mail:</strong> consultoria@agroinsight.ai
                </div>
                <div className="text-sm">
                  <strong>Horário:</strong> Seg-Sex, 8h às 18h
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}