import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/pages/Hero";
import Tarif from "@/pages/Tarif";

import News from "@/pages/News";
import Faq from "@/pages/Faq";
import Advantages from "@/components/Advantages";

import Case from "@/components/Case";
import ContactUs from "@/components/Contact-us";

export default function Home() {
  return (
    <main>
      <div className="wrapper">
        <Header />

        <Hero />
        <Advantages />

        <Tarif />

        {/* <Safety /> */}

        <Case />

        <News />

        <ContactUs />

        <Faq />

        <Footer />
      </div>
    </main>
  );
}
