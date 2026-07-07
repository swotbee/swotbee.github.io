"use client";

import { Badge } from "@relume_io/relume-ui";
import React from "react";

export function PortfolioHeader3() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
            DocuSign Integration
          </h1>
          <p className="md:text-md">
            Streamline your customer onboarding with seamless DocuSign
            integration for efficient contract management.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2 md:mt-6">
            <Badge>
              <a href="#">Onboarding Solutions</a>
            </Badge>
            <Badge>
              <a href="#">Integration Services</a>
            </Badge>
            <Badge>
              <a href="#">Customer Success</a>
            </Badge>
          </div>
        </div>
        <div>
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
            alt="Relume placeholder image 1"
            className="w-full rounded-image"
          />
        </div>
      </div>
    </section>
  );
}
