import { useEffect, useState } from "react";
import { getActors, getOneMovie } from "./API";
import { useParams } from "react-router-dom";

function Actors() {
  const [actors, setActors] = useState([]);
  const [crew, setCrew] = useState([]);
  const [movie, setMovie] = useState([]);
  const [fetched, setFetched] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (!fetched) {
      setActors([]);
      setFetched(true);
      Promise.resolve(getActors(params.id)).then((values) => {
        setActors(values.cast);
        setCrew(values.crew)
      });
      Promise.resolve(getOneMovie(params.id)).then((values) => {
        setMovie(values);
      });
    }
  }, [params.id]);
  return (
    <>
      <div
        className="flex items-center bg-indigo-100   "
        style={{ fontFamily: '"Montserrat", sans-serif' }}
      >
          <div className=" sm:w-9/12  ml-auto mr-auto">
            <div className="flex flex-wrap">
              <div className="sm:w-3/12 bg-red-200 p-5 sm:pb-20">
                <h1 className="font-bold text-lg">{movie.title}</h1>
                <div className="w-10 h-1 bg-red-600" />
                <ul className="space-y-2 mt-2 sm:mb-8">
                  <li>
                    <span className="text-xs text-gray-700">Director</span>
                    <strong className="block text-sm text-gray-700">
                      {(crew.filter((actor) => actor.job === "Director").map((dir)=>(dir.name)))}
                    </strong>
                  </li>
                  <li>
                    <span className="text-xs text-gray-700">Status</span>
                    <strong className="block text-sm text-gray-700">
                      {movie.status}
                    </strong>
                  </li>
                  <li>
                    <span className="text-xs text-gray-700">Genres</span>
                    <strong className="block text-sm text-gray-700">
                      NA
                    </strong>
                  </li>
                  <li>
                    <span className="text-xs text-gray-700">Release Date</span>
                    <strong className="block text-sm text-gray-700">
                      {movie.release_date}
                    </strong>
                  </li>
                  <li>
                    <span className="text-xs text-gray-700">Budget</span>
                    <strong className="block text-sm text-gray-700">
                      ${movie.budget}
                    </strong>
                  </li>
                </ul>
              </div>
              <div className=" sm:w-9/12 h-64 sm:h-auto bg-indigo-900 bg-cover relative flex items-center justify-center">
                <img
                  src={"https://image.tmdb.org/t/p/w1280" + movie.backdrop_path}
                  alt={movie.title}
                  className="h-full object-fill w-full object-center lg:h-full lg:w-full"
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full sm:w-3/12 bg-white flex">
                <figure className="mt-5 mb-4 ml-auto mr-auto sm:-mt-16 sm:mr-0 sm:ml-8 sm:mb-0 w-full relative">
                  <div className="absolute w-10 h-12 -mt-3 -ml-3 bg-gray-200 z-0 hidden sm:block" />
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt={movie.title}
                    className=" object-fill w-full object-center lg:h-full lg:w-full"
                  />
                </figure>
              </div>
              <div className="w-full sm:w-9/12 bg-gray-100 flex">
                <div className="bg-white sm:-mt-16 sm:mr-8 w-full h-64 relative rounded-tr-lg">
                  <ul className="flex flex-wrap pl-2 pr-2 mb-2 sm:pt-5 sm:pb-5 sm:pl-8 sm:pr-8 sm:space-x-6 text-sm font-light">
                    <li className="cursor-pointer font-semibold border-b-2 border-red-600 leading-loose pr-3">
                      Cast
                    </li>
                    <li className="cursor-pointer hover:font-semibold border-b-2 border-transparent hover:border-red-600 leading-loose pr-3">
                      Crew
                    </li>
                  </ul>
                  <div className="grid grid-rows-4 grid-flow-col gap-4 pl-2 pr-2 sm:pl-8 sm:pr-8">
                    <div className="flex overflow-x-scroll hide-scroll-bar flex-nowrap space-x-4 sm:mb-auto sm:w-auto sm:pr-16">
                      {actors.length > 0 &&
                        actors.map((actor, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center"
                          >
                            <img
                              src={
                                "https://image.tmdb.org/t/p/w300" +
                                actor.profile_path
                              }
                              alt={actor.name}
                              className="w-10 h-10 rounded-full object-cover mb-2"
                            />
                            <span className="text-sm font-bold text-gray-800">
                              {actor.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}

export default Actors;
