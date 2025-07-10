
import heroImage from "../assets/workflow/CRM_consulting_workflow.v1.png";

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid'

export default function Hero() {
  return (
    <div className="bg-highlight-25">
      <div className="px-6 pt-24 pb-4 sm:px-6 sm:pt-32 sm:pb-8 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 text-balance sm:text-5xl">
            Transform Your HubSpot Experience Today
          </h2>
          <p className="max-w-xl mx-auto mt-6 text-gray-600 text-lg/8 text-pretty">
            Unlock the full potential of HubSpot with our expert consulting
              services. Streamline your sales funnel, boost conversions, and
              integrate seamlessly with your favorite tools.
          </p>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <a
              href="#"
              className="rounded-md bg-highlight-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-highlight-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight-600"
              title="Claim Your Free 30-Minute AI Marketing & Sales Automation Session"
              aria-label="Claim Your Free 30-Minute AI Marketing & Sales Automation Session"
            >
              Claim Your Free Consultation
            </a>
            <a href="#" className="font-semibold text-gray-900 text-sm/6">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="relative pt-8 overflow-hidden">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
            <img
                src={heroImage}
                // className="object-cover size-full"
                alt="Hero Image"
                width={2432}
                height={1442}
                // className="shadow-2xl rounded-xl ring-1 ring-gray-900/10"
            />
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
    </div>
  )
}