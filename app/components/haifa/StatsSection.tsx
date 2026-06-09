import { useConfigurables } from "~/modules/configurables";

export function StatsSection() {
  const { config } = useConfigurables();

  const stats = [
    {
      value: config?.statsCustomers || "12K+",
      label: "Pelanggan Setia",
      sublabel: "di seluruh Indonesia",
    },
    {
      value: config?.statsProducts || "200+",
      label: "Pilihan Produk",
      sublabel: "koleksi premium",
    },
    {
      value: config?.statsPremium || "100%",
      label: "Bahan Premium",
      sublabel: "terverifikasi kualitas",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-haifa-cream relative overflow-hidden">
      {/* Subtle keffiyeh pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, rgba(192,57,43,0.08) 0px, rgba(192,57,43,0.08) 2px, transparent 2px, transparent 18px)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-display text-5xl md:text-6xl text-haifa-clay">{stat.value}</p>
              <p className="font-body text-base font-medium text-haifa-charcoal mt-2">{stat.label}</p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
