import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  RefreshCw,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const FinancialManagement = () => {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");

  // Mock data - In real app, this would come from API
  const financialData = {
    overview: {
      totalRevenue: 145000,
      monthlyRecurring: 128000,
      oneTimePayments: 17000,
      churnRate: 3.2,
      averageRevenuePer: 89,
      growth: 12.5
    },
    transactions: [
      {
        id: "tx_001",
        user: "João Silva",
        amount: 49,
        plan: "premium",
        status: "paid",
        date: "2024-01-15",
        type: "subscription"
      },
      {
        id: "tx_002",
        user: "Maria Santos",
        amount: 149,
        plan: "professional",
        status: "paid",
        date: "2024-01-15",
        type: "upgrade"
      },
      {
        id: "tx_003",
        user: "Pedro Costa",
        amount: 49,
        plan: "premium",
        status: "failed",
        date: "2024-01-14",
        type: "subscription"
      },
      {
        id: "tx_004",
        user: "Ana Lima",
        amount: 149,
        plan: "professional",
        status: "refunded",
        date: "2024-01-13",
        type: "subscription"
      }
    ],
    planChanges: [
      {
        user: "Carlos Mendes",
        from: "free",
        to: "premium",
        date: "2024-01-15",
        revenue: 49
      },
      {
        user: "Lucia Fernandes",
        from: "premium",
        to: "professional",
        date: "2024-01-14",
        revenue: 100
      },
      {
        user: "Roberto Silva",
        from: "professional",
        to: "premium",
        date: "2024-01-13",
        revenue: -100
      }
    ],
    churnAnalysis: [
      {
        reason: "Price too high",
        count: 12,
        percentage: 35.3
      },
      {
        reason: "Found alternative",
        count: 8,
        percentage: 23.5
      },
      {
        reason: "Not using enough",
        count: 7,
        percentage: 20.6
      },
      {
        reason: "Technical issues",
        count: 4,
        percentage: 11.8
      },
      {
        reason: "Other",
        count: 3,
        percentage: 8.8
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="secondary" className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />{t('admin.financial.paid')}</Badge>;
      case "failed":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />{t('admin.financial.failed')}</Badge>;
      case "refunded":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700"><RefreshCw className="w-3 h-3 mr-1" />{t('admin.financial.refunded')}</Badge>;
      case "pending":
        return <Badge variant="outline"><AlertCircle className="w-3 h-3 mr-1" />{t('admin.financial.pending')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "premium":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Premium</Badge>;
      case "professional":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-700">Professional</Badge>;
      case "free":
        return <Badge variant="outline">Free</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t('admin.financial.title')}</h1>
              <p className="text-muted-foreground mt-2">{t('admin.financial.subtitle')}</p>
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thisMonth">{t('admin.financial.thisMonth')}</SelectItem>
                  <SelectItem value="lastMonth">{t('admin.financial.lastMonth')}</SelectItem>
                  <SelectItem value="last3Months">{t('admin.financial.last3Months')}</SelectItem>
                  <SelectItem value="thisYear">{t('admin.financial.thisYear')}</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                {t('admin.financial.exportReport')}
              </Button>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.financial.totalRevenue')}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {financialData.overview.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
                +{financialData.overview.growth}% {t('admin.financial.growth')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.financial.monthlyRecurring')}</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {financialData.overview.monthlyRecurring.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((financialData.overview.monthlyRecurring / financialData.overview.totalRevenue) * 100)}% {t('admin.financial.ofTotal')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.financial.churnRate')}</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{financialData.overview.churnRate}%</div>
              <p className="text-xs text-muted-foreground">
                {t('admin.financial.monthlyChurn')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.financial.avgRevenuePerUser')}</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {financialData.overview.averageRevenuePer}</div>
              <p className="text-xs text-muted-foreground">
                {t('admin.financial.perUser')}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">{t('admin.financial.transactions')}</TabsTrigger>
            <TabsTrigger value="planChanges">{t('admin.financial.planChanges')}</TabsTrigger>
            <TabsTrigger value="churn">{t('admin.financial.churnAnalysis')}</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.financial.recentTransactions')}</CardTitle>
                <CardDescription>{t('admin.financial.transactionsDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.financial.transactionId')}</TableHead>
                      <TableHead>{t('admin.financial.user')}</TableHead>
                      <TableHead>{t('admin.financial.plan')}</TableHead>
                      <TableHead>{t('admin.financial.amount')}</TableHead>
                      <TableHead>{t('admin.financial.status')}</TableHead>
                      <TableHead>{t('admin.financial.date')}</TableHead>
                      <TableHead>{t('admin.financial.type')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                        <TableCell>{transaction.user}</TableCell>
                        <TableCell>{getPlanBadge(transaction.plan)}</TableCell>
                        <TableCell>R$ {transaction.amount}</TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell className="capitalize">{transaction.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planChanges">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.financial.planUpgradesDowngrades')}</CardTitle>
                <CardDescription>{t('admin.financial.planChangesDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialData.planChanges.map((change, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{change.user}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(change.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPlanBadge(change.from)}
                          <span className="text-muted-foreground">→</span>
                          {getPlanBadge(change.to)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${change.revenue > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {change.revenue > 0 ? '+' : ''}R$ {change.revenue}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {change.revenue > 0 ? t('admin.financial.upgrade') : t('admin.financial.downgrade')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="churn">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.financial.churnReasons')}</CardTitle>
                <CardDescription>{t('admin.financial.whyUsersLeave')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialData.churnAnalysis.map((reason, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{reason.reason}</span>
                          <span className="text-sm text-muted-foreground">{reason.count} users</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${reason.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-sm font-medium">{reason.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};