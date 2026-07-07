"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Header44() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="w-full max-w-lg">
          <p className="mb-3 font-semibold md:mb-4">Streamline</p>
          <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
            Integrate with Ease
          </h1>
          <p className="md:text-md">
            Experience seamless data flow between QuickBooks and HubSpot for
            improved financial management.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
            <Button title="Learn More">Learn More</Button>
            <Button title="Get Started" variant="secondary">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
