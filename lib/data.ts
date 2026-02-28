import {
  Eye,
  Shield,
  Droplets,
  Baby,
  AlertCircle,
  Search,
  HeartPulse,
  Glasses,
  Award,
  Stethoscope,
  Users,
  MessageCircle,
  Clock,
  type LucideIcon,
} from "lucide-react";

/* ── Services ──────────────────────────────────────── */
export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Comprehensive Eye Exams",
    description:
      "Thorough vision and ocular health assessments using advanced diagnostic technology to detect conditions early.",
    icon: Search,
  },
  {
    title: "Cataract Evaluation",
    description:
      "Expert assessment and management of cataracts with personalised treatment plans and surgical referral when needed.",
    icon: Eye,
  },
  {
    title: "Glaucoma Screening",
    description:
      "Early detection and ongoing monitoring of glaucoma with state-of-the-art imaging and pressure measurement.",
    icon: Shield,
  },
  {
    title: "Dry Eye Treatment",
    description:
      "Comprehensive dry eye diagnosis and tailored therapies to restore comfort and protect your ocular surface.",
    icon: Droplets,
  },
  {
    title: "Diabetic Eye Care",
    description:
      "Specialised retinal screening and management for patients with diabetes to prevent vision loss.",
    icon: HeartPulse,
  },
  {
    title: "Children's Eye Health",
    description:
      "Gentle, thorough paediatric eye exams to support healthy visual development from infancy through adolescence.",
    icon: Baby,
  },
  {
    title: "Emergency Eye Care",
    description:
      "Prompt evaluation and treatment for eye injuries, sudden vision changes, and acute ocular conditions.",
    icon: AlertCircle,
  },
  {
    title: "Contact Lens Fitting",
    description:
      "Professional fitting and ongoing care for all types of contact lenses, including speciality and multifocal designs.",
    icon: Glasses,
  },
];

/* ── Benefits ──────────────────────────────────────── */
export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const benefits: Benefit[] = [
  {
    title: "Specialist-Led Care",
    description:
      "Every patient is seen by a qualified ophthalmologist with years of experience in diagnosing and managing complex eye conditions.",
    icon: Award,
  },
  {
    title: "Modern Diagnostics",
    description:
      "Our clinic is equipped with the latest imaging and diagnostic instruments for accurate, efficient evaluations.",
    icon: Stethoscope,
  },
  {
    title: "Patient-Centred Approach",
    description:
      "We take the time to listen, explain, and involve you in every decision about your eye health and treatment plan.",
    icon: Users,
  },
  {
    title: "Clear Communication",
    description:
      "No medical jargon — we explain your diagnosis and options in plain language so you feel confident and informed.",
    icon: MessageCircle,
  },
  {
    title: "Convenient Scheduling",
    description:
      "Same-week appointments available. We respect your time with minimal wait times and efficient visit flow.",
    icon: Clock,
  },
];

/* ── How It Works ──────────────────────────────────── */
export interface Step {
  number: number;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    number: 1,
    title: "Book Your Visit",
    description:
      "Schedule an appointment online, by phone, or via WhatsApp. Choose a date and time that works for you.",
  },
  {
    number: 2,
    title: "Your Consultation",
    description:
      "Meet with our specialist for a thorough examination. We'll discuss findings, answer questions, and outline a care plan.",
  },
  {
    number: 3,
    title: "Ongoing Care",
    description:
      "Receive a personalised follow-up schedule, prescriptions if needed, and direct access for any future concerns.",
  },
];

/* ── Testimonials ──────────────────────────────────── */
export interface Testimonial {
  quote: string;
  initials: string;
  name: string;
  context: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "The Eye Zone completely changed my experience of eye care. The specialist took time to explain everything and I left feeling genuinely looked after.",
    initials: "TM",
    name: "T. Moyo",
    context: "Comprehensive eye exam patient",
  },
  {
    quote:
      "I was anxious about my glaucoma diagnosis, but the team here made me feel calm and confident. The follow-up care has been exceptional.",
    initials: "RN",
    name: "R. Nyathi",
    context: "Glaucoma screening patient",
  },
  {
    quote:
      "My daughter's first eye exam was so comfortable thanks to the gentle approach of the staff. We'll definitely be returning for her annual check-ups.",
    initials: "SC",
    name: "S. Chikwanha",
    context: "Parent of paediatric patient",
  },
  {
    quote:
      "Modern equipment, professional staff, and a beautiful clinic. I was seen within minutes of my appointment time — a rarity in Harare.",
    initials: "DM",
    name: "D. Mapfumo",
    context: "Contact lens fitting patient",
  },
  {
    quote:
      "After struggling with dry eyes for years, I finally found a specialist who took it seriously. The treatment plan has made a world of difference.",
    initials: "KZ",
    name: "K. Zhou",
    context: "Dry eye treatment patient",
  },
  {
    quote:
      "Fast, thorough, and reassuringly professional. The diabetic eye screening was much more comprehensive than I expected. Highly recommend.",
    initials: "PM",
    name: "P. Mhandu",
    context: "Diabetic eye care patient",
  },
];

/* ── Nav Items ─────────────────────────────────────── */
export const navItems = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#benefits" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];
