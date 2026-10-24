import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <div className="pt-32 pb-24">
        <div className="site-shell grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
          {/* Left column */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Let's Work Together
            </h1>
            <p className="text-[#aaa] text-base leading-relaxed mb-12">
              We take on architecture, interiors, or both. Tell us a little about the building or the rooms you have in mind and we'll take it from there. Further case studies available on request.
            </p>

            <div className="border-t border-[#333] pt-8 space-y-4">
              <div className="text-[#aaa] text-sm">
                <p>123 Demo Street</p>
                <p>New York, NY 10001</p>
              </div>
              <div className="text-[#aaa] text-sm">
                <p>(555) 555-5555</p>
                <p>email@example.com</p>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div>
            {submitted ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-xl text-[#aaa]">Thank you! We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-[40rem]">
                <div className="text-xs text-[#666] uppercase tracking-widest mb-2">Name</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#999] mb-1 block">
                      First Name <span className="text-[#666]">(required)</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border border-[#333] px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#999] mb-1 block">
                      Last Name <span className="text-[#666]">(required)</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent border border-[#333] px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#999] mb-1 block">
                    Email <span className="text-[#666]">(required)</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border border-[#333] px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#999] mb-1 block">
                    Subject <span className="text-[#666]">(required)</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border border-[#333] px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#999] mb-1 block">
                    Message <span className="text-[#666]">(required)</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full bg-transparent border border-[#333] px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-white text-black px-8 py-3 text-sm uppercase tracking-widest font-medium hover:bg-[#ddd] transition-colors"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Contact;
