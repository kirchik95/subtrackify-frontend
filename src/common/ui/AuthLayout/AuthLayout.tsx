import { useState } from 'react';
import { Link, useLocation, useOutlet } from 'react-router';

import { Layers } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

/**
 * Captures the outlet element at mount time so it stays frozen
 * during AnimatePresence exit animations.
 */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

export const AuthLayout = () => {
  const location = useLocation();

  return (
    <div
      className="flex min-h-screen gap-6 bg-muted p-6"
      style={{ fontFamily: "'Inter Variable', system-ui, sans-serif" }}
    >
      {/* Left Panel — Form */}
      <div className="relative flex flex-1 items-center justify-center rounded-[24px] border border-border bg-white shadow-[0_4px_12px_#00000005]">
        {/* Logo — pinned top-left */}
        <Link to="/" className="absolute top-8 left-8 inline-flex items-center gap-2 no-underline">
          <Layers className="size-6 text-foreground" strokeWidth={2} />
          <span className="text-lg font-semibold text-foreground">Subtrackify</span>
        </Link>

        <div className="w-full max-w-[400px] px-6 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              className="flex flex-col gap-6"
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <FrozenOutlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel — Testimonial */}
      <div className="hidden flex-1 flex-col justify-end rounded-[24px] bg-[#09090B] p-16 lg:flex">
        <div className="flex flex-col gap-6">
          <Layers className="size-10 text-white" strokeWidth={1.5} />

          <p className="text-[32px] leading-[42px] font-normal text-white">
            &ldquo;Subtrackify helped me realize I was spending over $200 a month on subscriptions
            I&rsquo;d completely forgotten about. It literally paid for itself in the first
            week.&rdquo;
          </p>

          <div className="mt-4 flex flex-col gap-1">
            <span className="text-base font-semibold text-white">Sofia Martinez</span>
            <span className="text-sm text-[#A1A1AA]">Product Designer at Vercel</span>
          </div>
        </div>
      </div>
    </div>
  );
};
