import { ReactNode } from "react";

export default function Container({
  children,
  size = 1280,
}: {
  children: ReactNode;
  size?: 1280 | 1440 | 1920;
}) {
  return (
    <div
      style={{
        maxWidth: `${size}px`,
      }}
      className="mx-auto px-4 md:px-5"
    >
      {children}
    </div>
  );
}

export { Container };
