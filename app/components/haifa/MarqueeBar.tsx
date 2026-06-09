export function MarqueeBar() {
  const items = [
    "Premium Hijab",
    "Busana Muslimah",
    "Haifa Collection",
    "Palestine Series",
    "Free Ongkir se-Indonesia",
    "100% Bahan Premium",
  ];

  const track = [...items, ...items];

  return (
    <div className="bg-haifa-charcoal py-3 overflow-hidden">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-body text-xs font-500 uppercase tracking-widest text-white/90 px-5">
              {item}
            </span>
            <span className="text-haifa-peach">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
