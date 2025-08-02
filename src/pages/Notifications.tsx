import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Mail, MessageSquare, Thermometer, AlertTriangle, TrendingDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export function Notifications() {
  const { t } = useLanguage();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [viabilityThreshold, setViabilityThreshold] = useState("50");
  const [productivityThreshold, setProductivityThreshold] = useState("60");

  const handleSaveSettings = () => {
    toast.success(t('messages.success.settingsSaved'));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('notifications.title')}</h1>
          <p className="text-muted-foreground">{t('notifications.subtitle')}</p>
        </div>

        <div className="grid gap-6">
          {/* Canais de Notificação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                {t('notifications.channels')}
              </CardTitle>
              <CardDescription>
                {t('notifications.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <Label htmlFor="email-notifications" className="text-base font-medium">{t('notifications.email')}</Label>
                    <p className="text-sm text-muted-foreground">{t('notifications.emailDesc')}</p>
                  </div>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <div>
                    <Label htmlFor="sms-notifications" className="text-base font-medium">{t('notifications.sms')}</Label>
                    <p className="text-sm text-muted-foreground">{t('notifications.smsDesc')}</p>
                  </div>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={smsEnabled}
                  onCheckedChange={setSmsEnabled}
                />
              </div>

              {smsEnabled && (
                <div className="ml-8 space-y-2">
                  <Label htmlFor="phone">{t('notifications.phoneNumber')}</Label>
                  <Input
                    id="phone"
                    placeholder="(11) 99999-9999"
                    className="max-w-xs"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tipos de Alertas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                {t('notifications.alertTypes')}
              </CardTitle>
              <CardDescription>
                {t('notifications.thresholdsDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                    <div>
                      <h4 className="font-medium">{t('notifications.lowViability')}</h4>
                      <p className="text-sm text-muted-foreground">{t('notifications.lowViabilityDesc')}</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="h-5 w-5 text-destructive" />
                    <div>
                      <h4 className="font-medium">{t('notifications.extremeWeather')}</h4>
                      <p className="text-sm text-muted-foreground">{t('notifications.extremeWeatherDesc')}</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                      <h4 className="font-medium">{t('notifications.analysisFailure')}</h4>
                      <p className="text-sm text-muted-foreground">{t('notifications.analysisFailureDesc')}</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limites de Alerta */}
          <Card>
            <CardHeader>
              <CardTitle>{t('notifications.thresholds')}</CardTitle>
              <CardDescription>
                {t('notifications.thresholdsDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="viability">{t('notifications.soilViability')}</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{t('notifications.alertWhen')}</span>
                    <Input
                      id="viability"
                      type="number"
                      value={viabilityThreshold}
                      onChange={(e) => setViabilityThreshold(e.target.value)}
                      className="w-20"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productivity">{t('notifications.productivity')}</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{t('notifications.alertWhen')}</span>
                    <Input
                      id="productivity"
                      type="number"
                      value={productivityThreshold}
                      onChange={(e) => setProductivityThreshold(e.target.value)}
                      className="w-20"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-conditions">{t('notifications.customConditions')}</Label>
                <Textarea
                  id="custom-conditions"
                  placeholder={t('notifications.customConditionsPlaceholder')}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline">{t('actions.cancel')}</Button>
            <Button onClick={handleSaveSettings}>{t('notifications.saveSettings')}</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}