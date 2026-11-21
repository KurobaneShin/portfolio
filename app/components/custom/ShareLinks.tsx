import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { X_HANDLE } from "~/modules/person";

// Each network gets its own utm_source, so visits that come back from a share show up in Umami.
export function ShareLinks({ url, title, slug }: { url: string; title: string; slug: string }) {
  const { t } = useTranslation();
  const tagged = (source: string) => `${url}${url.includes("?") ? "&" : "?"}utm_source=${source}&utm_medium=share`;
  const e = encodeURIComponent;
  const links = [
    { name: "X", href: `https://x.com/intent/post?text=${e(title)}&url=${e(tagged("x"))}&via=${X_HANDLE.slice(1)}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(tagged("linkedin"))}` },
    { name: "WhatsApp", href: `https://wa.me/?text=${e(`${title} ${tagged("whatsapp")}`)}` },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tagged("copy"));
      toast.success(t("blog.copied"));
    } catch {
      toast.error(t("blog.copyFailed"));
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <span className="eyebrow text-muted-foreground">{t("blog.share")}</span>
      {links.map((l) => (
        <a key={l.name} href={l.href} target="_blank" rel="noreferrer" data-umami-event="share" data-umami-event-network={l.name} data-umami-event-post={slug} className="eyebrow transition-colors hover:text-signal">
          {l.name} ↗
        </a>
      ))}
      <button type="button" onClick={copy} data-umami-event="share" data-umami-event-network="copy" data-umami-event-post={slug} className="eyebrow transition-colors hover:text-signal">
        {t("blog.copyLink")}
      </button>
    </div>
  );
}
