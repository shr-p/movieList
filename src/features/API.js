export function getMovies(page) {
    return new Promise(async (resolve) => {
      const response = await fetch( "https://api.themoviedb.org/3/movie/top_rated?language=en&page=" + page
      , {
        method: "GET",
        body: JSON.stringify(),
        headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTc2OTZhMzMwODEwNDkyZWZmM2JlM2QzZWFhOGZhYSIsInN1YiI6IjY0YjIzOGQyMjNkMjc4MDEwNzMwMWRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L2VTHwO3eVYaP37OH-P_3YTcZUbEn_FijvHXNsITnLQ",
          },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve(data);
    });
  }
export function getSearchedMovies(search, page) {
    return new Promise(async (resolve) => {
      const response = await fetch( "https://api.themoviedb.org/3/search/movie?query=" +
        search +
        "&page=" +
        page
      , {
        method: "GET",
        body: JSON.stringify(),
        headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTc2OTZhMzMwODEwNDkyZWZmM2JlM2QzZWFhOGZhYSIsInN1YiI6IjY0YjIzOGQyMjNkMjc4MDEwNzMwMWRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L2VTHwO3eVYaP37OH-P_3YTcZUbEn_FijvHXNsITnLQ",
          },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve(data);
    });
  }



  // const getSearchedMovies = () => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTc2OTZhMzMwODEwNDkyZWZmM2JlM2QzZWFhOGZhYSIsInN1YiI6IjY0YjIzOGQyMjNkMjc4MDEwNzMwMWRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L2VTHwO3eVYaP37OH-P_3YTcZUbEn_FijvHXNsITnLQ",
  //     },
  //   };

  //   fetch(
  //     "https://api.themoviedb.org/3/search/movie?query=" +
  //       search +
  //       "&page=" +
  //       page,
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setMovies(response.results);
  //       setTotalPages(response.total_pages);
  //     })
  //     .catch((err) => console.error(err));
  // };


  // const getAllMovies = () => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTc2OTZhMzMwODEwNDkyZWZmM2JlM2QzZWFhOGZhYSIsInN1YiI6IjY0YjIzOGQyMjNkMjc4MDEwNzMwMWRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L2VTHwO3eVYaP37OH-P_3YTcZUbEn_FijvHXNsITnLQ",
  //     },
  //   };

  //   fetch(
  //     "https://api.themoviedb.org/3/movie/top_rated?language=en&page=" + page,
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setMovies(response.results);
  //       setTotalPages(response.total_pages);
  //     })
  //     .catch((err) => console.error(err));
  // };