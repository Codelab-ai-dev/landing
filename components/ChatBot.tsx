"use client"

import { useState, useEffect, useRef, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import { bot } from "@/actions/bot-action"
import { useActionState } from "react"

interface ChatbotProps {
  onClose: () => void
}

export function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([])
  const [state, dispatch] = useActionState(bot, { errors: [], success: "" })
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = useTransition()

  // Cuando se recibe una nueva respuesta, se agrega al historial
  useEffect(() => {
    if (state.success) {
      setMessages((prev) => [...prev, { role: "bot", content: state.success }])
    }
  }, [state.success])

  // Scroll automático al final del chat cuando hay nuevos mensajes
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isPending]) // Agregar `isPending` para actualizar el scroll también cuando está pensando

  // Manejar el envío del formulario manualmente
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = formData.get("message") as string

    if (!message.trim()) return // Evitar mensajes vacíos

    setMessages((prev) => [...prev, { role: "user", content: message }])
    event.currentTarget.reset() // Limpiar el input después de enviar

    startTransition(() => {
      dispatch(formData)
    })
  }

  return (
    <Card className="w-80 h-auto flex flex-col bg-gray-800 border-green-500">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-green-500">
          <span>Chat con Rondo</span>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Cerrar chat">
            <X className="h-4 w-4 text-green-500" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-60 w-full pr-4">
          <div className="flex flex-col space-y-2">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg max-w-xs ${
                    m.role === "user"
                      ? "bg-green-500 text-white self-end"
                      : "bg-gray-700 text-gray-100 self-start"
                  }`}
                >
                  {m.content}
                </span>
              </div>
            ))}
            {isPending && (
              <div className="flex justify-start">
                <span className="inline-block p-2 rounded-lg bg-gray-700 text-gray-100">
                  Pensando...
                </span>
              </div>
            )}
            <div ref={scrollRef} /> {/* Elemento invisible para forzar el scroll hacia abajo */}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            name="message"
            placeholder="Escribe un mensaje..."
            className="flex-grow bg-gray-700 text-gray-100 border-green-500"
            autoComplete="off"
          />
          <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={isPending}>
            {isPending ? "..." : "Enviar"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}