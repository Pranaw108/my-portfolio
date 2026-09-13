import { Link } from "react-router-dom";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary: "bg-ink text-bg hover:bg-ink-soft shadow-soft hover:shadow-lift",
  secondary: "border border-line-strong bg-surface/60 text-ink hover:border-ink hover:bg-surface",
  ghost: "text-ink-soft hover:text-ink hover:bg-bg-soft",
  inverse: "bg-[#f6f4ef] text-[#17160f] hover:bg-white",
  "inverse-outline": "border border-white/20 text-[#f1eee6] hover:border-white/60 hover:bg-white/5",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base",
};

function buttonClasses({ variant = "primary", size = "md", className = "" } = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

/**
 * One button API for internal routes (`to`), external links (`href`, opens in a
 * new tab) and downloads (`href` + `download`).
 */
export default function ButtonLink({ to, href, variant, size, className, children, download, external, ...props }) {
  const classes = buttonClasses({ variant, size, className });

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const isExternal = external ?? /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={classes}
      download={download}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    >
      {children}
    </a>
  );
}
