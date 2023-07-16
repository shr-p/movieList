import React, { useEffect, useState } from "react";
import {
  ArrowPathIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePage = (page) => {
    setPage(page);
  };
  const changeTheSearch = (event) => {
    // console.log(event.target.value);
    setSearch(event.target.value);
  };

  const getAllMovies = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTc2OTZhMzMwODEwNDkyZWZmM2JlM2QzZWFhOGZhYSIsInN1YiI6IjY0YjIzOGQyMjNkMjc4MDEwNzMwMWRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L2VTHwO3eVYaP37OH-P_3YTcZUbEn_FijvHXNsITnLQ",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en&page=" + page,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
        setTotalPages(response.total_pages);
      })
      .catch((err) => console.error(err));
  };

  const getSearchedMovies = () => {
    // console.log(SEARCHAPI + search)
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTc2OTZhMzMwODEwNDkyZWZmM2JlM2QzZWFhOGZhYSIsInN1YiI6IjY0YjIzOGQyMjNkMjc4MDEwNzMwMWRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L2VTHwO3eVYaP37OH-P_3YTcZUbEn_FijvHXNsITnLQ",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        search +
        "&page=" +
        page,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
        setTotalPages(response.total_pages);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // console.log("Hello");
    setMovies([]);
    if (search.length === 0) {
      getAllMovies();
    } else {
      getSearchedMovies();
    }
    if (setMovies.length === 0) {
    }
  }, [search, totalPages, page]);
  return (
    <>
      <div className="space-y-12 bg-gradient-to-tl from-indigo-200 via-red-200 to-yellow-100 p-12">
        <div className="">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <h2 className="text-2xl">Search your favourite movies....</h2>
          </label>
          <div className="mt-2">
            <div className="flex rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                id="title"
                onChange={changeTheSearch}
                autoComplete="title"
                placeholder="Search for you favourite movie"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
           
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
              {movies.length > 0 ? (
                movies.map((product) => (
                  <div
                    key={product.id}
                    className="group relative rounded-md	 p-2 border-solid   border-2 border-gray-200"
                  >
                    <div className="aspect-h-4 aspect-w-3   overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:scale-110 lg:h-80">
                      <img
                        src={
                          "https://image.tmdb.org/t/p/w500" +
                          product.poster_path
                        }
                        alt={product.title}
                        className="h-full object-fill w-full  object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm block font-medium text-gray-700">
                          <div>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </div>
                        </h3>
                        <p className="text-sm block font-medium text-gray-500">
                          <StarIcon className="w-4 h-4 inline m-1"></StarIcon>
                          <span className="align-bottom">
                            {" "}
                            Popularity : {product.popularity}
                          </span>
                        </p>
                        <p className="text-sm block font-medium text-gray-500">
                          <CalendarIcon className="w-4 h-4 inline m-1"></CalendarIcon>
                          Release Date : {product.release_date}
                        </p>
                        <p className="text-sm block font-medium text-gray-500">
                          <UserIcon className="w-4 h-4 inline m-1"></UserIcon>
                          Vote Count : {product.vote_count}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="justify-center col-span-4 ">
                  <h3 className="text-sm block justify-center font-medium text-center text-2xl my-8 text-gray-700">
                    Sorry.., 
                    
                  </h3>
                  <h3 className="text-sm block justify-center font-medium text-center text-2xl my-8 text-gray-700">
                    MOVIE
                    
                  </h3>
                  <h3 className="text-sm block justify-center font-medium text-center text-2xl my-8 text-gray-700">
                    NOT FOUND
                    
                  </h3>
                  <h3 className="text-sm block justify-center font-medium text-center text-2xl my-8 text-gray-700">
                   Re-Try
                    <ArrowPathIcon className="w-5 h-5 inline m-1"></ArrowPathIcon>
                  </h3>
                  
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
              {totalPages < 6
                ? Array.from({ length: totalPages }).map((el, index) => (
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
                : null}

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
