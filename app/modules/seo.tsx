import { LoaderFunction, MetaArgs, MetaDescriptor } from "@vercel/remix";

// inspo by https://github.com/chaance/remix-seo/blob/main/src/index.ts
export interface DefaultMeta<
  T,
  U extends Record<string, LoaderFunction | unknown>,
> {
  (args: MetaArgs<T, U>, props?: MetaProps): MetaDescriptor[];
}

export const getMeta = (props: MetaProps) => {
  const meta: MetaDescriptor[] = [];
  const { canonical, title, description, robots, facebook, openGraph } = props;

  meta.push({ name: "robots", content: robots || "index, follow" });
  if (title) {
    meta.push({ title });
  }
  if (description) {
    meta.push({ name: "description", content: description });
  }
  if (canonical) {
    meta.push({ tagName: "link", rel: "canonical", href: canonical });
  }
  if (facebook) {
    if (facebook.appId) {
      meta.push({ property: "fb:app_id", content: facebook.appId });
    }
  }
  if (openGraph?.title || title) {
    meta.push({ property: "og:title", content: openGraph?.title || title });
  }
  if (openGraph?.description || description) {
    meta.push({
      property: "og:description",
      content: openGraph?.description || description,
    });
  }
  if (openGraph?.url || canonical) {
    meta.push({ property: "og:url", content: openGraph?.url || canonical });
  }
  meta.push({ property: "og:type", content: openGraph?.type || "website" });
  meta.push({ property: "og:locale", content: openGraph?.locale || "pt_BR" });
  meta.push({
    property: "og:site_name",
    content: openGraph?.siteName || "Quaddro",
  });

  if (openGraph?.images?.length) {
    for (const image of openGraph.images) {
      if (image.url) {
        meta.push({ property: "og:image", content: image.url });
      }
      if (image.alt) {
        meta.push({ property: "og:image:alt", content: image.alt });
      }
      if (image.secureUrl) {
        meta.push({
          property: "og:image:secure_url",
          content: image.secureUrl.toString(),
        });
      }
      if (image.type) {
        meta.push({ property: "og:image:type", content: image.type });
      }
      if (image.width) {
        meta.push({
          property: "og:image:width",
          content: image.width.toString(),
        });
      }
      if (image.height) {
        meta.push({
          property: "og:image:height",
          content: image.height.toString(),
        });
      }
    }
  }
  if (openGraph?.videos?.length) {
    for (const video of openGraph.videos) {
      meta.push({ property: "og:video", content: video.url });
      if (video.alt) {
        meta.push({ property: "og:video:alt", content: video.alt });
      }
      if (video.secureUrl) {
        meta.push({
          property: "og:video:secure_url",
          content: video.secureUrl.toString(),
        });
      }
      if (video.type) {
        meta.push({ property: "og:video:type", content: video.type });
      }
      if (video.width) {
        meta.push({
          property: "og:video:width",
          content: video.width.toString(),
        });
      }
      if (video.height) {
        meta.push({
          property: "og:video:height",
          content: video.height.toString(),
        });
      }
    }
  }

  return meta;
};

interface MetaProps {
  canonical?: string;
  title?: string;
  description?: string;
  robots?: string;
  openGraph?: OpenGraphMeta;
  facebook?: FacebookMeta;
}

interface OpenGraphMeta {
  description?: string;
  images?: OpenGraphMedia[];
  locale?: string;
  siteName?: string;
  title?: string;
  type?: string;
  url?: string;
  video?: OpenGraphVideo;
  videos?: OpenGraphMedia[];
}

interface OpenGraphMedia {
  url?: string;
  alt?: string;
  height?: number;
  secureUrl?: string;
  type?: string;
  width?: number;
}

interface OpenGraphVideo {
  actors?: OpenGraphVideoActors[];
  directors?: string[];
  duration?: number;
  releaseDate?: string;
  series?: string;
  tags?: string[];
  writers?: string[];
}

interface OpenGraphVideoActors {
  profile: string;
  role?: string;
}

interface FacebookMeta {
  appId?: string;
}
