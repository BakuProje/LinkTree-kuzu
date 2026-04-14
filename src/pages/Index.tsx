import MatrixRain from "@/components/MatrixRain";
import NetworkNodes from "@/components/NetworkNodes";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import { useLinkData } from "@/hooks/useLinkData";

const Index = () => {
  const { links, profile, isLoading } = useLinkData();

  const playClickSound = () => {
    const audio = new Audio('/klik.mp3');
    audio.volume = 0.5;
    audio.play().catch(console.error);
  };

  if (isLoading) return null;

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
          <ProfileHeader 
            onClickSound={playClickSound} 
            name={profile.name} 
            subtitle={profile.subtitle} 
            avatar={profile.avatar}
          />

          {/* Links */}
          <div className="flex flex-col gap-3">
            {links.map((link, i) => (
              <LinkCard
                key={link.id}
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


        </div>
      </main>
    </div>
  );
};

export default Index;
