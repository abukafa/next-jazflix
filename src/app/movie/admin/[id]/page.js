import Navbar from "@/components/Navbar";
import EditMovieForm from "@/components/EditMovieForm";

export default async function AdminEdit({ params }) {
  const { id } = await Promise.resolve(params);

  return (
    <>
      <Navbar />
      <div className="my-20" />
      <EditMovieForm id={id} />
    </>
  );
}
