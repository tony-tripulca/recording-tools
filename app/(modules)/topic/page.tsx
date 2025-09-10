import TopicCreate from "@/app/(modules)/topic/_partials/topic.create";
import { GridCol, GridRow } from "@/app/_components/grids";

export default function Page() {
  return (
    <GridRow>
      <GridCol>
        <TopicCreate />
      </GridCol>
    </GridRow>
  );
}
