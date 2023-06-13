function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}import React, { useState } from "https://cdn.skypack.dev/react@17";
import { render } from "https://cdn.skypack.dev/react-dom@17";
import {
useQuery,
QueryClient,
QueryClientProvider } from
"https://cdn.skypack.dev/react-query@3";

const queryClient = new QueryClient();

const Movie = props => {
  const { poster_path, title, vote_average } = props;

  return /*#__PURE__*/(
    React.createElement("div", { className: "movie" }, /*#__PURE__*/
    React.createElement("figure", { className: "movie__figure" }, /*#__PURE__*/
    React.createElement("img", {
      src: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}`,
      className: "movie__poster" }), /*#__PURE__*/

    React.createElement("figcaption", null, /*#__PURE__*/
    React.createElement("span", { className: "movie__vote" }, vote_average)), /*#__PURE__*/

    React.createElement("h2", { className: "movie__title" }, title))));



};

const Movies = props => {
  const { movies } = props;

  return /*#__PURE__*/(
    React.createElement("ul", { className: "movies" },
    movies.map((movie) => /*#__PURE__*/
    React.createElement("li", { key: movie.id }, /*#__PURE__*/
    React.createElement(Movie, movie)))));




};

const Search = props => {
  const { onInput, query, ...otherProps } = props;

  return /*#__PURE__*/(
    React.createElement("form", { className: "search", onInput: onInput }, /*#__PURE__*/
    React.createElement("input", _extends({ type: "search", value: query }, otherProps))));


};

const API_BASE = "https://api.themoviedb.org/3";
const API_KEY =
"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2ZmNjljNmRiM2YxMjgxZTk2ZTRlODQ5ZWRhNmQ2NSIsInN1YiI6IjU2YzRhZmU1YzNhMzY4MGQzZTAwMDIyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-TqKfzJ2O4yVBYI0aiaUDgkg_WDRhOoRfnC5U-QE2SU";

async function fetcher(url) {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}` } });



  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

function App() {
  const [query, setQuery] = useState("");

  const url = query ? `/search/movie?query=${query}` : "/movie/popular";
  const { isLoading, isError, data, error } = useQuery([url], () =>
  fetcher(url));


  if (isError) {
    return /*#__PURE__*/React.createElement("div", null, "Error: ", error);
  }

  function onInput(event) {
    const { value } = event.target;

    setQuery(value);
  }

  return /*#__PURE__*/(
    React.createElement("div", { className: "app" }, /*#__PURE__*/
    React.createElement(Search, {
      query: query,
      onInput: onInput,
      placeholder: "Search for Movie Title \u2026" }),

    isLoading ? /*#__PURE__*/React.createElement("div", null, "Loading \u2026") : /*#__PURE__*/React.createElement(Movies, { movies: data.results })));


}

function Root() {
  return /*#__PURE__*/(
    React.createElement(QueryClientProvider, { client: queryClient }, /*#__PURE__*/
    React.createElement(App, null)));


}

render( /*#__PURE__*/React.createElement(Root, null), document.getElementById("root"));