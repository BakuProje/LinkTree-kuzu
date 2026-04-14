import { useState, useEffect } from "react";

export interface LinkItem {
  id: string;
  icon: string;
  label: string;
  href: string;
  accent: "blue" | "green" | "purple";
  isImage?: boolean;
}

export interface ProfileData {
  name: string;
  subtitle: string;
  avatar: string;
  tiktokUrl: string;
  instagramUrl: string;
}

const DEFAULT_LINKS: LinkItem[] = [
  { id: "1", icon: "/logo.png", label: "Portfolio Website", href: "https://kuzufolio.vercel.app/", accent: "blue", isImage: true },
  { id: "2", icon: "/logonobg.png", label: "Rental PS", href: "https://www.prgrental.site/", accent: "blue", isImage: true },
  { id: "3", icon: "/logo full.png", label: "UKK XII TKJ", href: "https://ukktkj.vercel.app/", accent: "blue", isImage: true },
  { id: "4", icon: "fa-brands fa-github", label: "GitHub Repo", href: "https://github.com/BakuProje", accent: "blue" },
  { id: "5", icon: "fa-brands fa-tiktok", label: "TikTok", href: "https://www.tiktok.com/@kuzuroken", accent: "blue" },
  { id: "6", icon: "fa-brands fa-discord", label: "Discord Server", href: "#", accent: "blue" },
];

const DEFAULT_PROFILE: ProfileData = {
  name: "Kuzuroken",
  subtitle: "Jelajahi Dunia Digital",
  avatar: "/logo.png",
  tiktokUrl: "https://www.tiktok.com/@kuzuroken",
  instagramUrl: "https://www.instagram.com/kuzuroken.20",
};

export const useLinkData = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLinks = localStorage.getItem("kuzu_links");
    const savedProfile = localStorage.getItem("kuzu_profile");

    if (savedLinks) {
      // Force all links to blue accent to match portfolio theme
      const parsedLinks = JSON.parse(savedLinks).map((l: LinkItem) => ({ ...l, accent: "blue" }));
      setLinks(parsedLinks);
      localStorage.setItem("kuzu_links", JSON.stringify(parsedLinks));
    } else {
      setLinks(DEFAULT_LINKS);
      localStorage.setItem("kuzu_links", JSON.stringify(DEFAULT_LINKS));
    }

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile(DEFAULT_PROFILE);
      localStorage.setItem("kuzu_profile", JSON.stringify(DEFAULT_PROFILE));
    }
    
    setIsLoading(false);
  }, []);

  const updateLinks = (newLinks: LinkItem[]) => {
    setLinks(newLinks);
    localStorage.setItem("kuzu_links", JSON.stringify(newLinks));
  };

  const updateProfile = (newProfile: ProfileData) => {
    setProfile(newProfile);
    localStorage.setItem("kuzu_profile", JSON.stringify(newProfile));
  };

  return { links, profile, updateLinks, updateProfile, isLoading };
};
