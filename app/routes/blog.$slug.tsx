import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { Link, useParams } from "react-router";
import { Calendar, ArrowLeft } from "lucide-react";
import { StorefrontLayout } from "~/components/haifa/StorefrontLayout";

export const meta: MetaFunction = () => [
  { title: "Artikel — Haifa Official Store" },
];

export async function loader({ params }: LoaderFunctionArgs) {
  return { slug: params.slug };
}

export default function BlogPostPage() {
  const { slug } = useParams();

  return (
    <StorefrontLayout>
      <div className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/blog"
            className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-haifa-clay transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Blog
          </Link>

          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
            alt="Blog post"
            className="w-full rounded-3xl aspect-[16/9] object-cover mb-8"
          />

          <div className="flex items-center gap-3 mb-4">
            <span className="font-body text-xs text-haifa-clay bg-haifa-cream px-3 py-1 rounded-full capitalize">
              Tips
            </span>
            <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              10 Januari 2025
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl text-haifa-charcoal leading-tight mb-6">
            Tips Memilih Hijab yang Tepat untuk Berbagai Kesempatan
          </h1>

          <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-4">
            <p>
              Memilih hijab yang tepat untuk berbagai kesempatan adalah seni tersendiri. Setiap momen membutuhkan gaya yang berbeda — dari keseharian di rumah, pergi ke kantor, menghadiri pesta, hingga acara formal resmi.
            </p>
            <p>
              Di Haifa, kami memahami bahwa kebutuhan setiap wanita muslimah berbeda-beda. Itulah mengapa kami menghadirkan koleksi yang beragam dengan berbagai material dan desain yang bisa disesuaikan dengan berbagai kesempatan.
            </p>
            <h2 className="font-display text-xl text-haifa-charcoal mt-6">1. Hijab untuk Kesehariannya</h2>
            <p>
              Untuk aktivitas sehari-hari, pilih hijab dengan material yang ringan dan breathable seperti voile atau jersey. Material ini memberikan kenyamanan maksimal saat beraktivitas seharian.
            </p>
            <h2 className="font-display text-xl text-haifa-charcoal mt-6">2. Hijab untuk Acara Formal</h2>
            <p>
              Untuk acara formal, satin atau silk bisa menjadi pilihan yang tepat. Teksturnya yang halus dan mengkilap memberikan kesan elegan dan mewah yang sempurna untuk acara resmi.
            </p>
            <h2 className="font-display text-xl text-haifa-charcoal mt-6">3. Palestine Series untuk Kesempatan Spesial</h2>
            <p>
              Koleksi Palestine Series kami hadir dengan motif keffiyeh yang ikonik. Selain tampil stylish, setiap pembelian juga berkontribusi pada donasi kemanusiaan Palestina.
            </p>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
