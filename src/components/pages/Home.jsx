import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import WhyChooseUs from '../Whychooseus';
import Testimonials from '../Testimonials';
import FAQ from '../Faq';




function Home() {
  return (
    <> 
      
      <HeroSection />
      <Cards />
      <WhyChooseUs/>
      <Testimonials/>
      <FAQ/>
      <Footer />
    </>
  );
}

export default Home;
