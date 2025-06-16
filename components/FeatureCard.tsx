import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  className?: string;
}

export const FeatureCard = ({ 
  icon, 
  title, 
  description,
  href = "",
  className = ''
}: FeatureCardProps) => (
  <Link href={href} passHref legacyBehavior>
    <a className={`block h-full ${className}`}>
      <div className={`
        h-full flex flex-col items-center rounded-lg 
        border-2 border-red-800 dark:border-red-700 
        bg-red-300/80 dark:bg-red-900/80 
        p-6 shadow-md transition-all 
        hover:scale-[1.02] hover:shadow-lg 
        hover:border-red-900 dark:hover:border-red-600
        hover:bg-red-400/80 dark:hover:bg-red-800/80
        cursor-pointer
      `}>
        <div className="mb-4 rounded-full bg-black/20 dark:bg-white/20 p-4">
          {icon}
        </div>
        <h2 className="mb-4 text-xl font-bold text-red-900 dark:text-red-100">{title}</h2>
        <p className="text-center text-[16px] text-gray-800 dark:text-gray-200">{description}</p>
      </div>
    </a>
  </Link>
);