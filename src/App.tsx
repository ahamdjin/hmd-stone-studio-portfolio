import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage, ContactPage, Home, MaterialsPage, ServicesPage } from "./hmd/Experience";

function NotFound() {
  return <div style={{ minHeight: "100vh", background: "#161a16", color: "#f1ede4", display: "grid", placeItems: "center", fontFamily: "sans-serif", textAlign: "center", padding: 24 }}>
    <div><p style={{ letterSpacing: ".2em", fontSize: 12 }}>HMD STONE</p><h1 style={{ fontSize: "clamp(5rem,12vw,10rem)", margin: "0 0 10px", letterSpacing: "-.07em" }}>404</h1><p>That page isn't here. The experience continues on the homepage.</p><a href="/" style={{ color: "#ddc4a4" }}>RETURN HOME ↗</a></div>
  </div>;
}

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/materials" element={<MaterialsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>;
}
