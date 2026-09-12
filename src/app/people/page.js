export const revalidate = 60;
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PeopleExplorer from "@/components/PeopleExplorer";
import { getPeoplePaginated } from "@/lib/tmdb";

export default async function PeoplePage() {
  let initialPeople = [];

  try {
    const data = await getPeoplePaginated({ category: "popular", page: 1 });
    initialPeople = data.results || [];
  } catch (err) {
    console.error("Failed to load initial people page data:", err);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <PeopleExplorer initialPeople={initialPeople} initialCategory="popular" />
      <Footer />
    </div>
  );
}
