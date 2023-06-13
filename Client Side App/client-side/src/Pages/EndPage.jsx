import React, { useEffect, useState } from "react";

//assets
import rankIcon from "../Assets/quality.png";

//import axios to fetch the rank from the server
import axios from "axios";

export default function EndPage({ score }) {
  const [rank, setRank] = useState(0);

  //fetch the rank from the server
  async function getRank() {
    try {
      const { data } = await axios.post("http://localhost:3001/rank", {
        score: score,
      });
      setRank(data.rank);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getRank();
  }, []);

  return (
    <div className="m-auto pt-5">
      <div>
        <img src={rankIcon} alt="" className="w-48 m-auto" />
        <h1 className="font-bold text-4xl mb-5"> Your Rank is </h1>
        <span className="block text-4xl mb-20"> {rank} </span>
        <button
          className="bg-main-color text-white py-3 px-16 rounded-3xl"
          onClick={() => window.location.reload(true)}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
