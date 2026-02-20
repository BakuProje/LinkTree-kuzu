import MatrixRain from "@/components/MatrixRain";
import NetworkNodes from "@/components/NetworkNodes";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";

interface LinkItem {
  icon: string;
  label: string;
  href: string;
  accent: "blue" | "green" | "purple";
  isImage?: boolean;
}

const links: LinkItem[] = [
  { icon: "/logo.png", label: "Portfolio Website", href: "https://kuzufolio.vercel.app/", accent: "blue" as const, isImage: true },
  { icon: "/xoralogo.jpeg", label: "Xora GTPS", href: "https://xoraps.vercel.app", accent: "purple" as const, isImage: true },
  { icon: "fa-brands fa-github", label: "GitHub Repo", href: "https://github.com/BakuProje", accent: "green" as const },
  { icon: "fa-brands fa-tiktok", label: "TikTok", href: "https://www.tiktok.com/@kuzuroken", accent: "green" as const },
  { icon: "fa-brands fa-discord", label: "Discord Server", href: "#", accent: "purple" as const },
];

const Index = () => {
  const playClickSound = () => {
    const audio = new Audio('/klik.mp3');
    audio.volume = 0.5;
    audio.play().catch(console.error);
  };
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <MatrixRain />
      <NetworkNodes />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(180 100% 50% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(180 100% 50% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          zIndex: 2,
        }}
      />

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          <ProfileHeader onClickSound={playClickSound} />

          {/* Links */}
          <div className="flex flex-col gap-3">
            {links.map((link, i) => (
              <LinkCard
                key={link.label}
                icon={link.icon}
                label={link.label}
                href={link.href}
                accentColor={link.accent}
                delay={200 + i * 100}
                isImage={link.isImage}
                onClickSound={playClickSound}
              />
            ))}
          </div>

          {/* Social Footer */}
          <div className="mt-12 flex items-center justify-center gap-8">
            <a
              href="https://www.tiktok.com/@kuzuroken"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 transition-all duration-300 hover:scale-110"
              onClick={playClickSound}
            >
              <i className="fa-brands fa-tiktok text-2xl text-muted-foreground hover:text-neon-blue transition-colors duration-300" />
              {/* Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                TikTok
              </div>
            </a>
            <a
              href="https://www.instagram.com/kuzuroken.20"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 transition-all duration-300 hover:scale-110"
              onClick={playClickSound}
            >
              <i className="fa-brands fa-instagram text-2xl text-muted-foreground hover:text-neon-purple transition-colors duration-300" />
              {/* Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                Instagram
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
