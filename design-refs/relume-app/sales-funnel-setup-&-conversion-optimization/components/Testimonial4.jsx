"use client";

import React from "react";
import { BiSolidStar } from "react-icons/bi";

export function Testimonial4() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto w-full max-w-lg text-center">
          <div className="mb-6 flex items-center justify-center md:mb-8">
            <BiSolidStar className="size-6" />
            <BiSolidStar className="size-6" />
            <BiSolidStar className="size-6" />
            <BiSolidStar className="size-6" />
            <BiSolidStar className="size-6" />
          </div>
          <blockquote className="text-xl font-bold md:text-2xl">
            "Since implementing the new sales funnel, our conversion rates have
            skyrocketed! The clarity and automation have transformed our sales
            process completely."
          </blockquote>
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 text-center md:mt-8 md:w-auto md:flex-row md:gap-5 md:text-left">
            <div>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Testimonial avatar 1"
                className="size-14 min-h-14 min-w-14 rounded-full object-cover"
              />
            </div>
            <div className="mb-4 md:mb-0">
              <p>Emily Johnson</p>
              <p>Sales Manager, Acme Corp</p>
            </div>
            <div className="hidden w-px self-stretch bg-black md:block" />
            <div>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                alt="Webflow logo 1"
                className="max-h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
