import { Hero } from "@/components/hero";
import { CardGrid } from "@/components/card-grid";
import { SiteNav } from "@/components/site-nav";
import { projects } from "@/data/projects";
import { SiteFooter } from "@/components/site-footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <Hero
        videoSrc="https://videos.pexels.com/video-files/32348751/13800839_1920_1080_30fps.mp4"
        posterSrc="/hero-poster.jpg"
        headlineTop="Where the"
        headlineMasked="light falls"
      />

      <CardGrid cards={projects} />

      <SiteFooter />
    </div>
  );
};

export default Index;
