import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { User } from "lucide-react"

interface DashboardHeaderProps {
  farmName?: string
  userName?: string
}

export const DashboardHeader = ({ 
  farmName = "Fazenda São João", 
  userName = "João Silva" 
}: DashboardHeaderProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bom dia"
    if (hour < 18) return "Boa tarde"
    return "Boa noite"
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            {farmName}
          </h1>
          <p className="text-sm text-muted-foreground">
            {getGreeting()}, {userName.split(' ')[0]}!
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          <User className="mr-2 h-4 w-4" />
          Assinar Premium
        </Button>
        
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}