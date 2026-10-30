import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Menu, X } from "lucide-react";
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

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
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
              onClick={() => ref.current?.close()}
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
          <p className="modal-note">
            Informasi bersifat contoh pada template demonstrasi.
          </p>
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
        <section id="kunjungan" className="visit section-rule">
          <div>
            <h2>Mari lihat lebih dekat.</h2>
            <p>Kenali hunian dan diskusikan rencana Anda bersama tim kami.</p>
            <p className="demo-notice">
              Ini adalah template demonstrasi. Kontak kunjungan belum tersedia.
            </p>
          </div>
          <button className="button disabled-button" disabled>
            Jadwalkan Kunjungan <ArrowRight size={20} />
          </button>
        </section>
      </main>
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
      <footer className="footer wrap">
        <strong>ARUNA LAND</strong>
        <span>Konsep template properti Indonesia</span>
        <span>Develop by jasawebsite.id.</span>
      </footer>
    </div>
  );
}
export default App;
