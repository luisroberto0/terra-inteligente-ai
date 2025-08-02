import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { 
  DollarSign, 
  TrendingUp, 
  Download, 
  Calendar,
  CreditCard,
  Wallet,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

export const ConsultantFinancial = () => {
  const [dateFilter, setDateFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const { toast } = useToast();

  const transactions = [
    {
      id: 1,
      date: "2024-01-15",
      client: "João Silva",
      type: "Análise de Solo",
      value: 250.00,
      status: "pago",
      paymentMethod: "PIX"
    },
    {
      id: 2,
      date: "2024-01-12",
      client: "Maria Santos",
      type: "Consultoria Fitossanitária",
      value: 350.00,
      status: "processando",
      paymentMethod: "Transferência"
    },
    {
      id: 3,
      date: "2024-01-08",
      client: "Carlos Oliveira",
      type: "Planejamento Agrícola",
      value: 500.00,
      status: "pago",
      paymentMethod: "PIX"
    },
    {
      id: 4,
      date: "2024-01-05",
      client: "Ana Costa",
      type: "Análise de Solo",
      value: 200.00,
      status: "pago",
      paymentMethod: "PIX"
    },
    {
      id: 5,
      date: "2024-01-03",
      client: "Pedro Alves",
      type: "Consultoria Irrigação",
      value: 400.00,
      status: "pendente",
      paymentMethod: "Transferência"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pago":
        return <Badge className="bg-green-100 text-green-800">Pago</Badge>;
      case "processando":
        return <Badge className="bg-yellow-100 text-yellow-800">Processando</Badge>;
      case "pendente":
        return <Badge className="bg-red-100 text-red-800">Pendente</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const handleWithdrawRequest = () => {
    toast({
      title: "Solicitação de saque enviada",
      description: "Sua solicitação será processada em até 2 dias úteis.",
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "Exportando relatório",
      description: "O download do arquivo CSV será iniciado em breve.",
    });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = statusFilter === "todos" || transaction.status === statusFilter;
    const matchesDate = dateFilter === "todos" || (
      dateFilter === "mes" && new Date(transaction.date).getMonth() === new Date().getMonth()
    );
    return matchesStatus && matchesDate;
  });

  const totalPaid = transactions.filter(t => t.status === "pago").reduce((sum, t) => sum + t.value, 0);
  const totalPending = transactions.filter(t => t.status === "pendente").reduce((sum, t) => sum + t.value, 0);
  const totalProcessing = transactions.filter(t => t.status === "processando").reduce((sum, t) => sum + t.value, 0);
  const availableBalance = totalPaid * 0.95; // Simula 5% de taxa

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6 bg-background">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Link to="/dashboard/consultant">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Extrato Financeiro</h1>
                  <p className="text-muted-foreground">Acompanhe seus ganhos e histórico de pagamentos</p>
                </div>
              </div>

              {/* Cards de resumo financeiro */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Disponível para Saque</p>
                        <p className="text-2xl font-bold text-green-600">
                          R$ {availableBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <Wallet className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Recebido</p>
                        <p className="text-2xl font-bold text-primary">
                          R$ {totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Em Processamento</p>
                        <p className="text-2xl font-bold text-yellow-600">
                          R$ {totalProcessing.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <CreditCard className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pendente</p>
                        <p className="text-2xl font-bold text-red-600">
                          R$ {totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Ações rápidas */}
              <div className="flex gap-4">
                <Button onClick={handleWithdrawRequest} className="bg-green-600 hover:bg-green-700">
                  <Wallet className="h-4 w-4 mr-2" />
                  Solicitar Saque
                </Button>
                <Button variant="outline" onClick={handleExportCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>

              {/* Histórico de transações */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Histórico de Transações</CardTitle>
                    <div className="flex gap-4">
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filtrar por período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os períodos</SelectItem>
                          <SelectItem value="mes">Este mês</SelectItem>
                          <SelectItem value="trimestre">Último trimestre</SelectItem>
                          <SelectItem value="ano">Este ano</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filtrar por status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os status</SelectItem>
                          <SelectItem value="pago">Pago</SelectItem>
                          <SelectItem value="processando">Processando</SelectItem>
                          <SelectItem value="pendente">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Tipo de Análise</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Método</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>{transaction.client}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell className="font-medium">
                            R$ {transaction.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell>{transaction.paymentMethod}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Informações sobre pagamentos */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações sobre Pagamentos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">📅 Cronograma de Pagamentos</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Pagamentos são processados toda terça e sexta-feira</li>
                        <li>• Prazo para liberação: até 2 dias úteis</li>
                        <li>• Valor mínimo para saque: R$ 50,00</li>
                        <li>• Taxa da plataforma: 5% por transação</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">🏦 Métodos de Pagamento</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• PIX: Liberação instantânea</li>
                        <li>• Transferência bancária: 1-2 dias úteis</li>
                        <li>• Conta corrente ou poupança aceitas</li>
                        <li>• Sem taxa adicional para PIX</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">💰 Dica para Maximizar Ganhos</h4>
                    <p className="text-sm">
                      Mantenha seu perfil atualizado com especialidades e certificações. 
                      Consultores com perfis completos e boa avaliação recebem 40% mais solicitações.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};