import Image from "next/image";
import HomePage from "@/components/HomePage";

const genres = ["All", "Action", "Crime", "Comedy", "Animation"];
const movies = [
  {
    title: "Evil Dead Rise",
    genre: "Action",
    thumb: "https://image.tmdb.org/t/p/w300/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
  },
  {
    title: "Venom",
    genre: "Crime",
    thumb: "https://image.tmdb.org/t/p/w300/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
  },
  {
    title: "Evil Dead Rise",
    genre: "Comedy",
    thumb: "https://image.tmdb.org/t/p/w300/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
  },
  {
    title: "Joker",
    genre: "Animation",
    thumb: "https://image.tmdb.org/t/p/w300/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    title: "Mulan",
    genre: "Action",
    thumb: "https://image.tmdb.org/t/p/w300/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
  },
  {
    title: "Dilwale",
    genre: "Crime",
    thumb: "https://image.tmdb.org/t/p/w300/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
  },
  {
    title: "Mulan",
    genre: "Comedy",
    thumb: "https://image.tmdb.org/t/p/w300/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
  },
  {
    title: "Madmax",
    genre: "Animation",
    thumb: "https://image.tmdb.org/t/p/w300/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
  },
  {
    title: "Joker",
    genre: "Action",
    thumb: "https://image.tmdb.org/t/p/w300/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    title: "Avengers",
    genre: "Crime",
    thumb: "https://image.tmdb.org/t/p/w300/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
  },
  {
    title: "Madmax",
    genre: "Comedy",
    thumb: "https://image.tmdb.org/t/p/w300/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
  },
  {
    title: "Venom",
    genre: "Animation",
    thumb: "https://image.tmdb.org/t/p/w300/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
  },
  {
    title: "Evil Dead Rise",
    genre: "Action",
    thumb: "https://image.tmdb.org/t/p/w300/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
  },
  {
    title: "Madmax",
    genre: "Crime",
    thumb: "https://image.tmdb.org/t/p/w300/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
  },
  {
    title: "Evil Dead Rise",
    genre: "Comedy",
    thumb: "https://image.tmdb.org/t/p/w300/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
  },
  {
    title: "Interstellar",
    genre: "Animation",
    thumb: "https://image.tmdb.org/t/p/w300/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
  },
  {
    title: "Dilwale",
    genre: "Action",
    thumb: "https://image.tmdb.org/t/p/w300/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  },
  {
    title: "Wonder Women",
    genre: "Crime",
    thumb: "https://image.tmdb.org/t/p/w300/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
  },
  {
    title: "Avengers 2",
    genre: "Comedy",
    thumb: "https://image.tmdb.org/t/p/w300/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
  },
  {
    title: "Evil Dead Rise",
    genre: "Animation",
    thumb: "https://image.tmdb.org/t/p/w300/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
  },
  {
    title: "Mulan",
    genre: "Action",
    thumb: "https://image.tmdb.org/t/p/w300/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
  },
  {
    title: "Evil Dead Rise",
    genre: "Crime",
    thumb: "https://image.tmdb.org/t/p/w300/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
  },
  {
    title: "Madmax",
    genre: "Comedy",
    thumb: "https://image.tmdb.org/t/p/w300/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
  },
  {
    title: "Evil Dead Rise",
    genre: "Animation",
    thumb: "https://image.tmdb.org/t/p/w300/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
  },
];

export default function Home() {
  return <HomePage genres={genres} movies={movies} />;
}
