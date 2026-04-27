import { useState } from "react";
import { LinkItem, ProfileData, useLinkData } from "@/hooks/useLinkData";
import { useNavigate } from "react-router-dom";
import CosmicBackground from "@/components/CosmicBackground";
import { toast } from "sonner";

const Admin = () => {
  const { links, profile, updateLinks, updateProfile, isLoading } = useLinkData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLink, setEditLink] = useState<Partial<LinkItem>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<"links" | "profile">("links");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"online" | "offline" | "maintenance" | null>(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const navigate = useNavigate();

  const playClickSound = () => {
    const audio = new Audio('/klik.mp3');
    audio.volume = 0.5;
    audio.play().catch(console.error);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "669509") {
      setIsAuthenticated(true);
      toast.success("Akses Diterima");
      playClickSound();
    } else {
      toast.error("PIN Salah!");
      setPin("");
    }
  };

  const moveLink = (index: number, direction: 'up' | 'down') => {
    const newLinks = [...links];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newLinks.length) return;

    [newLinks[index], newLinks[targetIndex]] = [newLinks[targetIndex], newLinks[index]];
    updateLinks(newLinks);
    playClickSound();
  };

  const handleSaveLink = () => {
    if (!editLink.label || !editLink.href || !editLink.icon) {
      toast.error("Semua field harus diisi!");
      return;
    }

    if (isAdding) {
      const newLink: LinkItem = {
        id: Date.now().toString(),
        label: editLink.label || "",
        href: editLink.href || "",
        icon: editLink.icon || "",
        accent: "blue", // Hardcoded as requested
        isImage: editLink.isImage || false,
      };
      updateLinks([...links, newLink]);
      setIsAdding(false);
    } else {
      const updatedLinks = links.map((l) =>
        l.id === editingId ? { ...l, ...editLink, accent: "blue" } : l
      );
      updateLinks(updatedLinks as LinkItem[]);
      setEditingId(null);
    }
    setEditLink({});
    toast.success("Link berhasil disimpan!");
    playClickSound();
  };

  const handleDeleteLink = (id: string) => {
    setDeletingId(id);
    playClickSound();
  };

  const confirmDelete = () => {
    if (deletingId) {
      updateLinks(links.filter((l) => l.id !== deletingId));
      toast.success("Link berhasil dihapus");
      setDeletingId(null);
      playClickSound();
    }
  };

  const startEdit = (link: LinkItem) => {
    setEditingId(link.id);
    setEditLink(link);
    setIsAdding(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditLink({ accent: "blue", isImage: false });
  };

  const handleProfileSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProfile: ProfileData = {
      name: formData.get("name") as string,
      subtitle: formData.get("subtitle") as string,
      avatar: formData.get("avatar") as string,
      status: (formData.get("status") as any) || profile.status,
      tiktokUrl: profile.tiktokUrl,
      instagramUrl: profile.instagramUrl,
    };
    updateProfile(newProfile);
    toast.success("Profil diperbarui!");
    playClickSound();
  };

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-background text-foreground font-mono-cyber flex items-center justify-center p-4">
        <CosmicBackground />
        <div className="relative z-10 w-full max-w-sm glass-card border border-neon-blue/30 p-8 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 rounded-full bg-neon-blue/10 border border-neon-blue/50 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
            <i className="fa-solid fa-user-shield text-3xl text-neon-blue/80" />
          </div>
          <h2 className="text-2xl font-bold neon-text-blue tracking-tighter mb-2 uppercase opacity-90">Restricted Access</h2>
          <p className="text-[10px] text-blue-300/50 uppercase tracking-[0.2em] mb-8">System Security Protocol Enabled</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] text-left block text-neon-blue/60 uppercase tracking-[0.2em] ml-1 font-bold">Admin Identity PIN</label>
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => {
                  const val = e.target.value;
                  setPin(val);

                  if (val.length === 6) {
                    if (val === "669509") {
                      setIsAuthenticated(true);
                      toast.success("Akses Diterima");
                      playClickSound();
                    } else {
                      toast.error("PIN Salah!");
                      setPin("");
                    }
                  }
                }}
                className="w-full bg-black/80 border border-neon-blue/20 rounded-2xl p-4 text-center text-2xl tracking-[1em] outline-none focus:border-neon-blue/50 focus:bg-neon-blue/5 transition-all text-blue-100"
                placeholder="••••••"
                autoFocus
              />
            </div>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full py-2 text-[10px] text-blue-300/40 hover:text-neon-blue/80 transition-colors uppercase tracking-[0.3em] font-bold"
              >
                &lt; Back to System Main_
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground font-mono-cyber overflow-x-hidden">
      <CosmicBackground />

      {/* Header */}
      <main className="relative z-10 px-4 pb-20 pt-10 max-w-2xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("links")}
            className={`flex-1 py-3 rounded-lg border transition-all ${activeTab === "links"
              ? "neon-border-blue bg-neon-blue/10 text-neon-blue"
              : "border-white/10 text-muted-foreground"
              }`}
          >
            LINKS
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 rounded-lg border transition-all ${activeTab === "profile"
              ? "neon-border-purple bg-neon-purple/10 text-neon-purple"
              : "border-white/10 text-muted-foreground"
              }`}
          >
            PROFIL
          </button>
        </div>

        {activeTab === "links" ? (
          <div className="space-y-4">
            {/* Add Button */}
            <button
              onClick={startAdd}
              className="w-full py-4 border-2 border-dashed border-neon-blue/40 text-neon-blue rounded-xl hover:bg-neon-blue/5 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-plus" />
              TAMBAHKAN LINK BARU
            </button>

            {/* Link List */}
            <div className="space-y-3">
              {links.map((link, index) => (
                <div key={link.id} className="glass-card border border-neon-blue/20 p-4 flex items-center justify-between gap-2 hover:border-neon-blue/50 transition-all">
                  <div className="flex items-center gap-3 overflow-hidden">
                    {/* Reorder Buttons */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveLink(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-[10px] text-muted-foreground hover:text-neon-blue disabled:opacity-20"
                      >
                        <i className="fa-solid fa-chevron-up" />
                      </button>
                      <button
                        onClick={() => moveLink(index, 'down')}
                        disabled={index === links.length - 1}
                        className="p-1 text-[10px] text-muted-foreground hover:text-neon-blue disabled:opacity-20"
                      >
                        <i className="fa-solid fa-chevron-down" />
                      </button>
                    </div>

                    <div className="w-10 h-10 shrink-0 rounded border border-neon-blue/20 flex items-center justify-center bg-black/60 overflow-hidden shadow-[0_0_10px_rgba(0,191,255,0.1)]">
                      {link.isImage ? (
                        <img src={link.icon} className="w-full h-full object-cover" />
                      ) : (
                        <i className={`${link.icon} text-lg`} />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-sm truncate">{link.label}</div>
                      <div className="text-[10px] text-muted-foreground truncate w-32 md:w-60">{link.href}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEdit(link)}
                      className="p-2 text-yellow-400 hover:scale-110 active:scale-95 transition-transform"
                    >
                      <i className="fa-solid fa-pen-to-square" />
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-2 text-red-400 hover:scale-110 active:scale-95 transition-transform"
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Profile Tab */
          <form onSubmit={handleProfileSave} className="space-y-6 glass-card border border-neon-purple/20 p-8">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <i className="fa-solid fa-server text-neon-purple/70" />
                <label className="text-[11px] text-neon-purple/90 uppercase tracking-[0.3em] font-bold">SYSTEM STATUS</label>
              </div>

              <div className="relative">
                {/* Hidden Input for Form Submission */}
                <input type="hidden" name="status" value={selectedStatus || profile.status} />

                {/* Custom Dropdown Trigger */}
                <div
                  onClick={() => {
                    setIsStatusOpen(!isStatusOpen);
                    playClickSound();
                  }}
                  className="w-full bg-black/80 border border-neon-purple/20 rounded-xl p-4 text-sm flex items-center gap-4 cursor-pointer hover:border-neon-purple/50 transition-all group"
                >
                  <div className="flex-1 flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {(selectedStatus || profile.status) === 'online' && <i className="fa-solid fa-circle-check text-emerald-400" />}
                      {(selectedStatus || profile.status) === 'offline' && <i className="fa-solid fa-circle-xmark text-red-500" />}
                      {(selectedStatus || profile.status) === 'maintenance' && <i className="fa-solid fa-screwdriver-wrench text-yellow-500" />}
                    </div>
                    <span className="font-bold tracking-widest text-neon-purple/90 uppercase">
                      {selectedStatus || profile.status}
                    </span>
                  </div>
                  <i className={`fa-solid fa-chevron-down text-[10px] text-muted-foreground transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Custom Dropdown Menu */}
                {isStatusOpen && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-neon-purple/30 rounded-xl overflow-hidden z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2 duration-200">
                    {[
                      { value: 'online', label: 'ONLINE', icon: 'fa-circle-check', color: 'text-emerald-400' },
                      { value: 'offline', label: 'OFFLINE', icon: 'fa-circle-xmark', color: 'text-red-500' },
                      { value: 'maintenance', label: 'MAINTENANCE', icon: 'fa-screwdriver-wrench', color: 'text-yellow-500' }
                    ].map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => {
                          setSelectedStatus(opt.value as any);
                          setIsStatusOpen(false);
                          playClickSound();
                        }}
                        className={`
                          flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors
                          hover:bg-neon-purple/10 group
                          ${(selectedStatus || profile.status) === opt.value ? 'bg-neon-purple/5' : ''}
                        `}
                      >
                        <i className={`fa-solid ${opt.icon} ${opt.color} text-base`} />
                        <span className={`text-sm font-bold tracking-widest uppercase ${(selectedStatus || profile.status) === opt.value ? 'text-neon-purple' : 'text-blue-100/60 group-hover:text-blue-100'}`}>
                          {opt.label}
                        </span>
                        {(selectedStatus || profile.status) === opt.value && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-purple shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-neon-purple/70 uppercase tracking-[0.2em] font-bold">NAMA PROFIL / SYSTEM NAME</label>
              <input
                name="name"
                defaultValue={profile.name}
                className="w-full bg-black/60 border border-neon-purple/20 rounded-xl p-4 text-sm text-blue-100/90 focus:border-neon-purple/50 outline-none transition-all focus:bg-neon-purple/5"
                placeholder="Masukkan nama profil"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-neon-purple/70 uppercase tracking-[0.2em] font-bold">BIO / SUBTITLE</label>
              <input
                name="subtitle"
                defaultValue={profile.subtitle}
                className="w-full bg-black/60 border border-neon-purple/20 rounded-xl p-4 text-sm text-blue-100/90 focus:border-neon-purple/50 outline-none transition-all focus:bg-neon-purple/5"
                placeholder="Deskripsi singkat"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-neon-purple/70 uppercase tracking-[0.2em] font-bold">AVATAR IMAGE URL</label>
              <input
                name="avatar"
                defaultValue={profile.avatar}
                className="w-full bg-black/60 border border-neon-purple/20 rounded-xl p-4 text-sm text-blue-100/90 focus:border-neon-purple/50 outline-none transition-all focus:bg-neon-purple/5"
                placeholder="/kuzunobglogo.png atau URL luar"
              />
            </div>
            <button className="w-full py-4 bg-neon-purple/20 text-neon-purple border border-neon-purple rounded-xl font-bold tracking-widest hover:bg-neon-purple/30 transition-all mt-6 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] uppercase">
              UPDATE DATA PROFIL
            </button>
          </form>
        )}
      </main>

      {/* Edit/Add Modal */}
      {(editingId || isAdding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl glass-card border border-neon-blue/30 p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <div className="border-b border-neon-blue/20 pb-4">
              <h2 className="text-2xl font-bold neon-text-blue tracking-tighter">{isAdding ? "TAMBAHKAN LINK BARU" : "EDIT KONFIGURASI LINK"}</h2>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">&gt; Mengatur aksesibilitas digital_</p>
            </div>

            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-neon-blue/70 font-bold tracking-[0.2em] uppercase">NAMA LINK</label>
                <input
                  value={editLink.label || ""}
                  onChange={(e) => setEditLink({ ...editLink, label: e.target.value })}
                  className="w-full bg-black/80 border border-neon-blue/20 rounded-xl p-4 text-sm outline-none focus:border-neon-blue/50 focus:bg-neon-blue/5 transition-all text-blue-100/90"
                  placeholder="Misal: Website Portfolio"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-neon-blue/70 font-bold tracking-[0.2em] uppercase">URL TUJUAN</label>
                <input
                  value={editLink.href || ""}
                  onChange={(e) => setEditLink({ ...editLink, href: e.target.value })}
                  className="w-full bg-black/80 border border-neon-blue/20 rounded-xl p-4 text-sm outline-none focus:border-neon-blue/50 focus:bg-neon-blue/5 transition-all text-blue-100/90"
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-neon-blue/70 font-bold tracking-[0.2em] uppercase">ICON (FontAwesome / Image Path)</label>
                <input
                  value={editLink.icon || ""}
                  onChange={(e) => setEditLink({ ...editLink, icon: e.target.value })}
                  className="w-full bg-black/80 border border-neon-blue/20 rounded-xl p-4 text-sm outline-none focus:border-neon-blue/50 focus:bg-neon-blue/5 transition-all text-blue-100/90 font-mono"
                  placeholder="fa-brands fa-github atau /logo.png"
                />
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg border border-white/5 group active:bg-white/10 transition-colors cursor-pointer" onClick={() => setEditLink({ ...editLink, isImage: !editLink.isImage })}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${editLink.isImage ? 'bg-neon-blue border-neon-blue shadow-[0_0_10px_rgba(0,255,255,0.5)]' : 'border-white/20 bg-transparent'}`}>
                  {editLink.isImage && <i className="fa-solid fa-check text-[10px] text-black" />}
                </div>
                <label className="text-xs cursor-pointer select-none text-muted-foreground group-hover:text-foreground transition-colors">Gunakan Icon sebagai Gambar / Logo Unit</label>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-white/5">
              <button
                onClick={() => { setEditingId(null); setIsAdding(false); }}
                className="flex-1 py-4 text-sm font-bold border border-white/10 rounded-xl hover:bg-white/5 transition-all"
              >
                BATAL
              </button>
              <button
                onClick={handleSaveLink}
                className="flex-1 py-4 text-sm bg-neon-blue/20 text-neon-blue border border-neon-blue rounded-xl font-bold shadow-[0_0_15px_rgba(0,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:bg-neon-blue/30 transition-all uppercase tracking-widest"
              >
                SIMPAN DATA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-xs glass-card border-red-500/30 p-8 space-y-6 text-center animate-in fade-in zoom-in duration-300 shadow-[0_0_50px_rgba(255,0,0,0.1)]">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/50 flex items-center justify-center mx-auto mb-2 animate-pulse">
              <i className="fa-solid fa-trash-can text-3xl text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2 tracking-tighter uppercase">Konfirmasi Hapus</h2>
              <p className="text-[11px] text-muted-foreground leading-relaxed font-mono">
                DATA INI AKAN DIHAPUS PERMANEN DARI SYSTEM_
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={confirmDelete}
                className="w-full py-4 text-xs bg-red-500/20 text-red-500 border border-red-500/50 rounded-xl font-bold hover:bg-red-500/40 transition-all uppercase"
              >
                HAPUS SEKARANG
              </button>
              <button
                onClick={() => setDeletingId(null)}
                className="w-full py-4 text-xs text-muted-foreground hover:text-foreground transition-all uppercase"
              >
                KEMBALI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
