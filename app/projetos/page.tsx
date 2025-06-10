'use client';

import { useState, useRef } from 'react'; // Adicionei useRef
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion"
import { ThemeWrapper } from '@/components/ThemeWrapper';

interface Project {
  id: string;
  label: string;
  modalTitle: string;
  modalMessage: string;
  href: string;
  image: string;
  video?: string; // Agora usamos um caminho local
}

export default function ProjectsPage() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null); // Referência para o elemento de vídeo

  const projects: Project[] = [
    {
      id: '1',
      label: "Trabalhos Escolares",
      modalTitle: "Vale Nota ;)",
      modalMessage: "Aqui você vai encontrar meus trabalhos que são requisitados para conclusão de módulos, eles são básicos apenas para os alunos entender a lógica.",
      href: "https://trabalhos-plum.vercel.app",
      image: "/images/1.png"
    },
    {
      id: '2',
      label: "Fichamer",
      modalTitle: "Aventura-se Agora!!",
      modalMessage: "Uma Ficha para Fãs de D&D Edição 5 onde você vai poder aumentar a imersão na sua Mesa.",
      href: "",
      image: "/images/2.png"
    },
    {
      id: '3',
      label: "Mundo Endorfina",
      modalTitle: "Hora de Correr!!",
      modalMessage: "Compartilhe suas corridas, acumule pontos e conquiste recompensas na melhor rede social para corredores",
      href: "",
      image: "/images/4.png",
      video: "/videos/Mundo Endorfina.mp4"
    },
    {
      id: '4',
      label: "Minhas Pixelarts",
      modalTitle: "Venha conhecer Minhas Criações!!",
      modalMessage: "Aqui eu irei mostrar todas minhas ideia de jogo em GIF em formato pixelart, como MOBs, NPCs, Cenários e Decorações",
      href: "https://pixels-rust-two.vercel.app",
      image: "/images/3.png"
    },
    {
      id: '5',
      label: "Maquete 3D da Esquadramer",
      modalTitle: "Visualize seu lar aqui!!",
      modalMessage: "Aqui eu faço o modelo 3D do seu apartamento ou casa, colocando as medidas dos quartos como a personalizaação deles também.",
      href: "",
      image: "/images/login-bg.jpg"
    }
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause(); // Pausa o vídeo quando um novo projeto é selecionado
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleNavigate = () => {
    if (selectedProject?.href) {
      router.push(selectedProject.href);
    } else if (selectedProject?.video) {
      setShowVideo(true);
      // Inicia o vídeo quando o botão é clicado
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(e => console.error("Erro ao reproduzir vídeo:", e));
        }
      }, 100);
    }
  };

  return (
    <ThemeWrapper>
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-red-800 dark:text-red-300 sm:text-5xl md:text-6xl">
              Bem-vindo aos meus Projetos
            </h1>
            
            <p className="max-w-xl text-xl text-black-200 dark:text-red-400">
              Veja os trabalhos no qual estou trabalhando e também os já feitos.
            </p>

            <div className="w-full max-w-4xl space-y-6">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="relative h-28 w-full overflow-hidden rounded-lg border border-red-900 dark:border-red-700 shadow-sm transition-all hover:shadow-md"
                  style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <Button
                    onClick={() => handleProjectClick(project)}
                    className="absolute inset-0 w-full h-full bg-red-200/40 dark:bg-red-900/40 text-red-800 dark:text-red-200 text-xl md:text-2xl font-pixel hover:bg-red-500/60 dark:hover:bg-red-700/60 hover:text-black dark:hover:text-white transition-all"
                  >
                    {project.label}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {selectedProject && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className={`bg-red-100 dark:bg-gray-800 rounded-lg p-6 ${showVideo && selectedProject.video ? 'max-w-2xl' : 'max-w-md'} w-full`}>
                <h2 className="text-2xl font-pixel text-center mb-4 text-red-800 dark:text-red-200">
                  {selectedProject.modalTitle}
                </h2>
                
                <p className="mb-6 text-gray-800 dark:text-gray-200">{selectedProject.modalMessage}</p>
                
                {showVideo && selectedProject.video ? (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <video
                      ref={videoRef}
                      width="100%"
                      controls
                      className="w-full rounded-lg"
                    >
                      <source src={selectedProject.video} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>
                ) : null}
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={handleCloseModal}
                    className="border-red-800 dark:border-red-700 text-red-800 dark:text-red-200"
                  >
                    Cancelar
                  </Button>
                  
                  <Button 
                    onClick={handleNavigate}
                    disabled={!selectedProject.href && !selectedProject.video}
                    className="bg-red-800 dark:bg-red-700 hover:bg-red-900 dark:hover:bg-red-600"
                  >
                    {selectedProject.href ? "Ir!" : 
                     selectedProject.video ? (showVideo ? "Assistindo..." : "Ver Vídeo") : "Em breve"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </ThemeWrapper>
  );
}