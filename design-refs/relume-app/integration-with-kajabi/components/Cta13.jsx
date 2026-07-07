"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Cta13() {
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-rows-1 items-start gap-y-5 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20 lg:gap-y-16">
        <div>
          <h1 className="text-5xl font-bold md:text-7xl lg:text-8xl">
            Transform Your Kajabi Experience
          </h1>
        </div>
        <div>
          <p className="md:text-md">
            Ready to streamline your Kajabi integration? Schedule a free
            consultation today to discover how we can enhance your workflows and
            boost your lead management.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
            <Button title="Schedule">Schedule</Button>
            <Button title="Learn More" variant="secondary">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
