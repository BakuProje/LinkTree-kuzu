import { useState, useEffect } from "react";
import logoImg from "@/assets/logo.png";

interface ProfileHeaderProps {
  onClickSound?: () => void;
  name: string;
  subtitle: string;
  avatar: string;
}

const ProfileHeader = ({ onClickSound, name, subtitle, avatar }: ProfileHeaderProps) => {
  const [ping, setPing] = useState<number | null>(null);

  // Ping measurement
  useEffect(() => {
    const measurePing = () => {
      const start = performance.now();
      fetch("https://www.google.com/favicon.ico", { mode: "no-cors", cache: "no-store" })
        .then(() => {
          const ms = Math.round(performance.now() - start);
          setPing(ms);
        })
        .catch(() => {
          setPing(null);
        });
    };

    measurePing();
    const interval = setInterval(measurePing, 5000);
    return () => clearInterval(interval);
  }, []);

  const getPingColor = () => {
    if (ping === null) return "text-muted-foreground";
    if (ping < 100) return "text-emerald-400";
    if (ping < 300) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="flex flex-col items-center gap-5 mb-10">
      {/* Logo with neon ring */}
      <div className="relative">
        <div className="w-28 h-28 rounded-full glow-pulse neon-border-blue border-2 p-1 float-slow overflow-hidden">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="absolute -inset-3 rounded-full border border-neon-blue/20 animate-[spin_12s_linear_infinite]" />
        <div className="absolute -inset-5 rounded-full border border-neon-purple/10 animate-[spin_20s_linear_infinite_reverse]" />
      </div>

      {/* Name & Bio */}
      <div className="text-center">
        <h1 className="text-3xl font-bold neon-text-blue font-mono-cyber tracking-wider">
          {name}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm tracking-widest uppercase font-mono-cyber">
          &gt; {subtitle}_
        </p>
      </div>

      {/* Status & Ping */}
      <div className="flex items-center gap-4 text-xs font-mono-cyber">
        {/* System Online - GREEN */}
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYSTEM ONLINE</span>
        </div>

        <span className="text-muted-foreground/30">|</span>

        {/* Ping */}
        <div className={`flex items-center gap-2 ${getPingColor()}`}>
          <i className="fa-solid fa-signal text-[10px]" />
          <span>{ping !== null ? `${ping}ms` : "..."}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
