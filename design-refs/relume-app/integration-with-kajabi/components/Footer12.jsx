"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

export function Footer12() {
  return (
    <footer id="relume" className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="border-b border-border-primary">
          <div className="mb-12 grid grid-cols-1 gap-x-[8vw] gap-y-12 md:mb-18 md:gap-y-16 lg:mb-20 lg:grid-cols-[1fr_0.5fr] lg:gap-y-20">
            <div className="rb-6 max-w-md">
              <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
                Your Trusted HubSpot Consulting Partner
              </h1>
              <p>
                Expert solutions to streamline your HubSpot experience and boost
                conversions.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                <Button title="Learn More">Learn More</Button>
                <Button title="Contact" variant="secondary">
                  Contact
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
              <ul>
                <li className="py-2 text-sm font-semibold">
                  <a href="#">Our Services</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="#">Case Studies</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="#">Testimonials</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="#">Blog Posts</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="#">FAQs</a>
                </li>
              </ul>
              <ul>
                <li className="py-2 text-sm font-semibold">
                  <a href="#">Privacy Policy</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="#">Terms of Use</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="#">Support Center</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="#">Contact Us</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="#">Join Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="rb-6 col-span-1 flex flex-col items-start justify-between pb-6 sm:flex-row sm:items-center md:pb-8 lg:col-span-2">
            <a href="#">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
                alt="Logo image"
                className="mb-6 inline-block sm:mb-0"
              />
            </a>
            <div className="ml-3 flex">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
                alt="Relume placeholder image"
                className="relative -ml-3 size-12 min-h-12 min-w-12 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
                alt="Relume placeholder image"
                className="relative -ml-3 size-12 min-h-12 min-w-12 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
                alt="Relume placeholder image"
                className="relative -ml-3 size-12 min-h-12 min-w-12 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
                alt="Relume placeholder image"
                className="relative -ml-3 size-12 min-h-12 min-w-12 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
                alt="Relume placeholder image"
                className="relative -ml-3 size-12 min-h-12 min-w-12 rounded-full border-2 border-white object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse items-start justify-between pt-6 pb-4 text-sm md:flex-row md:items-center md:pt-8 md:pb-0">
          <p>© 2024 Relume. All rights reserved.</p>
          <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
            <a href="#">
              <BiLogoFacebookCircle className="size-6" />
            </a>
            <a href="#">
              <BiLogoInstagram className="size-6" />
            </a>
            <a href="#">
              <FaXTwitter className="size-6 p-0.5" />
            </a>
            <a href="#">
              <BiLogoLinkedinSquare className="size-6" />
            </a>
            <a href="#">
              <BiLogoYoutube className="size-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
