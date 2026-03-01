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
  return (
    <section
      id="services"
      aria-label="Services"
      className="p-4 md:p-12"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-200 border border-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        <TitleCard />
        {services.slice(0, 2).map((service, i) => (
          <ServiceCard
            key={service.title}
            service={service}
            src={serviceImages[i]}
          />
        ))}
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-200 border-x border-b border-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        {services.slice(2, 5).map((service, i) => (
          <ServiceCard
            key={service.title}
            service={service}
            src={serviceImages[i + 2]}
          />
        ))}
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-200 border-x border-b border-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        {services.slice(5, 8).map((service, i) => (
          <ServiceCard
            key={service.title}
            service={service}
            src={serviceImages[i + 5]}
          />
        ))}
      </div>
    </section>
  );
}

const ServiceCard = ({
  service,
  src,
}: {
  service: Service;
  src: string;
}) => {
  const Icon = service.icon;
  return (
    <a
      href="#contact"
      className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 md:h-80 md:p-9"
    >
      <div className="absolute left-3 top-5 z-10 text-neutral-400 transition-colors duration-500 group-hover:text-white">
        <Icon size={18} />
      </div>

      <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-3">
        <h3 className="text-xl font-medium leading-tight text-neutral-800 transition-colors duration-500 group-hover:font-bold group-hover:text-white md:text-2xl">
          {service.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500 transition-colors duration-500 group-hover:text-blue-200">
          {service.description}
        </p>
      </div>

      <Eye
        size={24}
        className="absolute right-3 top-4 z-10 text-neutral-300 transition-colors duration-500 group-hover:text-white"
      />

      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: `url(${src})`,
        }}
      />
      <div className="absolute inset-0 bg-neutral-900/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <Corners />
    </a>
  );
};

const Corners = () => (
  <>
    <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-blue-600 transition-all duration-500 group-hover:scale-100" />
    <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-blue-600 transition-all duration-500 group-hover:scale-100" />
    <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-blue-600 transition-all duration-500 group-hover:scale-100" />
    <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-blue-600 transition-all duration-500 group-hover:scale-100" />
    <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-blue-600 transition-all duration-500 group-hover:scale-100" />
    <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-blue-600 transition-all duration-500 group-hover:scale-100" />
    <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-blue-600 transition-all duration-500 group-hover:scale-100" />
    <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-blue-600 transition-all duration-500 group-hover:scale-100" />
  </>
);

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
