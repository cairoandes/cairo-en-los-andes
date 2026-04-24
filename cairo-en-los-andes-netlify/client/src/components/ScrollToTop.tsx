import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop — scrolls to top on every route change.
 * If the URL has a hash (e.g. /#workshops), it waits for the page
 * to render and then scrolls to the matching element.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for DOM to render, then scroll to the hash target
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location]);

  return null;
}
