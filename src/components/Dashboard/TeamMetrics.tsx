import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  MessageSquare, 
  Clock, 
  TrendingUp,
  Circle
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'away' | 'offline';
  activeChats: number;
  avgResponseTime: string;
  resolvedToday: number;
  satisfaction: number;
}

const mockTeamData: TeamMember[] = [
  {
    id: '1',
    name: 'Ana Costa',
    role: 'Atendente Senior',
    status: 'online',
    activeChats: 5,
    avgResponseTime: '1m 30s',
    resolvedToday: 12,
    satisfaction: 4.8
  },
  {
    id: '2',
    name: 'Carlos Santos',
    role: 'Atendente',
    status: 'online', 
    activeChats: 3,
    avgResponseTime: '2m 15s',
    resolvedToday: 8,
    satisfaction: 4.6
  },
  {
    id: '3',
    name: 'Lucia Ferreira',
    role: 'Atendente Senior',
    status: 'away',
    activeChats: 2,
    avgResponseTime: '1m 45s',
    resolvedToday: 15,
    satisfaction: 4.9
  },
  {
    id: '4',
    name: 'Pedro Lima',
    role: 'Atendente',
    status: 'offline',
    activeChats: 0,
    avgResponseTime: '3m 20s',
    resolvedToday: 6,
    satisfaction: 4.3
  }
];

const getStatusColor = (status: string) => {
  switch(status) {
    case 'online': return 'bg-success';
    case 'away': return 'bg-warning';
    case 'offline': return 'bg-muted-foreground';
    default: return 'bg-muted-foreground';
  }
};

const getStatusText = (status: string) => {
  switch(status) {
    case 'online': return 'Disponível';
    case 'away': return 'Ausente';
    case 'offline': return 'Offline';
    default: return 'Desconhecido';
  }
};

export const TeamMetrics = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance da Equipe</h3>
          <p className="text-sm text-muted-foreground">Métricas em tempo real dos atendentes</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {mockTeamData.filter(member => member.status === 'online').length} online
        </Badge>
      </div>

      <div className="space-y-4">
        {mockTeamData.map((member) => (
          <div key={member.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-card`} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{member.name}</h4>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <Badge 
                variant={member.status === 'online' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {getStatusText(member.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MessageSquare className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Conversas Ativas</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{member.activeChats}</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Tempo Médio</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{member.avgResponseTime}</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Resolvidos Hoje</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{member.resolvedToday}</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Circle className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Satisfação</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-lg font-semibold text-foreground">{member.satisfaction}</p>
                  <span className="text-xs text-muted-foreground">/5.0</span>
                </div>
              </div>
            </div>

            {/* Performance Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Performance Diária</span>
                <span>{Math.round(member.satisfaction * 20)}%</span>
              </div>
              <Progress value={member.satisfaction * 20} className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};