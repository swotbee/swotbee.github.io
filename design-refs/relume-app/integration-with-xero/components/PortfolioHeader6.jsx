"use client";

import { Badge } from "@relume_io/relume-ui";
import React from "react";

export function PortfolioHeader6() {
  return (
    <section id="relume">
      <div className="flex h-svh min-h-svh flex-col">
        <div className="relative flex-1">
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
            className="absolute inset-0 size-full object-cover"
            alt="Relume placeholder image"
          />
        </div>
        <div className="px-[5%]">
          <div className="container">
            <div className="grid grid-cols-1 items-start gap-12 py-12 md:grid-cols-[1.5fr_1fr] md:py-16 lg:gap-x-20 lg:py-20">
              <div>
                <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
                  Xero Integration Service
                </h1>
                <p className="md:text-md">
                  Seamlessly connect HubSpot with Xero for accurate financial
                  reporting and efficient operations.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 md:mt-6">
                  <Badge>
                    <a href="#">Integration</a>
                  </Badge>
                  <Badge>
                    <a href="#">Xero</a>
                  </Badge>
                  <Badge>
                    <a href="#">Accounting Solution</a>
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="mb-2 text-md leading-[1.4] font-bold md:text-xl">
                    Client
                  </h3>
                  <p>John Doe</p>
                </div>
                <div>
                  <h3 className="mb-2 text-md leading-[1.4] font-bold md:text-xl">
                    Date
                  </h3>
                  <p>March 2023</p>
                </div>
                <div>
                  <h3 className="mb-2 text-md leading-[1.4] font-bold md:text-xl">
                    Role
                  </h3>
                  <p>Finance Manager</p>
                </div>
                <div>
                  <h3 className="mb-2 text-md leading-[1.4] font-bold md:text-xl">
                    Website
                  </h3>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener"
                    className="underline"
                  >
                    www.relume.io
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
