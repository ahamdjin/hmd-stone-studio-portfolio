import { useParams, Link } from "react-router-dom";
import { projects, imageAt } from "@/data/projects";
import { CardGrid } from "@/components/card-grid";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const Project = () => {
  const { id } = useParams<{ id: string }>();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Project not found</h1>
          <Link to="/" className="text-muted-foreground hover:text-white transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  // Wrap around, so the first and last projects still have two neighbors —
  // an empty slot in a 50%-wide grid is half a row of black. Below 3
  // projects the strip renders nothing: wrap-around cannot produce two
  // distinct neighbors, and one "more project" is not a browsing offer.
  const count = projects.length;
  const neighbors =
    count >= 3
      ? [projects[(index - 1 + count) % count], projects[(index + 1) % count]]
      : [];
  const title = project.titleMasked.replace("\n", " ").replace(".", "");

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      {/* Hero image — full-bleed, so it needs a much wider source than a card */}
      <div className="w-full aspect-[16/9] max-h-[70vh] overflow-hidden bg-[#111]">
        <img
          src={imageAt(project.image, 2400)}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details — left edge lines up with the nav and the other pages */}
      <div className="site-shell py-16">
        <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="inline-flex h-11 items-center text-[#666] transition-colors hover:text-white"
                >
                  Work
                </Link>
              </li>
              <li aria-hidden className="text-[#444]">
                /
              </li>
              <li className="text-[#aaa]" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            {title}
          </h1>

          {/* dt/dd have to sit inside a dl to be valid HTML */}
          <dl className="flex gap-12 mb-12 text-sm border-b border-[#333] pb-8">
            <div>
              <dt className="text-[#666] uppercase tracking-widest text-xs mb-1">Year</dt>
              <dd className="text-white">{project.year}</dd>
            </div>
            <div>
              <dt className="text-[#666] uppercase tracking-widest text-xs mb-1">Location</dt>
              <dd className="text-white">{project.location}</dd>
            </div>
          </dl>

          <p className="text-[#aaa] text-lg leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* More Projects — the real CardGrid component, not a copy of its DOM:
          it brings the touch-device CardManager, without which card photos
          never activate on phones (they idle at opacity 0). */}
      {neighbors.length > 0 && (
        <div className="border-t border-[#333]">
          <div className="site-shell py-10">
            <h2 className="text-xs text-[#666] uppercase tracking-widest mb-6">More Projects</h2>
          </div>
          <CardGrid cards={neighbors} />
        </div>
      )}

      <SiteFooter />
    </div>
  );
};

export default Project;
