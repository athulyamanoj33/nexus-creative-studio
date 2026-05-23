"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import AnimatedText from "@/app/components/AnimatedText";
import MagneticButton from "@/app/components/MagneticButton";
import { Mail, MapPin, Phone } from "lucide-react";

function FloatField({
  label,
  type = "text",
  name,
  multiline = false,
}: {
  label: string;
  type?: string;
  name: string;
  multiline?: boolean;
}) {
  return (
    <div className="float-label-group">
      {multiline ? (
        <>
          <textarea
            name={name}
            placeholder=" "
            rows={4}
            className="resize-none"
            style={{ background: "transparent" }}
          />
          <label>{label}</label>
        </>
      ) : (
        <>
          <input name={name} type={type} placeholder=" " />
          <label>{label}</label>
        </>
      )}
    </div>
  );
}

function SuccessCheck() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!svgRef.current) return;
    const circle = svgRef.current.querySelector(".check-circle");
    const check = svgRef.current.querySelector(".check-path");

    const tl = gsap.timeline();
    tl.from(circle, { scale: 0, transformOrigin: "center", duration: 0.5, ease: "back.out(2)" })
      .from(check, { strokeDashoffset: 100, duration: 0.5, ease: "power3.out" }, "-=0.2");
  }, { scope: svgRef });

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <svg ref={svgRef} width="80" height="80" viewBox="0 0 80 80">
        <circle className="check-circle" cx="40" cy="40" r="36" fill="none" stroke="#6366f1" strokeWidth="2" />
        <path
          className="check-path"
          d="M24 40l12 12 20-24"
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="100"
        />
      </svg>
      <p className="text-white font-semibold text-lg">Message Sent!</p>
      <p className="text-white/40 text-sm text-center">We&apos;ll get back to you within 24 hours.</p>
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-left > *", {
        opacity: 0,
        x: -40,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact-right", {
        opacity: 0,
        x: 40,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0f172a 0%, #080d1a 100%)" }}
    >
     
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, #ec4899)" }} />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
       
        <div className="contact-left space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-white/30">Let&apos;s Talk</p>
          <AnimatedText
            text="Start a Project"
            tag="h2"
            className="text-5xl md:text-6xl font-bold text-white block leading-tight"
            scrollTrigger
            triggerStart="top 85%"
          />
          <p className="text-white/50 leading-relaxed text-lg max-w-md">
            Have an idea? We&apos;d love to hear it. Tell us about your project and we&apos;ll be in touch soon.
          </p>

          <div className="space-y-4 pt-4">
            {[
              { icon: Mail, label: "hello@nexuscreative.io" },
              { icon: Phone, label: "+1 (555) 000-0000" },
              { icon: MapPin, label: "San Francisco, CA" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-3 text-white/40 hover:text-white/70 transition-colors">
                <Icon className="w-4 h-4" strokeWidth={1.5} style={{ color: "#6366f1" }} />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

       
        <div className="contact-right rounded-2xl p-8 border border-white/5 bg-white/[0.02] backdrop-blur-sm">
          {submitted ? (
            <SuccessCheck />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <FloatField label="First Name" name="firstName" />
                <FloatField label="Last Name" name="lastName" />
              </div>
              <FloatField label="Email Address" type="email" name="email" />
              <FloatField label="Project Budget" name="budget" />
              <FloatField label="Tell us about your project..." name="message" multiline />

              <MagneticButton
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-white text-sm tracking-wide relative overflow-hidden group"
                style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" } as React.CSSProperties}
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #db2777)" }} />
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
