// components/GameEmbed.tsx
'use client';

import { useEffect } from 'react';

interface GameEmbedProps {
  gameFile: string; // Caminho para o arquivo do jogo
  onClose: () => void;
}

export const GameEmbed = ({ gameFile, onClose }: GameEmbedProps) => {
  useEffect(() => {
    // Carrega o jogo quando o componente é montado
    const script = document.createElement('script');
    script.src = gameFile;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpeza quando o componente é desmontado
      document.body.removeChild(script);
    };
  }, [gameFile]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-gray-900 p-3">
          <h2 className="text-xl font-bold text-white">Jogando</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-red-400 text-2xl"
          >
            ×
          </button>
        </div>
        
        {/* Aqui vai o canvas/iframe do jogo */}
        <div id="game-container" className="w-full aspect-video bg-black">
          {/* O jogo será injetado aqui */}
        </div>
        
        <div className="bg-gray-900 p-3 text-center text-gray-400 text-sm">
          Use as setas ou WASD para jogar | ESC para sair
        </div>
      </div>
    </div>
  );
};