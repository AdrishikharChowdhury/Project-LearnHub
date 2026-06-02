import Image from "next/image";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start Learning Your Way</div>
      <h2 className="text-xl sm:text-3xl font-bold max-[400px]:text-base">
        Build and Personalize Learning Companion
      </h2>
      <p>
        Choose your perfect study buddy — pick a name, subject, voice &
        personality — then dive into learning through lively, natural
        conversations!
      </p>
      <Image src="/images/cta.svg" alt="cta" width={362} height={232} className="max-w-full h-auto" />
      <button className="btn-primary">
        <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
        <Link href="/companions/new">
          <p>Build a New Companion</p>
        </Link>
      </button>
    </section>
  );
};

export default CTA;
