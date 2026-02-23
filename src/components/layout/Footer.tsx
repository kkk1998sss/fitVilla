import Link from "next/link";
import Image from "next/image";
import { siteName, siteTagline } from "@/content/site";
import {
  companyName,
  contactEmail,
  phone1,
  phone2,
  importantLinks,
  companyLinks,
  locations,
  openingHours,
} from "@/content/footer";

const LOGO = "/images/logo/fitvilla-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3 lg:col-span-1">
            <Link href="/" className="logo-no-bg inline-block w-fit">
              <Image
                src={LOGO}
                alt={siteName}
                width={200}
                height={64}
                className="h-12 sm:h-14 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-xs uppercase tracking-wider text-fitvilla-muted">
              {siteTagline}
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-fitvilla-cyan">
              Important Links
            </h3>
            <ul className="flex flex-col gap-2">
              {importantLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-fitvilla-light/80 transition-colors hover:text-fitvilla-cyan"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-fitvilla-cyan">
              Company
            </h3>
            <ul className="flex flex-col gap-2">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-fitvilla-light/80 transition-colors hover:text-fitvilla-cyan"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Opening Hours */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-fitvilla-cyan">
              {companyName}
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-fitvilla-light/80">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="transition-colors hover:text-fitvilla-cyan"
                >
                  {contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone1.replace(/\D/g, "")}`}
                  className="transition-colors hover:text-fitvilla-cyan"
                >
                  {phone1}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone2.replace(/\D/g, "")}`}
                  className="transition-colors hover:text-fitvilla-cyan"
                >
                  {phone2}
                </a>
              </li>
            </ul>
            <h4 className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-fitvilla-cyan">
              Opening Hours
            </h4>
            <ul className="space-y-1 text-sm text-fitvilla-light/80">
              {openingHours.map(({ days, time }) => (
                <li key={days}>
                  <span className="font-medium text-fitvilla-light/90">{days}</span>{" "}
                  {time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Locations */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fitvilla-cyan">
            Locations
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <div key={loc.name} className="text-sm text-fitvilla-light/80">
                <p className="font-medium text-white">{loc.name}</p>
                <p className="mt-1">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-fitvilla-muted">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
