"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React from "react";

export function Cta14() {
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-rows-1 items-start gap-y-5 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20 lg:gap-y-16">
        <div>
          <h1 className="text-5xl font-bold md:text-7xl lg:text-8xl">
            Get Started with HubSpot
          </h1>
        </div>
        <div>
          <p className="md:text-md">
            Ready to transform your sales process? Schedule a consultation today
            and discover how we can help you maximize HubSpot's potential.
          </p>
          <div className="mt-6 md:mt-8">
            <form className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
              <Input id="email" type="email" placeholder="Your Email Here" />
              <Button title="Get Started">Get Started</Button>
            </form>
            <p className="text-xs">
              By clicking Get Started, you agree to our Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
