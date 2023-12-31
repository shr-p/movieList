import React, { useEffect, useState } from "react";
import {
  ArrowPathIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  FilmIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { getActors, getMovies, getSearchedMovies } from "../API";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedMovies, setSearchedMovies] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePage = (page) => {
    setPage(page);
  };
  const changeTheSearch = (event) => {
    setSearch(event.target.value);
  };
  
  useEffect(() => {
    setMovies([]);
    setSearchedMovies(true);
    if (search.length === 0) {
      Promise.resolve(getMovies(page)).then((values) => {
        setMovies(values.results);
        setTotalPages(values.total_pages);
        setPage(values.page);
      });
    } else {
      Promise.resolve(getSearchedMovies(search, page)).then((values) => {
        setMovies(values.results);
        setTotalPages(values.total_pages);
        setPage(values.page);
      });
      if (movies.length === 0) {
        setTimeout(() => {
          setSearchedMovies(false);
        }, 2000);
      }
    }
  }, [search, totalPages, page]);
  return (
    <>
      <div className="space-y-12 bg-gradient-to-tl from-indigo-200 via-red-200 to-yellow-100 p-12">
        <div className="">
         
          <label
            htmlFor="title"
            className="block  text-sm font-medium leading-6 text-gray-900"
          > <FilmIcon className="w-7 h-7 inline mb-2"></FilmIcon>
            <h2 className="text-2xl inline "> Search your favourite movies....</h2>
          </label>
          <div className="flex  rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              type="text"
              id="title"
              onChange={changeTheSearch}
              autoComplete="title"
              placeholder="Search for you favourite movie"
              className="block col-span-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="">
          <div className=" max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1  gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <Link to={`/${movie.id}`} >
                  <div
                    key={movie.id}
                    className="group relative rounded-md	 p-2 border-solid   border-2 border-gray-200"
                  >
                    <div className=" overflow-hidden rounded-md bg-gray-200  group-hover:scale-110 lg:h-80">
                      <div className="group relative">
                        <img
                          src={
                            "https://image.tmdb.org/t/p/w500" +
                            movie.poster_path
                          }
                          alt={movie.title}
                          className="h-full object-fill w-full object-center lg:h-full lg:w-full"
                        />
                        <div className="opacity-0 bg-opacity-80 bg-gray-500 p-1 text-white overflow-hidden absolute inset-0  flex items-center group-hover:opacity-100">
                          <div>
                            <p className="text-center underline">Overview</p>
                            <p className="text-sm">{movie.overview}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm block font-medium text-gray-700">
                          <div>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {movie.title}
                          </div>
                        </h3>
                        <p className="text-sm block font-medium text-gray-500">
                          <StarIcon className="w-4 h-4 inline m-1"></StarIcon>
                          <span className="align-bottom">
                            {" "}
                            Popularity : {movie.popularity}
                          </span>
                        </p>
                        <p className="text-sm block font-medium text-gray-500">
                          <CalendarIcon className="w-4 h-4 inline m-1"></CalendarIcon>
                          Release Date : {movie.release_date}
                        </p>
                        <p className="text-sm block font-medium text-gray-500">
                          <UserIcon className="w-4 h-4 inline m-1"></UserIcon>
                          Vote Count : {movie.vote_count}
                        </p>
                      </div>
                    </div>
                  </div>
                  </Link>
                ))
              ) : searchedMovies === true ? (
                <div className="text-center col-span-4">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-24 h-24  mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div class="col-span-4 bg-white dark:bg-gray-900 ">
                  <div class="container px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                    <div class="">
                      <ExclamationTriangleIcon className="w-5 h-5 inline m-1"></ExclamationTriangleIcon>
                      
                      <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                        Movie not found
                      </h1>
                      <p class="mt-4 text-gray-500 dark:text-gray-400">
                        Sorry, the movie you are looking for doesn't exist.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-10">
              <Pagination
                page={page}
                setPage={setPage}
                handlePage={handlePage}
                totalPages={totalPages}
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Pagination({ page, handlePage, totalPages }) {
  return (
    <div>
      <div className="flex items-center justify-between border-t border-gray-200 rounded-lg bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </div>
          <div
            onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{page}</span> to{" "}
              <span className="font-medium">{totalPages}</span> of{" "}
              <span className="font-medium">{totalPages}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {totalPages < 6 ? (
                Array.from({ length: totalPages }).map((el, index) => (
                  <div
                    key={index}
                    onClick={(e) => handlePage(index + 1)}
                    aria-current="page"
                    className={`relative z-10 inline-flex cursor-pointer items-center ${
                      index + 1 === page
                        ? "bg-indigo-600 text-white"
                        : "text-gray"
                    } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {index + 1}
                  </div>
                ))
              ) : (
                <div
                  aria-current="page"
                  className={`relative z-10 inline-flex cursor-pointer items-center bg-indigo-600 text-white
                    px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {page}
                </div>
              )}

              <div
                onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
