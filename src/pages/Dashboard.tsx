import { useState } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { MetricsCards } from "@/components/Dashboard/MetricsCards";
import { TeamMetrics } from "@/components/Dashboard/TeamMetrics";
import { ActivityChart } from "@/components/Dashboard/ActivityChart";
import { ChatInterface } from "@/components/Chat/ChatInterface";
import { SettingsPanel } from "@/components/Settings/SettingsPanel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Filter, 
  Download,
  RefreshCw,
  Calendar,
  Clock
} from "lucide-react";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole] = useState<'attendant' | 'manager'>('manager');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <MetricsCards />
            <ActivityChart />
            <TeamMetrics />
          </div>
        );
      case 'inbox':
        return <ChatInterface />;
      case 'team':
        return <TeamMetrics />;
      case 'metrics':
        return <ActivityChart />;
      case 'settings':
        return <SettingsPanel onBackToMenu={() => setActiveTab('dashboard')} />;
      default:
        return (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Em Desenvolvimento</h3>
            <p className="text-muted-foreground">Esta funcionalidade estará disponível em breve.</p>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background-soft flex">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        userRole={userRole}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {activeTab === 'dashboard' && 'Dashboard Executivo'}
                {activeTab === 'inbox' && 'Caixa de Entrada'}
                {activeTab === 'team' && 'Gerenciamento de Equipe'}
                {activeTab === 'metrics' && 'Análise de Métricas'}
                {activeTab === 'settings' && 'Configurações do Sistema'}
                {!['dashboard', 'inbox', 'team', 'metrics', 'settings'].includes(activeTab) && 'Sistema Omnichannel'}
              </h1>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Última atualização: agora</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  28 conversas ativas
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};