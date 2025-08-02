import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  Eye, 
  Upload, 
  Send,
  Calendar,
  User,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

export const ConsultantDashboard = () => {
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [observations, setObservations] = useState("");
  const { toast } = useToast();

  const consultations = [
    {
      id: 1,
      client: "João Silva",
      type: "Análise de Solo",
      description: "Análise nutricional do solo para plantio de soja",
      status: "nova",
      value: "R$ 250,00",
      requestDate: "2024-01-15",
      location: "Fazenda Santa Clara - Goiás",
      details: "Solo argiloso com histórico de baixa produtividade. Cliente relata problemas de drenagem."
    },
    {
      id: 2,
      client: "Maria Santos",
      type: "Consultoria Fitossanitária",
      description: "Diagnóstico de pragas em cultura de milho",
      status: "andamento",
      value: "R$ 350,00",
      requestDate: "2024-01-12",
      location: "Sítio Boa Vista - Minas Gerais",
      details: "Presença de lagarta do cartucho. Imagens anexadas para análise."
    },
    {
      id: 3,
      client: "Carlos Oliveira",
      type: "Planejamento Agrícola",
      description: "Rotação de culturas e planejamento de safra",
      status: "concluida",
      value: "R$ 500,00",
      requestDate: "2024-01-08",
      location: "Fazenda Progresso - São Paulo",
      details: "Área de 100 hectares para implementação de sistema de rotação."
    },
    {
      id: 4,
      client: "Ana Costa",
      type: "Análise de Solo",
      description: "Correção de acidez e recomendação nutricional",
      status: "paga",
      value: "R$ 200,00",
      requestDate: "2024-01-05",
      location: "Chácara Verde - Paraná",
      details: "Solo com pH baixo, necessita correção para plantio de hortaliças."
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "nova":
        return <Badge className="bg-blue-100 text-blue-800">Nova</Badge>;
      case "andamento":
        return <Badge className="bg-yellow-100 text-yellow-800">Em Andamento</Badge>;
      case "concluida":
        return <Badge className="bg-green-100 text-green-800">Concluída</Badge>;
      case "paga":
        return <Badge className="bg-purple-100 text-purple-800">Paga</Badge>;
      default:
        return <Badge>Desconhecida</Badge>;
    }
  };

  const handleAcceptConsultation = (consultationId: number) => {
    toast({
      title: "Consultoria aceita",
      description: "Você aceitou a consultoria. O cliente foi notificado.",
    });
  };

  const handleSubmitReport = () => {
    if (!reportFile || !observations.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, anexe o relatório e adicione suas observações.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Relatório enviado",
      description: "Seu relatório foi enviado com sucesso. O cliente foi notificado.",
    });
    
    setReportFile(null);
    setObservations("");
    setSelectedConsultation(null);
  };

  const handleCompleteConsultation = (consultationId: number) => {
    toast({
      title: "Consultoria finalizada",
      description: "A consultoria foi marcada como concluída.",
    });
  };

  const stats = {
    newConsultations: consultations.filter(c => c.status === "nova").length,
    inProgress: consultations.filter(c => c.status === "andamento").length,
    completed: consultations.filter(c => c.status === "concluida").length,
    totalEarnings: "R$ 3.450,00"
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6 bg-background">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Painel do Consultor</h1>
                  <p className="text-muted-foreground">Gerencie suas consultorias e relatórios</p>
                </div>
                <Link to="/dashboard/consultant/extrato">
                  <Button variant="outline">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Ver Extrato Financeiro
                  </Button>
                </Link>
              </div>

              {/* Cards de estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Novas Consultorias</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.newConsultations}</p>
                      </div>
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                      </div>
                      <FileText className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
                        <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Ganhos Totais</p>
                        <p className="text-2xl font-bold text-primary">{stats.totalEarnings}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabela de consultorias */}
              <Card>
                <CardHeader>
                  <CardTitle>Minhas Consultorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consultations.map((consultation) => (
                        <TableRow key={consultation.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{consultation.client}</p>
                              <p className="text-sm text-muted-foreground">{consultation.location}</p>
                            </div>
                          </TableCell>
                          <TableCell>{consultation.type}</TableCell>
                          <TableCell>{getStatusBadge(consultation.status)}</TableCell>
                          <TableCell>{consultation.value}</TableCell>
                          <TableCell>{new Date(consultation.requestDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedConsultation(consultation)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Detalhes da Consultoria</DialogTitle>
                                  </DialogHeader>
                                  {selectedConsultation && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Cliente</Label>
                                          <p className="text-sm text-muted-foreground">{selectedConsultation.client}</p>
                                        </div>
                                        <div>
                                          <Label>Valor</Label>
                                          <p className="text-sm text-muted-foreground">{selectedConsultation.value}</p>
                                        </div>
                                        <div>
                                          <Label>Tipo</Label>
                                          <p className="text-sm text-muted-foreground">{selectedConsultation.type}</p>
                                        </div>
                                        <div>
                                          <Label>Status</Label>
                                          <div className="mt-1">{getStatusBadge(selectedConsultation.status)}</div>
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <Label>Descrição</Label>
                                        <p className="text-sm text-muted-foreground">{selectedConsultation.description}</p>
                                      </div>
                                      
                                      <div>
                                        <Label>Detalhes</Label>
                                        <p className="text-sm text-muted-foreground">{selectedConsultation.details}</p>
                                      </div>

                                      {selectedConsultation.status === "nova" && (
                                        <div className="flex gap-2">
                                          <Button 
                                            onClick={() => handleAcceptConsultation(selectedConsultation.id)}
                                            className="flex-1"
                                          >
                                            Aceitar Consultoria
                                          </Button>
                                        </div>
                                      )}

                                      {selectedConsultation.status === "andamento" && (
                                        <div className="space-y-4 border-t pt-4">
                                          <h4 className="font-medium">Enviar Relatório</h4>
                                          
                                          <div>
                                            <Label htmlFor="report">Arquivo do Relatório (PDF ou DOC)</Label>
                                            <Input
                                              id="report"
                                              type="file"
                                              accept=".pdf,.doc,.docx"
                                              onChange={(e) => setReportFile(e.target.files?.[0] || null)}
                                            />
                                          </div>

                                          <div>
                                            <Label htmlFor="observations">Observações para o Cliente</Label>
                                            <Textarea
                                              id="observations"
                                              value={observations}
                                              onChange={(e) => setObservations(e.target.value)}
                                              placeholder="Adicione suas observações e recomendações..."
                                              rows={3}
                                            />
                                          </div>

                                          <Button onClick={handleSubmitReport} className="w-full">
                                            <Send className="h-4 w-4 mr-2" />
                                            Enviar Relatório
                                          </Button>
                                        </div>
                                      )}

                                      {selectedConsultation.status === "concluida" && (
                                        <div className="flex gap-2">
                                          <Button 
                                            onClick={() => handleCompleteConsultation(selectedConsultation.id)}
                                            variant="outline"
                                            className="flex-1"
                                          >
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Finalizar Atendimento
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              {consultation.status === "nova" && (
                                <Button 
                                  size="sm"
                                  onClick={() => handleAcceptConsultation(consultation.id)}
                                >
                                  Aceitar
                                </Button>
                              )}

                              {consultation.status === "andamento" && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setSelectedConsultation(consultation)}
                                >
                                  <Upload className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};