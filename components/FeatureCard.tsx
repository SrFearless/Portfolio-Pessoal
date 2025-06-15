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
    <a className="block">
      <div className={`
        flex flex-col items-center rounded-lg 
        border border-red-800 dark:border-red-700 
        bg-red-300 dark:bg-red-900/80 
        p-6 shadow-sm transition-all hover:scale-[1.02]
        hover:shadow-lg cursor-pointer
        ${className}
      `}>
        <div className="mb-4 rounded-full bg-black/20 dark:bg-white/20 p-4">
          {icon}
        </div>
        <h2 className="mb-4 text-xl font-medium text-red-800 dark:text-red-200">{title}</h2>
        <p className="text-center text-[17px] text-black-800 dark:text-gray-200">{description}</p>
      </div>
    </a>
  </Link>
);