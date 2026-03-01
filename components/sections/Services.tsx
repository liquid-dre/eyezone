"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { services } from "@/lib/data";
import type { Service } from "@/lib/data";
import { ArrowUpRight, Eye } from "lucide-react";

const serviceImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2379&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2370&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2487&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=2487&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2370&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2487&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506259091721-347e791bab0f?q=80&w=2370&auto=format&fit=crop",
];

export default function Services() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Dismiss active card when tapping outside the section
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(e.target as Node)
      ) {
        setActiveCard(null);
      }
    };
    document.addEventListener("touchstart", handleTouchStart);
    return () => document.removeEventListener("touchstart", handleTouchStart);
  }, []);

  const handleActivate = useCallback((index: number) => {
    setActiveCard(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services"
      className="px-3 py-4 sm:p-4 md:p-12"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-200 border border-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        <TitleCard />
        {services.slice(0, 2).map((service, i) => (
          <ServiceCard
            key={service.title}
            service={service}
            src={serviceImages[i]}
            isActive={activeCard === i}
            onActivate={() => handleActivate(i)}
          />
        ))}
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-200 border-x border-b border-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        {services.slice(2, 5).map((service, i) => (
          <ServiceCard
            key={service.title}
            service={service}
            src={serviceImages[i + 2]}
            isActive={activeCard === i + 2}
            onActivate={() => handleActivate(i + 2)}
          />
        ))}
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-200 border-x border-b border-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        {services.slice(5, 8).map((service, i) => (
          <ServiceCard
            key={service.title}
            service={service}
            src={serviceImages[i + 5]}
            isActive={activeCard === i + 5}
            onActivate={() => handleActivate(i + 5)}
          />
        ))}
      </div>
    </section>
  );
}

const ServiceCard = ({
  service,
  src,
  isActive,
  onActivate,
}: {
  service: Service;
  src: string;
  isActive: boolean;
  onActivate: () => void;
}) => {
  const Icon = service.icon;
  const a = isActive;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // On touch-only devices, first tap reveals the hover state;
    // second tap (when already active) navigates normally.
    if (window.matchMedia("(hover: none)").matches && !isActive) {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <a
      href="#contact"
      onClick={handleClick}
      className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 md:h-80 md:p-9"
    >
      <div
        className={`absolute left-3 top-5 z-10 transition-colors duration-500 ${a ? "text-blue-400" : "text-neutral-400"} group-hover:text-blue-400`}
      >
        <Icon size={18} />
      </div>

      <div
        className={`relative z-10 transition-transform duration-500 ${a ? "-translate-y-3" : ""} group-hover:-translate-y-3`}
      >
        <h3
          className={`text-xl font-medium leading-tight transition-colors duration-500 md:text-2xl ${a ? "font-bold text-white" : "text-neutral-800"} group-hover:font-bold group-hover:text-white`}
        >
          {service.title}
        </h3>
        <p
          className={`mt-2 line-clamp-2 text-sm leading-relaxed transition-colors duration-500 ${a ? "text-blue-200" : "text-neutral-500"} group-hover:text-blue-200`}
        >
          {service.description}
        </p>
      </div>

      <Eye
        size={24}
        className={`absolute right-3 top-4 z-10 transition-colors duration-500 ${a ? "text-blue-400" : "text-neutral-300"} group-hover:text-blue-400`}
      />

      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${a ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}
        style={{
          backgroundImage: `url(${src})`,
        }}
      />
      <div
        className={`absolute inset-0 bg-neutral-900/70 transition-opacity duration-500 ${a ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}
      />

      <Corners isActive={a} />
    </a>
  );
};

const Corners = ({ isActive }: { isActive?: boolean }) => {
  const a = isActive;
  return (
    <>
      <span
        className={`absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top bg-blue-600 transition-all duration-500 ${a ? "scale-100" : "scale-0"} group-hover:scale-100`}
      />
      <span
        className={`absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left bg-blue-600 transition-all duration-500 ${a ? "scale-100" : "scale-0"} group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom bg-blue-600 transition-all duration-500 ${a ? "scale-100" : "scale-0"} group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right bg-blue-600 transition-all duration-500 ${a ? "scale-100" : "scale-0"} group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom bg-blue-600 transition-all duration-500 ${a ? "scale-100" : "scale-0"} group-hover:scale-100`}
      />
      <span
        className={`absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left bg-blue-600 transition-all duration-500 ${a ? "scale-100" : "scale-0"} group-hover:scale-100`}
      />
      <span
        className={`absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top bg-blue-600 transition-all duration-500 ${a ? "scale-100" : "scale-0"} group-hover:scale-100`}
      />
      <span
        className={`absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right bg-blue-600 transition-all duration-500 ${a ? "scale-100" : "scale-0"} group-hover:scale-100`}
      />
    </>
  );
};

const TitleCard = () => {
  return (
    <a
      href="#contact"
      className="group relative flex h-56 flex-col justify-between overflow-hidden p-6 md:h-80 md:p-9"
    >
      <h2 className="relative z-10 text-4xl font-bold uppercase leading-tight text-white">
        <span className="text-blue-200 transition-colors duration-500 group-hover:text-blue-300">
          What We
        </span>
        <br />
        Offer
      </h2>
      <div className="relative z-10 flex items-center gap-1.5 text-xs uppercase text-blue-200 transition-colors duration-500 group-hover:text-white">
        <Eye size={16} />
        <span>Expert Eye Care in Harare</span>
      </div>

      <ArrowUpRight
        size={24}
        className="absolute right-3 top-4 z-10 text-blue-200 transition-colors duration-500 group-hover:text-white"
      />

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2380&auto=format&fit=crop)",
        }}
      />
      <div className="absolute inset-0 bg-neutral-900/70" />
    </a>
  );
};
