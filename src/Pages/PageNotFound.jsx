import React from "react";
import { Helmet } from "react-helmet";

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found 😴 | GetURI</title>
        <meta
          name="description"
          content="Easy Upgrada Your acount and get access to unlimited features for one month.."
        />
      </Helmet>
      <div className="w-full h-full flex justify-center bg-transparent items-center">
        <img
          src="https://i.pinimg.com/originals/0e/c0/db/0ec0dbf1e9a008acb9955d3246970e15.gif"
          alt="Page Not Found..."
          width={"100%"}
          height={"100%"}
        />
      </div>
    </>
  );
};

export default PageNotFound;
