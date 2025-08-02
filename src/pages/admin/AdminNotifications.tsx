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
  Bell, 
  Send, 
  Users, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Plus
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export const AdminNotifications = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    targetAudience: 'all',
    priority: 'normal',
    sendImmediately: true,
    scheduledDate: '',
    scheduledTime: ''
  });

  // Mock data - In real app, this would come from API
  const sentNotifications = [
    {
      id: 1,
      title: "Nova funcionalidade: Análise de Solo Avançada",
      message: "Agora você pode realizar análises mais detalhadas...",
      audience: "premium",
      sentAt: "2024-01-15T10:30:00",
      status: "sent",
      openRate: 78,
      clickRate: 12
    },
    {
      id: 2,
      title: "Manutenção programada do sistema",
      message: "O sistema ficará indisponível das 2h às 4h...",
      audience: "all",
      sentAt: "2024-01-14T18:00:00",
      status: "sent",
      openRate: 92,
      clickRate: 5
    },
    {
      id: 3,
      title: "Promoção especial para usuários Premium",
      message: "Aproveite desconto no upgrade para Professional...",
      audience: "premium",
      sentAt: "2024-01-13T09:15:00",
      status: "scheduled",
      openRate: 0,
      clickRate: 0
    }
  ];

  const handleSendNotification = () => {
    // In real app, this would send the notification via API
    toast({
      title: t('admin.notifications.notificationSent'),
      description: t('admin.notifications.notificationSentDescription'),
    });
    
    // Reset form
    setNotificationForm({
      title: '',
      message: '',
      targetAudience: 'all',
      priority: 'normal',
      sendImmediately: true,
      scheduledDate: '',
      scheduledTime: ''
    });
  };

  const getAudienceBadge = (audience: string) => {
    switch (audience) {
      case "all":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">{t('admin.notifications.allUsers')}</Badge>;
      case "free":
        return <Badge variant="outline">Free Users</Badge>;
      case "premium":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-700">Premium Users</Badge>;
      case "professional":
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Professional Users</Badge>;
      default:
        return <Badge variant="outline">{audience}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge variant="secondary" className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />{t('admin.notifications.sent')}</Badge>;
      case "scheduled":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" />{t('admin.notifications.scheduled')}</Badge>;
      case "draft":
        return <Badge variant="outline">{t('admin.notifications.draft')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t('admin.notifications.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('admin.notifications.subtitle')}</p>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList>
            <TabsTrigger value="create">{t('admin.notifications.createNotification')}</TabsTrigger>
            <TabsTrigger value="history">{t('admin.notifications.history')}</TabsTrigger>
            <TabsTrigger value="templates">{t('admin.notifications.templates')}</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.notifications.createNew')}</CardTitle>
                <CardDescription>{t('admin.notifications.createDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">{t('admin.notifications.title')}</Label>
                    <Input
                      id="title"
                      value={notificationForm.title}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder={t('admin.notifications.titlePlaceholder')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="audience">{t('admin.notifications.targetAudience')}</Label>
                    <Select 
                      value={notificationForm.targetAudience} 
                      onValueChange={(value) => setNotificationForm(prev => ({ ...prev, targetAudience: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('admin.notifications.allUsers')}</SelectItem>
                        <SelectItem value="free">Free Users</SelectItem>
                        <SelectItem value="premium">Premium Users</SelectItem>
                        <SelectItem value="professional">Professional Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('admin.notifications.message')}</Label>
                  <Textarea
                    id="message"
                    value={notificationForm.message}
                    onChange={(e) => setNotificationForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={t('admin.notifications.messagePlaceholder')}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">{t('admin.notifications.priority')}</Label>
                    <Select 
                      value={notificationForm.priority} 
                      onValueChange={(value) => setNotificationForm(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{t('admin.notifications.lowPriority')}</SelectItem>
                        <SelectItem value="normal">{t('admin.notifications.normalPriority')}</SelectItem>
                        <SelectItem value="high">{t('admin.notifications.highPriority')}</SelectItem>
                        <SelectItem value="urgent">{t('admin.notifications.urgentPriority')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="immediate"
                        checked={notificationForm.sendImmediately}
                        onCheckedChange={(checked) => setNotificationForm(prev => ({ ...prev, sendImmediately: checked }))}
                      />
                      <Label htmlFor="immediate">{t('admin.notifications.sendImmediately')}</Label>
                    </div>
                  </div>
                </div>

                {!notificationForm.sendImmediately && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">{t('admin.notifications.scheduledDate')}</Label>
                      <Input
                        id="date"
                        type="date"
                        value={notificationForm.scheduledDate}
                        onChange={(e) => setNotificationForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">{t('admin.notifications.scheduledTime')}</Label>
                      <Input
                        id="time"
                        type="time"
                        value={notificationForm.scheduledTime}
                        onChange={(e) => setNotificationForm(prev => ({ ...prev, scheduledTime: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    {t('admin.notifications.saveDraft')}
                  </Button>
                  <Button onClick={handleSendNotification}>
                    <Send className="w-4 h-4 mr-2" />
                    {notificationForm.sendImmediately ? t('admin.notifications.sendNow') : t('admin.notifications.schedule')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.notifications.notificationHistory')}</CardTitle>
                <CardDescription>{t('admin.notifications.historyDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sentNotifications.map((notification) => (
                    <div key={notification.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message.substring(0, 100)}...
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(notification.status)}
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {getAudienceBadge(notification.audience)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(notification.sentAt).toLocaleString()}
                        </div>
                        {notification.status === 'sent' && (
                          <>
                            <div>
                              {t('admin.notifications.openRate')}: {notification.openRate}%
                            </div>
                            <div>
                              {t('admin.notifications.clickRate')}: {notification.clickRate}%
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{t('admin.notifications.templates')}</CardTitle>
                    <CardDescription>{t('admin.notifications.templatesDescription')}</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    {t('admin.notifications.createTemplate')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{t('admin.notifications.systemMaintenance')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t('admin.notifications.maintenanceTemplate')}
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          {t('admin.notifications.useTemplate')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{t('admin.notifications.newFeature')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t('admin.notifications.featureTemplate')}
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          {t('admin.notifications.useTemplate')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{t('admin.notifications.billing')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t('admin.notifications.billingTemplate')}
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          {t('admin.notifications.useTemplate')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{t('admin.notifications.promotion')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t('admin.notifications.promotionTemplate')}
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          {t('admin.notifications.useTemplate')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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