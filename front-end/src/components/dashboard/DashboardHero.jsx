// components/dashboard/DashboardHero.jsx
import React from "react";
import heroImage from "../../assets/logo.jpg";

export default function DashboardHero() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white mb-4 shadow-sm">
      
      {/* subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 items-center p-4 md:p-6">

        {/* LEFT CONTENT */}
        <div className="order-2 lg:order-1 lg:pl-2">
          
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-900 tracking-tight leading-tight">
            <span className="text-primary font-light italic">Welcome</span>
          </h1>

          <div className="my-2 flex items-center gap-3">
            <div className="h-[2px] w-10 bg-primary"></div>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
          </div>

          <p className="text-xs md:text-sm text-slate-500 max-w-md leading-relaxed">
            Monitor your leads, deal values, customer pipeline,
            and sales team performance in real-time with our
            integrated intelligence suite.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end lg:pr-2">

          <div className="relative group">

            {/* Image Card */}
            <div className="relative w-52 h-40 rounded-2xl border border-slate-200 overflow-hidden shadow-md bg-white transition-all duration-300 hover:shadow-xl">

              <img
                src={heroImage}
                alt="Dashboard Preview"
                className="w-full h-full object-cover"
              />

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}