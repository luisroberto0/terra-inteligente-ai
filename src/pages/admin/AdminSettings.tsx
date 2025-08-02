import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Shield, 
  CreditCard, 
  Cpu, 
  Database,
  Bell,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export const AdminSettings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [systemSettings, setSystemSettings] = useState({
    siteName: "AgroInsight AI",
    maintenanceMode: false,
    registrationsEnabled: true,
    maxUsersPerPlan: {
      free: 10000,
      premium: 5000,
      professional: 1000
    },
    aiModel: "gpt-4",
    backupEnabled: true,
    analyticsEnabled: true
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    testMode: false,
    webhookUrl: "https://api.agroinsight.com/webhooks/stripe",
    currency: "BRL",
    taxRate: 0.05
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPasswords: true
  });

  const handleSaveSettings = (section: string) => {
    toast({
      title: t('admin.settings.settingsSaved'),
      description: t('admin.settings.settingsSavedDescription'),
    });
  };

  const handleTestPayment = () => {
    toast({
      title: t('admin.settings.paymentTest'),
      description: t('admin.settings.paymentTestDescription'),
    });
  };

  const handleBackupNow = () => {
    toast({
      title: t('admin.settings.backupStarted'),
      description: t('admin.settings.backupDescription'),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t('admin.settings.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('admin.settings.subtitle')}</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">{t('admin.settings.general')}</TabsTrigger>
            <TabsTrigger value="payment">{t('admin.settings.payment')}</TabsTrigger>
            <TabsTrigger value="ai">{t('admin.settings.aiSettings')}</TabsTrigger>
            <TabsTrigger value="security">{t('admin.settings.security')}</TabsTrigger>
            <TabsTrigger value="backup">{t('admin.settings.backup')}</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.settings.generalSettings')}</CardTitle>
                <CardDescription>{t('admin.settings.generalDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">{t('admin.settings.siteName')}</Label>
                    <Input
                      id="siteName"
                      value={systemSettings.siteName}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, siteName: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">{t('admin.settings.defaultCurrency')}</Label>
                    <Select value={paymentSettings.currency} onValueChange={(value) => setPaymentSettings(prev => ({ ...prev, currency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">Brazilian Real (BRL)</SelectItem>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>{t('admin.settings.maintenanceMode')}</Label>
                      <p className="text-sm text-muted-foreground">{t('admin.settings.maintenanceModeDescription')}</p>
                    </div>
                    <Switch
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>{t('admin.settings.registrationsEnabled')}</Label>
                      <p className="text-sm text-muted-foreground">{t('admin.settings.registrationsDescription')}</p>
                    </div>
                    <Switch
                      checked={systemSettings.registrationsEnabled}
                      onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, registrationsEnabled: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>{t('admin.settings.analyticsEnabled')}</Label>
                      <p className="text-sm text-muted-foreground">{t('admin.settings.analyticsDescription')}</p>
                    </div>
                    <Switch
                      checked={systemSettings.analyticsEnabled}
                      onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, analyticsEnabled: checked }))}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">{t('admin.settings.userLimits')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="freeLimit">{t('admin.settings.freePlanLimit')}</Label>
                      <Input
                        id="freeLimit"
                        type="number"
                        value={systemSettings.maxUsersPerPlan.free}
                        onChange={(e) => setSystemSettings(prev => ({ 
                          ...prev, 
                          maxUsersPerPlan: { ...prev.maxUsersPerPlan, free: parseInt(e.target.value) }
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="premiumLimit">{t('admin.settings.premiumPlanLimit')}</Label>
                      <Input
                        id="premiumLimit"
                        type="number"
                        value={systemSettings.maxUsersPerPlan.premium}
                        onChange={(e) => setSystemSettings(prev => ({ 
                          ...prev, 
                          maxUsersPerPlan: { ...prev.maxUsersPerPlan, premium: parseInt(e.target.value) }
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="proLimit">{t('admin.settings.professionalPlanLimit')}</Label>
                      <Input
                        id="proLimit"
                        type="number"
                        value={systemSettings.maxUsersPerPlan.professional}
                        onChange={(e) => setSystemSettings(prev => ({ 
                          ...prev, 
                          maxUsersPerPlan: { ...prev.maxUsersPerPlan, professional: parseInt(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings('general')}>
                    <Save className="w-4 h-4 mr-2" />
                    {t('admin.settings.saveChanges')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.settings.paymentIntegration')}</CardTitle>
                <CardDescription>{t('admin.settings.paymentDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Stripe</h3>
                      <p className="text-sm text-muted-foreground">{t('admin.settings.stripeDescription')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={paymentSettings.stripeEnabled ? "secondary" : "outline"} className={paymentSettings.stripeEnabled ? "bg-green-100 text-green-700" : ""}>
                      {paymentSettings.stripeEnabled ? t('admin.settings.enabled') : t('admin.settings.disabled')}
                    </Badge>
                    <Switch
                      checked={paymentSettings.stripeEnabled}
                      onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, stripeEnabled: checked }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">{t('admin.settings.webhookUrl')}</Label>
                    <Input
                      id="webhookUrl"
                      value={paymentSettings.webhookUrl}
                      onChange={(e) => setPaymentSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">{t('admin.settings.taxRate')}</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.01"
                      value={paymentSettings.taxRate}
                      onChange={(e) => setPaymentSettings(prev => ({ ...prev, taxRate: parseFloat(e.target.value) }))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>{t('admin.settings.testMode')}</Label>
                    <p className="text-sm text-muted-foreground">{t('admin.settings.testModeDescription')}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={paymentSettings.testMode ? "secondary" : "outline"} className={paymentSettings.testMode ? "bg-yellow-100 text-yellow-700" : ""}>
                      {paymentSettings.testMode ? t('admin.settings.testMode') : t('admin.settings.liveMode')}
                    </Badge>
                    <Switch
                      checked={paymentSettings.testMode}
                      onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, testMode: checked }))}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleTestPayment}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t('admin.settings.testConnection')}
                  </Button>
                  <Button onClick={() => handleSaveSettings('payment')}>
                    <Save className="w-4 h-4 mr-2" />
                    {t('admin.settings.saveChanges')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.settings.aiConfiguration')}</CardTitle>
                <CardDescription>{t('admin.settings.aiDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="aiModel">{t('admin.settings.aiModel')}</Label>
                  <Select value={systemSettings.aiModel} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, aiModel: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4 (Recomendado)</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">{t('admin.settings.currentModel')}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Cpu className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium">{systemSettings.aiModel.toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground">{t('admin.settings.modelStatus')}: Active</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {t('admin.settings.operational')}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">{t('admin.settings.aiLimits')}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="freeRequests">{t('admin.settings.freeRequestsPerDay')}</Label>
                      <Input id="freeRequests" type="number" defaultValue={100} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="premiumRequests">{t('admin.settings.premiumRequestsPerDay')}</Label>
                      <Input id="premiumRequests" type="number" defaultValue={1000} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="proRequests">{t('admin.settings.proRequestsPerDay')}</Label>
                      <Input id="proRequests" type="number" defaultValue={-1} placeholder="Unlimited" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings('ai')}>
                    <Save className="w-4 h-4 mr-2" />
                    {t('admin.settings.saveChanges')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.settings.securitySettings')}</CardTitle>
                <CardDescription>{t('admin.settings.securityDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>{t('admin.settings.twoFactorRequired')}</Label>
                      <p className="text-sm text-muted-foreground">{t('admin.settings.twoFactorDescription')}</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorRequired}
                      onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorRequired: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>{t('admin.settings.requireStrongPasswords')}</Label>
                      <p className="text-sm text-muted-foreground">{t('admin.settings.strongPasswordDescription')}</p>
                    </div>
                    <Switch
                      checked={securitySettings.requireStrongPasswords}
                      onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireStrongPasswords: checked }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">{t('admin.settings.sessionTimeout')}</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                    />
                    <p className="text-xs text-muted-foreground">{t('admin.settings.minutes')}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxAttempts">{t('admin.settings.maxLoginAttempts')}</Label>
                    <Input
                      id="maxAttempts"
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passwordLength">{t('admin.settings.passwordMinLength')}</Label>
                    <Input
                      id="passwordLength"
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveSettings('security')}>
                    <Save className="w-4 h-4 mr-2" />
                    {t('admin.settings.saveChanges')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.settings.backupSettings')}</CardTitle>
                <CardDescription>{t('admin.settings.backupSettingsDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>{t('admin.settings.automaticBackup')}</Label>
                    <p className="text-sm text-muted-foreground">{t('admin.settings.automaticBackupDescription')}</p>
                  </div>
                  <Switch
                    checked={systemSettings.backupEnabled}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, backupEnabled: checked }))}
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">{t('admin.settings.lastBackup')}</h3>
                      <p className="text-sm text-muted-foreground">2024-01-15 às 03:00</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {t('admin.settings.successful')}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t('admin.settings.backupSize')}</p>
                      <p className="font-medium">2.3 GB</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('admin.settings.nextBackup')}</p>
                      <p className="font-medium">2024-01-16 às 03:00</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('admin.settings.retention')}</p>
                      <p className="font-medium">30 dias</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBackupNow}>
                    <Database className="w-4 h-4 mr-2" />
                    {t('admin.settings.backupNow')}
                  </Button>
                  <Button onClick={() => handleSaveSettings('backup')}>
                    <Save className="w-4 h-4 mr-2" />
                    {t('admin.settings.saveChanges')}
                  </Button>
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