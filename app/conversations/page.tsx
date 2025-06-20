import { getAllCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const country = filters.country ? filters.country : "";
  const topic = filters.topic ? filters.topic : "";

  const companions = await getAllCompanions({ topic, country });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Trip Conversation Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard key={companion.id} {...companion} />
        ))}
      </section>
    </main>
  );
};

export default CompanionsLibrary;
