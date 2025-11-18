'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useAuth } from '@/contexts/auth-context';

interface ChatInterfaceProps {
    propertyId: string;
}

// Mock messages for UI testing
const mockMessages = [
    { id: '1', senderId: 'user-2', senderName: 'Alice', text: 'This property looks interesting. Can you tell me more about the neighborhood?', timestamp: new Date() },
    { id: '2', senderId: 'user-1', senderName: 'You', text: 'Of course! It\'s a vibrant area with great schools and parks nearby.', timestamp: new Date() },
    { id: '3', senderId: 'user-3', senderName: 'Bob', text: 'What is the estimated completion date?', timestamp: new Date() },
];


export default function ChatInterface({ propertyId }: ChatInterfaceProps) {
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState(mockMessages);
    const { user } = useAuth();
    const isLoading = !user;

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        setIsSending(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network
        
        const newMsg = {
            id: String(messages.length + 1),
            senderId: user.uid,
            senderName: user.displayName || 'Anonymous',
            text: newMessage,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
        setIsSending(false);
    };

    return (
        <div className="flex flex-col h-[500px] border rounded-lg">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {isLoading && <div className="flex justify-center"><Loader2 className="animate-spin" /></div>}
                    {messages && messages.map((msg) => {
                        const isSender = msg.senderId === user?.uid;
                        return (
                            <div key={msg.id} className={cn("flex items-end gap-2", isSender ? "justify-end" : "justify-start")}>
                                {!isSender && <Avatar className="h-8 w-8"><AvatarFallback>{msg.senderName?.charAt(0) || 'A'}</AvatarFallback></Avatar>}
                                <div className={cn(
                                    "max-w-xs md:max-w-md rounded-lg px-4 py-2",
                                    isSender ? "bg-primary text-primary-foreground" : "bg-muted"
                                )}>
                                    {!isSender && <p className="text-xs font-bold text-muted-foreground mb-1">{msg.senderName}</p>}
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        )
                    })}
                    {!isLoading && messages?.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <div className="border-t p-4 bg-background">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        disabled={isSending || !user}
                    />
                    <Button type="submit" size="icon" disabled={isSending || !newMessage.trim()}>
                        {isSending ? <Loader2 className="animate-spin" /> : <Send />}
                    </Button>
                </form>
            </div>
        </div>
    );
}
