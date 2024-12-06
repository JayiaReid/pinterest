"use client";
import Pin from "@/app/(routes)/pins/_components/Pin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import {
  Edit2,
  LoaderCircleIcon,
  MoreHorizontal,
  SlidersHorizontalIcon,
  Sparkles,
  SquareStack,
} from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Edit from "../_components/Edit";
import Reorganize from "../_components/reorganize";
import { toast } from "@/hooks/use-toast";

const page = () => {
  const [size, setSize] = React.useState(200);
  const [data, setData] = React.useState({});
  const { section } = useParams();
  const { board } = useParams();
  const { username } = useParams();
  const [reorderedPins, setReorderedPins] = React.useState([]);

  const { isLoaded, user } = useUser();

  const fetchData = async () => {
    if (user) {
      try {
        // change to matching username
        const response = await fetch(
          `/api/section?username=${username}&board=${board}&title=${section}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();

        if (res.success) {
          setData(res.data);
          setReorderedPins(res.data.pins);

          let numOfPins = res.data.pins.length;

          res.data.sections.forEach((section) => {
            if (section.pins.length > 0) {
              numOfPins += section.pins.length;
            }
          });
        }
      } catch (error) {}
    }
  };

  const handleReorder = async (pins) => {
    let array = [];

    pins.forEach((pin) => {
      array.push(pin._id);
    });
    try {
      const response = await fetch("/api/section/reorder", {
        method: "PUT",
        body: JSON.stringify({ pins: array, _id: data._id }),
      });
      if (response.ok) {
        setReorderedPins(array);
        fetchData();
      } else {
        const res = response.json();
        toast({
          title: "Error updating board",
          description: res.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchData();
    }
  }, [user, isLoaded]);

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center absolute h-screen bg-white w-screen top-0 left-0">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="flex flex-col items-center mt-10 gap-5">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          {data.board?.title}
        </h2>
        <div className="flex gap-2 items-center">
          <h2 className="text-4xl font-semibold text-foreground">
            {data?.title}
          </h2>
          <Edit board={data} type="section" title2={board} />
        </div>
      </div>
      <div className="flex">
        {data.pins && (
          <Reorganize
            _id={data._id}
            pins={data?.pins}
            setPins={setReorderedPins}
            onReorder={handleReorder}
          />
        )}

        {/* <Button variant="muted" size={30} className=" text-sm text-foreground p-5 rounded-3xl shadow-none flex flex-col gap-1"><Sparkles className='bg-muted hover:bg-[#E2E2E2] duration-300 p-6 rounded-2xl' size={80} strokeWidth={2.5} /> <span>More Ideas</span></Button> */}
        {/* <Button variant="muted" size={30} className=" text-sm text-foreground p-5 rounded-3xl shadow-none flex flex-col gap-1"><SquareStack className='bg-muted p-6 hover:bg-[#E2E2E2] duration-300 rounded-2xl' size={80} strokeWidth={2.5} /> <span>Organize</span></Button> */}
      </div>
      <div className="w-full p-5">
        <div className="flex p-5 justify-between items-center">
          <h2 className="font-semibold text-lg">{data.pins?.length} Pins</h2>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="muted"
                className=" rounded-full h-[60px] w-[60px] font-bold"
              >
                <SlidersHorizontalIcon size={30} strokeWidth={2.5} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-2xl p-2">
              <DropdownMenuLabel>
                <h2 className="text-xs font-light">View options</h2>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={`rounded-lg p-2 ${size ? null : "bg-muted"}`}
                onClick={() => setSize(null)}
              >
                <h2 className="font-medium text-medium">Default</h2>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`rounded-lg p-2 ${size ? "bg-muted" : null}`}
                onClick={() => setSize(200)}
              >
                <h2 className="font-medium text-medium">Compact</h2>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div></div>
        <div
          style={{ columnWidth: size ? `${size}px` : "250px" }}
          className={`${size ? "gap-2 p-2" : "gap-4 p-4"}`}
        >
          {reorderedPins.map((pin, index) => (
            <div className="p-5">
              <Pin
                size={size}
                key={index}
                className="rounded-2xl"
                pin={pin}
                id={index}
              />
              {/* <h2>Info</h2> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
