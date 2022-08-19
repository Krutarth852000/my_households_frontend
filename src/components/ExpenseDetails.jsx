import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadExpense from "../common/loadExpense";
import { AuthContext } from "../hooks/context";
import { addExpense } from "../services/expenseService";
import { getGroupUsingId } from "../services/groupService";
import { getList } from "../services/shopListService";

export default function ExpenseDetails() {
  const { groupId } = useParams();
  const { user } = useContext(AuthContext);
  // const [response, setResponse] = useState();
  const [name, setName] = useState();
  const [data, setData] = useState({
    description: "",
    amount: "",
    paidBy: user._id,
    groupId: groupId,
  });
  useEffect(() => {
    const fetchGroup = async () => {
      const result = await getGroupUsingId(groupId);
      setName(result);
      //   setMemberList(result.MemberList);
    };
    fetchGroup();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addExpense(data);
    if (response) {
      console.log(response);
      window.location.reload();
    }
  };
  // console.log(name);
  return (
    <div className="flex flex-col justify-center place-items-center w-full h-auto py-5">
      <div className=" flex flex-col justify-start px-10 h-16 w-full ">
        <div className="flex flex-row">
          <h2>Expense Overview -</h2>
          {name && <h2 className="capitalize font-bold">{name.GroupName}</h2>}
        </div>
        <hr className="border-slate-900 border-3 w-full mt-0" />
      </div>
      <div className="flex  flex-col justify-start w-full px-10">
        <div className="w-3/5">
          <h5 className="font-bold ">Add new Expense</h5>
          {/* <hr className="w-full border-1 mt-0" /> */}

          <div className="w-full flex flex-col ">
            <label
              htmlFor="description"
              className="block text-lg w-full font-medium text-gray-500 text-left"
            >
              Description
            </label>
            <input
              type="text"
              placeholder="Enter Description"
              id="description"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-full flex flex-col">
            <label
              htmlFor="description"
              className="block text-lg w-full font-medium text-gray-500 text-left"
            >
              Price
            </label>
            <input
              type="number"
              min={0}
              placeholder="$ Enter Amount"
              id="amount"
              value={data.amount}
              onChange={(e) => setData({ ...data, amount: e.target.value })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-3 w-full bg-slate-600 text-white py-1 text-center "
          >
            Add Expense
          </button>
        </div>
        {/* response== aray of objects map {date, paidBy, membersbalance, setteledmembers , amount , description } */}
      </div>
      <div className="w-full mt-10 px-10">
        <LoadExpense groupId={groupId} />
      </div>
    </div>
  );
}
