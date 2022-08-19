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
  // console.log(response);
  return (
    <div className="w-full h-16">
      <table className="table-auto w-full border-2 border-gray-700">
        <thead className="p-1 text-white bg-gray-700 h-12">
          <tr>
            <th className="w-1/5 px-4">Description</th>
            <th className="w-1/5 px-4">Amount</th>
            <th className="w-1/5 px-4">Paid By</th>
            <th className="w-1/5 px-4">Date</th>
            <th className="w-1/5 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {response &&
            Object.keys(response).map((item, i) => {
              return (
                <tr kry={response[item]._id} className="h-10 border-b-2">
                  <td className="w-1/5 px-4">{response[item].description}</td>
                  <td className="w-1/5 px-4">$ {response[item].amount}</td>
                  <td className="w-1/5 px-4">
                    {" "}
                    {new Date(response[item].date).toDateString()}
                  </td>
                  {user._id.toString() ===
                  response[item].paidBy._id.toString() ? (
                    <td className="w-1/5 px-4">You</td>
                  ) : (
                    <td className="w-1/5 px-4">
                      {response[item].paidBy.FirstName}
                    </td>
                  )}
                  <td className="w-1/5 px-4"> you</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
