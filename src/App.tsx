import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Hammer,
  Menu,
  Plus,
  ShieldCheck,
  Wallet,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type Category = "Semua" | "Perumahan" | "Rumah Pribadi";
const projects = [
  {
    name: "Aruna Grove",
    description: "Contoh pengembangan perumahan",
    category: "Perumahan",
    image: "palm",
    alt: "Rumah modern dengan pepohonan palem",
    eyebrow: "Konsep perumahan",
    summary:
      "Kawasan hunian tertata dengan ruang hijau bersama, jalan lingkungan yang teduh, dan unit rumah yang dirancang mengikuti iklim tropis.",
    specs: [
      { label: "Tipe", value: "Perumahan klaster" },
      { label: "Jumlah unit", value: "48 unit" },
      { label: "Luas bangunan", value: "72 - 126 m²" },
      { label: "Status", value: "Tahap perencanaan" },
    ],
    features: [
      "Taman dan jalur pejalan kaki di dalam kawasan",
      "Sirkulasi udara dan cahaya alami di setiap unit",
      "Sistem keamanan kawasan satu pintu",
      "Pilihan tipe rumah yang dapat disesuaikan",
    ],
  },
  {
    name: "Rumah Sela",
    description: "Contoh proyek rumah pribadi",
    category: "Rumah Pribadi",
    image: "villa",
    alt: "Rumah modern dengan kolam renang",
    eyebrow: "Konsep rumah pribadi",
    summary:
      "Rumah pribadi dengan ruang keluarga terbuka yang menyatu dengan taman dan kolam, dirancang sesuai kebutuhan dan gaya hidup penghuninya.",
    specs: [
      { label: "Tipe", value: "Rumah pribadi" },
      { label: "Kamar tidur", value: "4 kamar" },
      { label: "Luas bangunan", value: "280 m²" },
      { label: "Status", value: "Contoh desain" },
    ],
    features: [
      "Ruang tengah terbuka dengan akses langsung ke taman",
      "Kolam renang pribadi dan area duduk teduh",
      "Material alami yang tahan iklim tropis",
      "Desain disesuaikan dengan lahan dan keluarga",
    ],
  },
] as const;

type Project = (typeof projects)[number];

// Isi dengan nomor WhatsApp format internasional tanpa tanda +, mis. "6281234567890".
// Selama kosong, formulir hanya menampilkan pratinjau pesan (mode demo).
const WHATSAPP_NUMBER = "";
const GENERAL_INTEREST = "Konsultasi umum";

const stats = [
  { value: "10+", label: "Tahun pengalaman" },
  { value: "250+", label: "Unit direncanakan" },
  { value: "12", label: "Proyek kawasan" },
  { value: "98%", label: "Penghuni puas" },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Legalitas jelas",
    text: "Status lahan, izin, dan sertifikat dijelaskan sejak awal agar Anda tenang.",
  },
  {
    icon: Hammer,
    title: "Kualitas terjaga",
    text: "Material terpilih dan pengawasan berkala di setiap tahap pembangunan.",
  },
  {
    icon: Wallet,
    title: "Pembayaran fleksibel",
    text: "Pilihan tunai, cicilan bertahap, atau KPR dengan simulasi yang transparan.",
  },
  {
    icon: Compass,
    title: "Layanan purnajual",
    text: "Masa garansi dan pendampingan setelah serah terima kunci.",
  },
];

const steps = [
  {
    title: "Konsultasi",
    text: "Ceritakan kebutuhan, anggaran, dan gaya hidup Anda.",
  },
  {
    title: "Kunjungan lokasi",
    text: "Lihat kawasan dan contoh hunian secara langsung.",
  },
  {
    title: "Desain & akad",
    text: "Finalisasi tipe, spesifikasi, dan skema pembayaran.",
  },
  {
    title: "Pembangunan",
    text: "Progres dilaporkan berkala dengan jadwal yang jelas.",
  },
  {
    title: "Serah terima",
    text: "Pemeriksaan akhir bersama sebelum Anda menempati rumah.",
  },
];

const faqs = [
  {
    q: "Apakah tersedia pembelian dengan KPR?",
    a: "Ya. Kami membantu simulasi cicilan dan pengajuan KPR ke bank rekanan. Pembelian tunai dan cicilan bertahap juga tersedia.",
  },
  {
    q: "Sertifikat apa yang diterima pembeli?",
    a: "Status sertifikat dijelaskan per proyek sebelum akad, termasuk proses pemecahan dan balik nama.",
  },
  {
    q: "Berapa biaya pemesanan awal?",
    a: "Biaya pemesanan berbeda untuk setiap proyek dan tipe. Tim kami akan memberikan rincian saat konsultasi.",
  },
  {
    q: "Berapa lama waktu pembangunan?",
    a: "Umumnya 8 hingga 14 bulan tergantung tipe dan tahap proyek. Jadwal tertulis diberikan sebelum akad.",
  },
  {
    q: "Apakah desain rumah dapat disesuaikan?",
    a: "Untuk rumah pribadi, desain disusun sesuai lahan dan kebutuhan. Pada perumahan, tersedia pilihan tata ruang dan finishing tertentu.",
  },
];

function ProjectModal({
  project,
  onClose,
  onSchedule,
}: {
  project: Project;
  onClose: () => void;
  onSchedule: (project: Project) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = `modal-title-${project.image}`;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      <div className="modal-panel">
        <button
          type="button"
          className="modal-close"
          aria-label="Tutup detail proyek"
          onClick={() => ref.current?.close()}
        >
          <X size={22} strokeWidth={1.6} />
        </button>
        <div className="modal-image">
          <Photo name={project.image} alt={project.alt} />
        </div>
        <div className="modal-body">
          <p className="eyebrow">{project.eyebrow.toUpperCase()}</p>
          <h3 id={titleId}>{project.name}</h3>
          <p className="modal-summary">{project.summary}</p>
          <dl className="modal-specs">
            {project.specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="modal-features">
            {project.features.map((f) => (
              <li key={f}>
                <Check aria-hidden="true" size={16} strokeWidth={2} />
                {f}
              </li>
            ))}
          </ul>
          <div className="modal-actions">
            <a
              href="#kunjungan"
              className="button"
              onClick={(e) => {
                e.preventDefault();
                ref.current?.close();
                onSchedule(project);
              }}
            >
              Jadwalkan Kunjungan <ArrowRight size={20} />
            </a>
            <button
              type="button"
              className="modal-secondary"
              onClick={() => ref.current?.close()}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      className={`h-full w-full object-cover ${className}`}
      src={`${import.meta.env.BASE_URL}images/${name}-1200.webp`}
      srcSet={`${import.meta.env.BASE_URL}images/${name}-640.webp 640w, ${import.meta.env.BASE_URL}images/${name}-1200.webp 1200w`}
      sizes="(max-width: 767px) 100vw, 55vw"
      width="1200"
      height="800"
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
function VisitForm({
  interest,
  onInterestChange,
}: {
  interest: string;
  onInterestChange: (value: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form
      className="visit-form"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const lines = [
          "Halo Aruna Land, saya ingin menjadwalkan kunjungan.",
          `Nama: ${data.get("name")}`,
          `Telepon: ${data.get("phone")}`,
          `Minat: ${interest}`,
          data.get("date") ? `Tanggal pilihan: ${data.get("date")}` : "",
          data.get("note") ? `Catatan: ${data.get("note")}` : "",
        ].filter(Boolean);
        const text = lines.join("\n");
        if (WHATSAPP_NUMBER) {
          window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
            "_blank",
            "noopener",
          );
          setPreview(null);
        } else {
          setPreview(text);
        }
      }}
    >
      <label>
        <span>Nama lengkap</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        <span>Nomor telepon / WhatsApp</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          pattern="[0-9+\s\-]{8,18}"
          title="Masukkan nomor telepon yang valid"
          required
        />
      </label>
      <div className="form-row">
        <label>
          <span>Proyek yang diminati</span>
          <select
            value={interest}
            onChange={(e) => onInterestChange(e.target.value)}
          >
            {projects.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value={GENERAL_INTEREST}>{GENERAL_INTEREST}</option>
          </select>
        </label>
        <label>
          <span>Tanggal kunjungan (opsional)</span>
          <input name="date" type="date" min={today} />
        </label>
      </div>
      <label>
        <span>Catatan (opsional)</span>
        <textarea name="note" rows={3} />
      </label>
      <button type="submit" className="button">
        {WHATSAPP_NUMBER ? "Kirim via WhatsApp" : "Kirim permintaan"}{" "}
        <ArrowRight size={20} />
      </button>
      {preview && (
        <div className="form-preview" role="status">
          <strong>Mode demo: nomor WhatsApp belum diatur.</strong>
          <p>Pesan yang akan dikirim:</p>
          <pre>{preview}</pre>
        </div>
      )}
    </form>
  );
}
function Brand() {
  return (
    <a
      href="#beranda"
      className="brand"
      aria-label="Aruna Land, kembali ke beranda"
    >
      <span className="brand-mark" aria-hidden="true">
        A
      </span>
      <span>ARUNA LAND</span>
    </a>
  );
}
function App() {
  const [filter, setFilter] = useState<Category>("Semua");
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [interest, setInterest] = useState(GENERAL_INTEREST);
  const reduceMotion = useReducedMotion();
  const visible = projects.filter(
    (p) => filter === "Semua" || p.category === filter,
  );
  return (
    <div id="beranda" className="page-shell">
      <header className="site-header wrap">
        <Brand />
        <nav
          aria-label="Navigasi utama"
          className={`navigation ${menu ? "navigation-open" : ""}`}
        >
          <a onClick={() => setMenu(false)} href="#tentang">
            Tentang Kami
          </a>
          <a onClick={() => setMenu(false)} href="#portofolio">
            Portofolio
          </a>
          <a onClick={() => setMenu(false)} href="#pendekatan">
            Pendekatan
          </a>
          <a onClick={() => setMenu(false)} href="#faq">
            FAQ
          </a>
          <a
            onClick={() => setMenu(false)}
            className="mobile-visit"
            href="#kunjungan"
          >
            Jadwalkan Kunjungan <ArrowRight size={19} />
          </a>
        </nav>
        <a href="#kunjungan" className="button header-cta">
          Jadwalkan Kunjungan <ArrowRight size={20} />
        </a>
        <button
          className="menu-toggle"
          aria-label={menu ? "Tutup menu" : "Buka menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main className="wrap">
        <section className="hero" aria-labelledby="hero-title">
          <motion.div
            className="hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div>
              <p className="eyebrow">PENGEMBANG HUNIAN INDONESIA</p>
              <h1 id="hero-title">
                Hunian tenang.
                <br />
                Hidup berkesan.
              </h1>
              <p className="hero-description">
                Perumahan premium dan rumah pribadi, dirancang untuk cara hidup
                Anda.
              </p>
              <a className="button" href="#portofolio">
                Lihat Portofolio <ArrowRight size={21} />
              </a>
            </div>
            <p className="hero-note">
              Ruang yang lebih dekat
              <br />
              dengan alam dan keluarga.
            </p>
          </motion.div>
          <figure className="hero-figure">
            <div className="hero-image">
              <Photo
                name="tropical"
                alt="Ilustrasi rumah tropis modern dengan taman dan pohon palem"
                priority
              />
            </div>
            <figcaption className="project-caption">
              <div>
                <strong>Aruna Garden Residence</strong>
                <span>Konsep perumahan tropis</span>
              </div>
              <ArrowUpRight aria-hidden="true" size={27} strokeWidth={1.4} />
            </figcaption>
          </figure>
        </section>
        <section className="stats section-rule" aria-label="Angka perusahaan">
          <dl>
            {stats.map((s) => (
              <div key={s.label}>
                <dd>{s.value}</dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        </section>
        <section
          id="portofolio"
          className="portfolio section-rule"
          aria-labelledby="portfolio-title"
        >
          <h2 id="portfolio-title">Tempat tinggal yang kami bayangkan.</h2>
          <p className="section-intro">
            Jelajahi contoh pengembangan kawasan dan rumah pribadi.
          </p>
          <div className="filter-bar">
            <div
              className="filters"
              role="group"
              aria-label="Filter portofolio"
            >
              {(["Semua", "Perumahan", "Rumah Pribadi"] as Category[]).map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    aria-pressed={filter === item}
                    className={filter === item ? "selected" : ""}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
            <button className="see-all" onClick={() => setFilter("Semua")}>
              Lihat semua <span className="sr-only">portofolio</span>
            </button>
          </div>
          <div className={`projects ${visible.length === 1 ? "single" : ""}`}>
            {visible.map((p) => (
              <article key={p.name} className="project">
                <div className="project-image">
                  <Photo name={p.image} alt={p.alt} />
                </div>
                <div className="project-caption">
                  <div>
                    <h3>{p.name}</h3>
                    <span>{p.description}</span>
                  </div>
                  <button
                    type="button"
                    className="project-trigger"
                    aria-haspopup="dialog"
                    aria-label={`Lihat detail ${p.name}`}
                    onClick={() => setSelected(p)}
                  >
                    <ArrowUpRight
                      aria-hidden="true"
                      size={25}
                      strokeWidth={1.4}
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          id="keunggulan"
          className="benefits section-rule"
          aria-labelledby="benefits-title"
        >
          <h2 id="benefits-title">Alasan memilih Aruna Land.</h2>
          <p className="section-intro">
            Hal-hal yang kami jaga agar keputusan Anda terasa tenang.
          </p>
          <div className="benefit-grid">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="benefit">
                <Icon aria-hidden="true" size={26} strokeWidth={1.4} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section
          id="tentang"
          className="approach section-rule"
          aria-labelledby="approach-title"
        >
          <div className="approach-image">
            <Photo
              name="residence"
              alt="Ilustrasi rumah modern yang terbuka ke taman"
            />
          </div>
          <div id="pendekatan" className="approach-copy">
            <h2 id="approach-title">
              Dibangun dengan teliti.
              <br />
              Dihuni sepenuh hati.
            </h2>
            <p>
              Dari tata ruang hingga pemilihan material, setiap keputusan
              berawal dari kehidupan yang ingin Anda bangun di dalamnya.
            </p>
            <div className="principles">
              <div>
                <h3>Desain responsif iklim</h3>
                <p>Cahaya dan sirkulasi alami.</p>
              </div>
              <div>
                <h3>Pelaksanaan terarah</h3>
                <p>Tahapan proyek yang jelas.</p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="proses"
          className="process section-rule"
          aria-labelledby="process-title"
        >
          <h2 id="process-title">Dari percakapan hingga kunci rumah.</h2>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section
          id="faq"
          className="faq section-rule"
          aria-labelledby="faq-title"
        >
          <div>
            <h2 id="faq-title">Pertanyaan yang sering diajukan.</h2>
            <p className="section-intro">
              Belum menemukan jawabannya? Tanyakan langsung kepada tim kami.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <Plus aria-hidden="true" size={20} strokeWidth={1.5} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          id="kunjungan"
          className="contact section-rule"
          aria-labelledby="contact-title"
        >
          <div className="contact-copy">
            <h2 id="contact-title">Mari lihat lebih dekat.</h2>
            <p>Kenali hunian dan diskusikan rencana Anda bersama tim kami.</p>
            <ul>
              <li>Konsultasi tanpa biaya dan tanpa kewajiban</li>
              <li>Tim kami menghubungi dalam 1 x 24 jam kerja</li>
              <li>Kunjungan dapat dijadwalkan akhir pekan</li>
            </ul>
          </div>
          <VisitForm interest={interest} onInterestChange={setInterest} />
        </section>
      </main>
      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
          onSchedule={(p) => {
            setInterest(p.name);
            window.setTimeout(() => {
              document
                .getElementById("kunjungan")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 60);
          }}
        />
      )}
      <footer className="footer wrap">
        <strong>ARUNA LAND</strong>
        <span>Develop by jasawebsite.id.</span>
      </footer>
    </div>
  );
}
export default App;
