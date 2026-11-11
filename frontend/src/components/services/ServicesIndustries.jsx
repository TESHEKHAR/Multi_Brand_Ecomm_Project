import React from "react";
import Reveal from "../Reveal";

const INDUSTRIES = [
  ["Automotive & Transportation", ["Automobile dealerships", "Trucking companies", "Fleet operators", "Logistics companies", "Car rental companies", "Aviation services"]],
  ["Manufacturing", ["Aerospace", "Food & beverage", "Pharmaceutical", "Medical device", "Electronics", "Machinery"]],
  ["Hospitality", ["Hotels", "Resorts", "Casinos", "Convention centers", "Golf courses", "Country clubs"]],
  ["Restaurants & Food Service", ["Restaurant chains", "Fast-food restaurants", "Bakeries", "Catering companies", "Commercial kitchens", "Institutional food service"]],
  ["Healthcare & Medical", ["Hospitals", "Medical groups", "Dental offices", "Nursing homes", "Laboratories", "Home healthcare"]],
  ["Construction & Building Services", ["General contractors", "Electrical contractors", "Plumbing contractors", "HVAC contractors", "Roofing companies", "Facility management"]],
  ["Real Estate & Property Management", ["Commercial real estate", "Apartment communities", "Shopping centers", "Industrial properties", "Homeowners associations", "Self-storage"]],
  ["Retail", ["Department stores", "Grocery stores", "Convenience stores", "Drugstores", "Home improvement stores", "E-commerce companies"]],
  ["Wholesale & Distribution", ["Wholesale distributors", "Food distributors", "Medical supply distributors", "Restaurant supply distributors", "Importers", "Exporters"]],
  ["Aerospace & Defense", ["Aerospace companies", "Aircraft manufacturers", "Defense contractors", "Government contractors", "Space technology", "Aviation suppliers"]],
  ["Education", ["Public schools", "Private schools", "School districts", "Charter schools", "Colleges", "Universities"]],
  ["Government & Public Sector", ["Federal agencies", "State agencies", "County governments", "Cities & municipalities", "Water districts", "Correctional facilities"]],
  ["Banking, Finance & Insurance", ["Banks", "Credit unions", "Mortgage companies", "Insurance companies", "Investment firms", "Accounting firms"]],
  ["Professional & Business Services", ["Law firms", "Consulting firms", "Engineering firms", "Architectural firms", "Staffing companies", "Call centers"]],
  ["Technology & Communications", ["Technology companies", "Software companies", "Data centers", "Telecommunications", "Internet service providers", "Managed service providers"]],
  ["Agriculture & Food Production", ["Farms", "Ranches", "Food processors", "Produce companies", "Dairy companies", "Wineries & beverage producers"]],
  ["Energy & Utilities", ["Electric utilities", "Gas utilities", "Water utilities", "Renewable energy", "Solar companies", "Wastewater operations"]],
  ["Mining, Oil & Gas", ["Mining companies", "Quarry operations", "Oil & gas extraction", "Drilling companies", "Petroleum distributors"]],
  ["Entertainment, Recreation & Sports", ["Movie studios", "Television production", "Sports organizations", "Stadiums", "Theme parks", "Fitness centers"]],
  ["Nonprofit & Community", ["Nonprofit organizations", "Charitable organizations", "Foundations", "Religious organizations", "Social service organizations", "Membership organizations"]],
  ["Administrative, Facility & Support", ["Janitorial companies", "Security companies", "Landscaping companies", "Pest control", "Waste management", "Staffing services"]],
];

const ServicesIndustries = () => (
  <section
    id="industries"
    aria-labelledby="ind-h"
    className="relative overflow-hidden bg-[#0e1c18] px-[6vw] py-[90px] text-[#f4ead0]"
  >
    <div className="mx-auto max-w-[1100px]">
      <Reveal
        as="p"
        className="text-xs font-bold uppercase tracking-[.3em] text-[#2de2c8]"
      >
        Industries we serve
      </Reveal>

      <Reveal
        as="h2"
        delay={0.1}
        className="mb-[14px] mt-3 text-[clamp(26px,3.4vw,42px)] leading-[1.1] text-[#f4ead0]"
      >
        <span id="ind-h">
          Consulting across{" "}
          <em className="bg-[linear-gradient(100deg,#7ff5e1,#3b9bff,#8b6bff)] bg-clip-text not-italic text-transparent">
            21 industry groups
          </em>
        </span>
      </Reveal>

      <Reveal
        as="p"
        delay={0.2}
        className="max-w-[720px] text-[17px] leading-[1.7] text-[#b9c2b6]"
      >
        Our purchasing and cost-reduction work applies to organizations in
        every major sector, including the types of organizations listed below.
      </Reveal>

      <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
        {INDUSTRIES.map(([title, chips], i) => (
          <Reveal key={title} delay={(i % 3) * 0.1} className="h-full">
            <div className="h-full rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.015))] p-[22px] transition-all duration-300 hover:-translate-y-[5px] hover:border-[#2de2c8] hover:shadow-[0_0_28px_rgba(45,226,200,.22)]">
              <h3 className="mb-3 text-base font-bold text-[#f2b84b]">
                {title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-[#2de2c8]/35 bg-[linear-gradient(180deg,rgba(255,255,255,.14),rgba(45,226,200,.06))] px-3 py-1.5 text-[13px] text-[#f4ead0] shadow-[inset_0_1px_0_rgba(255,255,255,.35)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesIndustries;