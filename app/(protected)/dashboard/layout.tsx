import Breadcrumbs from "@/components/global/breadcrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Breadcrumbs />
      <div className="mt-12">{children}</div>
    </section>
  );
}
