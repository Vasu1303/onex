import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import React from 'react'

const HomePage = () => {
  return (
    <main className="relative w-full">
      <section className="min-h-screen">
        <Hero />
      </section>
      <section className="relative">
        <Features />
      </section>
      <section className="relative">
        <Footer />
      </section>
    </main>
  )
}

export default HomePage