"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { Chatbot } from "./ChatBot"

export function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 p-4">
      {isOpen ? (
        <Chatbot onClose={() => setIsOpen(false)} />
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-transparent hover:bg-transparent"
          aria-label="Abrir chat"
        >
          <img src="/chat-bot.png" alt="Logo" className="w-28 h-28" />
        </Button>
      )}
    </div>
  )
}

