import { cn } from "@/lib/utils";
import { 
  MessageSquare, 
  BarChart3, 
  Users, 
  Settings, 
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: 'attendant' | 'manager';
}

export const Sidebar = ({ activeTab, onTabChange, userRole }: SidebarProps) => {
  const attendantMenuItems = [
    { id: 'inbox', label: 'Caixa de Entrada', icon: MessageSquare },
    { id: 'history', label: 'Histórico', icon: MessageCircle },
    { id: 'calendar', label: 'Agenda', icon: Calendar },
  ];

  const managerMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'inbox', label: 'Caixa de Entrada', icon: MessageSquare },
    { id: 'team', label: 'Equipe', icon: Users },
    { id: 'metrics', label: 'Métricas', icon: Activity },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const menuItems = userRole === 'manager' ? managerMenuItems : attendantMenuItems;

  const channels = [
    { id: 'whatsapp', label: 'WhatsApp', icon: Phone, count: 12 },
    { id: 'instagram', label: 'Instagram', icon: MessageCircle, count: 8 },
    { id: 'email', label: 'E-mail', icon: Mail, count: 5 },
    { id: 'website', label: 'Site', icon: MessageSquare, count: 3 },
  ];

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Clínica Digital</h2>
            <p className="text-xs text-muted-foreground">Sistema Omnichannel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  activeTab === item.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* Channels */}
        <div className="mt-8">
          <h3 className="font-medium text-sm text-muted-foreground mb-3 px-2">Canais Ativos</h3>
          <div className="space-y-1">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div key={channel.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{channel.label}</span>
                  </div>
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                    {channel.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-success-foreground">
              {userRole === 'manager' ? 'GM' : 'AT'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {userRole === 'manager' ? 'Dr. Maria Silva' : 'Ana Costa'}
            </p>
            <p className="text-xs text-muted-foreground">
              {userRole === 'manager' ? 'Gerente' : 'Atendente'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};