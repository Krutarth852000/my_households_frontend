import React from "react";
import { Disclosure } from "@headlessui/react";
import { useEffect } from "react";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiDeleteBack2Fill } from "react-icons/ri";
import {
  addToList,
  appendToList,
  deleteItem,
  getList,
} from "../services/shopListService";
import MyToggle from "./toogleSwitch";


export default function CreateList({ groupId }) {
  const [category, setCategory] = useState("");
  const [response, setResponse] = useState();
  const [item, setItem] = useState([]);
  const [list, setList] = useState({
    itemName: "",
  });
  useEffect(() => {
    const fetchList = async () => {
      const result = await getList(groupId);
      if (result) {
        setResponse(result);
      }
    };
    fetchList();
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ans = response.find((result) => {
      return result.category === category;
    });
    console.log(ans);
    if (ans) {
      const temp = ans.list.find((item) => {
        return item.itemName === list.itemName;
      });
      // console.log(temp);
      if (temp) {
        alert("item already exist please check");
        return;
      } else {
        const result = await appendToList({ list }, ans._id);
        if (result) {
          setItem(result.list);
        }
      }
    } else {
      const result = await addToList({
        category: category,
        groupId: groupId,
        list: list,
      });
      if (result) {
        console.log(result);
        setItem(result.list);
      }
    }
  };
  const handleDelete = async (itemId, listId) => {
    // console.log(itemId, listId);
    const result = await deleteItem(itemId, listId);
    if (result) {
      console.log(result);
      window.location.reload();
    }
  };

  return (
    <div className="w-4/5 flex flex-col h-auto">
      <div className="relative border w-full mb-3 border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label
          htmlFor="category"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <input
          className="block w-full border-0 p-0 px-1 text-gray-600 placeholder-gray-500 focus:ring-0 sm:text-md"
          type="text"
          id="category"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          placeholder="Enter Category"
        />
      </div>
      <div className="flex flex-row ">
        <div className="relative border w-full border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
          <label
            htmlFor="itemname"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            className="block w-full border-0 p-0 px-1 text-gray-600 placeholder-gray-500 focus:ring-0 sm:text-md"
            type="text"
            id="itemname"
            name="itemname"
            onChange={(e) => setList({ ...list, itemName: e.target.value })}
            value={list.itemName}
            placeholder="Item Name"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full h-auto flex justify-center py-1 rounded-lg bg-slate-300 text-white font-bold mt-3"
      >
        Add to List
      </button>
      {/* <div className="flex flex-col w-full h-auto mt-3 border-4 border-slate-400"> */}
      <div className="w-full pt-1">
        <div className="mx-auto w-full rounded-2xl bg-white py-2">
          {response &&
            Object.keys(response).map((item, i) => (
              <Disclosure key={i} as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-300 capitalize px-4 py-2 text-left text-sm font-medium text-black-900 hover:bg-blue-400 focus:outline-none focus-visible:ring focus-visible:ring-blue-600 focus-visible:ring-opacity-75">
                      <span className="text-xl">{response[item].category}</span>
                      <span className="text-2xl font-bold text-white">
                        <IoMdArrowDropdown
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-white`}
                        ></IoMdArrowDropdown>
                      </span>
                    </Disclosure.Button>

                    {response[item].list.map((list) => (
                      <Disclosure.Panel
                        key={list._id}
                        className="text-md py-1 px-4 mt-1 mb-1 rounded-lg bg-blue-100 text-gray-500 flex justify-between"
                      >
                        <div className="text-center flex ">
                          <div className="mr-2">
                            <MyToggle />
                          </div>
                          <span>{list.itemName}</span>
                        </div>
                        <div
                          className="py-1 text-xl text-red-500"
                          onClick={() =>
                            handleDelete(response[item]._id, list._id)
                          }
                        >
                          <RiDeleteBack2Fill />
                        </div>
                      </Disclosure.Panel>
                    ))}
                  </>
                )}
              </Disclosure>
            ))}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
