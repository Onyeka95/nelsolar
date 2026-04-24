import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import WhyNelsolar from "@/components/WhyNelsolar";
import SolarCalculator from "@/components/SolarCalculator";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import InstallationSection from "@/components/InstallationSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <WhyNelsolar />
      <SolarCalculator />
      <TestimonialsSection />
      <PartnersSection />
      <InstallationSection />

      {/*
       * ── Sections — uncomment as each component is built ──────────────
       *
       * <ConsultationSection />
       * <TeamSection />
       * <FAQSection />
       * <Footer />
       */}
    </>
  );
}
