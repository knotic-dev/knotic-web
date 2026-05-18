import Image from "next/image";
import { site, nav } from "@/data/content";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import FooterContact from "@/components/layout/FooterContact";
import SectionLabel from "@/components/ui/SectionLabel";

const socialLinks = [
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.social.whatsapp, label: "WhatsApp Community", Icon: WhatsAppIcon },
] as const;

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-glow footer-glow-cyan" aria-hidden />
      <div className="footer-glow footer-glow-purple" aria-hidden />

      <div className="footer-inner">
        <div className="footer-cta footer-animate">
          <div className="footer-cta-row">
            <div className="footer-cta-text">
              <SectionLabel>Have an idea?</SectionLabel>
              <a
                href={`mailto:${site.email}`}
                className="footer-headline elegant-mail-link"
              >
                Let&apos;s build together.
              </a>
              <a href={`mailto:${site.email}`} className="footer-email-link">
                {site.email}
              </a> 
              <div>
                <FooterContact />
              </div>
            </div>

           
          </div>
        </div>

        <div className="footer-bar footer-animate footer-animate-delay-2">
          <a href="#home" className="footer-logo-link">
            <Image
              src="/images/knotic-logo.png"
              alt="Knotic"
              width={105}
              height={26}
              className="footer-logo"
            />
          </a>

          <nav className="footer-nav" aria-label="Footer navigation">
            {nav.map((item) => (
              <a key={item.label} href={item.href} className="footer-nav-item">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom footer-animate footer-animate-delay-3">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} KNOTIC. All rights reserved.
          </p>

          <div className="footer-bottom-right">
            <div className="footer-legal">
              {["Terms", "Privacy"].map((t) => (
                <a key={t} href="#" className="footer-legal-link">
                  {t}
                </a>
              ))}
            </div>

            <div className="footer-socials">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social-link"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
