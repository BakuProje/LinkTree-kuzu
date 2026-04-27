import { useState, useEffect } from "react";

interface ProfileHeaderProps {
  onClickSound?: () => void;
  name: string;
  subtitle: string;
  avatar: string;
  status: "online" | "offline" | "maintenance";
}

const ProfileHeader = ({ onClickSound, name, subtitle, avatar, status }: ProfileHeaderProps) => {
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

  const getStatusConfig = () => {
    switch (status) {
      case "offline":
        return {
          text: "Offline",
          color: "text-red-500",
          bg: "bg-red-500",
          border: "border-red-500/20",
          glow: "shadow-[0_0_8px_rgba(239,68,68,0.8)]"
        };
      case "maintenance":
        return {
          text: "Maintenance",
          color: "text-yellow-500",
          bg: "bg-yellow-500",
          border: "border-yellow-500/20",
          glow: "shadow-[0_0_8px_rgba(234,179,8,0.8)]"
        };
      default:
        return {
          text: "Online",
          color: "text-emerald-400",
          bg: "bg-emerald-500",
          border: "border-emerald-500/20",
          glow: "shadow-[0_0_8px_rgba(16,185,129,0.8)]"
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex flex-col items-center gap-5 mb-10">
      {/* Logo with neon ring */}
      <div className="relative">
        {/* Pulsing Nebula Ring */}
        <div className={`absolute -inset-4 rounded-full blur-xl animate-pulse ${status === 'online' ? 'bg-cyan-500/10' : 'bg-white/5'}`} />
        
        <div className="w-28 h-28 rounded-full glow-pulse neon-border-blue border-2 p-1 float-slow overflow-hidden z-10 relative">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="absolute -inset-3 rounded-full border border-neon-blue/20 animate-[spin_12s_linear_infinite] z-0" />
        <div className="absolute -inset-5 rounded-full border border-neon-purple/10 animate-[spin_20s_linear_infinite_reverse] z-0" />
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

      {/* Status & Network */}
      <div className="flex items-center gap-6 text-[9px] font-mono-cyber">
        {/* Modern System Status Badge */}
        <div className="relative">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusConfig.border} bg-white/5 backdrop-blur-md`}>
            <div className="relative flex h-2 w-2">
              <div className={`absolute inset-0 rounded-full ${statusConfig.bg} animate-ping opacity-40`}></div>
              <div className={`relative rounded-full h-2 w-2 ${statusConfig.bg} ${statusConfig.glow}`}></div>
            </div>
            <span className={`${statusConfig.color} tracking-[0.2em] font-bold uppercase`}>{statusConfig.text}</span>
          </div>
        </div>

        <div className="w-px h-3 bg-white/10" />

        {/* Dynamic WiFi Indicator */}
        <div className={`flex items-center gap-2 ${getPingColor()} bg-white/5 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md`}>
          <div className="relative flex items-center justify-center w-5 h-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="2.5" strokeLinecap="round">
              {/* Bar 1 (Smallest) */}
              <path d="M10 18a2 2 0 0 1 4 0" className={ping === null ? 'opacity-20' : 'opacity-100'} />
              {/* Bar 2 (Medium) */}
              <path d="M7 14.5a7.5 7.5 0 0 1 10 0" className={ping !== null && ping < 300 ? 'opacity-100' : 'opacity-20'} />
              {/* Bar 3 (Large) */}
              <path d="M4 11a12 12 0 0 1 16 0" className={ping !== null && ping < 100 ? 'opacity-100' : 'opacity-20'} />
            </svg>
            {/* Pulsing effect for green status */}
            {ping !== null && ping < 100 && (
              <span className="absolute inset-0 animate-[ping_2s_infinite] opacity-20">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 11a12 12 0 0 1 16 0" />
                </svg>
              </span>
            )}
          </div>
          <span className="font-bold tracking-widest">{ping !== null ? `${ping}ms` : "..."}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
