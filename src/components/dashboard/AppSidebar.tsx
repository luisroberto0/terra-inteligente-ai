import { useState } from "react"
import { BarChart3, TrendingUp, History, User, Leaf, LogOut, Bell, Crown, UserCheck } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const { t } = useLanguage()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const items = [
    { title: t('dashboard.diagnostics'), url: "/dashboard", icon: BarChart3 },
    { title: t('dashboard.advanced'), url: "/dashboard/advanced", icon: TrendingUp },
    { title: t('dashboard.executive'), url: "/dashboard/executive", icon: Crown },
    { title: t('dashboard.consulting'), url: "/dashboard/consulting", icon: UserCheck },
    { title: t('dashboard.notifications'), url: "/dashboard/notifications", icon: Bell },
    { title: t('dashboard.history'), url: "/dashboard/history", icon: History },
    { title: t('dashboard.account'), url: "/dashboard/account", icon: User },
  ]

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-primary">
            <Leaf className="h-5 w-5" />
            {!collapsed && <span>AgroInsight AI</span>}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={() => window.location.href = "/"}
                    className="hover:bg-muted/50 text-destructive hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    {!collapsed && <span>{t('dashboard.logout')}</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}