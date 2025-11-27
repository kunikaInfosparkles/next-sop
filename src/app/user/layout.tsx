import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 border">
      <h2>Dashboard Layout</h2>
      <div>{children}</div>
    </div>
  );
}
