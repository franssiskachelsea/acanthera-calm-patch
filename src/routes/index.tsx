import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ACANTHERA PATCH — Berhenti Merokok dari Belakang Telinga" },
      {
        name: "description",
        content:
          "Patch antirokok berbasis minyak atsiri daun jeruju (Acanthus ilicifolius). Inovasi herbal mangrove Indonesia untuk SEMAR LKTIN 2026 UNS.",
      },
      { property: "og:title", content: "ACANTHERA PATCH — Smart Postauricular Aromatherapy" },
      {
        property: "og:description",
        content:
          "Inovasi patch herbal berbasis daun jeruju untuk membantu berhenti merokok. Universitas Surabaya × SEMAR LKTIN 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// ============== DESIGN TOKENS ==============
const C = {
  forestDark: "#0f2818",
  forestDeep: "#1a3a26",
  forestMid: "#245736",
  green: "#2d7a4a",
  greenLight: "#4ca66d",
  greenGlow: "#7dd39a",
  cream: "#f7f4ec",
  paper: "#fbfaf5",
  ink: "#132015",
  muted: "#5b6b60",
  border: "#e3ded1",
  gold: "#c9a44c",
  red: "#c94a4a",
  redSoft: "#fbe6e6",
  orange: "#d97848",
  orangeSoft: "#fbe8dc",
  yellow: "#d9b23c",
  yellowSoft: "#f8ecc4",
  greenSoft: "#dff0e3",
  blue: "#2b6db3",
};

const fontDisplay = "Georgia, 'Times New Roman', serif";
const fontBody =
  "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

// ============== DATA ==============
const formulaData = [
  { formula: "F1 (2%)", kenyamanan: 95, stabilitas: 88, skor: 79.6, lekat: 6.1 },
  { formula: "F2 (4%)", kenyamanan: 93, stabilitas: 91, skor: 84.2, lekat: 7.8 },
  { formula: "F3 (6%)", kenyamanan: 96, stabilitas: 98, skor: 95.8, lekat: 10.2 },
  { formula: "F4 (8%)", kenyamanan: 85, stabilitas: 94, skor: 89.3, lekat: 9.5 },
  { formula: "F5 (10%)", kenyamanan: 76, stabilitas: 90, skor: 84.7, lekat: 8.4 },
];

const surveyData = [
  { label: "Minat Penggunaan", value: 92 },
  { label: "Efektivitas Antirokok", value: 90 },
  { label: "Kenyamanan", value: 94 },
  { label: "Kemudahan Penggunaan", value: 96 },
  { label: "Implementasi Desa", value: 96 },
];

const beforeAfter = [
  { label: "Craving Score", before: 8.2, after: 2.6, delta: "↓68.3%", up: false, max: 10 },
  { label: "Rokok/Hari", before: 12, after: 5, delta: "↓58.3%", up: false, max: 15 },
  { label: "Skor Relaksasi", before: 2.4, after: 4.5, delta: "↑87.5%", up: true, max: 5 },
];

const sections = [
  { id: "hero", label: "Beranda" },
  { id: "masalah", label: "Masalah" },
  { id: "produk", label: "Produk" },
  { id: "bahan", label: "Bahan Aktif" },
  { id: "riset", label: "Riset" },
  { id: "galeri", label: "Galeri" },
  { id: "tim", label: "Tim" },
];

// ============== TOOLTIP ==============
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: "rgba(15, 40, 24, 0.95)",
        border: `1px solid ${C.greenLight}`,
        borderRadius: 8,
        padding: "10px 14px",
        color: C.cream,
        fontFamily: fontBody,
        fontSize: 13,
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ fontFamily: fontDisplay, marginBottom: 6, color: C.greenGlow }}>
        {label}
      </div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 14 }}>
          <span style={{ color: p.color || C.greenGlow }}>{p.name}</span>
          <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
}

// ============== LEAF SVG ==============
function Leaf({ style, size = 120, opacity = 0.15 }: any) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ position: "absolute", opacity, ...style }}
      aria-hidden
    >
      <path
        d="M50 5 C 20 25, 15 60, 50 95 C 85 60, 80 25, 50 5 Z"
        fill={C.greenGlow}
      />
      <path
        d="M50 10 L 50 92"
        stroke={C.forestDeep}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M50 30 Q 35 40, 28 55 M50 45 Q 65 55, 72 68 M50 60 Q 38 68, 32 78"
        stroke={C.forestDeep}
        strokeWidth="0.8"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

// ============== MAIN ==============
function Index() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = "hero";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: fontBody, color: C.ink, background: C.paper }}>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        h1,h2,h3,h4 { font-family: ${fontDisplay}; margin: 0; line-height: 1.2; }
        p { margin: 0; line-height: 1.65; }
        .ap-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        .ap-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .ap-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .ap-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .ap-grid-6 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .ap-section { padding: 96px 0; }
        .ap-btn { padding: 14px 26px; border-radius: 999px; font-family: ${fontBody}; font-size: 15px; font-weight: 600; cursor: pointer; border: none; transition: all .25s; display: inline-flex; align-items: center; gap: 8px; }
        .ap-btn-primary { background: ${C.greenLight}; color: ${C.forestDark}; }
        .ap-btn-primary:hover { background: ${C.greenGlow}; transform: translateY(-2px); }
        .ap-btn-ghost { background: transparent; color: ${C.cream}; border: 1.5px solid rgba(255,255,255,0.4); }
        .ap-btn-ghost:hover { background: rgba(255,255,255,0.1); }
        .ap-mobile-toggle { display: none; }
        @media (max-width: 768px) {
          .ap-grid-2, .ap-grid-3, .ap-grid-4, .ap-grid-6 { grid-template-columns: 1fr !important; gap: 20px; }
          .ap-section { padding: 64px 0; }
          .ap-nav-links { display: ${menuOpen ? "flex" : "none"} !important; position: absolute; top: 60px; left: 0; right: 0; flex-direction: column; background: ${C.forestDark}; padding: 20px; gap: 16px; }
          .ap-mobile-toggle { display: block !important; }
          .ap-hero-title { font-size: 40px !important; }
          .ap-h2 { font-size: 32px !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(15, 40, 24, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid rgba(125, 211, 154, 0.15)`,
        }}
      >
        <div
          className="ap-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            position: "relative",
          }}
        >
          <div
            onClick={() => scrollTo("hero")}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${C.greenLight}, ${C.greenGlow})`,
                display: "grid",
                placeItems: "center",
                fontFamily: fontDisplay,
                fontWeight: 700,
                color: C.forestDark,
                fontSize: 18,
              }}
            >
              A
            </div>
            <span
              style={{
                fontFamily: fontDisplay,
                color: C.cream,
                fontSize: 17,
                letterSpacing: 0.5,
              }}
            >
              ACANTHERA
            </span>
          </div>

          <button
            className="ap-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              color: C.cream,
              fontSize: 24,
              cursor: "pointer",
            }}
            aria-label="Menu"
          >
            ☰
          </button>

          <div
            className="ap-nav-links"
            style={{ display: "flex", gap: 28, alignItems: "center" }}
          >
            {sections.map((s) => (
              <span
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  cursor: "pointer",
                  fontSize: 14,
                  color: active === s.id ? C.greenGlow : "rgba(247,244,236,0.72)",
                  fontWeight: active === s.id ? 600 : 400,
                  borderBottom:
                    active === s.id ? `2px solid ${C.greenGlow}` : "2px solid transparent",
                  paddingBottom: 4,
                  transition: "color .2s",
                }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          background: `radial-gradient(ellipse at top left, ${C.forestMid} 0%, ${C.forestDeep} 45%, ${C.forestDark} 100%)`,
          color: C.cream,
          overflow: "hidden",
          paddingTop: 120,
          paddingBottom: 80,
        }}
      >
        <Leaf style={{ top: 100, right: -30, transform: "rotate(25deg)" }} size={280} opacity={0.09} />
        <Leaf style={{ top: 350, left: -40, transform: "rotate(-40deg)" }} size={220} opacity={0.08} />
        <Leaf style={{ bottom: 40, right: 100, transform: "rotate(160deg)" }} size={160} opacity={0.1} />
        <Leaf style={{ bottom: 200, left: 200, transform: "rotate(80deg)" }} size={90} opacity={0.12} />

        <div className="ap-container" style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(125, 211, 154, 0.12)",
              border: `1px solid rgba(125, 211, 154, 0.35)`,
              fontSize: 12.5,
              letterSpacing: 0.5,
              color: C.greenGlow,
              marginBottom: 28,
            }}
          >
            🌿 Inovasi Herbal Berbasis Mangrove Indonesia · SDGs 3 & 15
          </div>

          <h1
            className="ap-hero-title"
            style={{
              fontSize: 64,
              fontWeight: 400,
              maxWidth: 900,
              marginBottom: 20,
              letterSpacing: -1,
            }}
          >
            Berhenti Merokok dari{" "}
            <em style={{ color: C.greenGlow, fontStyle: "italic" }}>
              Belakang Telinga
            </em>
          </h1>

          <p
            style={{
              fontSize: 18,
              maxWidth: 720,
              color: "rgba(247,244,236,0.82)",
              marginBottom: 40,
            }}
          >
            <strong style={{ color: C.greenGlow }}>ACANTHERA PATCH</strong> — Smart Postauricular
            Aromatherapy Relaxing. Patch antirokok berbasis ekstrak minyak atsiri daun jeruju
            (Acanthus ilicifolius) yang bekerja melalui area postauricular, menggabungkan
            relaksasi aromaterapi dengan pengendalian craving secara herbal alami.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 72 }}>
            <button className="ap-btn ap-btn-primary" onClick={() => scrollTo("produk")}>
              Pelajari Produk →
            </button>
            <button className="ap-btn ap-btn-ghost" onClick={() => scrollTo("riset")}>
              Lihat Data Riset
            </button>
          </div>

          <div className="ap-grid-4">
            {[
              { v: "93.6%", l: "Tingkat Penerimaan Masyarakat" },
              { v: "↓68.3%", l: "Penurunan Craving Merokok" },
              { v: "↓58.3%", l: "Penurunan Frekuensi Merokok" },
              { v: "F3 Optimal", l: "Skor 95.8/100 Formula Terpilih" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: 22,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div
                  style={{
                    fontFamily: fontDisplay,
                    fontSize: 30,
                    color: C.greenGlow,
                    marginBottom: 8,
                  }}
                >
                  {s.v}
                </div>
                <div style={{ fontSize: 13, color: "rgba(247,244,236,0.75)", lineHeight: 1.4 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASALAH */}
      <section id="masalah" className="ap-section" style={{ background: C.paper }}>
        <div className="ap-container">
          <SectionLabel>01 — Latar Belakang</SectionLabel>
          <div className="ap-grid-2" style={{ marginTop: 32 }}>
            <div>
              <h2 className="ap-h2" style={{ fontSize: 44, marginBottom: 24, color: C.forestDark }}>
                Krisis Rokok di Pedesaan yang Belum Terjawab
              </h2>
              <p style={{ color: C.muted, marginBottom: 18, fontSize: 15.5 }}>
                Rokok membunuh lebih dari <strong style={{ color: C.ink }}>8 juta jiwa per tahun</strong>{" "}
                (WHO, 2023). Indonesia mencatat prevalensi perokok dewasa di atas 30%, dan Jawa Timur
                menyentuh 28.11% pada 2025.
              </p>
              <p style={{ color: C.muted, marginBottom: 24, fontSize: 15.5 }}>
                Survei kami di <strong style={{ color: C.ink }}>Desa Jatijejer, Trawas</strong>{" "}
                menemukan konsentrasi perokok usia produktif dan remaja yang tinggi — sementara terapi
                pengganti nikotin (NRT) konvensional tetap jauh dari jangkauan mereka.
              </p>

              <h3 style={{ fontSize: 18, marginBottom: 14, color: C.forestDark }}>
                Mengapa NRT Konvensional Gagal?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "💸", title: "Biaya Tinggi", desc: "Patch nikotin tidak terjangkau bagi masyarakat pedesaan." },
                  { icon: "🏥", title: "Akses Terbatas", desc: "Apotek dan fasilitas farmasi jauh dari desa." },
                  { icon: "⚗️", title: "Bahan Sintetis", desc: "Kekhawatiran efek samping farmakologis jangka panjang." },
                ].map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 14,
                      padding: 16,
                      background: C.cream,
                      borderRadius: 12,
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    <div style={{ fontSize: 24 }}>{r.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 3, color: C.forestDark }}>
                        {r.title}
                      </div>
                      <div style={{ fontSize: 14, color: C.muted }}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ap-grid-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {[
                { v: "8 Juta+", l: "Kematian/tahun akibat rokok", bg: C.redSoft, fg: C.red },
                { v: ">30%", l: "Prevalensi perokok dewasa Indonesia", bg: C.orangeSoft, fg: C.orange },
                { v: "28.11%", l: "Prevalensi perokok Jawa Timur 2025", bg: C.yellowSoft, fg: "#a07c1e" },
                { v: "30 resp.", l: "Responden perokok aktif disurvei", bg: C.greenSoft, fg: C.green },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: 24,
                    borderRadius: 16,
                    background: s.bg,
                    minHeight: 160,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontFamily: fontDisplay, fontSize: 36, color: s.fg }}>{s.v}</div>
                  <div style={{ fontSize: 13, color: C.ink, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUK */}
      <section
        id="produk"
        className="ap-section"
        style={{
          background: `linear-gradient(180deg, ${C.forestDeep} 0%, ${C.forestDark} 100%)`,
          color: C.cream,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Leaf style={{ top: 60, right: 30, transform: "rotate(45deg)" }} size={200} opacity={0.06} />
        <div className="ap-container" style={{ position: "relative" }}>
          <SectionLabel dark>02 — Produk</SectionLabel>
          <h2
            className="ap-h2"
            style={{ fontSize: 46, marginTop: 20, marginBottom: 14, color: C.cream }}
          >
            ACANTHERA <em style={{ color: C.greenGlow }}>PATCH</em>
          </h2>
          <p style={{ maxWidth: 680, color: "rgba(247,244,236,0.75)", marginBottom: 56, fontSize: 16 }}>
            Sebuah patch transdermal yang ditempel di area belakang telinga — jalur cepat menuju
            sistem saraf pusat dengan absorpsi optimal dan kenyamanan tinggi.
          </p>

          <div className="ap-grid-3" style={{ marginBottom: 72 }}>
            {[
              {
                n: "01",
                t: "Tempel di Belakang Telinga",
                d: "Area postauricular memiliki vaskularisasi tinggi dan letak dekat sistem saraf pusat.",
              },
              {
                n: "02",
                t: "Senyawa Aktif Terserap Bertahap",
                d: "Formula F3 (6%) melepaskan senyawa bioaktif secara terkendali hingga 10+ jam.",
              },
              {
                n: "03",
                t: "Relaksasi + Craving Suppression",
                d: "Stimulasi sistem limbik menghadirkan efek relaksasi dan menekan kecemasan withdrawal.",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: 28,
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(125,211,154,0.15)",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.greenLight}, ${C.greenGlow})`,
                    color: C.forestDark,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: fontDisplay,
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 20,
                  }}
                >
                  {s.n}
                </div>
                <h3 style={{ fontSize: 20, marginBottom: 10, color: C.cream }}>{s.t}</h3>
                <p style={{ color: "rgba(247,244,236,0.7)", fontSize: 14.5 }}>{s.d}</p>
              </div>
            ))}
          </div>

          {/* Comparison */}
          <h3 style={{ fontSize: 26, marginBottom: 28, color: C.cream, textAlign: "center" }}>
            NRT Konvensional vs <em style={{ color: C.greenGlow }}>ACANTHERA PATCH</em>
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              borderRadius: 20,
              overflow: "hidden",
            }}
            className="ap-grid-2"
          >
            <div
              style={{
                padding: 32,
                background: "rgba(201, 74, 74, 0.08)",
                border: "1px solid rgba(201,74,74,0.25)",
                borderRadius: 20,
              }}
            >
              <div style={{ fontSize: 13, color: C.red, marginBottom: 6, letterSpacing: 1 }}>
                KONVENSIONAL
              </div>
              <h4 style={{ fontSize: 22, marginBottom: 20, color: C.cream }}>NRT</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Harga relatif mahal",
                  "Menggunakan bahan sintetis",
                  "Efek samping farmakologis",
                  "Akses terbatas di pedesaan",
                  "Fokus pada substitusi nikotin",
                ].map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, color: "rgba(247,244,236,0.85)", fontSize: 15 }}>
                    <span style={{ color: C.red, fontWeight: 700 }}>✕</span> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                padding: 32,
                background: "rgba(125, 211, 154, 0.09)",
                border: `1px solid ${C.greenLight}`,
                borderRadius: 20,
              }}
            >
              <div style={{ fontSize: 13, color: C.greenGlow, marginBottom: 6, letterSpacing: 1 }}>
                INOVASI HERBAL
              </div>
              <h4 style={{ fontSize: 22, marginBottom: 20, color: C.cream }}>ACANTHERA PATCH</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Ekonomis & terjangkau",
                  "100% bahan herbal alami jeruju",
                  "Minim efek samping",
                  "Cocok untuk masyarakat pedesaan",
                  "Dual efek: relaksasi + antirokok",
                ].map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, color: "rgba(247,244,236,0.9)", fontSize: 15 }}>
                    <span style={{ color: C.greenGlow, fontWeight: 700 }}>✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BAHAN AKTIF */}
      <section id="bahan" className="ap-section" style={{ background: C.paper }}>
        <div className="ap-container">
          <SectionLabel>03 — Bahan Aktif</SectionLabel>
          <h2 className="ap-h2" style={{ fontSize: 44, marginTop: 20, marginBottom: 48, color: C.forestDark }}>
            Kekuatan <em style={{ color: C.green }}>Daun Jeruju</em>
          </h2>

          <div className="ap-grid-2">
            <div>
              <div
                style={{
                  padding: 32,
                  background: `linear-gradient(160deg, ${C.forestDeep}, ${C.forestMid})`,
                  color: C.cream,
                  borderRadius: 20,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Leaf style={{ bottom: -20, right: -20, transform: "rotate(20deg)" }} size={180} opacity={0.15} />
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      background: "rgba(125,211,154,0.2)",
                      borderRadius: 999,
                      fontSize: 12,
                      color: C.greenGlow,
                      marginBottom: 16,
                    }}
                  >
                    Acanthus ilicifolius
                  </div>
                  <h3 style={{ fontSize: 30, marginBottom: 16, fontStyle: "italic" }}>
                    Jeruju — Mangrove Asli Indonesia
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24 }}>
                    {[
                      ["Ekstraksi", "Steam distillation 4 jam dari 2 kg daun segar"],
                      ["Rendemen", "2.76% → 18 mL minyak atsiri"],
                      ["Stabilitas", "Stabil 14 hari (warna, aroma, viskositas)"],
                      ["Organoleptik", "Kuning kehijauan, aroma herbal segar, pH 5.9"],
                    ].map(([k, v], i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "start" }}>
                        <div
                          style={{
                            minWidth: 100,
                            fontSize: 12,
                            letterSpacing: 1,
                            color: C.greenGlow,
                            paddingTop: 3,
                          }}
                        >
                          {k}
                        </div>
                        <div style={{ fontSize: 14.5, color: "rgba(247,244,236,0.9)" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                {
                  icon: "🌿",
                  name: "Terpenoid",
                  role: "Relaksasi & Aromaterapi",
                  desc: "Senyawa volatil utama. Menstimulasi sistem limbik dan menekan craving.",
                },
                {
                  icon: "🍃",
                  name: "Flavonoid",
                  role: "Antioksidan & Antiinflamasi",
                  desc: "Luteolin & apigenin — menghambat NF-κB/COX-2 dan menetralisir ROS.",
                },
                {
                  icon: "💊",
                  name: "Alkaloid",
                  role: "Modulasi Stres",
                  desc: "Memengaruhi sistem saraf, mengurangi kecemasan withdrawal nikotin.",
                },
                {
                  icon: "🛡️",
                  name: "Saponin",
                  role: "Aktivitas Protektif",
                  desc: "Melindungi dari dampak oksidatif asap rokok jangka panjang.",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    padding: 22,
                    background: C.paper,
                    borderRadius: 14,
                    border: `1px solid ${C.border}`,
                    borderTop: `3px solid ${C.green}`,
                  }}
                >
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{c.icon}</div>
                  <h4 style={{ fontSize: 18, marginBottom: 4, color: C.forestDark }}>{c.name}</h4>
                  <div style={{ fontSize: 12, color: C.green, marginBottom: 10, fontWeight: 600 }}>
                    {c.role}
                  </div>
                  <p style={{ fontSize: 13.5, color: C.muted }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RISET */}
      <section id="riset" className="ap-section" style={{ background: C.cream }}>
        <div className="ap-container">
          <SectionLabel>04 — Riset & Data</SectionLabel>
          <h2 className="ap-h2" style={{ fontSize: 44, marginTop: 20, marginBottom: 48, color: C.forestDark }}>
            Data yang <em style={{ color: C.green }}>Berbicara</em>
          </h2>

          {/* Formula Chart */}
          <div
            style={{
              padding: 28,
              background: C.paper,
              borderRadius: 20,
              border: `1px solid ${C.border}`,
              marginBottom: 40,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 22, color: C.forestDark, marginBottom: 4 }}>
                  Perbandingan 5 Formula
                </h3>
                <p style={{ fontSize: 13, color: C.muted }}>
                  Skor keseluruhan berdasarkan kenyamanan, stabilitas, dan daya lekat
                </p>
              </div>
              <div
                style={{
                  padding: "6px 14px",
                  background: C.greenSoft,
                  color: C.green,
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                ✓ F3 OPTIMAL
              </div>
            </div>
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={formulaData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                  <XAxis dataKey="formula" stroke={C.muted} style={{ fontSize: 12 }} />
                  <YAxis stroke={C.muted} style={{ fontSize: 12 }} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(45,122,74,0.06)" }} />
                  <Bar dataKey="skor" name="Skor Total" radius={[8, 8, 0, 0]}>
                    {formulaData.map((d, i) => (
                      <Cell key={i} fill={d.formula.startsWith("F3") ? C.green : C.greenLight} opacity={d.formula.startsWith("F3") ? 1 : 0.55} />
                    ))}
                    <LabelList dataKey="skor" position="top" style={{ fontSize: 11, fill: C.forestDark }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Survey + Before/After */}
          <div className="ap-grid-2">
            <div
              style={{
                padding: 28,
                background: C.paper,
                borderRadius: 20,
                border: `1px solid ${C.border}`,
              }}
            >
              <h3 style={{ fontSize: 22, color: C.forestDark, marginBottom: 6 }}>
                Survei Penerimaan Masyarakat
              </h3>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>
                30 responden · Desa Jatijejer, Trawas
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {surveyData.map((s, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13.5 }}>
                      <span style={{ color: C.ink }}>{s.label}</span>
                      <strong style={{ color: C.green }}>{s.value}%</strong>
                    </div>
                    <div style={{ height: 8, background: C.border, borderRadius: 999, overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${s.value}%`,
                          height: "100%",
                          background: `linear-gradient(90deg, ${C.green}, ${C.greenGlow})`,
                          borderRadius: 999,
                          transition: "width 1s",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 24,
                  padding: 16,
                  background: C.greenSoft,
                  borderRadius: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, color: C.muted }}>Rata-rata</div>
                  <div style={{ fontFamily: fontDisplay, fontSize: 26, color: C.green }}>
                    93.6% <span style={{ fontSize: 14, color: C.muted }}>(4.68/5.0)</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: C.muted, textAlign: "right" }}>
                  68% Sangat Setuju<br />
                  24% Setuju · 8% Netral
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 28,
                background: C.paper,
                borderRadius: 20,
                border: `1px solid ${C.border}`,
              }}
            >
              <h3 style={{ fontSize: 22, color: C.forestDark, marginBottom: 6 }}>
                Before vs After Formula F3
              </h3>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>
                Perubahan sebelum & sesudah penggunaan patch
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {beforeAfter.map((b, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 14, color: C.ink, fontWeight: 500 }}>{b.label}</span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: b.up ? C.green : C.red,
                          padding: "2px 10px",
                          background: b.up ? C.greenSoft : C.redSoft,
                          borderRadius: 999,
                        }}
                      >
                        {b.delta}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 11, color: C.muted, width: 48 }}>Sebelum</span>
                        <div style={{ flex: 1, height: 22, background: C.border, borderRadius: 6, overflow: "hidden" }}>
                          <div
                            style={{
                              width: `${(b.before / b.max) * 100}%`,
                              height: "100%",
                              background: C.muted,
                              opacity: 0.6,
                            }}
                          />
                        </div>
                        <strong style={{ fontSize: 13, color: C.ink, width: 34, textAlign: "right" }}>{b.before}</strong>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 11, color: C.muted, width: 48 }}>Sesudah</span>
                        <div style={{ flex: 1, height: 22, background: C.border, borderRadius: 6, overflow: "hidden" }}>
                          <div
                            style={{
                              width: `${(b.after / b.max) * 100}%`,
                              height: "100%",
                              background: `linear-gradient(90deg, ${C.green}, ${C.greenGlow})`,
                            }}
                          />
                        </div>
                        <strong style={{ fontSize: 13, color: C.green, width: 34, textAlign: "right" }}>{b.after}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SWOT */}
          <h3 style={{ fontSize: 26, color: C.forestDark, marginTop: 56, marginBottom: 24, textAlign: "center" }}>
            Analisis <em style={{ color: C.green }}>SWOT</em>
          </h3>
          <div
            className="ap-grid-4"
            style={{
              background: C.forestDark,
              padding: 6,
              borderRadius: 20,
              gap: 6,
            }}
          >
            {[
              { t: "Strengths", c: C.greenGlow, items: ["Bahan herbal lokal", "Formulasi teroptimasi", "Penerimaan 93.6%"] },
              { t: "Weaknesses", c: "#e8a866", items: ["Masih tahap prototype", "Perlu uji klinis", "Bahan baku perlu mitra"] },
              { t: "Opportunities", c: "#6fb5e0", items: ["Integrasi Desa Sehat", "Potensi HKI", "Hilirisasi UMKM"] },
              { t: "Threats", c: "#e07878", items: ["Kompetitor NRT besar", "Regulasi herbal", "Resistensi adopsi"] },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: 22,
                  background: C.forestDeep,
                  borderRadius: 16,
                  color: C.cream,
                }}
              >
                <h4 style={{ fontSize: 18, color: s.c, marginBottom: 14 }}>{s.t}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.items.map((it, j) => (
                    <li key={j} style={{ fontSize: 13.5, color: "rgba(247,244,236,0.82)", display: "flex", gap: 8 }}>
                      <span style={{ color: s.c }}>•</span> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section id="galeri" className="ap-section" style={{ background: C.paper }}>
        <div className="ap-container">
          <SectionLabel>05 — Dokumentasi</SectionLabel>
          <h2 className="ap-h2" style={{ fontSize: 44, marginTop: 20, marginBottom: 40, color: C.forestDark }}>
            Galeri <em style={{ color: C.green }}>Penelitian</em>
          </h2>

          <div className="ap-grid-6">
            {[
              { icon: "📦", t: "Kemasan ACANTHERA PATCH", s: "Desain packaging Marvel Edition" },
              { icon: "⚗️", t: "Proses Destilasi Uap", s: "Steam distillation 4 jam" },
              { icon: "🔬", t: "Uji KLT Bioaktif", s: "Identifikasi senyawa aktif" },
              { icon: "📋", t: "Survei Jatijejer", s: "Pengambilan data 30 responden" },
              { icon: "🌿", t: "Tanaman Jeruju", s: "Acanthus ilicifolius bahan baku" },
              { icon: "🎤", t: "Sosialisasi Warga", s: "Presentasi & edukasi masyarakat" },
            ].map((g, i) => (
              <div
                key={i}
                style={{
                  background: C.cream,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: `1px solid ${C.border}`,
                  transition: "transform .3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div
                  style={{
                    aspectRatio: "4/3",
                    background: `linear-gradient(135deg, ${C.greenSoft}, ${C.cream})`,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 64,
                  }}
                >
                  {g.icon}
                </div>
                <div style={{ padding: 16 }}>
                  <h4 style={{ fontSize: 16, marginBottom: 4, color: C.forestDark }}>{g.t}</h4>
                  <p style={{ fontSize: 13, color: C.muted }}>{g.s}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: C.muted, fontStyle: "italic" }}>
            * Ganti emoji dengan foto asli penelitian
          </p>
        </div>
      </section>

      {/* TIM */}
      <section
        id="tim"
        className="ap-section"
        style={{
          background: `linear-gradient(180deg, ${C.forestDark}, ${C.forestDeep})`,
          color: C.cream,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Leaf style={{ top: 40, left: -30, transform: "rotate(-20deg)" }} size={220} opacity={0.07} />
        <Leaf style={{ bottom: 60, right: -20, transform: "rotate(140deg)" }} size={180} opacity={0.08} />
        <div className="ap-container" style={{ position: "relative" }}>
          <SectionLabel dark>06 — Tim & Kontak</SectionLabel>
          <h2 className="ap-h2" style={{ fontSize: 44, marginTop: 20, marginBottom: 12, color: C.cream }}>
            Tim <em style={{ color: C.greenGlow }}>Peneliti</em>
          </h2>
          <p style={{ color: "rgba(247,244,236,0.7)", marginBottom: 48, maxWidth: 620 }}>
            Fakultas Farmasi, Universitas Surabaya · SEMAR LKTIN FILM 2026, Universitas Sebelas Maret
          </p>

          <div className="ap-grid-3" style={{ marginBottom: 32 }}>
            {[
              { i: "CF", n: "Chelsea Franssiska Putri Gautama", r: "Ketua Tim", nim: "110123135", e: "franssiskachelsea@gmail.com", p: "081231174528" },
              { i: "AP", n: "Agung Pravda Kireina Wijaya", r: "Anggota", nim: "110123026", e: "sagarikawijaya@gmail.com", p: "08999952898" },
              { i: "ZF", n: "Zensky Feriadi", r: "Anggota", nim: "110123086", e: "zenskyferiadii@gmail.com", p: "08115704358" },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  padding: 26,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(125,211,154,0.18)",
                  borderRadius: 20,
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.green}, ${C.greenGlow})`,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: fontDisplay,
                    fontSize: 22,
                    fontWeight: 700,
                    color: C.forestDark,
                    marginBottom: 18,
                  }}
                >
                  {m.i}
                </div>
                <div style={{ fontSize: 12, color: C.greenGlow, marginBottom: 4, letterSpacing: 0.5 }}>
                  {m.r}
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 14, color: C.cream }}>{m.n}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "rgba(247,244,236,0.75)" }}>
                  <div>🎓 NIM {m.nim}</div>
                  <div style={{ wordBreak: "break-all" }}>✉ {m.e}</div>
                  <div>📞 {m.p}</div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: 24,
              background: "rgba(125,211,154,0.08)",
              border: `1px solid ${C.greenLight}`,
              borderRadius: 16,
              display: "flex",
              gap: 20,
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: C.greenGlow,
                color: C.forestDark,
                display: "grid",
                placeItems: "center",
                fontFamily: fontDisplay,
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              MG
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 12, color: C.greenGlow, marginBottom: 4, letterSpacing: 0.5 }}>
                DOSEN PEMBIMBING
              </div>
              <div style={{ fontSize: 17, color: C.cream, fontFamily: fontDisplay }}>
                Dr. Apt. Marisca Evalina Gondokesumo
              </div>
              <div style={{ fontSize: 13, color: "rgba(247,244,236,0.7)", marginTop: 2 }}>
                NIDN 215030 · Fakultas Farmasi UBAYA
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div
              style={{
                flex: "1 1 260px",
                padding: 20,
                background: "rgba(43,109,179,0.15)",
                border: `1px solid ${C.blue}`,
                borderRadius: 14,
                display: "flex",
                gap: 14,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: C.blue,
                  color: C.cream,
                  display: "grid",
                  placeItems: "center",
                  fontFamily: fontDisplay,
                  fontWeight: 700,
                }}
              >
                3
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#8dbde6" }}>SDG 3</div>
                <div style={{ fontSize: 15, color: C.cream, fontWeight: 600 }}>
                  Good Health & Well-Being
                </div>
              </div>
            </div>
            <div
              style={{
                flex: "1 1 260px",
                padding: 20,
                background: "rgba(76,166,109,0.15)",
                border: `1px solid ${C.greenLight}`,
                borderRadius: 14,
                display: "flex",
                gap: 14,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: C.green,
                  color: C.cream,
                  display: "grid",
                  placeItems: "center",
                  fontFamily: fontDisplay,
                  fontWeight: 700,
                }}
              >
                15
              </div>
              <div>
                <div style={{ fontSize: 12, color: C.greenGlow }}>SDG 15</div>
                <div style={{ fontSize: 15, color: C.cream, fontWeight: 600 }}>
                  Life on Land
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#081810",
          color: "rgba(247,244,236,0.7)",
          padding: "40px 0 32px",
          borderTop: "1px solid rgba(125,211,154,0.1)",
        }}
      >
        <div
          className="ap-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${C.greenLight}, ${C.greenGlow})`,
                color: C.forestDark,
                display: "grid",
                placeItems: "center",
                fontFamily: fontDisplay,
                fontWeight: 700,
              }}
            >
              A
            </div>
            <span style={{ fontFamily: fontDisplay, color: C.cream, fontSize: 16 }}>
              ACANTHERA PATCH
            </span>
          </div>

          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {[
              ["Beranda", "hero"],
              ["Produk", "produk"],
              ["Riset", "riset"],
              ["Tim", "tim"],
            ].map(([l, id]) => (
              <span
                key={id}
                onClick={() => scrollTo(id)}
                style={{ cursor: "pointer", fontSize: 14, color: "rgba(247,244,236,0.75)" }}
              >
                {l}
              </span>
            ))}
          </div>

          <div style={{ fontSize: 12.5, color: "rgba(247,244,236,0.55)", textAlign: "right" }}>
            SEMAR LKTIN FILM 2026 · Universitas Surabaya · 2026
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontSize: 12,
        letterSpacing: 2,
        color: dark ? C.greenGlow : C.green,
        textTransform: "uppercase",
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: 24,
          height: 1,
          background: dark ? C.greenGlow : C.green,
        }}
      />
      {children}
    </div>
  );
}
