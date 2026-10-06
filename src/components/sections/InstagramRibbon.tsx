"use client";

import React, { useEffect, useState } from "react";
import { Instagram, AlertCircle } from "lucide-react";

interface InstagramRibbonProps {
  data?: {
    title?: string;
    subtitle?: string;
    instagramAccountId?: string;
    instagramToken?: string;
  };
}

interface InstaPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  media_type?: string;
  thumbnail_url?: string;
}

export default function InstagramRibbon({ data }: InstagramRibbonProps) {
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(Boolean(data?.instagramToken));
  const [error, setError] = useState(false);

  const rawSubtitle = data?.subtitle || "";
  const instagramUrl = rawSubtitle
    ? rawSubtitle.startsWith("@")
      ? `https://www.instagram.com/${rawSubtitle.replace("@", "")}`
      : rawSubtitle.startsWith("http")
        ? rawSubtitle
        : `https://www.instagram.com/${rawSubtitle}`
    : "#";

  useEffect(() => {
    async function fetchInstagram() {
      if (!data?.instagramToken) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        let fetchUrl = "";

        if (data.instagramToken.startsWith("IG")) {
          fetchUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,thumbnail_url,permalink&access_token=${data.instagramToken}&limit=12`;
        } else {
          if (!data.instagramAccountId) {
            console.warn("Instagram Account ID is missing for Meta Graph API.");
            setError(true);
            setLoading(false);
            return;
          }
          fetchUrl = `https://graph.facebook.com/v20.0/${data.instagramAccountId}/media?fields=id,caption,media_url,media_type,thumbnail_url,permalink&access_token=${data.instagramToken}&limit=12`;
        }

        const res = await fetch(fetchUrl);
        const json = await res.json();

        if (json.error || !json.data) {
          console.error("Instagram API Error:", json.error);
          setError(true);
          setLoading(false);
          return;
        }

        const mappedPosts: InstaPost[] = json.data.map((p: any) => ({
          id: p.id,
          caption: p.caption || "View on Instagram",
          permalink: p.permalink || instagramUrl,
          media_type: p.media_type,
          media_url: p.media_type === "VIDEO" && p.thumbnail_url ? p.thumbnail_url : p.media_url,
        }));

        setPosts(mappedPosts);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch Instagram feed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagram();
  }, [data?.instagramToken, data?.instagramAccountId, instagramUrl]);

  if (!data?.instagramToken) {
    return (
      <section className="bg-[#f8fafc] border-t border-slate-100 py-24 font-sans">
        <div className="max-w-3xl mx-auto text-center p-12 border-2 border-dashed border-slate-300 rounded-3xl bg-white">
          <Instagram className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">Live Feed Not Connected</h3>
          <p className="text-slate-500 text-sm">
            Please enter your official Meta Instagram Token in the CMS to activate the automatic
            feed.
          </p>
        </div>
      </section>
    );
  }

  // Duplicate for seamless infinite marquee scroll
  const repeatedPosts = [...posts, ...posts];

  return (
    <section className="bg-[#f8fafc] border-t border-b border-slate-200/80 relative overflow-hidden py-16 sm:py-20 font-sans">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes jaidevaMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-instagram-track {
          display: flex;
          width: max-content;
          animation: jaidevaMarquee 40s linear infinite;
        }
        .animate-instagram-track:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      <div className="relative z-10">
        <div className="text-center space-y-3 mb-10 max-w-4xl mx-auto px-4 sm:px-6">
          <Instagram className="w-8 h-8 text-slate-800 mx-auto opacity-90 hover:scale-110 transition-transform duration-300" />

          {data?.title && (
            <h2 className="text-xs sm:text-sm tracking-[0.3em] text-[#0C356A] uppercase font-extrabold">
              {data.title}
            </h2>
          )}

          {data?.subtitle &&
            (data.subtitle.startsWith("@") || data.subtitle.startsWith("http") ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-base sm:text-lg font-bold text-[#C86218] hover:text-[#A74D0E] transition-colors duration-200 underline underline-offset-6"
              >
                {data.subtitle}
              </a>
            ) : (
              <p className="text-base sm:text-lg font-medium text-slate-600">{data.subtitle}</p>
            ))}
        </div>

        {error && (
          <div className="max-w-xl mx-auto mb-8 bg-red-50 text-red-600 p-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>Your Meta Graph API Token is invalid or expired.</p>
          </div>
        )}

        <div className="relative w-full border-y border-slate-100 bg-[#f8fafc] overflow-hidden py-8 min-h-[300px] flex items-center">
          {loading ? (
            <div className="w-full flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-[#C86218]/30 border-t-[#C86218] rounded-full animate-spin" />
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

              <div className="animate-instagram-track">
                {repeatedPosts.map((post, index) => (
                  <div key={`${post.id}-${index}`} className="shrink-0 px-4">
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block aspect-square w-[280px] sm:w-[320px] overflow-hidden group rounded-xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 bg-white"
                    >
                      <img
                        src={post.media_url}
                        alt={post.caption}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#0C356A]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center select-none">
                        <Instagram className="w-8 h-8 mb-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <p className="text-xs font-light leading-relaxed max-w-[220px] opacity-95 line-clamp-3">
                          {post.caption}
                        </p>
                        <span className="text-[10px] uppercase tracking-widest text-amber-200/90 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-semibold">
                          View on Instagram
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </>
          ) : (
            !error && (
              <div className="w-full text-center text-slate-500 text-sm">
                No recent posts found.
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
