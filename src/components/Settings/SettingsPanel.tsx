import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Bell,
  Shield,
  Clock,
  MessageSquare,
  Users,
  Database,
  Palette,
  Save
} from "lucide-react";

interface SettingsPanelProps {
  onBackToMenu: () => void;
}

export const SettingsPanel = ({ onBackToMenu }: SettingsPanelProps) => {
  const [settings, setSettings] = useState({
    autoResponse: true,
    emailNotifications: true,
    smsReminders: false,
    workingHours: "08:00-18:00",
    maxWaitTime: "5",
    clinicName: "Clínica Digital",
    adminEmail: "admin@clinicadigital.com"
  });

  const handleSave = () => {
    // Simulate save action
    console.log("Configurações salvas:", settings);
  };

  const integrations = [
    { name: "WhatsApp Business", status: "connected", color: "success" },
    { name: "Instagram Direct", status: "connected", color: "success" },
    { name: "Facebook Messenger", status: "disconnected", color: "secondary" },
    { name: "Gmail", status: "connected", color: "success" },
    { name: "Sistema de Prontuário", status: "pending", color: "warning" }
  ];

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBackToMenu}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Menu
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Configurações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clinicName">Nome da Clínica</Label>
              <Input 
                id="clinicName"
                value={settings.clinicName}
                onChange={(e) => setSettings({...settings, clinicName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminEmail">E-mail do Administrador</Label>
              <Input 
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workingHours">Horário de Funcionamento</Label>
              <Input 
                id="workingHours"
                value={settings.workingHours}
                onChange={(e) => setSettings({...settings, workingHours: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Atendimento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Atendimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Resposta Automática</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar mensagem automática quando paciente entrar em contato
                </p>
              </div>
              <Switch
                checked={settings.autoResponse}
                onCheckedChange={(checked) => setSettings({...settings, autoResponse: checked})}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="maxWaitTime">Tempo Máximo de Espera (minutos)</Label>
              <Input 
                id="maxWaitTime"
                type="number"
                value={settings.maxWaitTime}
                onChange={(e) => setSettings({...settings, maxWaitTime: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações por E-mail</Label>
                <p className="text-sm text-muted-foreground">
                  Receber alertas por e-mail sobre novos atendimentos
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Lembretes por SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar lembretes de consulta por SMS
                </p>
              </div>
              <Switch
                checked={settings.smsReminders}
                onCheckedChange={(checked) => setSettings({...settings, smsReminders: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Integrações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Integrações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {integrations.map((integration) => (
                <div key={integration.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium text-foreground">{integration.name}</span>
                  <Badge 
                    variant={integration.color === 'success' ? 'default' : 
                            integration.color === 'warning' ? 'secondary' : 'outline'}
                    className={
                      integration.color === 'success' ? 'bg-success text-success-foreground' :
                      integration.color === 'warning' ? 'bg-warning text-warning-foreground' :
                      ''
                    }
                  >
                    {integration.status === 'connected' ? 'Conectado' :
                     integration.status === 'pending' ? 'Pendente' : 'Desconectado'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};