"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import ParticleBackground from "@/components/ParticleField"
import { ChatbotIcon } from "@/components/ChatbotIcon"
import Image from "next/image"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-auto fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      <div className="relative">
     
          <nav className="fixed flex justify-center h-[100px] md:h-[100px] left-0 right-0 bg-black bg-opacity-50 backdrop-blur-md">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={500}
                height={500}
              />
            </Link>
          </nav>
       

        <main>
          <section className="min-h-screen flex items-center justify-center text-center px-4">
            <div className="max-w-auto mx-auto mt-[-10vh]">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">Revoluciona tu Negocio con IA</h1>
              <p className="text-xl mb-8">
                Aprovecha el poder de la inteligencia artificial para transformar tus soluciones de software.
              </p>
              <div className="bg-primary hover:bg-primary/90 text-primary-foreground h-[40px] w-[500px] rounded-md flex items-center justify-center mx-auto">
                <Link className="w-full h-full flex items-center justify-center" href={"/demos"}>
                  Proyectos
                </Link>
              </div>
            </div>
          </section>

          <section id="caracteristicas" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Nuestras Características</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {["Agentes IA Avanzados", "Desarrollo de Software Personalizado", "Integración Perfecta"].map(
                  (feature, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">{feature}</h3>
                      <p className="text-gray-400">
                        {(() => {
                          switch(index) {
                            case 0:
                              return "Optimiza y automatiza procesos con agentes de inteligencia artificial diseñados para transformar tu negocio. Desde asistentes virtuales hasta sistemas autónomos que mejoran la eficiencia y productividad en tiempo real."
                            case 1:
                              return "Creamos soluciones a la medida de tu negocio con tecnología de vanguardia. Desde aplicaciones web y móviles hasta sistemas complejos, diseñamos software escalable, eficiente y adaptado a tus necesidades."
                            case 2:
                              return "Conectamos tus sistemas, herramientas y plataformas para que trabajen en total armonía. Desde CRMs y ERPs hasta APIs y automatizaciones con IA, garantizamos una integración fluida y sin fricciones."
                            default:
                              return 
                          }
                        })()}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          <section id="nosotros" className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Sobre Nosotros</h2>
              <p className="text-xl text-center max-w-3xl mx-auto">
                Somos una empresa de tecnología especializada en desarrollo de software a medida e inteligencia artificial. Nuestro enfoque es transformar negocios mediante automatización, integración y soluciones digitales innovadoras.
              </p>
            </div>
          </section>

          <section id="contacto" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Ponte en Contacto</h2>
              <form className="max-w-md mx-auto">
                <div className="mb-4">
                  <Input type="text" placeholder="Tu Nombre" className="w-full" />
                </div>
                <div className="mb-4">
                  <Input type="email" placeholder="Tu Email" className="w-full" />
                </div>
                <div className="mb-4">
                  <textarea
                    className="w-full p-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    rows={4}
                    placeholder="Tu Mensaje"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 Codelabai S.A. Todos los derechos reservados.</p>
          </div>
        </footer>
        <ChatbotIcon />
        {/*<elevenlabs-convai agent-id="kunAGk3pN2sA7f6HvRb0"></elevenlabs-convai><script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>*/}
      </div>
    </div>
  )
}

