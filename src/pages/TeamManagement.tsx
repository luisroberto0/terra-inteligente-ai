import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Users, UserPlus, MoreVertical, Mail, Calendar, Crown, User, Eye, Trash2 } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'member' | 'viewer'
  status: 'active' | 'pending'
  lastActive: string
  joinedAt: string
}

export const TeamManagement = () => {
  const { t } = useLanguage()
  const { toast } = useToast()
  
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@fazenda.com',
      role: 'admin',
      status: 'active',
      lastActive: '2024-01-15',
      joinedAt: '2023-12-01'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@fazenda.com',
      role: 'member',
      status: 'active',
      lastActive: '2024-01-14',
      joinedAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Pedro Oliveira',
      email: 'pedro@email.com',
      role: 'viewer',
      status: 'pending',
      lastActive: '-',
      joinedAt: '2024-01-15'
    }
  ])

  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'member' as const,
    name: ''
  })

  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isProfessionalPlan] = useState(false) // Mock - in production this would come from user subscription

  const handleInviteMember = () => {
    if (!inviteData.email || !inviteData.name) {
      toast({
        title: "Error",
        description: t('messages.error.fillAllFields'),
        variant: "destructive"
      })
      return
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteData.name,
      email: inviteData.email,
      role: inviteData.role,
      status: 'pending',
      lastActive: '-',
      joinedAt: new Date().toISOString().split('T')[0]
    }

    setMembers(prev => [...prev, newMember])
    setInviteData({ email: '', role: 'member', name: '' })
    setIsInviteOpen(false)
    
    toast({
      title: "Member invited",
      description: `Invitation sent to ${inviteData.email}`,
    })
  }

  const handleRemoveMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id))
    toast({
      title: "Member removed",
      description: "Team member has been removed successfully",
    })
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4" />
      case 'member': return <User className="h-4 w-4" />
      case 'viewer': return <Eye className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'default'
      case 'member': return 'secondary'
      case 'viewer': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary'
  }

  if (!isProfessionalPlan) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container py-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t('team.title')}</h1>
              <p className="text-muted-foreground mt-2">{t('team.subtitle')}</p>
            </div>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t('team.upgradeRequired')}
                </CardTitle>
                <CardDescription>
                  Team management is available only on the Professional plan.
                  Upgrade your account to manage team members and their permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg">
                  {t('actions.subscribeNow')} - Professional Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t('team.title')}</h1>
              <p className="text-muted-foreground mt-2">{t('team.subtitle')}</p>
            </div>
            
            <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  {t('team.addMember')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('team.inviteMember')}</DialogTitle>
                  <DialogDescription>
                    Send an invitation to a new team member. They will receive an email with instructions to join.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="memberName">Name</Label>
                    <Input
                      id="memberName"
                      placeholder="Enter member name"
                      value={inviteData.name}
                      onChange={(e) => setInviteData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="memberEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="memberEmail"
                        type="email"
                        placeholder="Enter email address"
                        value={inviteData.email}
                        onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="memberRole">{t('team.role')}</Label>
                    <Select value={inviteData.role} onValueChange={(value: any) => setInviteData(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">{t('team.viewer')}</SelectItem>
                        <SelectItem value="member">{t('team.member')}</SelectItem>
                        <SelectItem value="admin">{t('team.admin')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                    {t('actions.cancel')}
                  </Button>
                  <Button onClick={handleInviteMember}>
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t('team.members')} ({members.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>{t('team.role')}</TableHead>
                    <TableHead>{t('team.status')}</TableHead>
                    <TableHead>{t('team.lastActive')}</TableHead>
                    <TableHead className="text-right">{t('team.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(member.role)} className="flex items-center gap-1 w-fit">
                          {getRoleIcon(member.role)}
                          {t(`team.${member.role}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(member.status)}>
                          {t(`team.${member.status}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {member.lastActive}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Resend Invitation
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t('team.removeMember')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}