import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";

import {
  getAllCompanions,
  getBookmarkedCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  const { userId } = await auth();
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  // Ambil daftar companion yang dibookmark user
  const bookmarkedCompanions = userId
    ? await getBookmarkedCompanions(userId)
    : [];
  const bookmarkedIds = bookmarkedCompanions.map((comp) => comp.id);

  // Tambahkan status bookmark ke setiap companion
  const companionsWithBookmarks = companions.map((companion) => ({
    ...companion,
    bookmarked: bookmarkedIds.includes(companion.id),
  }));

  const recentWithBookmarks = recentSessionsCompanions.map((companion) => ({
    ...companion,
    bookmarked: bookmarkedIds.includes(companion.id),
  }));

  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        {companionsWithBookmarks.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentWithBookmarks}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};
export default Page;
