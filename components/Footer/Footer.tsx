// components/Footer/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 pt-8 border-t border-[#DCD5C4]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link
            href="/"
            className="font-serif font-semibold text-lg text-[#123329] flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M12 21s-7.5-4.6-10-9.2C.4 8.1 2.3 4 6.2 4c2.1 0 3.7 1.2 5.8 3.7C14.1 5.2 15.7 4 17.8 4c3.9 0 5.8 4.1 4.2 7.8C19.5 16.4 12 21 12 21z"
                stroke="#1F4D3F"
                strokeWidth="1.6"
              />
            </svg>
            MediSlot
          </Link>
          <p className="text-xs text-[#3d554d] mt-2">
            Book appointments with trusted doctors and diagnostics centres.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wide text-[#3d554d] mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/dashboard" className="text-[#3d554d] hover:text-[#123329]">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/doctors" className="text-[#3d554d] hover:text-[#123329]">
                Find Doctors
              </Link>
            </li>
            <li>
              <Link href="/diagnostics/nearby" className="text-[#3d554d] hover:text-[#123329]">
                Diagnostics
              </Link>
            </li>
            <li>
              <Link href="/history" className="text-[#3d554d] hover:text-[#123329]">
                History
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wide text-[#3d554d] mb-3">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/help" className="text-[#3d554d] hover:text-[#123329]">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[#3d554d] hover:text-[#123329]">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-[#3d554d] hover:text-[#123329]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-[#3d554d] hover:text-[#123329]">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wide text-[#3d554d] mb-3">
            Get in Touch
          </h3>
          <div className="space-y-2 text-sm text-[#3d554d]">
            <p>📧 support@medislot.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <div className="flex gap-3 mt-2">
              <a
                href="#"
                className="text-[#3d554d] hover:text-[#123329] transition-colors"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-[#3d554d] hover:text-[#123329] transition-colors"
                aria-label="LinkedIn"
              >
                💼
              </a>
              <a
                href="#"
                className="text-[#3d554d] hover:text-[#123329] transition-colors"
                aria-label="Instagram"
              >
                📸
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 pt-4 border-t border-[#DCD5C4] flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#3d554d]">
        <p>© 2026 MediSlot. All rights reserved.</p>
        <p>Made with ❤️ for better healthcare</p>
      </div>
    </footer>
  );
}