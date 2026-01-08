import Breadcrumbs from "@/components/global/breadcrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Breadcrumbs />
      <div className="mt-16">{children}</div>
    </section>
  );
}
