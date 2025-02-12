import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-[1280px] mx-auto px-5 md:px-8">{children}</div>;
}

export { Container };
