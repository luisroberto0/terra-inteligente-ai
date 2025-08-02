import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Download, Eye, MoreHorizontal, FileText, RefreshCw } from "lucide-react";

export function AdminInvoices() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");

  // Mock data para faturas
  const invoices = [
    {
      id: "INV-001",
      user: "João Silva",
      email: "joao@fazenda.com",
      plan: "Premium",
      amount: "R$ 99,00",
      status: "paid",
      date: "2024-01-15",
      dueDate: "2024-01-30"
    },
    {
      id: "INV-002", 
      user: "Maria Santos",
      email: "maria@agro.com",
      plan: "Professional",
      amount: "R$ 199,00",
      status: "pending",
      date: "2024-01-10",
      dueDate: "2024-01-25"
    },
    {
      id: "INV-003",
      user: "Pedro Costa",
      email: "pedro@rural.com", 
      plan: "Premium",
      amount: "R$ 99,00",
      status: "overdue",
      date: "2023-12-15",
      dueDate: "2023-12-30"
    },
    {
      id: "INV-004",
      user: "Ana Oliveira",
      email: "ana@campo.com",
      plan: "Free",
      amount: "R$ 0,00",
      status: "paid",
      date: "2024-01-01",
      dueDate: "2024-01-01"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="default" className="bg-green-500">Pago</Badge>;
      case "pending":
        return <Badge variant="secondary">Pendente</Badge>;
      case "overdue":
        return <Badge variant="destructive">Vencido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Free":
        return <Badge variant="outline">Gratuito</Badge>;
      case "Premium":
        return <Badge className="bg-blue-500">Premium</Badge>;
      case "Professional":
        return <Badge className="bg-purple-500">Profissional</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus;
    const matchesPlan = filterPlan === "all" || invoice.plan === filterPlan;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Faturas e Cobranças
          </h1>
          <p className="text-muted-foreground">
            Gerencie faturas, cobranças e histórico de pagamentos
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 15.420</div>
              <p className="text-xs text-green-500">+12% em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturas Pendentes</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-yellow-500">R$ 2.847 em aberto</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Inadimplência</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-red-500">-0.5% em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 127</div>
              <p className="text-xs text-green-500">+8% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por usuário, email ou ID da fatura..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="paid">Pago</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="overdue">Vencido</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPlan} onValueChange={setFilterPlan}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Planos</SelectItem>
                  <SelectItem value="Free">Gratuito</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Professional">Profissional</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Faturas */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Lista de Faturas ({filteredInvoices.length})</CardTitle>
              <Button>Gerar Nova Fatura</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Emissão</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{invoice.user}</div>
                        <div className="text-sm text-muted-foreground">{invoice.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getPlanBadge(invoice.plan)}</TableCell>
                    <TableCell className="font-medium">{invoice.amount}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Baixar PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Enviar Cobrança
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}