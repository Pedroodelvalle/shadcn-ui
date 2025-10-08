"use client";

import { AppSidebar } from "@/components/app-sidebar"
import Ai01 from "@/components/ai-01"
import { Conversation, ConversationContent, ConversationEmptyState } from "@/components/ai-elements/conversation"
import { Message, MessageContent } from "@/components/ai-elements/message"
import { Reasoning, ReasoningTrigger, ReasoningContent } from "@/components/ai-elements/reasoning"
import { Response } from "@/components/ai-elements/response"
import { Skeleton } from "@/components/ui/skeleton"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
};

export default function Page() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startStreaming = (messageId: string, fullText: string) => {
    setStreamingMessageId(messageId);
    let currentIndex = 0;

    const streamText = () => {
      currentIndex++;

      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? { ...msg, content: fullText.slice(0, currentIndex), isStreaming: true }
          : msg
      ));

      if (currentIndex >= fullText.length) {
        // Streaming complete
        setMessages(prev => prev.map(msg =>
          msg.id === messageId
            ? { ...msg, isStreaming: false }
            : msg
        ));
        setStreamingMessageId(null);
        setIsLoading(false);
        if (streamingIntervalRef.current) {
          clearInterval(streamingIntervalRef.current);
          streamingIntervalRef.current = null;
        }
      }
    };

    // Start streaming with a small delay
    streamingIntervalRef.current = setInterval(streamText, 30); // ~30ms per character
  };

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Small delay before showing loading to make transition smoother
    setTimeout(() => setIsLoading(true), 200);

    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "Olá! Obrigado por sua mensagem. Esta é uma resposta simulada do assistente de IA. Como posso ajudar você hoje?",
        "Entendi sua pergunta. Aqui vai uma resposta completa e útil baseada no que você pediu.",
        "Ótimo ponto! Deixe-me elaborar uma resposta mais detalhada para você.",
        "Interessante! Vou fornecer uma resposta abrangente sobre este tópico."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: MessageType = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Start streaming the response
      startStreaming(assistantMessage.id, randomResponse);
    }, 800);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {messages.length === 0 ? (
              // Show input component when no messages
              <div className="flex flex-1 justify-end pt-52 pb-8 animate-in fade-in-0 duration-700 ease-out">
                <div className="px-4 lg:px-6 w-full">
                  <Ai01 onSendMessage={handleSendMessage} isLoading={isLoading} />
                </div>
              </div>
            ) : (
              // Show chat conversation when messages exist
              <Conversation className="flex-1 animate-in fade-in-0 duration-500 ease-out">
                <ConversationContent className="px-6 py-4">
                  {messages.map((message, index) => (
                    <Message
                      key={message.id}
                      from={message.role}
                      className={cn(
                        "animate-in slide-in-from-bottom-4 duration-500 ease-out",
                        message.role === "assistant" && "border-l-4 border-l-primary/20 pl-4 ml-4"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <MessageContent variant={message.role === "assistant" ? "contained" : "flat"}>
                        {message.role === "assistant" ? (
                          <>
                            {message.isStreaming && (
                              <Reasoning isStreaming={true} className="mb-4">
                                <ReasoningTrigger />
                                <ReasoningContent>
                                  Analisando sua pergunta e preparando uma resposta completa...
                                </ReasoningContent>
                              </Reasoning>
                            )}
                            <div className="relative">
                              <Response>{message.content}</Response>
                              {message.isStreaming && (
                                <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></span>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="font-medium text-foreground">{message.content}</div>
                        )}
                      </MessageContent>
                    </Message>
                  ))}
                  {isLoading && !streamingMessageId && (
                    <Message
                      from="assistant"
                      className="animate-in slide-in-from-bottom-4 duration-300 ease-out border-l-4 border-l-primary/20 pl-4 ml-4"
                    >
                      <MessageContent variant="contained">
                        <Reasoning isStreaming={true} className="mb-4">
                          <ReasoningTrigger />
                          <ReasoningContent>
                            Processando sua solicitação...
                          </ReasoningContent>
                        </Reasoning>
                        <div className="space-y-2 animate-pulse">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                          <Skeleton className="h-4 w-4/5" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-2/3" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </MessageContent>
                    </Message>
                  )}
                </ConversationContent>
                <ConversationEmptyState />
              </Conversation>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
