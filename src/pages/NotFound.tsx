import { Link } from "react-router-dom";
import { SiteNav } from "@/components/site-nav";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <div className="pt-32 pb-24">
        <div className="site-shell">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Page not found
          </h1>
          <p className="text-[#aaa] text-lg leading-relaxed max-w-[46rem] mb-12">
            That page has moved or never existed. The work is a good place to
            start again.
          </p>
          <Link
            to="/"
            className="inline-block border border-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            View the work
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
