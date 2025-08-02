import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Crown, 
  Star, 
  Zap,
  Users,
  BarChart3,
  Edit,
  Plus
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PlanManagement = () => {
  const { t } = useLanguage();

  // Mock data - In real app, this would come from API
  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      users: 1250,
      features: {
        diagnosticsPerMonth: 5,
        basicAI: true,
        advancedAI: false,
        prioritySupport: false,
        multipleFarms: false,
        teamAccess: false,
        pdfExport: false,
        specialistConsulting: false
      },
      limits: {
        maxFarms: 1,
        maxTeamMembers: 1,
        storageGB: 1
      }
    },
    {
      id: "premium",
      name: "Premium",
      price: 49,
      users: 320,
      features: {
        diagnosticsPerMonth: 50,
        basicAI: true,
        advancedAI: true,
        prioritySupport: true,
        multipleFarms: true,
        teamAccess: false,
        pdfExport: true,
        specialistConsulting: false
      },
      limits: {
        maxFarms: 5,
        maxTeamMembers: 1,
        storageGB: 10
      }
    },
    {
      id: "professional",
      name: "Professional",
      price: 149,
      users: 85,
      features: {
        diagnosticsPerMonth: -1, // unlimited
        basicAI: true,
        advancedAI: true,
        prioritySupport: true,
        multipleFarms: true,
        teamAccess: true,
        pdfExport: true,
        specialistConsulting: true
      },
      limits: {
        maxFarms: -1, // unlimited
        maxTeamMembers: 10,
        storageGB: 100
      }
    }
  ];

  const [editingPlan, setEditingPlan] = useState<string | null>(null);

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "premium": return <Star className="w-5 h-5 text-blue-600" />;
      case "professional": return <Crown className="w-5 h-5 text-purple-600" />;
      default: return <Zap className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t('admin.plans.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('admin.plans.subtitle')}</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">{t('admin.plans.overview')}</TabsTrigger>
            <TabsTrigger value="features">{t('admin.plans.features')}</TabsTrigger>
            <TabsTrigger value="limits">{t('admin.plans.limits')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Plans Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getPlanIcon(plan.id)}
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setEditingPlan(plan.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardDescription>
                      {plan.price === 0 ? t('pricing.free') : `$${plan.price}${t('pricing.perMonth')}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{plan.users} {t('admin.plans.activeUsers')}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">{t('admin.plans.keyFeatures')}</div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>
                          {plan.features.diagnosticsPerMonth === -1 
                            ? t('pricing.unlimited') + ' ' + t('pricing.diagnosticsPerMonth')
                            : `${plan.features.diagnosticsPerMonth} ${t('pricing.diagnosticsPerMonth')}`
                          }
                        </div>
                        {plan.features.advancedAI && <div>✓ {t('pricing.advancedAI')}</div>}
                        {plan.features.prioritySupport && <div>✓ {t('pricing.prioritySupport')}</div>}
                        {plan.features.teamAccess && <div>✓ {t('pricing.teamAccess')}</div>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Revenue by Plan */}
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.plans.revenueByPlan')}</CardTitle>
                <CardDescription>{t('admin.plans.monthlyRevenue')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plans.map((plan) => {
                    const revenue = plan.price * plan.users;
                    const percentage = revenue / plans.reduce((sum, p) => sum + (p.price * p.users), 0) * 100;
                    
                    return (
                      <div key={plan.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getPlanIcon(plan.id)}
                          <div>
                            <div className="font-medium">{plan.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {plan.users} users × ${plan.price}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${revenue.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.plans.featuresConfiguration')}</CardTitle>
                <CardDescription>{t('admin.plans.configurePlanFeatures')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">{t('admin.plans.feature')}</th>
                        <th className="text-center py-3 px-4">Free</th>
                        <th className="text-center py-3 px-4">Premium</th>
                        <th className="text-center py-3 px-4">Professional</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">{t('pricing.diagnosticsPerMonth')}</td>
                        <td className="text-center py-3 px-4">
                          <Input type="number" defaultValue={5} className="w-20 mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Input type="number" defaultValue={50} className="w-20 mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Badge variant="secondary">{t('pricing.unlimited')}</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">{t('pricing.advancedAI')}</td>
                        <td className="text-center py-3 px-4">
                          <Switch disabled />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Switch defaultChecked />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Switch defaultChecked />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">{t('pricing.prioritySupport')}</td>
                        <td className="text-center py-3 px-4">
                          <Switch disabled />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Switch defaultChecked />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Switch defaultChecked />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">{t('pricing.teamAccess')}</td>
                        <td className="text-center py-3 px-4">
                          <Switch disabled />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Switch disabled />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Switch defaultChecked />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button>{t('admin.plans.saveChanges')}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="limits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.plans.usageLimits')}</CardTitle>
                <CardDescription>{t('admin.plans.configureLimits')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {plans.map((plan) => (
                  <div key={plan.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      {getPlanIcon(plan.id)}
                      <h3 className="font-medium">{plan.name} Plan</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>{t('admin.plans.maxFarms')}</Label>
                        <Input 
                          type="number" 
                          defaultValue={plan.limits.maxFarms === -1 ? '' : plan.limits.maxFarms}
                          placeholder={plan.limits.maxFarms === -1 ? 'Unlimited' : ''}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>{t('admin.plans.maxTeamMembers')}</Label>
                        <Input 
                          type="number" 
                          defaultValue={plan.limits.maxTeamMembers === -1 ? '' : plan.limits.maxTeamMembers}
                          placeholder={plan.limits.maxTeamMembers === -1 ? 'Unlimited' : ''}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>{t('admin.plans.storageGB')}</Label>
                        <Input 
                          type="number" 
                          defaultValue={plan.limits.storageGB}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end">
                  <Button>{t('admin.plans.updateLimits')}</Button>
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