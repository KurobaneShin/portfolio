import { SOCIALS } from "~/modules/person";

export function SocialLinks({ className = "", place = "footer" }: { className?: string; place?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
      {SOCIALS.map((s) => (
        <li key={s.name}>
          <a
            href={s.url}
            target="_blank"
            rel="me noreferrer"
            data-umami-event="social"
            data-umami-event-network={s.name}
            data-umami-event-place={place}
            className="eyebrow transition-colors hover:text-signal"
          >
            {s.name} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}
