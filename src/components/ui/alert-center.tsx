import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, AlertTriangle, Cloud, Settings, CheckCheck } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface Alert {
  id: string
  type: 'lowViability' | 'extremeWeather' | 'systemUpdate'
  title: string
  message: string
  timestamp: string
  read: boolean
  severity: 'low' | 'medium' | 'high'
}

export const AlertCenter = () => {
  const { t } = useLanguage()
  
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'lowViability',
      title: 'Low Soil Viability Detected',
      message: 'Soil viability in Field A has dropped below 65%. Immediate attention required.',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      severity: 'high'
    },
    {
      id: '2',
      type: 'extremeWeather',
      title: 'Heavy Rain Warning',
      message: 'Heavy rainfall expected in the next 48 hours. Consider protective measures.',
      timestamp: '2024-01-15T08:15:00Z',
      read: false,
      severity: 'medium'
    },
    {
      id: '3',
      type: 'systemUpdate',
      title: 'AI Model Updated',
      message: 'Our diagnostic AI has been updated with improved accuracy for coffee crops.',
      timestamp: '2024-01-14T14:20:00Z',
      read: true,
      severity: 'low'
    }
  ])

  const unreadCount = alerts.filter(alert => !alert.read).length

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })))
  }

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'lowViability': return <AlertTriangle className="h-4 w-4" />
      case 'extremeWeather': return <Cloud className="h-4 w-4" />
      case 'systemUpdate': return <Settings className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-destructive'
      case 'medium': return 'text-warning'
      case 'low': return 'text-muted-foreground'
      default: return 'text-muted-foreground'
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${t('alerts.minutes')} ${t('alerts.timeAgo')}`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} ${t('alerts.hours')} ${t('alerts.timeAgo')}`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} ${t('alerts.days')} ${t('alerts.timeAgo')}`
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t('alerts.title')}
            {unreadCount > 0 && (
              <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              <CheckCheck className="h-3 w-3 mr-1" />
              {t('alerts.markAllRead')}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          {alerts.length > 0 ? (
            <div className="space-y-1 p-4 pt-0">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent/50 ${
                    !alert.read ? 'bg-primary/5 border-primary/20' : 'bg-background'
                  }`}
                  onClick={() => markAsRead(alert.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${getSeverityColor(alert.severity)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${!alert.read ? 'font-semibold' : ''}`}>
                          {alert.title}
                        </p>
                        {!alert.read && (
                          <div className="h-2 w-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimeAgo(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">{t('alerts.noAlerts')}</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}