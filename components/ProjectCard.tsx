"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  index: number;
  slug: string;
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  demoUrl, 
  index
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="card-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className={`card-3d project-card h-full ${isHovered ? 'glow' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="relative m-2 overflow-hidden h-48">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out"
            style={{ 
              backgroundImage: `url(${image})`,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-xl font-bold mb-2 text-primary">{title}</CardTitle>
          <CardDescription className="text-sm text-gray-300 mb-4">{description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between p-6 pt-0">
          {demoUrl && (
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-black w-auto">
              <Link href={demoUrl} target="_blank">Ir al proyecto</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}