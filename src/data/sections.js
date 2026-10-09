// Single source of truth for section order, numbering and the nav.
// Section numbers used to be hardcoded in each section file, which meant
// inserting one section silently left the rest mis-numbered.

export const sections = [
  { id: "services", label: "Services", inNav: true },
  { id: "work", label: "Work", inNav: true },
  { id: "experience", label: "Experience", inNav: true },
  { id: "about", label: "About", inNav: true },
  { id: "skills", label: "Toolkit", inNav: false },
  { id: "credentials", label: "Credentials", inNav: false },
  { id: "faq", label: "FAQ", inNav: false },
  { id: "contact", label: "Contact", inNav: true },
];

/** Two-digit number shown beside a section heading, e.g. "03". */
export function sectionIndex(id) {
  const position = sections.findIndex((section) => section.id === id);
  if (position === -1) return "";
  return String(position + 1).padStart(2, "0");
}

// The nav stays short on purpose — a visitor scanning a header does not want
// all eight destinations. The rest are reachable by scrolling.
export const navItems = sections
  .filter((section) => section.inNav)
  .map(({ id, label }) => ({ id, label }));

/** Every section id, in order — used by the scroll-spy. */
export const sectionIds = sections.map((section) => section.id);
