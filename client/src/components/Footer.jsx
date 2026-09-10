import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#0b0f19] text-gray-300 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Firefly <span className="text-amber-500">Car Rental</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Indulge in world-class performance and unmatched prestige across
                Assam. Choose your destination and drive the extraordinary
                today.
              </p>

              <div className="flex items-center space-x-3 pt-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#111827] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-amber-500 transition-all duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter size={16} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#111827] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-amber-500 transition-all duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#111827] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-amber-500 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cars"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Explore Cars
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bookings"
                    className="hover:text-amber-500 transition-colors"
                  >
                    My Bookings
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Locations
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Tezpur
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Guwahati
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Dibrugarh
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Silchar
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/help"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Contact
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start space-x-3">
                  <FaMapMarkerAlt
                    className="text-amber-500 mt-1 shrink-0"
                    size={16}
                  />
                  <span>Panbazar, Cotton College Road, 784001</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaPhoneAlt className="text-amber-500 shrink-0" size={14} />
                  <a
                    href="tel:+918724001944"
                    className="hover:text-white transition-colors"
                  >
                    +91 8724001944
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <FaEnvelope className="text-amber-500 shrink-0" size={14} />
                  <a
                    href="mailto:firefly@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    firefly@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Firefly Car Rental. All rights
              reserved.
            </p>
            <p className="mt-4 sm:mt-0">Designed for the roads of Assam.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
