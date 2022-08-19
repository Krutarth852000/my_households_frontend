import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../hooks/context";
import { findUserByEmail } from "../services/userServise";
import { useNavigate } from "react-router-dom";
import { addGroup } from "../services/groupService";

export default function NewGroup({}) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [foundUser, setFoundUser] = useState(false);
  const [searchedUser, setSearchedUser] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [memberList, setMemberList] = useState([
    {
      FirstName: user.FirstName,
      email: user.email,
      id: user._id,
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addGroup({
      GroupName: name,
      MemberList: memberList,
    });
    navigate("/");
  };

  const handleSearch = async (e) => {
    console.log(email);
    e.preventDefault();
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

  const handleAddMember = (e) => {
    e.preventDefault();
    if (memberList.length === 5) {
      console.log("Maximum 5 members are allowed in the group", "warning");
      return;
    }
    if (memberList.find((member) => member.email === searchedUser.email)) {
      console.log("Member already added", "error");

      setEmail("");
    } else {
      setMemberList([...memberList, searchedUser]);
      setEmail("");
    }
    setSearchedUser({});
    setFoundUser(false);
    return;
  };

  const handleDelete = (memberId) => {
    const tempMembers = memberList.filter((member) => member.id != memberId);
    setMemberList(tempMembers);
  };

  return (
    <div className="flex flex-col place-items-center space-y-10 mt-4 h-screen">
      <div className="flex flex-col w-5/6 justify-center align-center h-auto">
        <h1 className="flex justify-center place-items-center">
          Create New Group
        </h1>
        <div className="flex flex-col justify-between ">
          <form className="space-y-3 py-3 w-full">
            <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="GroupName"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-sm font-medium text-gray-700"
              >
                GroupName
              </label>
              <div className="mt-1">
                <input
                  placeholder="Enter Group Name"
                  id="GroupName"
                  name="GroupName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  className="block w-full border-0 p-0 text-gray-600 placeholder-gray-500 focus:ring-0 sm:text-md"
                />
              </div>
            </div>
            <div className="flex flex-row w-full space-x-2">
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
                    className="block w-full border-0 p-0 text-gray-600 placeholder-gray-500 focus:ring-0 sm:text-md"
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
            {foundUser && (
              <div className="text-green-800">
                whould you like to add this member to the group?
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleSubmit}
              >
                Create Group
              </button>
            </div>
          </form>
          <div className="flex flex-col text-center p-1 place-items-center h-auto w-full text-2xl border-2">
            Member List
            <hr className="border-black w-full mt-0" />
            {memberList.map((member) => {
              return (
                <div
                  key={member.id}
                  className="px-1 mt-0 w-full h-auto flex flex-row justify-between"
                >
                  <div>{member.FirstName}</div>
                  <div
                    className=" text-red-600"
                    onClick={() => handleDelete(member.id)}
                  >
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
          </div>
        </div>
      </div>
    </div>
  );
}
