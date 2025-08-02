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
import { Upload, Clock, User, FileText, CheckCircle, AlertCircle, Calendar } from "lucide-react";
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
    toast.success("Solicitação enviada! Você receberá retorno em até 48h úteis.");
  };

  const consultingServices = [
    {
      title: "Análise de Solo Avançada",
      description: "Interpretação detalhada de laudos laboratoriais com recomendações específicas",
      icon: FileText,
      timeEstimate: "24-48h"
    },
    {
      title: "Planejamento de Safra",
      description: "Estratégia completa para próxima safra baseada em dados históricos",
      icon: Calendar,
      timeEstimate: "48-72h"
    },
    {
      title: "Diagnóstico Fitossanitário",
      description: "Identificação de pragas e doenças com plano de manejo integrado",
      icon: AlertCircle,
      timeEstimate: "24-48h"
    },
    {
      title: "Otimização de Irrigação",
      description: "Análise do sistema de irrigação e recomendações de melhoria",
      icon: CheckCircle,
      timeEstimate: "48-72h"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Consultoria Especializada</h1>
          <p className="text-muted-foreground">Acesso direto aos nossos especialistas agronômicos para análises personalizadas</p>
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
                        <SelectItem value="soil">Análise de Solo Avançada</SelectItem>
                        <SelectItem value="planning">Planejamento de Safra</SelectItem>
                        <SelectItem value="phytosanitary">Diagnóstico Fitossanitário</SelectItem>
                        <SelectItem value="irrigation">Otimização de Irrigação</SelectItem>
                        <SelectItem value="nutrition">Nutrição de Plantas</SelectItem>
                        <SelectItem value="other">Outro (especificar na descrição)</SelectItem>
                      </SelectContent>
                    </Select>
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
                  Enviar Solicitação
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com Informações */}
          <div className="space-y-6">
            {/* Serviços Disponíveis */}
            <Card>
              <CardHeader>
                <CardTitle>Serviços Disponíveis</CardTitle>
                <CardDescription>
                  Nossos especialistas podem ajudar com
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {consultingServices.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <service.icon className="h-4 w-4 text-primary" />
                      <h4 className="font-medium text-sm">{service.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.timeEstimate}
                    </Badge>
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