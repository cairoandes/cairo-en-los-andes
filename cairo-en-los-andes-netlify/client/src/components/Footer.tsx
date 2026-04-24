import { Instagram, Mail, Phone } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { navLinks, t } from "@/lib/translations";
import { Link, useLocation } from "wouter";

export default function Footer() {
  const { lang } = useLang();
  const links = navLinks(lang);
  const [location] = useLocation();

  const handleScrollClick = (href: string) => {
    if (location !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#060a18] border-t border-[#d4a843]/10">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold gold-text mb-4">
              Cairo en los Andes
            </h3>
            <p className="text-sm text-[#faf5eb]/50 leading-relaxed max-w-xs">
              {t(lang, "footerDesc")}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[#d4a843] uppercase tracking-widest mb-4">
              {t(lang, "footerNav")}
            </h4>
            <div className="flex flex-col gap-2">
              {links.map((item) =>
                item.type === "page" ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-left text-sm text-[#faf5eb]/50 hover:text-[#d4a843] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => handleScrollClick(item.href)}
                    className="text-left text-sm text-[#faf5eb]/50 hover:text-[#d4a843] transition-colors"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[#d4a843] uppercase tracking-widest mb-4">
              {t(lang, "footerContact")}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/5493872617777"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#faf5eb]/50 hover:text-[#d4a843] transition-colors"
              >
                <Phone size={16} />
                +54 9 387 261 7777
              </a>
              <a
                href="mailto:cairoandesfestival@gmail.com"
                className="flex items-center gap-3 text-sm text-[#faf5eb]/50 hover:text-[#d4a843] transition-colors"
              >
                <Mail size={16} />
                cairoandesfestival@gmail.com
              </a>
              <a
                href="https://instagram.com/cairo_andes_festival"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#faf5eb]/50 hover:text-[#d4a843] transition-colors"
              >
                <Instagram size={16} />
                @cairo_andes_festival
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="section-divider mt-10 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#faf5eb]/30">
            &copy; 2026 Cairo en los Andes Festival. {t(lang, "footerRights")}
          </p>
          <p className="text-xs text-[#faf5eb]/30">
            {t(lang, "footerOrg")}
          </p>
        </div>
      </div>
    </footer>
  );
}
