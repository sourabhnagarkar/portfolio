import {
  FiGithub, FiLinkedin, FiMail, FiLink,
} from "react-icons/fi";
import {
  FaXTwitter, FaInstagram, FaYoutube, FaDiscord, FaDribbble, FaBehance,
  FaStackOverflow, FaMedium, FaTelegram,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { useProfile } from "../context/ProfileContext.jsx";

const PLATFORM_ICONS = {
  twitter: FaXTwitter,
  x: FaXTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
  discord: FaDiscord,
  dribbble: FaDribbble,
  behance: FaBehance,
  stackoverflow: FaStackOverflow,
  medium: FaMedium,
  telegram: FaTelegram,
  leetcode: SiLeetcode,
};

function iconFor(platform = "") {
  return PLATFORM_ICONS[platform.trim().toLowerCase()] || FiLink;
}

export default function SocialLinks({ size = 20, className = "" }) {
  const { profile } = useProfile();
  const socials = profile.socials || [];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {profile.contact?.github && (
        <a href={profile.contact.github} target="_blank" rel="noreferrer" className="hover:text-crimson transition" aria-label="GitHub">
          <FiGithub size={size} />
        </a>
      )}
      {profile.contact?.linkedin && (
        <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-crimson transition" aria-label="LinkedIn">
          <FiLinkedin size={size} />
        </a>
      )}
      {profile.contact?.email && (
        <a href={`mailto:${profile.contact.email}`} className="hover:text-crimson transition" aria-label="Email">
          <FiMail size={size} />
        </a>
      )}
      {socials.map((s) => {
        const Icon = iconFor(s.platform);
        return (
          <a
            key={`${s.platform}-${s.url}`}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-crimson transition"
            aria-label={s.platform}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
