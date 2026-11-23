"use client";

import { useEffect } from "react";

type Win = Window & {
  clarity?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

/** Send a conversion event to whichever analytics tools are loaded (Clarity, GA4). */
export function track(name: string) {
  const w = window as Win;
  try {
    w.clarity?.("event", name);
    w.gtag?.("event", name);
  } catch {
    /* analytics must never break the page */
  }
}

/**
 * - Tracks WhatsApp / call / email clicks and lead-form submissions as conversion events.
 * - Loads the Odoo live chat on desktop only, once the page is idle: on phones the WhatsApp
 *   button is the contact channel, and the two floating bubbles used to overlap.
 */
export function SiteScripts({ livechat }: { livechat?: { url: string; channelId: number } }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("https://wa.me/")) track("whatsapp_click");
      else if (href.startsWith("tel:")) track("call_click");
      else if (href.startsWith("mailto:")) track("email_click");
    };
    const onLead = () => track("lead_submit");
    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("warrdly:lead", onLead);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("warrdly:lead", onLead);
    };
  }, []);

  useEffect(() => {
    if (!livechat?.url || !window.matchMedia("(min-width: 768px)").matches) return;
    const load = () => {
      for (const src of [`${livechat.url}/im_livechat/loader/${livechat.channelId}`, `${livechat.url}/im_livechat/assets_embed.js`]) {
        const s = document.createElement("script");
        s.src = src;
        s.async = false; // keep loader → assets order
        document.body.appendChild(s);
      }
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(load, { timeout: 4000 });
    else setTimeout(load, 2500);
  }, [livechat?.url, livechat?.channelId]);

  return null;
}
