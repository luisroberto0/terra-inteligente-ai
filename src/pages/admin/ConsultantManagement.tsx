import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Users, Eye, CheckCircle, XCircle, AlertTriangle, DollarSign, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const ConsultantManagement = () => {
  const [statusFilter, setStatusFilter] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const consultants = [
    {
      id: 1,
      name: "Dr. Carlos Silva",
      email: "carlos.silva@email.com",
      specialty: "Fitossanitário",
      status: "aprovado",
      rating: 4.8,
      totalConsultations: 45,
      earnings: "R$ 12.750,00",
      crea: "SP-123456",
      phone: "(11) 99999-9999"
    },
    {
      id: 2,
      name: "Eng. Ana Santos",
      email: "ana.santos@email.com",
      specialty: "Solo e Nutrição",
      status: "pendente",
      rating: 0,
      totalConsultations: 0,
      earnings: "R$ 0,00",
      crea: "MG-789012",
      phone: "(31) 88888-8888"
    },
    {
      id: 3,
      name: "Dr. João Oliveira",
      email: "joao.oliveira@email.com",
      specialty: "Irrigação",
      status: "suspenso",
      rating: 4.2,
      totalConsultations: 23,
      earnings: "R$ 6.900,00",
      crea: "RS-345678",
      phone: "(51) 77777-7777"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "suspenso":
        return <Badge className="bg-red-100 text-red-800">Suspenso</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const handleAction = (action: string, consultantName: string) => {
    toast({
      title: "Ação executada",
      description: `${action} aplicado para ${consultantName}`,
    });
  };

  const filteredConsultants = consultants.filter(consultant => {
    const matchesStatus = statusFilter === "todos" || consultant.status === statusFilter;
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6 bg-background">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Gerenciar Consultores</h1>
                <p className="text-muted-foreground">Gerencie os consultores especialistas da plataforma</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Consultores</p>
                        <p className="text-2xl font-bold">127</p>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Aprovados</p>
                        <p className="text-2xl font-bold text-green-600">89</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                        <p className="text-2xl font-bold text-yellow-600">23</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                        <p className="text-2xl font-bold text-primary">R$ 89.650</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Lista de Consultores</CardTitle>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      placeholder="Buscar por nome ou e-mail..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="md:w-96"
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="md:w-48">
                        <SelectValue placeholder="Filtrar por status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="aprovado">Aprovado</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="suspenso">Suspenso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Especialidade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Avaliação</TableHead>
                        <TableHead>Consultorias</TableHead>
                        <TableHead>Ganhos</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredConsultants.map((consultant) => (
                        <TableRow key={consultant.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{consultant.name}</p>
                              <p className="text-sm text-muted-foreground">{consultant.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{consultant.specialty}</TableCell>
                          <TableCell>{getStatusBadge(consultant.status)}</TableCell>
                          <TableCell>
                            {consultant.rating > 0 ? (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{consultant.rating}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Sem avaliações</span>
                            )}
                          </TableCell>
                          <TableCell>{consultant.totalConsultations}</TableCell>
                          <TableCell>{consultant.earnings}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Perfil do Consultor</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">Nome</label>
                                        <p className="text-sm text-muted-foreground">{consultant.name}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">E-mail</label>
                                        <p className="text-sm text-muted-foreground">{consultant.email}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Telefone</label>
                                        <p className="text-sm text-muted-foreground">{consultant.phone}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">CREA</label>
                                        <p className="text-sm text-muted-foreground">{consultant.crea}</p>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              
                              {consultant.status === "pendente" && (
                                <>
                                  <Button 
                                    size="sm" 
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleAction("Aprovação", consultant.name)}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => handleAction("Reprovação", consultant.name)}
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              
                              {consultant.status === "aprovado" && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleAction("Suspensão", consultant.name)}
                                >
                                  <AlertTriangle className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {consultant.status === "suspenso" && (
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleAction("Reativação", consultant.name)}
                                >
                                  <CheckCircle className="h-4 w-4" />
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