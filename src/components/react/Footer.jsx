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
import logo from "../../assets/ico/logo.png";
import CookieConsent from "react-cookie-consent";

export default function Footer() {
  return (
    <footer id="footer" className="bg-highlight-25 px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="border-b border-border-primary">
          <div className="mb-12 grid grid-cols-1 gap-x-[8vw] gap-y-12 md:mb-18 md:gap-y-16 lg:mb-20 lg:grid-cols-[1fr_0.5fr] lg:gap-y-20">
            <div className="max-w-md rb-6">
              <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
                Your Trusted HubSpot Consulting Partner
              </h1>
              <p>
                Expert solutions to streamline your HubSpot experience and boost
                conversions.
              </p>
              <div className="flex flex-wrap gap-4 mt-6 md:mt-8">
                <Button title="Learn More">Learn More</Button>
                <Button title="Contact" variant="secondary">
                  Contact
                </Button>
              </div>
            </div>
            <div className="grid items-start grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
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
                  <a href="/faq">FAQs</a>
                </li>
              </ul>
              <ul>
                <li className="py-2 text-sm font-semibold">
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="/terms">Terms of Use</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="/cookie">Cookie Policy</a>
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
          <div className="flex flex-col items-start justify-between hidden col-span-1 pb-6 rb-6 sm:flex-row sm:items-center md:pb-8 lg:col-span-2">
            <a href="#">
              <img
                src={logo}
                alt="Logo image"
                className="inline-block w-auto h-8 mb-6 sm:mb-0 md:h-4 md:w-auto lg:h-6 lg:w-auto"
              />
            </a>
            <div className="flex ml-3">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
                alt="Relume placeholder image"
                className="relative object-cover -ml-3 border-2 border-white rounded-full size-12 min-h-12 min-w-12"
              />
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
                alt="Relume placeholder image"
                className="relative object-cover -ml-3 border-2 border-white rounded-full size-12 min-h-12 min-w-12"
              />
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
                alt="Relume placeholder image"
                className="relative object-cover -ml-3 border-2 border-white rounded-full size-12 min-h-12 min-w-12"
              />
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
                alt="Relume placeholder image"
                className="relative object-cover -ml-3 border-2 border-white rounded-full size-12 min-h-12 min-w-12"
              />
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-small.svg"
                alt="Relume placeholder image"
                className="relative object-cover -ml-3 border-2 border-white rounded-full size-12 min-h-12 min-w-12"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse items-start justify-between pt-6 pb-4 text-sm md:flex-row md:items-center md:pt-8 md:pb-0">
          <p>© 2025 swotbee. All rights reserved.</p>
          <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
            {/* <a href="#">
              <BiLogoFacebookCircle className="size-6" />
            </a>
            <a href="#">
              <BiLogoInstagram className="size-6" />
            </a> */}
            <a href="https://twitter.com/reputebee">
              <FaXTwitter className="size-6 p-0.5" />
            </a>
            <a href="https://www.linkedin.com/company/reputebee/">
              <BiLogoLinkedinSquare className="size-6" />
            </a>
            <a href="#">
              <BiLogoYoutube className="size-6" />
            </a>
            <CookieConsent
  location="bottom"
  buttonText="Accept"
  cookieName="myAppCookieConsent"
  style={{ background: "#2B373B" }}
  buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
  expires={150}
>
  We use cookies to improve your experience.{" "}
  <span style={{ fontSize: "10px" }}>Read our privacy policy for more info.</span>
</CookieConsent>
          </div>
        </div>
      </div>
    </footer>
  );
}
