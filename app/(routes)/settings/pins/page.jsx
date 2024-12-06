"use client";
import React, { useEffect } from "react";
import SideNav from "../_components/sideNav";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Create from "../../user/[username]/created/_components/Create";

const page = () => {
  const [pins, setPins] = React.useState([]);
  const [filled, setFilled] = React.useState(false);
  const { isLoaded, user } = useUser();

  const fetchPins = async () => {
    setFilled(false);
    if (user) {
      const email = user.emailAddresses[0].emailAddress;

      try {
        const response = await fetch(`/api/pin?email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const res = await response.json();
          setPins(res.data);
          setFilled(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchPins();
  }, [user, isLoaded]);

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="flex flex-row gap-10 ">
      <SideNav page={"pins"} />
      <div className="gap-5 w-full columns-[300px] p-5">
        {filled &&
          pins &&
          pins.map((pin) => (
            <div className="m-5">
              <Create
                refresh={() => fetchPins()}
                _id={pin?._id}
                username={pin?.user.username}
                pretitle={pin?.title}
                prelink={pin?.link}
                predesc={pin?.description}
                prekeywords={pin?.keywords}
                preimage={pin?.image}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
