import { iconPaths, isIconName, type IconName } from "./icons";

interface IconProps {
  name: IconName | string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 16, className = "" }: IconProps) {
  const iconName = isIconName(name) ? name : "boxes";
  if (iconName === "boxes" && name !== "boxes") {
    console.warn(`Unknown icon "${name}", falling back to boxes.`);
  }

  const path = iconPaths[iconName];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
