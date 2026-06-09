/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
  background?: string;
  surface?: string;
  accentDark?: string;
};

export type TNavLink = {
  label: string;
  href: string;
};

export type TCollection = {
  name: string;
  count: string;
  image: string;
  slug: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  tagline: string;
  subTaglineArabic: string;
  logoUrl: string;
  heroImage: string;
  brandColor: TBrandColor;
  heroHeading: string;
  heroSubheading: string;
  heroCTAPrimary: string;
  heroCTASecondary: string;
  whatsappNumber: string;
  instagramHandle: string;
  tiktokHandle: string;
  email: string;
  palestineDonationPercent: number;
  newsletterDiscount: number;
  showFlashSaleBanner: boolean;
  flashSaleEndDate: string;
  statsCustomers: string;
  statsProducts: string;
  statsPremium: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;
  address: string;
  aboutStory: string;
  navLinks: TNavLink[];
  featuredCollections: TCollection[];
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "Haifa Official Store",
  tagline: "Anggun dalam Iman, Indah dalam Hijab",
  subTaglineArabic: "الحجاب نور، والنور جمال",
  logoUrl: "FILL_LOGO_URL_HERE",
  heroImage: "",
  brandColor: {
    primary: "#B17457",
    secondary: "#4C4947",
    accent: "#E8A98A",
    background: "#FBF7F0",
    surface: "#F7EFD8",
    accentDark: "#C96D3F",
  },
  heroHeading: "Koleksi Terbaru 2025",
  heroSubheading: "Tampil Anggun dalam Balutan Fashion Muslim Premium",
  heroCTAPrimary: "Belanja Sekarang",
  heroCTASecondary: "Lihat Koleksi",
  whatsappNumber: "6281234567890",
  instagramHandle: "@haifa.official",
  tiktokHandle: "@haifa.official",
  email: "hello@haifaofficial.com",
  palestineDonationPercent: 10,
  newsletterDiscount: 15,
  showFlashSaleBanner: false,
  flashSaleEndDate: "2025-12-31T23:59:59.000Z",
  statsCustomers: "12K+",
  statsProducts: "200+",
  statsPremium: "100%",
  bankAccountName: "Haifa Official Store",
  bankAccountNumber: "1234567890",
  bankName: "BCA",
  address: "Jakarta, Indonesia",
  aboutStory:
    "Haifa Official Store hadir untuk wanita Muslim Indonesia yang mendambakan tampilan anggun dan elegan. Kami percaya bahwa hijab bukan hanya kewajiban agama, tetapi juga ekspresi keindahan dan identitas diri.",
  navLinks: [
    { label: "Beranda", href: "/" },
    { label: "Koleksi", href: "/collections" },
    { label: "Produk", href: "/shop" },
    { label: "Palestine Series", href: "/shop?category=palestine" },
    { label: "Tentang Kami", href: "/about" },
  ],
  featuredCollections: [
    {
      name: "Kerudung Premium",
      count: "48 Produk",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      slug: "kerudung",
    },
    {
      name: "Gamis",
      count: "32 Produk",
      image: "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=600&q=80",
      slug: "gamis",
    },
    {
      name: "Palestine Series",
      count: "16 Produk",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&q=80",
      slug: "palestine",
    },
    {
      name: "Aksesoris Hijab",
      count: "24 Produk",
      image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&q=80",
      slug: "aksesoris",
    },
  ],
};
