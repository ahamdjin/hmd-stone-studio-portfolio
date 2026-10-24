import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

// Cards render at 616 CSS px wide, so retina screens need ~1232 px of image.
const PORTRAIT = "?w=1200&h=1500&fit=crop&crop=faces&q=80";

const team = [
  {
    name: "Elena Vasquez",
    role: "Principal Architect",
    image: `https://images.unsplash.com/photo-1653157908299-6ad3dbd91b45${PORTRAIT}`,
    bio: "Twenty years of buildings from Mexico City to London. Elena runs the studio and takes the lead on the architecture, with a bias towards structures that show how they stand up.",
  },
  {
    name: "Tomas Bergqvist",
    role: "Head of Interiors",
    image: `https://images.unsplash.com/photo-1772442198677-a0464650f344${PORTRAIT}`,
    bio: "Tomas leads the interiors side of the studio — joinery, lighting and materials — and works alongside the architects from the first sketch rather than after the shell is up.",
  },
  {
    name: "Sofia Andersson",
    role: "Project Lead",
    image: `https://images.unsplash.com/photo-1575282366139-d605e098a825${PORTRAIT}`,
    bio: "Sofia runs projects on site across several countries, making sure the facade panels, the structural joints and the interior finishes all end up matching the drawings.",
  },
  {
    name: "James Okafor",
    role: "Structural Engineer",
    image: `https://images.unsplash.com/photo-1605980776566-0486c3ac7617${PORTRAIT}`,
    bio: "James works on long-span and diagrid structures, finding the engineering that lets a room stay column-free and an ambitious shape stand on its own terms.",
  },
];

const OurTeam = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <div className="pt-32 pb-24">
        <div className="site-shell">
          {/* Page titles are text-4xl / md:text-5xl on every page */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">
            Our Team
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {team.map((member) => (
              <div key={member.name}>
                <div className="aspect-[4/5] overflow-hidden mb-6 bg-[#111]">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold tracking-tight">{member.name}</h3>
                <p className="text-xs text-[#666] uppercase tracking-widest mt-1 mb-4">{member.role}</p>
                <p className="text-[#aaa] text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default OurTeam;
