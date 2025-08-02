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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Download, Calendar as CalendarIcon, Activity, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function AdminLogs() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  // Mock data para logs
  const logs = [
    {
      id: "LOG-001",
      timestamp: "2024-01-15 14:30:25",
      user: "admin@agroinsight.com",
      action: "Usuário bloqueado",
      type: "admin",
      level: "warning",
      ip: "192.168.1.100",
      details: "Usuário joão@fazenda.com foi bloqueado por violação de termos",
      resource: "user_management"
    },
    {
      id: "LOG-002",
      timestamp: "2024-01-15 14:25:10",
      user: "maria@agro.com",
      action: "Login realizado",
      type: "auth",
      level: "info",
      ip: "192.168.1.50",
      details: "Login bem-sucedido via email/senha",
      resource: "authentication"
    },
    {
      id: "LOG-003",
      timestamp: "2024-01-15 14:20:15",
      user: "sistema@agroinsight.com",
      action: "Backup automático",
      type: "system",
      level: "info",
      ip: "127.0.0.1",
      details: "Backup diário dos dados realizado com sucesso",
      resource: "backup"
    },
    {
      id: "LOG-004",
      timestamp: "2024-01-15 14:15:30",
      user: "pedro@rural.com",
      action: "Tentativa de acesso negada",
      type: "security",
      level: "error",
      ip: "192.168.1.200",
      details: "Tentativa de acesso a recurso sem permissão",
      resource: "api_access"
    },
    {
      id: "LOG-005",
      timestamp: "2024-01-15 14:10:45",
      user: "admin@agroinsight.com",
      action: "Configuração alterada",
      type: "admin",
      level: "info",
      ip: "192.168.1.100",
      details: "Limite de diagnósticos do plano Premium alterado para 150",
      resource: "plan_configuration"
    }
  ];

  const activityLogs = [
    {
      id: "ACT-001",
      timestamp: "2024-01-15 15:00:00",
      user: "maria@agro.com",
      action: "Diagnóstico gerado",
      resource: "Fazenda São José - Milho",
      status: "success"
    },
    {
      id: "ACT-002",
      timestamp: "2024-01-15 14:55:30",
      user: "joão@fazenda.com",
      action: "Upload de imagem",
      resource: "Plantação de soja - Área 3",
      status: "success"
    },
    {
      id: "ACT-003",
      timestamp: "2024-01-15 14:50:15",
      user: "ana@campo.com",
      action: "Relatório exportado",
      resource: "Relatório mensal - Janeiro 2024",
      status: "success"
    }
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>;
      case "auth":
        return <Badge className="bg-blue-500">Auth</Badge>;
      case "system":
        return <Badge className="bg-gray-500">Sistema</Badge>;
      case "security":
        return <Badge className="bg-red-500">Segurança</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "info":
        return <Badge variant="default" className="bg-blue-500">Info</Badge>;
      case "warning":
        return <Badge variant="default" className="bg-yellow-500">Aviso</Badge>;
      case "error":
        return <Badge variant="destructive">Erro</Badge>;
      case "success":
        return <Badge variant="default" className="bg-green-500">Sucesso</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || log.type === filterType;
    const matchesLevel = filterLevel === "all" || log.level === filterLevel;
    
    return matchesSearch && matchesType && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Logs e Auditoria
          </h1>
          <p className="text-muted-foreground">
            Monitore atividades do sistema e ações dos usuários
          </p>
        </div>

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList>
            <TabsTrigger value="system">Logs do Sistema</TabsTrigger>
            <TabsTrigger value="user">Atividade de Usuários</TabsTrigger>
            <TabsTrigger value="security">Eventos de Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar em logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-[150px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="auth">Auth</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                      <SelectItem value="security">Segurança</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger className="w-full md:w-[150px]">
                      <SelectValue placeholder="Nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Aviso</SelectItem>
                      <SelectItem value="error">Erro</SelectItem>
                    </SelectContent>
                  </Select>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full md:w-[150px]">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "dd/MM/yyyy", { locale: ptBR }) : "Data Início"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabela de Logs */}
            <Card>
              <CardHeader>
                <CardTitle>Logs do Sistema ({filteredLogs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Ação</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Nível</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Detalhes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{getTypeBadge(log.type)}</TableCell>
                        <TableCell>{getLevelBadge(log.level)}</TableCell>
                        <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                        <TableCell className="max-w-xs truncate" title={log.details}>
                          {log.details}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Atividade de Usuários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Ação</TableHead>
                      <TableHead>Recurso</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{log.resource}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(log.status)}
                            {getLevelBadge(log.status)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tentativas de Login Falharam</CardTitle>
                  <XCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-red-500">Últimas 24h</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Acessos Suspeitos</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-yellow-500">Últimas 24h</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contas Bloqueadas</CardTitle>
                  <Shield className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-blue-500">Hoje</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Eventos de Segurança
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Tipo de Evento</TableHead>
                      <TableHead>Usuário/IP</TableHead>
                      <TableHead>Severidade</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Ação Tomada</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-sm">2024-01-15 14:30:25</TableCell>
                      <TableCell>Login Suspeito</TableCell>
                      <TableCell>192.168.1.200</TableCell>
                      <TableCell>{getLevelBadge("warning")}</TableCell>
                      <TableCell>Múltiplas tentativas de login com credenciais inválidas</TableCell>
                      <TableCell><Badge variant="outline">IP Bloqueado</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">2024-01-15 14:15:10</TableCell>
                      <TableCell>Acesso Negado</TableCell>
                      <TableCell>pedro@rural.com</TableCell>
                      <TableCell>{getLevelBadge("error")}</TableCell>
                      <TableCell>Tentativa de acesso a API sem permissão</TableCell>
                      <TableCell><Badge variant="outline">Alerta Enviado</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}