import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  Clock, 
  Users, 
  TrendingUp,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const MetricCard = ({ title, value, subtitle, icon, trend }: MetricCardProps) => (
  <Card className="p-6 hover:shadow-md transition-shadow border-border">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              trend.isPositive 
                ? 'bg-success/10 text-success' 
                : 'bg-destructive/10 text-destructive'
            }`}>
              {trend.isPositive ? '+' : ''}{trend.value}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <div className="p-3 bg-primary/10 rounded-lg">
        {icon}
      </div>
    </div>
  </Card>
);

export const MetricsCards = () => {
  const metrics = [
    {
      title: "Conversas Ativas",
      value: "28",
      subtitle: "Aguardando resposta",
      icon: <MessageSquare className="w-5 h-5 text-primary" />,
      trend: { value: "12%", isPositive: true }
    },
    {
      title: "Tempo Médio Resposta",
      value: "2m 15s",
      subtitle: "Meta: 5 minutos",
      icon: <Clock className="w-5 h-5 text-primary" />,
      trend: { value: "8%", isPositive: false }
    },
    {
      title: "Atendentes Online",
      value: "6",
      subtitle: "De 8 no total",
      icon: <Users className="w-5 h-5 text-primary" />
    },
    {
      title: "Consultas Agendadas",
      value: "45",
      subtitle: "Hoje",
      icon: <CheckCircle className="w-5 h-5 text-primary" />,
      trend: { value: "23%", isPositive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};