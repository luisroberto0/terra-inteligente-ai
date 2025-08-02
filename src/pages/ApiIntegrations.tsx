import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Key, Copy, RefreshCw, Plus, ExternalLink, Webhook, Zap, MessageSquare, Mail, Settings, Trash2 } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

interface WebhookConfig {
  id: string
  name: string
  url: string
  events: string[]
  status: 'active' | 'inactive'
  lastTriggered?: string
}

export const ApiIntegrations = () => {
  const { t } = useLanguage()
  const { toast } = useToast()
  
  const [apiKey] = useState("agroinsight_live_sk_1234567890abcdef")
  const [isKeyVisible, setIsKeyVisible] = useState(false)
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    {
      id: '1',
      name: 'Production Webhook',
      url: 'https://yourapp.com/webhooks/agroinsight',
      events: ['diagnosis.completed', 'alert.created'],
      status: 'active',
      lastTriggered: '2024-01-15T10:30:00Z'
    }
  ])

  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[]
  })
  const [isWebhookDialogOpen, setIsWebhookDialogOpen] = useState(false)

  const availableEvents = [
    'diagnosis.completed',
    'diagnosis.failed', 
    'alert.created',
    'user.updated',
    'subscription.changed'
  ]

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    toast({
      title: "API Key copied",
      description: "The API key has been copied to your clipboard",
    })
  }

  const regenerateApiKey = () => {
    toast({
      title: "API Key regenerated",
      description: "A new API key has been generated. Update your applications with the new key.",
    })
  }

  const addWebhook = () => {
    if (!newWebhook.name || !newWebhook.url) {
      toast({
        title: "Error",
        description: t('messages.error.fillAllFields'),
        variant: "destructive"
      })
      return
    }

    const webhook: WebhookConfig = {
      id: Date.now().toString(),
      name: newWebhook.name,
      url: newWebhook.url,
      events: newWebhook.events,
      status: 'active'
    }

    setWebhooks(prev => [...prev, webhook])
    setNewWebhook({ name: '', url: '', events: [] })
    setIsWebhookDialogOpen(false)
    
    toast({
      title: "Webhook created",
      description: `Webhook "${newWebhook.name}" has been created successfully`,
    })
  }

  const deleteWebhook = (id: string) => {
    setWebhooks(prev => prev.filter(webhook => webhook.id !== id))
    toast({
      title: "Webhook deleted",
      description: "The webhook has been deleted successfully",
    })
  }

  const testWebhook = (webhook: WebhookConfig) => {
    toast({
      title: "Webhook tested",
      description: `Test payload sent to ${webhook.name}`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('api.title')}</h1>
            <p className="text-muted-foreground mt-2">{t('api.subtitle')}</p>
          </div>

          {/* API Key Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                {t('api.apiKey')}
              </CardTitle>
              <CardDescription>
                Use this key to authenticate API requests to AgroInsight AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input
                    type={isKeyVisible ? "text" : "password"}
                    value={apiKey}
                    readOnly
                    className="font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsKeyVisible(!isKeyVisible)}
                  >
                    {isKeyVisible ? "Hide" : "Show"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyApiKey}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={regenerateApiKey}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t('api.regenerateKey')}
                </Button>
                <Button variant="outline" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t('api.apiDocs')}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* API Usage Example */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>
                Here's a simple example of how to use the AgroInsight AI API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Create a diagnosis</Label>
                  <Textarea
                    readOnly
                    className="font-mono text-sm"
                    value={`curl -X POST "https://api.agroinsight.ai/v1/diagnosis" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "crop_type": "soja",
    "image_url": "https://example.com/crop-image.jpg",
    "location": {
      "lat": -23.5505,
      "lng": -46.6333
    }
  }'`}
                    rows={8}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Webhooks Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Webhook className="h-5 w-5" />
                    {t('api.webhooks')}
                  </CardTitle>
                  <CardDescription>
                    Configure webhooks to receive real-time notifications
                  </CardDescription>
                </div>
                
                <Dialog open={isWebhookDialogOpen} onOpenChange={setIsWebhookDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      {t('api.addWebhook')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('api.addWebhook')}</DialogTitle>
                      <DialogDescription>
                        Create a new webhook to receive events from AgroInsight AI
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Webhook Name</Label>
                        <Input
                          placeholder="Production Webhook"
                          value={newWebhook.name}
                          onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>{t('api.webhookUrl')}</Label>
                        <Input
                          placeholder="https://yourapp.com/webhooks/agroinsight"
                          value={newWebhook.url}
                          onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>{t('api.events')}</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {availableEvents.map((event) => (
                            <label key={event} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={newWebhook.events.includes(event)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewWebhook(prev => ({ ...prev, events: [...prev.events, event] }))
                                  } else {
                                    setNewWebhook(prev => ({ ...prev, events: prev.events.filter(e => e !== event) }))
                                  }
                                }}
                              />
                              <span className="text-sm">{event}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsWebhookDialogOpen(false)}>
                        {t('actions.cancel')}
                      </Button>
                      <Button onClick={addWebhook}>
                        Create Webhook
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {webhooks.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Triggered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {webhooks.map((webhook) => (
                      <TableRow key={webhook.id}>
                        <TableCell className="font-medium">{webhook.name}</TableCell>
                        <TableCell className="font-mono text-sm">{webhook.url}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {webhook.events.map((event) => (
                              <Badge key={event} variant="outline" className="text-xs">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={webhook.status === 'active' ? 'default' : 'secondary'}>
                            {webhook.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{webhook.lastTriggered || 'Never'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => testWebhook(webhook)}
                            >
                              Test
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteWebhook(webhook.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No webhooks configured yet. Create your first webhook to get started.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Available Integrations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                {t('api.integrations')}
              </CardTitle>
              <CardDescription>
                Connect AgroInsight AI with your favorite tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Zap className="h-8 w-8 text-orange-500 mb-2" />
                    <h3 className="font-semibold">Zapier</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Automate workflows with 5000+ apps
                    </p>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <MessageSquare className="h-8 w-8 text-purple-500 mb-2" />
                    <h3 className="font-semibold">Slack</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get alerts in your Slack channels
                    </p>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Mail className="h-8 w-8 text-blue-500 mb-2" />
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send custom email notifications
                    </p>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}