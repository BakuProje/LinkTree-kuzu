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
        group block w-full glass-card ${styles.border} ${styles.hoverBg}
        px-6 py-4 transition-all duration-300 ease-out
        hover:scale-[1.02] hover:-translate-y-0.5
        animate-[fade-in_0.5s_ease-out_both]
      `}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`text-xl ${styles.iconColor} transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
          {isImage ? (
            <img 
              src={icon} 
              alt={label} 
              className="w-6 h-6 rounded object-cover"
            />
          ) : (
            <i className={icon} />
          )}
        </div>

        {/* Label */}
        <span className="flex-1 font-medium text-foreground tracking-wide text-sm font-mono-cyber">
          {label}
        </span>

        {/* Arrow */}
        <span className={`${styles.iconColor} transition-all duration-300 opacity-50 group-hover:opacity-100 group-hover:translate-x-1`}>
          <i className="fa-solid fa-chevron-right text-xs" />
        </span>
      </div>

      {/* Scan line effect on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
        >
          <div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent"
            style={{ animation: "scan-line 1s linear infinite" }}
          />
        </div>
      )}
    </a>
  );
};

export default LinkCard;
