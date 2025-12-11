"use client";
import { useEffect, useState } from "react";

const UserList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => {
        setList(res);
      });
  }, []);
  return (
    <div className="flex flex-col gap-[5px]">
      {list?.map((user: any) => (
        <p key={user?.username}>{user.name}</p>
      ))}
    </div>
  );
};

export default UserList;
