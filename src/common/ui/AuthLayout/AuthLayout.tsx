import { Link } from 'react-router';

import { Bot, CheckCircle2, Music, Wallet } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 items-center justify-center bg-background p-8">
        <div className="flex w-full max-w-[400px] flex-col gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2 text-center">
            <Link to="/" className="mb-4 inline-flex items-center gap-3 no-underline">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wallet className="size-5" />
              </div>
              <span className="text-2xl font-bold text-foreground">SubTrack</span>
            </Link>
          </div>

          {children}
        </div>
      </div>

      {/* Right side - Promo */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden border-l border-border bg-secondary p-8">
        {/* Abstract shapes */}
        <div className="pointer-events-none absolute -top-[100px] -right-[100px] size-[600px] rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-5" />
        <div className="pointer-events-none absolute -bottom-[100px] -left-[100px] size-[500px] rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)] opacity-5" />

        <div className="z-10 flex max-w-[480px] flex-col items-center gap-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground">
            <CheckCircle2 className="size-4 text-green-600" />
            Used by 10,000+ people
          </div>

          <h2 className="text-[40px] leading-[1.2] font-bold text-foreground">
            Stop paying for
            <br />
            services you don't use
          </h2>

          <p className="text-lg font-medium leading-relaxed text-muted-foreground">
            Track, manage, and optimize all your recurring subscriptions in one beautiful dashboard.
          </p>

          {/* Mockup card */}
          <div className="mt-2 flex w-[340px] flex-col gap-4 rounded-lg border border-border bg-card p-5 text-left shadow-[0_12px_24px_rgba(0,0,0,0.05)]">
            <div className="text-sm font-semibold text-foreground">Upcoming charges</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-secondary text-foreground">
                    <Bot className="size-[18px]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">ChatGPT Plus</div>
                    <div className="text-xs font-medium text-muted-foreground">Tomorrow</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-foreground">$20.00</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-secondary text-foreground">
                    <Music className="size-[18px]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Spotify Premium</div>
                    <div className="text-xs font-medium text-muted-foreground">12 Oct</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-foreground">$9.99</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
