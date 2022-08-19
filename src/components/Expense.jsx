import React, { useContext, useEffect, useState } from "react";
import { FaBalanceScaleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../hooks/context";
import { currentUserGroups } from "../services/groupService";

export default function Expense() {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  // const [members, setMembers] = useState([]);
  useEffect(() => {
    const fetchGroup = async () => {
      const data = await currentUserGroups(user._id);
      if (data) {
        setList(data);
        console.log(data);
      }
    };

    fetchGroup();
  }, []);
  return (
    <div className="flex flex-col justify-center place-items-center w-full h-auto py-5">
      <div className=" flex flex-col justify-start px-10 h-16 w-full ">
        <div className="flex flex-row">
          <h1 className="mr-5 flex  items-center">
            <FaBalanceScaleRight />
          </h1>
          <h2>My Expense Overview</h2>
        </div>
        <hr className="border-slate-900 border-3 w-full mt-0" />
      </div>
      <div className="w-full px-10 ">
        <table class="table-auto w-full border-2">
          <thead className="bg-slate-500 text-white p-1 w-full px-10 ">
            <tr className="gap-4 w-full h-12">
              <th className="w-1/4 px-3 font-light">GROUP NAME</th>
              <th className="w-1/4 px-3 font-light">TOTAL MEMBERS</th>
              <th className="w-1/4 px-3 font-light">TOTAL EXPENSES</th>
              <th className="w-1/4 px-3 font-light"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((data) => {
              return (
                <tr key={data._id} className="gap-4 w-full h-10 border-b-2">
                  <td className="w-1/4 px-3 capitalize">{data.GroupName}</td>
                  <td className="w-1/4 px-3">{data.MemberList.length}</td>
                  <td className="w-1/4 px-3">{data.MemberList.length}</td>
                  <td className="w-1/4 px-3">
                    <Link
                      to={`/expense/${data._id}`}
                      className="flex m-0  place-items-center justify-center decoration-inherit text-black no-underline"
                    >
                      <button className="py-1 px-3 bg-blue-500 text-white hover:bg-blue-700">
                        + Expenses
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* {list.map((data) => {
        return (
          <div className="w-full px-10">
            <div
              className={`grid grid-rows-${list.length} grid-flow-col p-1 gap-5 place-items-left ml-5 `}
            >
              <span>{data.GroupName}</span>
              <span className="text-center">{data.MemberList.length}</span>
              <span></span>
              <span></span>
            </div>
          </div>
        );
        
      })} */}
      </div>
    </div>
  );
}
