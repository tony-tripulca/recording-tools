import DictionarySearch from "@/app/(modules)/dictionary/_partials/dictionary.search";
import { GridCol, GridRow } from "@/app/_components/grids";

export default function Page() {
  return (
    <GridRow>
      <GridCol>
        <DictionarySearch />
      </GridCol>
    </GridRow>
  );
}
