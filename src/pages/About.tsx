import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      {/* Content */}
      <div className="pt-32 pb-24">
        <div className="site-shell grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
          {/* Title */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About</h1>
          </div>

          {/* Body */}
          {/* The shell is now full-bleed, so cap the reading column */}
          <div className="space-y-6 text-[#aaa] text-lg leading-relaxed max-w-[46rem]">
            <p>
              We are an architecture and interior design studio, and we treat those as one job rather than two. A building and the rooms inside it are decided by the same things: where the light falls, how people move, what the place is made of. Handing the interior to someone else after the shell is finished is how you end up with a house that photographs well and lives badly.
            </p>
            <p>
              As partners, we strive for honesty and clarity. Our first job is to understand the client's vision and needs, not to present our own. We value timeliness, direct communication and prototypes over presentations, as well as the occasional face-to-face meeting over a drink or a meal.
            </p>
            <p>
              Our work runs from new buildings and refurbishments through to the fit-out: joinery, lighting, materials and the furniture that goes in at the end. Some clients come to us for all of it, some only for the interiors of a building someone else drew. Both are welcome.
            </p>
            <p>
              We are proud of where we come from, but we are not exponents of any national style. A building has to suit the place it stands in, and the rooms have to suit the people who use them.
            </p>
          </div>
        </div>
      </div>

      {/* CTA image section */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2400&q=80"
          alt="Architecture detail"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Let's Work Together</h2>
          <Link
            to="/contact"
            className="inline-block border border-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default About;
