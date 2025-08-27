import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Phone, 
  Mail, 
  MessageCircle, 
  MoreVertical,
  Clock,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'patient' | 'attendant';
  timestamp: string;
  channel: 'whatsapp' | 'instagram' | 'email' | 'website';
}

interface Conversation {
  id: string;
  patientName: string;
  channel: 'whatsapp' | 'instagram' | 'email' | 'website';
  lastMessage: string;
  timestamp: string;
  unread: number;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'waiting' | 'resolved';
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    patientName: 'Maria Santos',
    channel: 'whatsapp',
    lastMessage: 'Preciso remarcar minha consulta para...',
    timestamp: '2 min',
    unread: 2,
    priority: 'high',
    status: 'active'
  },
  {
    id: '2', 
    patientName: 'João Silva',
    channel: 'instagram',
    lastMessage: 'Quais documentos preciso levar?',
    timestamp: '5 min',
    unread: 1,
    priority: 'medium',
    status: 'waiting'
  },
  {
    id: '3',
    patientName: 'Ana Costa',
    channel: 'email',
    lastMessage: 'Obrigada pelo atendimento!',
    timestamp: '15 min',
    unread: 0,
    priority: 'low',
    status: 'resolved'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Olá, boa tarde! Preciso remarcar minha consulta para a próxima semana.',
    sender: 'patient',
    timestamp: '14:32',
    channel: 'whatsapp'
  },
  {
    id: '2',
    content: 'Boa tarde, Maria! Claro, vou verificar a disponibilidade na agenda.',
    sender: 'attendant',
    timestamp: '14:33',
    channel: 'whatsapp'
  },
  {
    id: '3',
    content: 'Temos horário disponível na terça-feira às 10h ou quinta-feira às 15h. Qual prefere?',
    sender: 'attendant', 
    timestamp: '14:34',
    channel: 'whatsapp'
  }
];

const getChannelIcon = (channel: string) => {
  switch(channel) {
    case 'whatsapp': return <Phone className="w-4 h-4" />;
    case 'instagram': return <MessageCircle className="w-4 h-4" />;
    case 'email': return <Mail className="w-4 h-4" />;
    default: return <MessageCircle className="w-4 h-4" />;
  }
};

const getChannelColor = (channel: string) => {
  switch(channel) {
    case 'whatsapp': return 'bg-green-500';
    case 'instagram': return 'bg-pink-500';
    case 'email': return 'bg-blue-500';
    default: return 'bg-gray-500';
  }
};

export const ChatInterface = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would add the message to the conversation
      setMessage('');
    }
  };

  return (
    <div className="flex h-full gap-6">
      {/* Conversations List */}
      <Card className="w-1/3 flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Conversas Ativas</h3>
          <p className="text-sm text-muted-foreground">28 aguardando resposta</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "p-4 border-b border-border cursor-pointer hover:bg-accent transition-colors",
                selectedConversation === conversation.id && "bg-primary/5 border-l-4 border-l-primary"
              )}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", getChannelColor(conversation.channel))} />
                  <span className="font-medium text-foreground">{conversation.patientName}</span>
                  {conversation.unread > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {conversation.timestamp}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground truncate mb-2">
                {conversation.lastMessage}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {getChannelIcon(conversation.channel)}
                  <span className="text-xs text-muted-foreground capitalize">
                    {conversation.channel}
                  </span>
                </div>
                <Badge 
                  variant={conversation.status === 'active' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {conversation.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Maria Santos</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>WhatsApp</span>
                <span>•</span>
                <span>Online agora</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.sender === 'attendant' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] p-3 rounded-lg",
                  msg.sender === 'attendant'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={cn(
                  "text-xs mt-1",
                  msg.sender === 'attendant' 
                    ? "text-primary-foreground/70" 
                    : "text-muted-foreground/70"
                )}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};