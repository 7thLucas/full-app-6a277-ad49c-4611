import { useState, useEffect } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Calendar, Tag } from "lucide-react";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";
import { Skeleton } from "~/components/haifa/Skeleton";

export const meta: MetaFunction = () => [
  { title: "Blog — Haifa Official Store" },
];

const MOCK_POSTS = [
  { _id: "1", title: "Tips Memilih Hijab yang Tepat untuk Berbagai Kesempatan", excerpt: "Memilih hijab yang tepat bisa menjadi tantangan tersendiri. Simak tips dari tim Haifa untuk tampil sempurna di setiap momen.", category: "tips", publishedAt: "2025-01-10", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", slug: "tips-memilih-hijab" },
  { _id: "2", title: "Trend Busana Muslimah 2025 yang Wajib Kamu Coba", excerpt: "Tahun 2025 menghadirkan tren modest fashion yang memukau. Dari warna earth tone hingga motif geometrik yang elegan.", category: "trend", publishedAt: "2025-01-05", thumbnail: "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=600&q=80", slug: "trend-busana-muslimah-2025" },
  { _id: "3", title: "Koleksi Palestine Series Haifa: Solidaritas lewat Fashion", excerpt: "Mengenal lebih dalam koleksi Palestine Series Haifa dan bagaimana setiap pembelian berkontribusi untuk kemanusiaan.", category: "koleksi", publishedAt: "2024-12-20", thumbnail: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&q=80", slug: "palestine-series-haifa" },
  { _id: "4", title: "Cara Merawat Kerudung Voile agar Tahan Lama", excerpt: "Kerudung voile premium perlu perawatan khusus. Pelajari cara mencuci, menyimpan, dan merawat hijab voile Anda.", category: "tips", publishedAt: "2024-12-15", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", slug: "cara-merawat-kerudung-voile" },
  { _id: "5", title: "5 Inspirasi OOTD Gamis Ceruti untuk Acara Formal", excerpt: "Tampil anggun di acara formal dengan pilihan outfit gamis ceruti premium dari koleksi terbaru Haifa.", category: "inspirasi", publishedAt: "2024-12-08", thumbnail: "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=600&q=80", slug: "ootd-gamis-ceruti-formal" },
  { _id: "6", title: "Panduan Lengkap Memilih Ukuran Gamis yang Pas", excerpt: "Jangan sampai salah ukuran! Ikuti panduan lengkap dari Haifa untuk memilih gamis yang tepat sesuai tubuh Anda.", category: "panduan", publishedAt: "2024-12-01", thumbnail: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&q=80", slug: "panduan-ukuran-gamis" },
];

export default function BlogPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <StorefrontLayout>
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="font-body text-xs uppercase tracking-widest text-haifa-clay">Artikel & Inspirasi</span>
            <h1 className="font-display text-3xl md:text-4xl mt-2 text-haifa-charcoal">
              Blog <em className="italic text-haifa-clay">Haifa</em>
            </h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-border">
                    <Skeleton className="w-full aspect-[16/9]" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))
              : MOCK_POSTS.map((post, i) => (
                  <Link
                    key={post._id}
                    to={`/blog/${post.slug}`}
                    className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1 reveal group"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                          <Tag className="w-3 h-3" />
                          <span className="capitalize">{post.category}</span>
                        </span>
                        <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <h2 className="font-body font-medium text-haifa-charcoal text-sm leading-snug line-clamp-2 group-hover:text-haifa-clay transition-colors">
                        {post.title}
                      </h2>
                      <p className="font-body text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
