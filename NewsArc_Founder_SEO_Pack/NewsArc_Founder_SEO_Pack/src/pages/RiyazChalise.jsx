import React from "react";
import SEO from "../components/SEO";
import RiyazProfileSchema from "../components/RiyazProfileSchema";

export default function RiyazChalise() {
  return (
    <>
      <SEO
        title="Riyaz Chalise — Founder of NewsArc"
        description="Riyaz Chalise is the founder of NewsArc, a digital news and information platform."
        path="/about/riyaz-chalise"
        type="profile"
      />
      <RiyazProfileSchema />
      <main>
        <article>
          <header>
            <p>NewsArc</p>
            <h1>Riyaz Chalise</h1>
            <h2>Founder of NewsArc</h2>
          </header>
          <section>
            <p>Riyaz Chalise is the founder of NewsArc, a digital news and information platform focused on timely and accessible news.</p>
            <h2>About Riyaz Chalise</h2>
            <p>Riyaz is building NewsArc with a focus on clear presentation, useful information, original work, and transparent sourcing.</p>
            <h2>About NewsArc</h2>
            <p>NewsArc covers news and explainers from Nepal and around the world, including technology, business, sports, entertainment, politics and other current topics.</p>
            <h2>Articles by Riyaz Chalise</h2>
            <p>Add links here only to articles actually written or reported by Riyaz Chalise.</p>
          </section>
        </article>
      </main>
    </>
  );
}
