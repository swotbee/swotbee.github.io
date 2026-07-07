"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronDown } from "react-icons/rx";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(true);
  };
  const closeOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(false);
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
  return {
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
  };
};

export function Navbar10() {
  const useActive = useRelume();
  return (
    <section
      id="relume"
      className="relative z-[999] flex min-h-16 w-full items-center border-b border-border-primary bg-background-primary px-[5%] md:min-h-18"
    >
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        <a href="#">
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
            alt="Logo image"
          />
        </a>
        <div className="absolute hidden h-screen overflow-auto border-b border-border-primary bg-background-primary px-[5%] pt-4 pb-24 md:pb-0 lg:static lg:ml-6 lg:flex lg:h-auto lg:flex-1 lg:items-center lg:justify-between lg:border-none lg:bg-none lg:px-0 lg:pt-0">
          <div className="flex flex-col items-center lg:flex-row">
            <a
              href="#"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Home
            </a>
            <a
              href="#"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Services
            </a>
            <a
              href="#"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Testimonials
            </a>
            <div
              onMouseEnter={useActive.openOnDesktopDropdownMenu}
              onMouseLeave={useActive.closeOnDesktopDropdownMenu}
            >
              <button
                className="relative flex w-full items-center justify-between py-3 text-md whitespace-nowrap lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base"
                onClick={useActive.openOnMobileDropdownMenu}
              >
                <span>Resources</span>
                <motion.span
                  animate={useActive.animateDropdownMenuIcon}
                  variants={{
                    rotated: { rotate: 180 },
                    initial: { rotate: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <RxChevronDown />
                </motion.span>
              </button>
              <AnimatePresence>
                <motion.nav
                  variants={{
                    open: {
                      opacity: 1,
                      height: "var(--height-open, auto)",
                      display: "block",
                    },
                    close: {
                      opacity: 0,
                      height: "var(--height-close, 0)",
                      display: "none",
                    },
                  }}
                  animate={useActive.animateDropdownMenu}
                  initial="close"
                  exit="close"
                  transition={{ duration: 0.2 }}
                  className="top-full bottom-auto left-0 w-full max-w-full min-w-full overflow-hidden bg-background-primary lg:absolute lg:w-screen lg:border-b lg:border-border-primary lg:px-[5%] lg:[--height-close:auto]"
                >
                  <div className="mx-auto flex size-full max-w-full items-center justify-between">
                    <div className="flex w-full flex-col lg:flex-row">
                      <div className="w-full content-start py-4 sm:py-8 lg:max-w-[15rem] lg:pr-8">
                        <div className="grid auto-cols-fr auto-rows-max grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content_max-content] gap-y-4">
                          <h4 className="text-sm leading-[1.4] font-semibold md:leading-[1.3]">
                            Blog Topics
                          </h4>
                          <a href="#">Marketing Tips</a>
                          <a href="#">Sales Strategies</a>
                          <a href="#">Integration Guides</a>
                          <a href="#">Case Studies</a>
                          <a href="#">Client Success</a>
                        </div>
                      </div>
                      <div className="relative flex w-full flex-wrap items-start justify-center pb-6 lg:items-stretch lg:pt-6">
                        <div className="grid w-full auto-cols-max auto-rows-max grid-cols-1 grid-rows-[max-content] gap-x-12 gap-y-8 sm:grid-cols-2 lg:gap-y-2">
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Relume placeholder image 1"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                HubSpot Insights
                              </h5>
                              <p className="text-sm">
                                Explore the latest trends in HubSpot consulting.
                              </p>
                              <Button
                                title="Discover More"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Discover More
                              </Button>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Relume placeholder image 1"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                Conversion Tactics
                              </h5>
                              <p className="text-sm">
                                Learn how to optimize your sales funnel today.
                              </p>
                              <Button
                                title="Find Out"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Find Out
                              </Button>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Relume placeholder image 1"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                Integration Tips
                              </h5>
                              <p className="text-sm">
                                Streamline your processes with effective
                                integrations.
                              </p>
                              <Button
                                title="Read More"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Read More
                              </Button>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Relume placeholder image 1"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                Onboarding Solutions
                              </h5>
                              <p className="text-sm">
                                Enhance customer experience with smooth
                                onboarding.
                              </p>
                              <Button
                                title="Learn More"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Learn More
                              </Button>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Relume placeholder image 1"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                Client Feedback
                              </h5>
                              <p className="text-sm">
                                See what our clients say about our services.
                              </p>
                              <Button
                                title="Read More"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Read More
                              </Button>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Relume placeholder image 1"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                Success Stories
                              </h5>
                              <p className="text-sm">
                                Discover how we helped businesses achieve
                                growth.
                              </p>
                              <Button
                                title="Explore More"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Explore More
                              </Button>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.nav>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button title="Contact" variant="secondary" size="sm">
              Contact
            </Button>
            <Button title="Join" size="sm">
              Join
            </Button>
          </div>
        </div>
        <button
          className="-mr-2 flex size-12 cursor-pointer flex-col items-center justify-center lg:hidden"
          onClick={useActive.toggleMobileMenu}
        >
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: 8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={useActive.animateMobileMenu}
            variants={{
              open: { width: 0, transition: { duration: 0.1 } },
              closed: {
                width: "1.5rem",
                transition: { delay: 0.3, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-black"
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: -8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
        </button>
      </div>
      <AnimatePresence>
        <motion.div
          variants={{ open: { height: "100dvh" }, close: { height: "auto" } }}
          animate={useActive.animateMobileMenu}
          initial="close"
          exit="close"
          className="absolute top-full right-0 left-0 w-full overflow-hidden lg:hidden"
          transition={{ duration: 0.4 }}
        >
          <motion.div
            variants={{ open: { y: 0 }, close: { y: "-100%" } }}
            animate={useActive.animateMobileMenu}
            initial="close"
            exit="close"
            transition={{ duration: 0.4 }}
            className="absolute top-0 right-0 left-0 block h-dvh overflow-auto border-b border-border-primary bg-background-primary px-[5%] pt-4 pb-8"
          >
            <div className="flex flex-col">
              <a
                href="#"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Link One
              </a>
              <a
                href="#"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Link Two
              </a>
              <a
                href="#"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Link Three
              </a>
              <div>
                <button
                  className="relative flex w-full items-center justify-between py-3 text-md whitespace-nowrap lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base"
                  onClick={useActive.openOnMobileDropdownMenu}
                >
                  <span>Link Four</span>
                  <motion.span
                    animate={useActive.animateDropdownMenuIcon}
                    variants={{
                      rotated: { rotate: 180 },
                      initial: { rotate: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <RxChevronDown />
                  </motion.span>
                </button>
                <AnimatePresence>
                  <motion.nav
                    variants={{
                      open: {
                        opacity: 1,
                        height: "var(--height-open, auto)",
                        display: "block",
                      },
                      close: {
                        opacity: 0,
                        height: "var(--height-close, 0)",
                        display: "none",
                      },
                    }}
                    animate={useActive.animateDropdownMenu}
                    initial="close"
                    exit="close"
                    transition={{ duration: 0.2 }}
                    className="top-full bottom-auto left-0 w-full max-w-full min-w-full overflow-hidden bg-background-primary lg:absolute lg:w-screen lg:border-b lg:border-border-primary lg:px-[5%] lg:[--height-close:auto]"
                  >
                    <div className="mx-auto flex size-full max-w-full items-center justify-between">
                      <div className="flex w-full flex-col lg:flex-row">
                        <div className="w-full content-start py-4 sm:py-8 lg:max-w-[15rem] lg:pr-8">
                          <div className="grid auto-cols-fr auto-rows-max grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content_max-content] gap-y-4">
                            <h4 className="text-sm leading-[1.4] font-semibold md:leading-[1.3]">
                              Blog categories
                            </h4>
                            <a href="#">Category One</a>
                            <a href="#">Category Two</a>
                            <a href="#">Category Three</a>
                            <a href="#">Category Four</a>
                            <a href="#">Category Five</a>
                          </div>
                        </div>
                        <div className="relative flex w-full flex-wrap items-start justify-center pb-6 lg:items-stretch lg:pt-6">
                          <div className="grid w-full auto-cols-max auto-rows-max grid-cols-1 grid-rows-[max-content] gap-x-12 gap-y-8 sm:grid-cols-2 lg:gap-y-2">
                            <a
                              href="#"
                              className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                            >
                              <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                  alt="Relume placeholder image 1"
                                  className="absolute inset-0 size-full object-cover"
                                />
                              </div>
                              <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                                <h5 className="mb-1 font-semibold">
                                  Article Title
                                </h5>
                                <p className="text-sm">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit
                                </p>
                                <Button
                                  title="Read more"
                                  variant="link"
                                  size="link"
                                  className="mt-2 w-fit text-sm underline"
                                >
                                  Read more
                                </Button>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                            >
                              <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                  alt="Relume placeholder image 2"
                                  className="absolute inset-0 size-full object-cover"
                                />
                              </div>
                              <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                                <h5 className="mb-1 font-semibold">
                                  Article Title
                                </h5>
                                <p className="text-sm">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit
                                </p>
                                <Button
                                  title="Read more"
                                  variant="link"
                                  size="link"
                                  className="mt-2 w-fit text-sm underline"
                                >
                                  Read more
                                </Button>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                            >
                              <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                  alt="Relume placeholder image 3"
                                  className="absolute inset-0 size-full object-cover"
                                />
                              </div>
                              <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                                <h5 className="mb-1 font-semibold">
                                  Article Title
                                </h5>
                                <p className="text-sm">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit
                                </p>
                                <Button
                                  title="Read more"
                                  variant="link"
                                  size="link"
                                  className="mt-2 w-fit text-sm underline"
                                >
                                  Read more
                                </Button>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                            >
                              <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                  alt="Relume placeholder image 4"
                                  className="absolute inset-0 size-full object-cover"
                                />
                              </div>
                              <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                                <h5 className="mb-1 font-semibold">
                                  Article Title
                                </h5>
                                <p className="text-sm">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit
                                </p>
                                <Button
                                  title="Read more"
                                  variant="link"
                                  size="link"
                                  className="mt-2 w-fit text-sm underline"
                                >
                                  Read more
                                </Button>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                            >
                              <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                  alt="Relume placeholder image 5"
                                  className="absolute inset-0 size-full object-cover"
                                />
                              </div>
                              <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                                <h5 className="mb-1 font-semibold">
                                  Article Title
                                </h5>
                                <p className="text-sm">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit
                                </p>
                                <Button
                                  title="Read more"
                                  variant="link"
                                  size="link"
                                  className="mt-2 w-fit text-sm underline"
                                >
                                  Read more
                                </Button>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                            >
                              <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                                <img
                                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                  alt="Relume placeholder image 6"
                                  className="absolute inset-0 size-full object-cover"
                                />
                              </div>
                              <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                                <h5 className="mb-1 font-semibold">
                                  Article Title
                                </h5>
                                <p className="text-sm">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit
                                </p>
                                <Button
                                  title="Read more"
                                  variant="link"
                                  size="link"
                                  className="mt-2 w-fit text-sm underline"
                                >
                                  Read more
                                </Button>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.nav>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <Button title="Button" variant="secondary" size="sm">
                  Button
                </Button>
                <Button title="Button" size="sm">
                  Button
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
