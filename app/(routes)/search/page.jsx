"use client";
import Pin_map from "@/app/_components/global_comps/pin_map";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { isLoaded, user } = useUser();
  const [pins, setPins] = React.useState([]);
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [filter, setFilter] = React.useState("pins");
  const [users, setUsers] = React.useState([]);
  const [filled, setFilled] = React.useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/users?q=${q}`);

      if (response.ok) {
        const res = await response.json();
        setUsers(res.data);

        setFilled(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPins = async () => {
    try {
      const response = await fetch("/api/pin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const res = await response.json();

        const filteredByTitle = res.data.filter((pin) =>
          pin.title.toLowerCase().includes(q)
        );

        const filteredByKeyword = res.data.filter(
          (pin) =>
            pin.keywords &&
            pin.keywords.some((keyword) =>
              keyword.toLowerCase().includes(q.toLowerCase())
            )
        );

        const filteredByDescription = res.data.filter(
          (pin) =>
            pin.description &&
            pin.description.toLowerCase().includes(q.toLowerCase())
        );

        const filteredByUser = res.data.filter((pin) =>
          pin.user.username.toLowerCase().includes(q)
        );
        const filteredByfname = res.data.filter((pin) =>
          pin.user.firstName.toLowerCase().includes(q)
        );
        const filteredBylname = res.data.filter((pin) =>
          pin.user.lastName.toLowerCase().includes(q)
        );

        const combinedPins = [
          ...filteredByTitle,
          ...filteredByKeyword,
          ...filteredByDescription,
          ...filteredByUser,
          ...filteredByfname,
          ...filteredBylname,
        ];

        const uniquePins = Array.from(
          new Map(combinedPins.map((pin) => [pin._id, pin])).values()
        );

        setPins(uniquePins);
        setFilled(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPins();
  }, [q]);

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="p-5 mt-5">
      <div className="flex gap-5">
        <Card
          onClick={() => {
            setFilter("pins");
            fetchPins();
          }}
          className={`border-none cursor-pointer shadow-none ${
            filter == "pins" ? "bg-primary text-white" : "bg-muted"
          }`}
        >
          <CardContent className="h-[50px] flex gap-5 p-5 items-center justify-start">
            <h2>Pins</h2>
          </CardContent>
        </Card>
        <Card
          onClick={() => {
            setFilled(false);
            setFilter("users");
            fetchUsers();
          }}
          className={`cursor-pointer border-none shadow-none ${
            filter == "users" ? "bg-primary text-white" : "bg-muted"
          }`}
        >
          <CardContent className="h-[50px] flex gap-5 p-5 items-center justify-start">
            <h2>Users</h2>
          </CardContent>
        </Card>
      </div>
      {filter == "pins" && <Pin_map pins={pins} />}
      {filter == "users" && (
        <div className="p-10 mt-5 grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
          {filled ? (
            users?.map((user, index) => (
              <Link
                key={index}
                href={`/${user.username}/`}
                className="flex w-[300px] items-center gap-2"
              >
                <Avatar className="w-[60px] max-w-[60px] h-[60px]">
                  <AvatarImage
                    src={user.photo}
                    alt="profile picture"
                    className="object-cover rounded-full"
                    width={50}
                    height={50}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <h2 className="text-lg">{user.followersNum} followers</h2>
                </div>
              </Link>
            ))
          ) : (
            <Skeleton className="flex w-[300px] bg-muted items-center gap-2" />
          )}
        </div>
      )}
    </div>
  );
};

export default page;
