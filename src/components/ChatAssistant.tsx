
import { useState, useRef, useEffect } from 'react';
import { Car } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatAssistantProps {
  car: Car;
}

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

const ChatAssistant: React.FC<ChatAssistantProps> = ({ car }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm your Vehicle Care Assistant for your ${car.year} ${car.make} ${car.model}. How can I help you today?`,
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Check if API key exists in environment
  const apiKeyExists = import.meta.env.VITE_AI_ASSISTANT_API_KEY !== undefined;

  // Fallback responses for when API is not available
  const sampleResponses: Record<string, string> = {
    'oil': `For your ${car.year} ${car.make} ${car.model}, I recommend changing the oil every 5,000 to 7,500 miles under normal driving conditions. If you frequently drive in severe conditions (short trips, extreme temperatures, towing), consider changing it every 3,000 to 5,000 miles.`,
    'tire': `Tire rotation for your ${car.year} ${car.make} ${car.model} should be done every 5,000 to 8,000 miles to ensure even wear. Tire pressure should be checked monthly, and they should be inflated to the manufacturer's recommended PSI (usually found on a sticker in the driver's door jamb).`,
    'brake': `Brake pads on your ${car.year} ${car.make} ${car.model} typically need replacement every 30,000 to 70,000 miles, depending on your driving habits. Signs you need new brakes include squealing/grinding noises, vibration when braking, or a soft brake pedal.`,
    'battery': `The battery in your ${car.year} ${car.make} ${car.model} typically lasts 3-5 years. Signs of a failing battery include slow engine cranking, dimming lights, or electronic issues. I recommend having it tested annually after it's 2 years old.`,
    'service': `Based on the manufacturer's recommendations for your ${car.year} ${car.make} ${car.model}, you should follow a regular maintenance schedule including oil changes every 5,000-7,500 miles, tire rotations every 5,000-8,000 miles, and comprehensive inspections every 15,000-30,000 miles.`,
  };

  const getSampleResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    const matchedKey = Object.keys(sampleResponses).find(key => lowercaseQuery.includes(key));
    
    if (matchedKey) {
      return sampleResponses[matchedKey];
    }
    
    return `I'd be happy to help with your question about your ${car.year} ${car.make} ${car.model}. For specific maintenance information, I recommend checking your owner's manual or consulting with a certified mechanic for your vehicle.`;
  };

  const callAssistantAPI = async (userMessage: string): Promise<string> => {
    try {
      const apiKey = import.meta.env.VITE_AI_ASSISTANT_API_KEY;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system", 
              content: `You are a vehicle maintenance assistant for a ${car.year} ${car.make} ${car.model}. 
                        Provide helpful, concise advice about maintenance, repairs, and vehicle care. 
                        Include specific information relevant to this vehicle when possible.
                        Keep responses under 150 words and be practical.`
            },
            {
              role: "user",
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 300
        }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error calling assistant API:", error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      let responseText: string;
      
      if (apiKeyExists) {
        // Use real AI API if key exists
        responseText = await callAssistantAPI(userMessage.text);
      } else {
        // Use sample responses if no API key
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        responseText = getSampleResponse(userMessage.text);
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not get a response from the assistant. Using offline mode.",
        variant: "destructive",
      });
      
      // Fall back to sample response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getSampleResponse(userMessage.text),
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Info className="h-5 w-5 text-dashboard-accent mr-2" />
            <CardTitle>Maintenance Assistant</CardTitle>
          </div>
          {!apiKeyExists && (
            <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
              Running in offline mode
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[80%]`}>
                  {message.sender === 'assistant' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-dashboard-accent text-white">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-dashboard-accent text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex flex-row gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-dashboard-accent text-white">AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-gray-100">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about maintenance, service intervals, or car care..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAssistant;
