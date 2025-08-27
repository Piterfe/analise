import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  User, 
  Shield,
  MessageSquare,
  BarChart3
} from "lucide-react";

interface UserSelectorProps {
  onSelectUser: (role: 'attendant' | 'manager') => void;
}

export const UserSelector = ({ onSelectUser }: UserSelectorProps) => {
  const [selectedRole, setSelectedRole] = useState<'attendant' | 'manager' | null>(null);

  const roles = [
    {
      id: 'manager' as const,
      title: 'Gerente',
      subtitle: 'Dr. Maria Silva',
      description: 'Acesso completo ao dashboard executivo, gerenciamento de equipe e relatórios avançados',
      icon: Shield,
      color: 'from-primary to-primary-light',
      features: ['Dashboard Executivo', 'Gerenciamento de Equipe', 'Relatórios Avançados', 'Supervisão em Tempo Real']
    },
    {
      id: 'attendant' as const,
      title: 'Atendente',
      subtitle: 'Ana Costa',
      description: 'Interface focada no atendimento, histórico de conversas e ferramentas de produtividade',
      icon: User,
      color: 'from-success to-success/80',
      features: ['Caixa de Entrada Unificada', 'Histórico de Pacientes', 'Respostas Rápidas', 'Agenda Integrada']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-soft flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Clínica Digital</h1>
              <p className="text-muted-foreground">Sistema Omnichannel</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-2">Selecione seu perfil de acesso</p>
          <Badge variant="outline" className="px-3 py-1">
            Sistema de Demonstração
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card 
                key={role.id}
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedRole === role.id 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
                    <p className="text-muted-foreground">{role.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {role.description}
                </p>

                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-medium text-foreground">Funcionalidades:</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  variant={selectedRole === role.id ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectUser(role.id);
                  }}
                >
                  {selectedRole === role.id ? "Acessar Sistema" : "Selecionar"}
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Esta é uma demonstração do sistema. Em produção, o login seria feito via autenticação segura.
          </p>
        </div>
      </div>
    </div>
  );
};