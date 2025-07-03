import React from "react";

const NoFound = ({ searchVal = "", IsDashPage = false }) => {
  const HighlightedText = (
    <strong className="break-words text-3xl text-[#4ED7DD]">
      {searchVal}
    </strong>
  );

  const pageTitle = IsDashPage
    ? `Nothing to show for ${searchVal}`
    : `No results found for ${searchVal}`;

  return (
    <section
      aria-labelledby="not-found-heading"
      className={`w-full flex flex-col ${
        IsDashPage ? "justify-start h-full" : "justify-center"
      } items-center text-center px-4`}
    >
      <h1
        id="not-found-heading"
        className="font-semibold text-2xl z-50 text-gray-900"
      >
        {pageTitle}
      </h1>

      <p className="text-sm font-light mt-2 text-gray-600">
        {IsDashPage
          ? <>Create {HighlightedText} for fun!</>
          : <>Try searching for something else…</>}
      </p>

      {!IsDashPage && (
        <img
          src="./NoFound.svg"
          alt={`No content found for "${searchVal}"`}
          className="relative max-w-xs mt-6"
          loading="lazy"
          decoding="async"
        />
      )}
    </section>
  );
};

export default NoFound;
