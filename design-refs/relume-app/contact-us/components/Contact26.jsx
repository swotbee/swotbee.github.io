"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Contact26() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mx-auto mb-12 flex max-w-lg flex-col justify-center text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Locations</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Our Offices
          </h2>
          <p className="md:text-md">Visit us at our convenient locations.</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 items-center gap-x-12 gap-y-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-6 aspect-[3/2] md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                className="h-full w-full rounded-image object-cover"
                alt="Relume placeholder image"
              />
            </div>
            <h3 className="mb-3 text-2xl leading-[1.4] font-bold md:text-3xl lg:mb-4 lg:text-4xl">
              Sydney
            </h3>
            <p className="text-center">123 Sample St, Sydney NSW 2000 AU</p>
            <div className="mt-5 md:mt-6">
              <Button
                title="Get Directions"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Get Directions
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-6 aspect-[3/2] md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                className="h-full w-full rounded-image object-cover"
                alt="Relume placeholder image"
              />
            </div>
            <h3 className="mb-3 text-2xl leading-[1.4] font-bold md:text-3xl lg:mb-4 lg:text-4xl">
              New York
            </h3>
            <p className="text-center">123 Sample St, New York NY 10000 USA</p>
            <div className="mt-5 md:mt-6">
              <Button
                title="Get Directions"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
