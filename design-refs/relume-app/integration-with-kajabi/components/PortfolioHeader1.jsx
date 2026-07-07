"use client";

import { Badge } from "@relume_io/relume-ui";
import React from "react";

export function PortfolioHeader1() {
  return (
    <section id="relume" className="px-[5%]">
      <div className="mx-auto max-w-lg py-16 text-center md:py-24 lg:py-28">
        <div>
          <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
            Kajabi Integration
          </h1>
          <p className="md:text-md">
            Seamlessly connect Kajabi with HubSpot to automate workflows and
            enhance your lead management.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2 md:mt-6">
            <Badge>
              <a href="#">Integration Solutions</a>
            </Badge>
            <Badge>
              <a href="#">Workflow Automation</a>
            </Badge>
            <Badge>
              <a href="#">Lead Management</a>
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
