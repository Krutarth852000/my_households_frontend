import React, { useEffect } from "react";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { MdOutlinePeople } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import httpService from "../services/httpService";

export default function Groups({ name  }) {
  // const [flag, setFlag] = useState(false);
  // const [ref, getRef] = useState("Add Group");
  // if (name === ref) {
  //   setFlag(true);
  // }
  // console.log(flag);
  return (
    <div className="flex flex-col h-56 w-56 rounded-2xl border-4 border-slate-500 bg-slate-100 place-items-center">
      <div className="h-3/4 font-light  text-2xl flex flex-col justify-center">
        <div className="flex  flex-row py-2">
          <div className="flex items-center flex-start text-blue-500 mr-2">
            <MdOutlinePeople />
          </div>
          <div>members</div>
        </div>
        <div className="flex py-2 flex-row">
          <div className="flex items-center mr-2  text-blue-500">
            <RiBankLine />
          </div>
          <div>expenses</div>
        </div>
      </div>

      {/* <div className="flex justify-center py-1 h-20 w-20 place-items-center rounded-full shadow bg-white ">
          <div className="text-3xl ">
            <BsPlusLg />
          </div>
        </div> */}

      <h5 className="text-center p-2 border-orange-500 border-t-4 bg-orange-300 w-full h-1/4 m-0 rounded-b-xl">
        {name}
      </h5>
    </div>
  );
}
