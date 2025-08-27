import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const hourlyData = [
  { hour: '08:00', messages: 12, resolved: 8 },
  { hour: '09:00', messages: 25, resolved: 18 },
  { hour: '10:00', messages: 35, resolved: 28 },
  { hour: '11:00', messages: 42, resolved: 35 },
  { hour: '12:00', messages: 18, resolved: 15 },
  { hour: '13:00', messages: 22, resolved: 20 },
  { hour: '14:00', messages: 38, resolved: 32 },
  { hour: '15:00', messages: 45, resolved: 38 },
  { hour: '16:00', messages: 52, resolved: 45 },
  { hour: '17:00', messages: 35, resolved: 30 },
];

const channelData = [
  { channel: 'WhatsApp', messages: 156, color: '#25D366' },
  { channel: 'Instagram', messages: 89, color: '#E4405F' },
  { channel: 'E-mail', messages: 45, color: '#1877F2' },
  { channel: 'Site', messages: 23, color: '#6366F1' },
];

export const ActivityChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Hourly Activity */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Atividade por Hora</h3>
          <p className="text-sm text-muted-foreground">Mensagens recebidas vs resolvidas</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="messagesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="hour" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Area
                type="monotone"
                dataKey="messages"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#messagesGradient)"
                name="Mensagens"
              />
              <Area
                type="monotone"
                dataKey="resolved"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#resolvedGradient)"
                name="Resolvidas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Channel Distribution */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Distribuição por Canal</h3>
          <p className="text-sm text-muted-foreground">Mensagens recebidas hoje</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                dataKey="channel"
                type="category"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={80}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar 
                dataKey="messages" 
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
                name="Mensagens"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Channel Summary */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {channelData.map((channel) => (
            <div key={channel.channel} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: channel.color }}
                />
                <span className="text-sm font-medium text-foreground">{channel.channel}</span>
              </div>
              <span className="text-sm text-muted-foreground">{channel.messages}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};