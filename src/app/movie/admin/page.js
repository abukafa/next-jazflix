import Navbar from "@/components/Navbar";
import TableMovies from "@/components/TableMovies";

const movies = [
  {
    id: 1,
    title: "Do or Die",
    year: 2018,
    genre: "Action",
    rating: "8.5",
    isTrending: true,
    isPopular: false,
  },
  {
    id: 2,
    title: "The Last Hope",
    year: 2020,
    genre: "Drama",
    rating: "8.1",
    isTrending: true,
    isPopular: false,
  },
  {
    id: 3,
    title: "Laugh Till Fall",
    year: 2019,
    genre: "Comedy",
    rating: "7.4",
    isTrending: true,
    isPopular: false,
  },
  {
    id: 4,
    title: "Moon Lovers",
    year: 2017,
    genre: "Romance",
    rating: "8.9",
    isTrending: true,
    isPopular: true,
  },
  {
    id: 5,
    title: "Firestorm",
    year: 2021,
    genre: "Action",
    rating: "8.2",
    isTrending: false,
    isPopular: true,
  },
  {
    id: 6,
    title: "Alone",
    year: 2016,
    genre: "Drama",
    rating: "7.8",
    isTrending: false,
    isPopular: true,
  },
  {
    id: 7,
    title: "Runaway",
    year: 2022,
    genre: "Action",
    rating: "8.0",
    isTrending: false,
    isPopular: true,
  },
];

export default function Admin() {
  return (
    <>
      <Navbar />
      <div className="my-20" />
      <TableMovies movies={movies} />
    </>
  );
}
