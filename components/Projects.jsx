'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/**
 * Projects: grid responsif dengan filter tag dan kolom pencarian.
 *
 * Daftar tombol filter dibangun otomatis dari field `tags` setiap proyek, jadi
 * menambah proyek dengan tag baru langsung menambah tombolnya.
 *
 * KOLOM PENCARIAN baru muncul kalau proyeknya sudah lima atau lebih. Di bawah
 * itu semuanya muat dalam satu layar dan kolom pencarian cuma jadi perabot
 * yang tidak pernah dipakai. Bisa dimatikan sepenuhnya lewat panel, di
 * Sentuhan Interaktif > Pencarian di bagian Proyek.
 */
const AMBANG_PENCARIAN = 5;

export default function Projects() {
  const { t } = useLanguage();
  const { projects, sections, ui } = portfolio;
  const [activeTag, setActiveTag] = useState('__all__');
  const [kueri, setKueri] = useState('');

  // Mengetik cepat tidak menahan gambar ulang gridnya.
  const kueriTunda = useDeferredValue(kueri);

  const tags = useMemo(() => {
    const unique = [];
    projects.forEach((project) => {
      (project.tags ?? []).forEach((tag) => {
        if (!unique.includes(tag)) unique.push(tag);
      });
    });
    return unique;
  }, [projects]);

  const visibleProjects = useMemo(() => {
    const kata = kueriTunda.trim().toLowerCase();

    return projects.filter((project) => {
      if (activeTag !== '__all__' && !(project.tags ?? []).includes(activeTag)) return false;
      if (!kata) return true;

      // Dicari di nama, instansi, deskripsi, dan tag sekaligus, dalam bahasa
      // yang sedang aktif. Perekrut biasanya mengingat satu kata saja.
      const isi = [
        project.name,
        t(project.org),
        t(project.description),
        ...(project.tags ?? []),
      ]
        .join(' ')
        .toLowerCase();

      return isi.includes(kata);
    });
  }, [projects, activeTag, kueriTunda, t]);

  if (projects.length === 0) return null;

  const pencarianAktif =
    portfolio.appearance?.projectSearch !== false && projects.length >= AMBANG_PENCARIAN;

  const filterButtonClass = (value) =>
    [
      'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200',
      activeTag === value
        ? 'border-transparent bg-linear-to-r from-accent-1 to-accent-2 text-white shadow-[0_8px_20px_-12px_var(--accent-2)]'
        : 'border-line bg-surface text-muted hover:border-line-strong hover:text-fg',
    ].join(' ');

  return (
    <section id="projects" className="bagian">
      <div className="wadah">
        <SectionHeading
          id="projects"
          eyebrow={t(sections.projects.eyebrow)}
          title={t(sections.projects.title)}
          subtitle={t(sections.projects.subtitle)}
        />

        {tags.length > 1 || pencarianAktif ? (
          <Reveal delay={60}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {tags.length > 1 ? (
                <div role="group" aria-label={t(ui.filterLabel)} className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTag('__all__')}
                    className={filterButtonClass('__all__')}
                    aria-pressed={activeTag === '__all__'}
                  >
                    {t(ui.allTag)}
                  </button>
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className={filterButtonClass(tag)}
                      aria-pressed={activeTag === tag}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              ) : (
                <span />
              )}

              {pencarianAktif ? (
                <label className="relative flex w-full shrink-0 items-center sm:w-60">
                  <span className="sr-only">{t(ui.projectSearchPlaceholder)}</span>
                  <Icon
                    name="search"
                    className="pointer-events-none absolute left-3.5 h-4 w-4 text-subtle"
                  />
                  <input
                    type="search"
                    value={kueri}
                    onChange={(event) => setKueri(event.target.value)}
                    placeholder={t(ui.projectSearchPlaceholder)}
                    className="h-10 w-full rounded-full border border-line bg-surface pl-10 pr-3 text-sm text-fg placeholder:text-subtle focus:border-line-strong focus:outline-none"
                  />
                </label>
              ) : null}
            </div>
          </Reveal>
        ) : null}

        {visibleProjects.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <Reveal key={project.name} delay={Math.min(index * 70, 280)} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          /* Hasil kosong diberi tahu, bukan dibiarkan jadi ruang kosong yang
             membingungkan, lengkap dengan satu jalan keluar. */
          <div className="glass mt-8 flex flex-col items-center gap-3 p-10 text-center">
            <Icon name="search" className="h-6 w-6 text-subtle" />
            <p className="text-body-sm text-muted">{t(ui.projectEmpty)}</p>
            <button
              type="button"
              onClick={() => {
                setKueri('');
                setActiveTag('__all__');
              }}
              className="text-xs font-semibold text-accent hover:underline"
            >
              {t(ui.projectReset)}
            </button>
          </div>
        )}

        {/* Jumlah hasil dibacakan pembaca layar saat penyaringnya berubah. */}
        <p role="status" aria-live="polite" className="sr-only">
          {visibleProjects.length} {t(ui.resultCount)}
        </p>
      </div>
    </section>
  );
}
