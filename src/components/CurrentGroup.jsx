import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import CreateList from "../common/createList";
import MyModal from "../common/modal";
import {
  addMembers,
  deleteMember,
  getGroupUsingId,
} from "../services/groupService";
import { findUserByEmail } from "../services/userServise";

export default function CurrentGroup() {
  const [data, setData] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [email, setEmail] = useState("");
  const [member, setNewMember] = useState();
  const [foundUser, setFoundUser] = useState(false);
  const [searchedUser, setSearchedUser] = useState();

  const [list, setList] = useState([]);

  let { groupId } = useParams();
  useEffect(() => {
    const fetchGroup = async () => {
      const result = await getGroupUsingId(groupId);
      setData(result);
      setMemberList(result.MemberList);
    };
    fetchGroup();
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (email === "") {
      console.log("empty string not allowed");
      return;
    }

    try {
      const result = await findUserByEmail(email);
      if (result) {
        setSearchedUser(result);

        setFoundUser(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddMember = async (e) => {
    e.preventDefault();
    if (memberList.length === 5) {
      console.log("Maximum 5 members are allowed in the group", "warning");
      return;
    }
    if (memberList.find((m) => m.email === searchedUser.email)) {
      console.log("Member already added", "error");

      setEmail("");
    } else {
      setMemberList([...memberList, searchedUser]);
      console.log(searchedUser);
      list.push(searchedUser);
      setNewMember(searchedUser.id);

      setEmail("");
    }

    setFoundUser(false);

    return;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addMembers(groupId, member);
    if (response) {
      console.log(response);
      setNewMember("");
      setSearchedUser({});
      setList([]);
      window.location.reload();
    }
  };

  const handleDelete = async (memberId) => {
    const response = await deleteMember(groupId, memberId);
    console.log("called", response);
    window.location.reload();
  };

  return (
    <div className="flex py-5 h-auto w-full">
      <div className="flex w-full flex-col  px-10">
        <div className="flex flex-row w-full justify-between text-center">
          <h2 className="flex capitalize font-bold text-6xl">
            {data.GroupName}
          </h2>{" "}
          <Link
            to={`/expense/${data._id}`}
            className="flex my-2  place-items-center justify-center cursor-pointer px-2  text-white bg-blue-500 hover:bg-blue-700 text-center  decoration-inherit no-underline"
          >
            <button className="text-xl ">+ Add Expense</button>
          </Link>
        </div>
        <hr className="border-3 border-slate-900 mt-0 w-full" />
        <div className="flex flex-row w-full">
          <div className="w-3/5 p-2 ">
            <CreateList groupId={groupId} />
          </div>
          <div className="w-2/5 p-2 flex flex-col">
            <div className="mb-1 text-xl font-bold flex flex-col w-full ">
              <span>Edit Members</span>
              <hr className="border-3 border-slate-900 mt-0 w-full" />
            </div>
            <div className="flex flex-row w-full mb-2 ">
              <div className="relative border w-3/4 border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  htmlFor="email"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-sm font-medium text-gray-700"
                >
                  Search By Email
                </label>
                <div className="mt-1">
                  <input
                    placeholder="Enter Email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    required
                    className="block w-full border-0 p-0 px-1 text-gray-600 placeholder-gray-500 focus:ring-0 sm:text-md"
                  ></input>
                </div>
              </div>

              {!foundUser ? (
                <button
                  className="flex w-1/4 px-3 justify-between place-items-center rounded-lg text-center border-2 bg-slate-500 text-white "
                  onClick={handleSearch}
                >
                  <div>Search</div>
                  <div className="flex justify-center">
                    <BiSearchAlt />
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-blue-500 text-white flex w-1/4 px-3 justify-between place-items-center rounded-lg text-center border-2 "
                  onClick={handleAddMember}
                >
                  <div>Add</div>
                  <div className="flex justify-center">
                    <IoMdAdd />
                  </div>
                </button>
              )}
            </div>
            <div className="h-8 w-full">
              {foundUser && (
                <p className="text-green-600">
                  {" "}
                  would you linke to add this member to the group?{" "}
                </p>
              )}
            </div>
            <div className="w-fullp-2 border-2 flex flex-col ">
              <h2 className="text-slate-500">Member in {data.GroupName}</h2>
              <hr className="border-3 border-slate-900 mt-0 w-full" />
              {memberList.map((member) => {
                return (
                  <div
                    key={member.id}
                    className="px-1 mt-0 w-full h-auto text-2xl flex flex-row justify-between"
                  >
                    <div>{member.FirstName}</div>
                    <div
                      className="text-red-600"
                      onClick={() => handleDelete(member.id)}
                    >
                      {/* <ImCross /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
              <button
                className={
                  list.length !== 0
                    ? "bg-green-500 w-full h-8 font-bold text-center m-0  text-black"
                    : " w-full h-8 font-bold text-center m-0  text-white disabled:bg-slate-300"
                }
                disabled={list.length === 0}
                // flag

                // : "bg-slate-500 w-full h-8 font-bold text-center m-0  text-white"

                onClick={handleSubmit}
              >
                SAVE MEMBERS
              </button>
            </div>
            <div className="w-full mt-3 h-28 border-dotted border-red-600 border-4 p-2">
              <MyModal groupId={groupId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
