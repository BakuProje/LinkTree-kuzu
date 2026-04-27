import { useState } from "react";

interface LinkCardProps {
  icon: string;
  label: string;
  href: string;
  accentColor: "green" | "blue" | "purple";
  delay: number;
  isImage?: boolean;
  onClickSound?: () => void;
}

const accentMap = {
  green: {
    border: "neon-border-green",
    text: "neon-text-green",
    hoverBg: "hover:bg-neon-green/5",
    iconColor: "text-neon-green",
  },
  blue: {
    border: "neon-border-blue",
    text: "neon-text-blue",
    hoverBg: "hover:bg-neon-blue/5",
    iconColor: "text-neon-blue",
  },
  purple: {
    border: "neon-border-purple",
    text: "neon-text-purple",
    hoverBg: "hover:bg-neon-purple/5",
    iconColor: "text-neon-purple",
  },
};

const LinkCard = ({ icon, label, href, accentColor, delay, isImage = false, onClickSound }: LinkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const styles = accentMap[accentColor];

  const handleClick = () => {
    if (onClickSound) {
      onClickSound();
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group block w-full glass-card border border-white/10 ${styles.hoverBg}
        px-4 py-3 md:px-6 md:py-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:scale-[1.02] hover:-translate-y-1
        animate-[fade-in_0.5s_ease-out_both]
        overflow-hidden relative
      `}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Cosmic Glow Background */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        style={{
          background: `radial-gradient(circle at center, hsl(var(--neon-blue) / 0.15) 0%, transparent 70%)`
        }}
      />

      <div className="flex items-center gap-3 md:gap-4 relative z-10">
        {/* Icon Container with cosmic background */}
        <div className={`
          flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg
          bg-white/5 border border-white/10
          transition-all duration-500
          ${isHovered ? 'scale-110 shadow-[0_0_15px_rgba(0,191,255,0.3)] border-neon-blue/30' : ''}
        `}>
          {isImage ? (
            <img 
              src={icon} 
              alt={label} 
              className="w-6 h-6 rounded object-cover"
            />
          ) : (
            <i className={`${icon} ${styles.iconColor}`} />
          )}
        </div>

        {/* Label */}
        <span className="flex-1 font-semibold text-foreground/90 tracking-[0.1em] text-sm font-mono-cyber uppercase">
          {label}
        </span>
      </div>

      {/* Decorative border bottom */}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent transition-all duration-500 ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
    </a>
  );
};

export default LinkCard;
