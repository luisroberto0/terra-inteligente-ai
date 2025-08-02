import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  DollarSign, 
  BarChart3, 
  UserPlus, 
  TrendingUp, 
  TrendingDown,
  Crown,
  Zap,
  Star
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Progress } from "@/components/ui/progress";

export const AdminDashboard = () => {
  const { t } = useLanguage();

  // Mock data - In real app, this would come from API
  const stats = {
    totalRevenue: { monthly: 145000, annual: 1800000 },
    activeUsers: { free: 1250, premium: 320, professional: 85 },
    diagnostics: { total: 25680, thisMonth: 3420 },
    newUsers: { thisMonth: 156, growth: 12.5 }
  };

  const recentActivity = [
    { user: "João Silva", action: "Upgrade to Premium", time: "2 min ago", plan: "premium" },
    { user: "Maria Santos", action: "New registration", time: "5 min ago", plan: "free" },
    { user: "Pedro Costa", action: "Cancelled subscription", time: "15 min ago", plan: "cancelled" },
    { user: "Ana Lima", action: "Generated diagnosis", time: "23 min ago", plan: "professional" }
  ];

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "premium": return <Badge variant="secondary" className="bg-blue-100 text-blue-700"><Star className="w-3 h-3 mr-1" />Premium</Badge>;
      case "professional": return <Badge variant="secondary" className="bg-purple-100 text-purple-700"><Crown className="w-3 h-3 mr-1" />Pro</Badge>;
      case "free": return <Badge variant="outline">Free</Badge>;
      case "cancelled": return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge variant="outline">{plan}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t('admin.dashboard.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('admin.dashboard.subtitle')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.monthlyRevenue')}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.totalRevenue.monthly.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
                +12.5% {t('admin.stats.fromLastMonth')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.activeUsers')}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.values(stats.activeUsers).reduce((a, b) => a + b, 0)}</div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Free: {stats.activeUsers.free}</span>
                  <span>Premium: {stats.activeUsers.premium}</span>
                </div>
                <div>Professional: {stats.activeUsers.professional}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.diagnostics')}</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.diagnostics.thisMonth.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {t('admin.stats.thisMonth')} • Total: {stats.diagnostics.total.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.newUsers')}</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newUsers.thisMonth}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1 text-green-500" />
                +{stats.newUsers.growth}% {t('admin.stats.growth')}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.charts.revenueEvolution')}</CardTitle>
              <CardDescription>{t('admin.charts.last12Months')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">{t('admin.charts.chartPlaceholder')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plans Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.plans.distribution')}</CardTitle>
              <CardDescription>{t('admin.plans.usersByPlan')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Free Plan</span>
                  <span>{stats.activeUsers.free} users</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Premium Plan</span>
                  <span>{stats.activeUsers.premium} users</span>
                </div>
                <Progress value={19} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Professional Plan</span>
                  <span>{stats.activeUsers.professional} users</span>
                </div>
                <Progress value={6} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.activity.recent')}</CardTitle>
            <CardDescription>{t('admin.activity.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPlanBadge(activity.plan)}
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};