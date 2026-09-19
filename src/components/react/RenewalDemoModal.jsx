import { useEffect, useRef, useState } from "react";
import RenewalDemoYoutube from "./RenewalDemoYoutube.jsx";

const videoUrl = "https://www.youtube.com/watch?v=ZtYqSi4Kg5E";

function track(name, details = {}) {
  window.gtag?.("event", name, {
    video_name: "renewal_demo",
    ...details,
  });
}

export default function RenewalDemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const returnFocusRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const bodyStyleRef = useRef(null);
  const bookingCtaRef = useRef(null);

  const restorePage = ({ returnFocus = true } = {}) => {
    if (bodyStyleRef.current === null) return;

    if (bodyStyleRef.current) {
      document.body.setAttribute("style", bodyStyleRef.current);
    } else {
      document.body.removeAttribute("style");
    }
    bodyStyleRef.current = null;
    window.scrollTo(0, scrollPositionRef.current);

    if (returnFocus) {
      requestAnimationFrame(() => {
        returnFocusRef.current?.focus({ preventScroll: true });
      });
    }
  };

  const showModal = (returnFocusTarget = triggerRef.current) => {
    const dialog = dialogRef.current;
    if (!dialog?.showModal || dialog.open) return;

    returnFocusRef.current = returnFocusTarget;
    scrollPositionRef.current = window.scrollY;
    bodyStyleRef.current = document.body.getAttribute("style") || "";
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    setIsOpen(true);
    dialog.showModal();
    track("renewal_video_modal_open");
  };

  const openModal = (event) => {
    event.preventDefault();
    showModal(event.currentTarget);
  };

  const closeModal = (reason) => {
    if (dialogRef.current?.open) dialogRef.current.close(reason);
  };

  const handleClose = () => {
    const reason = dialogRef.current?.returnValue || "close_button";
    setIsOpen(false);
    restorePage();
    track("renewal_video_modal_close", { close_reason: reason });
  };

  const handleVideoEnded = () => {
    requestAnimationFrame(() => {
      bookingCtaRef.current?.focus({ preventScroll: false });
    });
  };

  useEffect(() => {
    const handleExternalTrigger = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest("[data-renewal-demo-trigger]");
      if (!trigger) return;

      event.preventDefault();
      event.stopPropagation();
      showModal(trigger);
    };

    document.addEventListener("click", handleExternalTrigger, true);

    return () => {
      document.removeEventListener("click", handleExternalTrigger, true);
      restorePage({ returnFocus: false });
    };
  }, []);

  return (
    <>
      <a
        ref={triggerRef}
        href={videoUrl}
        onClick={openModal}
        data-ga-cta="renewal_demo_open"
        className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-v6-border bg-v6-dark text-left shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-v6-copper/60 focus-visible:ring-offset-4"
        aria-haspopup="dialog"
      >
        <img
          src="/demo/renewal-demo-poster.jpg"
          alt=""
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:transform-none"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-v6-dark/80 via-v6-dark/10 to-transparent"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-v6-copper text-white shadow-lg transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none sm:h-20 sm:w-20">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1 h-8 w-8 sm:h-10 sm:w-10"
            >
              <path d="M8 5.5v13l10-6.5L8 5.5Z" />
            </svg>
          </span>
        </span>
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-white sm:p-6">
          <span>
            <span className="block text-lg font-semibold sm:text-xl">
              Watch Renewal Builder in action
            </span>
            <span className="mt-1 block text-sm text-white/80">
              2-minute product walkthrough
            </span>
          </span>
          <span className="hidden rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm sm:block">
            Play video
          </span>
        </span>
      </a>

      <dialog
        id="renewal-demo-modal"
        ref={dialogRef}
        onClose={handleClose}
        onCancel={(event) => {
          event.preventDefault();
          closeModal("escape");
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal("backdrop");
        }}
        aria-labelledby="renewal-demo-modal-title"
        aria-describedby="renewal-demo-modal-description"
        className="m-auto w-[calc(100%-1.5rem)] max-w-5xl overflow-visible rounded-2xl bg-transparent p-0 backdrop:bg-v6-dark/80 backdrop:backdrop-blur-sm sm:w-[calc(100%-3rem)]"
      >
        <div className="overflow-hidden rounded-2xl bg-v6-dark shadow-2xl">
          <div className="flex min-h-16 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-left sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-v6-copper-300">
                Product demo
              </p>
              <h3
                id="renewal-demo-modal-title"
                className="mt-0.5 text-base font-semibold text-white sm:text-lg"
              >
                Renewal Builder in action
              </h3>
              <p id="renewal-demo-modal-description" className="sr-only">
                A 2-minute walkthrough of Renewal Builder in HubSpot.
              </p>
            </div>
            <button
              type="button"
              autoFocus
              onClick={() => closeModal("close_button")}
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-v6-dark"
              aria-label="Close product video"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          {isOpen && <RenewalDemoYoutube onEnded={handleVideoEnded} />}
          {isOpen && (
            <div className="flex flex-col items-stretch gap-3 border-t border-white/10 bg-v6-dark px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-center text-sm font-medium text-white/80 sm:text-left">
                Want to map your first renewal recipe?
              </p>
              <a
                ref={bookingCtaRef}
                href="/renewal-audit-call/"
                data-ga-cta="renewal_demo_modal_book_alignment"
                onClick={() => track("renewal_video_modal_end_cta_click")}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-v6-copper px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-v6-copper-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-v6-dark"
              >
                Book an alignment call with our founders
              </a>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
