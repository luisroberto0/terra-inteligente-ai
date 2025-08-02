import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal,
  UserCheck,
  UserX,
  Crown,
  Star,
  Eye,
  Settings
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const UserManagement = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - In real app, this would come from API
  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@fazenda.com",
      plan: "premium",
      status: "active",
      lastLogin: "2024-01-15",
      diagnostics: 45,
      joinDate: "2023-12-01"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@agro.com",
      plan: "professional",
      status: "active",
      lastLogin: "2024-01-14",
      diagnostics: 120,
      joinDate: "2023-11-15"
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@rural.com",
      plan: "free",
      status: "inactive",
      lastLogin: "2024-01-10",
      diagnostics: 8,
      joinDate: "2024-01-01"
    },
    {
      id: 4,
      name: "Ana Lima",
      email: "ana@campo.com",
      plan: "premium",
      status: "active",
      lastLogin: "2024-01-15",
      diagnostics: 67,
      joinDate: "2023-10-20"
    }
  ];

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "premium":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700"><Star className="w-3 h-3 mr-1" />Premium</Badge>;
      case "professional":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-700"><Crown className="w-3 h-3 mr-1" />Pro</Badge>;
      case "free":
        return <Badge variant="outline">Free</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary" className="bg-green-100 text-green-700">{t('admin.users.active')}</Badge>;
      case "inactive":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">{t('admin.users.inactive')}</Badge>;
      case "suspended":
        return <Badge variant="destructive">{t('admin.users.suspended')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === "all" || user.plan === filterPlan;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t('admin.users.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('admin.users.subtitle')}</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{t('admin.users.filters')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('admin.users.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterPlan} onValueChange={setFilterPlan}>
                <SelectTrigger>
                  <SelectValue placeholder={t('admin.users.filterByPlan')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('admin.users.allPlans')}</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder={t('admin.users.filterByStatus')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('admin.users.allStatuses')}</SelectItem>
                  <SelectItem value="active">{t('admin.users.active')}</SelectItem>
                  <SelectItem value="inactive">{t('admin.users.inactive')}</SelectItem>
                  <SelectItem value="suspended">{t('admin.users.suspended')}</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                {t('admin.users.advancedFilters')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{t('admin.users.userList')}</CardTitle>
                <CardDescription>
                  {filteredUsers.length} {t('admin.users.usersFound')}
                </CardDescription>
              </div>
              <Button>
                <Users className="w-4 h-4 mr-2" />
                {t('admin.users.addUser')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.users.name')}</TableHead>
                  <TableHead>{t('admin.users.email')}</TableHead>
                  <TableHead>{t('admin.users.plan')}</TableHead>
                  <TableHead>{t('admin.users.status')}</TableHead>
                  <TableHead>{t('admin.users.lastLogin')}</TableHead>
                  <TableHead>{t('admin.users.diagnostics')}</TableHead>
                  <TableHead className="text-right">{t('admin.users.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getPlanBadge(user.plan)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                    <TableCell>{user.diagnostics}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{t('admin.users.actions')}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            {t('admin.users.viewProfile')}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            {t('admin.users.changePlan')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'active' ? (
                            <DropdownMenuItem className="text-yellow-600">
                              <UserX className="w-4 h-4 mr-2" />
                              {t('admin.users.suspend')}
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">
                              <UserCheck className="w-4 h-4 mr-2" />
                              {t('admin.users.activate')}
                            </DropdownMenuItem>
                          )}
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
};