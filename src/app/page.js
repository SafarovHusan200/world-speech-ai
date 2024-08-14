import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/pages/Hero";
import Tarif from "@/pages/Tarif";
import Safety from "@/pages/Safety";
import Feedback from "@/pages/Feedback";
import News from "@/pages/News";
import Faq from "@/pages/Faq";

export default function Home() {
  return (
    <main>
      <div className="wrapper">
        <Header />

        <Hero />

        <Tarif />

        <Safety />

        <Feedback />

        <News />

        <Faq />

        <Footer />
      </div>
    </main>
  );
}
