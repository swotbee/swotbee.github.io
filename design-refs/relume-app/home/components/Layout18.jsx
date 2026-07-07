"use client";

import React from "react";

export function Layout18() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h3 className="mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Transform Your HubSpot Experience with Expert Sales Funnel and
              Integration Solutions
            </h3>
            <p className="mb-5 md:mb-6 md:text-md">
              Unlock the full potential of HubSpot with our tailored sales
              funnel setups and seamless integrations. Our onboarding expertise
              ensures a smooth transition, helping you maximize efficiency and
              boost conversions.
            </p>
            <ul className="grid grid-cols-1 gap-4 py-2">
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo 1"
                    className="size-6"
                  />
                </div>
                <p>Streamlined sales funnels for better lead conversion.</p>
              </li>
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo 1"
                    className="size-6"
                  />
                </div>
                <p>
                  Reliable integrations with top platforms for seamless
                  operations.
                </p>
              </li>
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo 1"
                    className="size-6"
                  />
                </div>
                <p>
                  Efficient onboarding processes to enhance customer
                  satisfaction.
                </p>
              </li>
            </ul>
          </div>
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
            className="w-full rounded-image object-cover"
            alt="Relume placeholder image"
          />
        </div>
      </div>
    </section>
  );
}
