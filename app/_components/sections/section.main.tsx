import { TSectionMainComponent } from "@/app/_components/sections/type";

export default function SectionMain({
  children,
  module,
  ...rest
}: TSectionMainComponent) {
  return (
    <section id={`section-main-${module}`} {...rest}>
      {children}
    </section>
  );
}
