import { ProjectCard } from "@/components/ProjectCard";
import { ThreeBackground } from "@/components/TrheeBackgound";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className="fixed flex justify-center h-[80px] md:h-[80px] left-0 right-0 bg-black bg-opacity-50 backdrop-blur-md">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={500}
                height={500}
              />
            </Link>
          </nav>
       
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center mt-10">
            <span className="text-primary">Proyectos</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="Agente de manejo de citas"
              description="Optimiza la gestión de tus citas con un agente de inteligencia artificial diseñado para programar, recordar y coordinar reuniones de forma automática. Con integración en WhatsApp, correo y CRM, asegura una experiencia fluida y eficiente para clientes y profesionales."
              image="/citas.png"
              index={0}
              slug="agente-citas"
              demoUrl="https://demo.com"  // opcional
              githubUrl="https://github.com"  // opcional
            />
            <ProjectCard
              title="Agente asistente"
              description="Simplifica la experiencia de tus clientes con un agente de IA inteligente que proporciona información detallada sobre tus productos y servicios en tiempo real."
              image="/asistente.png"
              index={1}
              slug="agente-asistente"
              demoUrl="https://demo.com"  // opcional
              githubUrl="https://github.com"  // opcional
            />
            <ProjectCard
              title="Agente APP de finanzas"
              description="Optimiza tu gestión financiera con un agente de IA inteligente. Automatiza el seguimiento de gastos, ingresos y presupuestos con análisis en tiempo real y recomendaciones personalizadas."
              image="/ia.png"
              index={3}
              slug="agente-finanzas"
              demoUrl="https://finance-ai-agent.vercel.app"  // opcional
              githubUrl="https://github.com/juanpabon/finance-ai-agent"  // opcional
            />
          </div>
        </div>
      </section>
    </main>
  )
}

