import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../hooks/context";
import { useParams } from "react-router-dom";
import { getExpenses } from "../services/expenseService";

export default function Active() {
  const { user } = useContext(AuthContext);
  const { groupId } = useParams();
  const [response, setResponse] = useState();
  useEffect(() => {
    const fetchExpense = async () => {
      const result = await getExpenses(groupId);
      setResponse(result);
    };
    fetchExpense();
  }, []);
  // const getAmount = (members) => {
  //   const member = members
  //   return member.balance;
  // };
  // console.log(response);
  return (
    <div className="w-full h-16">
      <table className="table-auto w-full border-2 border-gray-700">
        <thead className="p-1 text-white bg-gray-700 h-12">
          <tr>
            <th className="w-auto px-4">Description</th>
            <th className="w-auto px-4">Amount</th>
            <th className="w-auto px-4">Date</th>
            <th className="w-auto px-4">Paid By</th>
            <th className="w-auto px-4"></th>
            <th className="w-auto px-4"></th>
            <th className="w-auto px-4"></th>
          </tr>
        </thead>
        <tbody>
          {response &&
            Object.keys(response).map((item, i) => {
              // console.log(response[item].membersBalance);
              return (
                <tr key={response[item]._id} className="h-10 border-b-2">
                  <td className="w-auto px-4">{response[item].description}</td>
                  <td className="w-auto px-4">$ {response[item].amount}</td>
                  <td className="w-auto px-4">
                    {" "}
                    {new Date(response[item].date).toDateString()}
                  </td>
                  {user._id.toString() ===
                  response[item].paidBy._id.toString() ? (
                    <>
                      <td className="w-auto px-4">You</td>
                      <td className="w-auto px-4 text-green-600 ">
                        You Lent{" "}
                        {
                          response[item].membersBalance.find(
                            (member) => user._id === member.memberId
                          )?.balance
                        }
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="w-auto px-4">
                        {response[item].paidBy.FirstName}
                      </td>
                        <td className="w-auto px-4 text-red-600">
                          You Owe{" "}
                        {
                          response[item].membersBalance.find(
                            (member) => user._id === member.memberId
                          )?.balance
                        }
                      </td>
                    </>
                  )}
                  <td className="w-auto px-4 py-1">
                    {" "}
                    <button className="p-1 px-3 rounded-sm border-green-700  bg-green-400  hover:bg-green-600 text-white capitalize">
                      settle
                    </button>
                  </td>
                  <td className="w-auto">
                    <button className="p-1 px-3 rounded-sm border-3 text-white border-red-700 bg-red-400 hover:bg-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
