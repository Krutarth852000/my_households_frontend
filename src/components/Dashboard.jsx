import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";
import Groups from "../common/groups";
import { AuthContext } from "../hooks/context";
import { currentUserGroups } from "../services/groupService";
import httpService from "../services/httpService";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  // const [members, setMembers] = useState([]);
  useEffect(() => {
    const fetchGroup = async () => {
      const data = await currentUserGroups(user._id);
      if (data) {
        setList(data);
      }
    };

    fetchGroup();
  }, []);

  return (
    <div className="flex flex-col justify-center place-items-center w-full h-auto py-5">
      <div className=" flex flex-col justify-start px-10 h-16 w-full ">
        <div className="flex flex-row">
          <h1 className="mr-5 flex  items-center">
            <MdGroups />
          </h1>
          <h2>My Groups</h2>
        </div>
        <hr className="border-slate-900 border-3 w-full mt-0" />
      </div>
      <div className="flex w-full justify-start flex-wrap h-auto">
        <div className="grid grid-cols-4 space-y-6 w-full h-full capitalize font-extrabold ">
          {list.map((group) => {
            return (
              <Link
                key={group._id}
                to={`/group/${group._id}`}
                className="flex m-0 py-8 place-items-center justify-center decoration-inherit text-black no-underline"
              >
                <Groups name={group.GroupName} />
              </Link>
            );
          })}
          <Link
            to="/newGroup"
            className="flex m-0 py-8 place-items-center justify-center decoration-inherit text-black no-underline "
          >
            <div className="flex flex-col justify-center h-48 w-48 space-y-1 shadow bg-slate-300 place-items-center rounded-2xl">
              <div className="flex justify-center py-1 h-28 w-28 place-items-center rounded-full shadow bg-white ">
                <div className="text-5xl ">
                  <BsPlusLg />
                </div>
              </div>

              <h5 className="">Add Group</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
