import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { RiAccountBoxFill } from "react-icons/ri";
import Input from "../common/input";
import { AuthContext } from "../hooks/context";
import { currentUserGroups } from "../services/groupService";

export default function Profile() {
  const { user } = useContext(AuthContext);
  // const [flag, setFlag] = useState(false);
  const [data, setDate] = useState({
    FirstName: user.FirstName,
    LastName: user.LastName,
    email: user.email,
    // password: user.password,
  });
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchGroup = async () => {
      const data = await currentUserGroups(user._id);
      setList(data);
    };
    //  console.log(list);
    //  console.log(user);
    fetchGroup();
  }, []);

  return (
    <div className="flex flex-col  place-items-center px-10 py-5 w-full h-screen">
      <div className="w-2/5 h-auto border-2 p-2">
        <div className="flex flex-row  justify-between items-center w-full">
          <div className="flex flex-row w-2/4">
            <h1 className="flex justify-center mr-3">
              <RiAccountBoxFill />
            </h1>
            <h2>My Profile</h2>
          </div>
          {/* <div>
          <h5
          className="bg-blue-300 border-4 border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white 
          hover:underline cursor-pointer font-light"
          onClick={handleEdit}
          >
          Edit
          </h5>
        </div> */}
        </div>
        <hr className="border-slate-900 border-3 w-full mt-0 mb-0" />
        <div className="flex flex-col py-2 w-full justify-between">
          <div className="flex flex-row bg-slate-100 m-1 p-1 justify-start">
            <h4>FirstName : </h4>
            <h4 className="font-light text-slate-500">{user.FirstName}</h4>
          </div>
          <div className="flex flex-row bg-slate-100 m-1 p-1 justify-start">
            <h4 className="">LastName : </h4>
            <h4 className="font-light text-slate-500">{user.LastName}</h4>
          </div>
          <div className="flex flex-row bg-slate-100 m-1 p-1 justify-start">
            <h4 className="">Email : </h4>
            <h4 className="font-light text-slate-500">{user.email}</h4>
          </div>
          <div className="flex flex-col bg-slate-100 m-1 p-1 justify-start">
            <h4 className="">Groups </h4>
            <hr className="border-2 mt-0 border-slate-600 w-full" />

            {list.map((group) => {
              return (
                <div className="text-2xl font-light p-1 ml-0" key={group._id}>
                   {group.GroupName}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
