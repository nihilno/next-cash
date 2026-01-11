import { TODAY } from "@/lib/consts/consts";

function Footer() {
  return (
    <footer className="border-muted-foreground/50 mt-16 h-20 w-full border-t border-dashed">
      <div className="container mx-auto flex h-full items-center justify-center gap-1 text-xs">
        <span>&copy;</span>
        {TODAY.getFullYear()}
        <span>Maciej Polowy</span>
      </div>
    </footer>
  );
}
export default Footer;
