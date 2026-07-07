"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";
import React, { useEffect, useState } from "react";
import { BiSolidStar } from "react-icons/bi";

const useCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index) => () => {
    // No TypeScript annotation
    if (api) {
      api.scrollTo(index);
    }
  };

  const dotClassName = (index) => {
    return `mx-[3px] inline-block size-2 rounded-full ${
      current === index + 1 ? "bg-black" : "bg-neutral-light"
    }`;
  };

  return { api, setApi, current, handleDotClick, dotClassName };
};

export function Testimonial15() {
  const useCarousel = useCarousel();
  return (
    <section
      id="relume"
      className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">
        <Carousel
          setApi={useCarousel.setApi}
          opts={{ loop: true, align: "start" }}
          className="overflow-hidden"
        >
          <div className="relative pt-20 md:pt-0 md:pb-20">
            <CarouselContent className="ml-0">
              <CarouselItem className="pl-0">
                <div className="grid w-full auto-cols-fr grid-cols-1 items-center justify-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-x-20">
                  <div className="order-last md:order-first">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Testimonial image 1"
                      className="aspect-square w-full rounded-image object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="mb-6 flex md:mb-8">
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                    </div>
                    <blockquote className="text-xl font-bold md:text-2xl">
                      "Our sales have skyrocketed since we streamlined our
                      HubSpot processes. The team is now more efficient and
                      focused on closing deals."
                    </blockquote>
                    <div className="mt-6 flex flex-nowrap items-center gap-5 md:mt-8">
                      <div>
                        <p className="font-semibold">John Doe</p>
                        <p>CEO, Tech Solutions</p>
                      </div>
                      <div className="mx-4 w-px self-stretch bg-background-alternative sm:mx-0" />
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
              </CarouselItem>
              <CarouselItem className="pl-0">
                <div className="grid w-full auto-cols-fr grid-cols-1 items-center justify-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-x-20">
                  <div className="order-last md:order-first">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Testimonial image 1"
                      className="aspect-square w-full rounded-image object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="mb-6 flex md:mb-8">
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                      <BiSolidStar className="size-6" />
                    </div>
                    <blockquote className="text-xl font-bold md:text-2xl">
                      "Our sales have skyrocketed since we streamlined our
                      HubSpot processes. The team is now more efficient and
                      focused on closing deals."
                    </blockquote>
                    <div className="mt-6 flex flex-nowrap items-center gap-5 md:mt-8">
                      <div>
                        <p className="font-semibold">John Doe</p>
                        <p>CEO, Tech Solutions</p>
                      </div>
                      <div className="mx-4 w-px self-stretch bg-background-alternative sm:mx-0" />
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
              </CarouselItem>
            </CarouselContent>
            <div className="absolute top-0 flex w-full items-start justify-between md:top-auto md:bottom-0 md:items-end">
              <div className="mt-2.5 flex w-full items-start justify-start md:mt-0 md:mb-2.5">
                <button
                  onClick={useCarousel.handleDotClick(0)}
                  className={useCarousel.dotClassName(0)}
                />
                <button
                  onClick={useCarousel.handleDotClick(1)}
                  className={useCarousel.dotClassName(1)}
                />
              </div>
              <div className="flex items-end justify-end gap-2 md:gap-4">
                <CarouselPrevious className="static top-0 right-0 size-12 -translate-y-0" />
                <CarouselNext className="static top-0 right-0 size-12 -translate-y-0" />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
