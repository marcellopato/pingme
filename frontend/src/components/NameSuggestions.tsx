import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Copy, Globe } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const NameSuggestions: React.FC = () => {
  const { toast } = useToast();

  const suggestions = [
    { name: 'ConnectSphere', description: 'Global connection platform' },
    { name: 'VoiceFlow', description: 'Where ideas flow freely' },
    { name: 'ThoughtBridge', description: 'Bridging minds worldwide' },
    { name: 'EchoNet', description: 'Your voice, amplified' },
    { name: 'MindLink', description: 'Connecting thoughts globally' },
    { name: 'IdeaStream', description: 'Stream of consciousness' },
    { name: 'SocialWave', description: 'Riding the social wave' },
    { name: 'ConnectHub', description: 'Central hub for connections' },
    { name: 'ThoughtSpace', description: 'Space for your thoughts' },
    { name: 'VoiceVerse', description: 'Universe of voices' },
    { name: 'LinkSphere', description: 'Spherical social linking' },
    { name: 'EchoSpace', description: 'Where echoes resonate' }
  ];

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    toast({
      title: 'Copiado!',
      description: `${name} foi copiado para a área de transferência.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <Globe className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h1 className="text-3xl font-bold mb-2">Sugestões de Nomes Internacionais</h1>
        <p className="text-gray-600">Para sua nova rede social</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {suggestion.name}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(suggestion.name)}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{suggestion.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NameSuggestions;