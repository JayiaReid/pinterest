"use client";
import { Button } from '@/components/ui/button';
import { DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { ChevronRight, LockIcon, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Save = ({ user, pin }) => {
    const [search, setSearch] = useState('');
    const [filteredBoards, setFilteredBoards] = useState(user?.boards || []);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const router = useRouter()

    useEffect(() => {
        if (search) {
            const filtered = user?.boards?.filter((board) =>
                board.title.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredBoards(filtered);
        } else {
            setFilteredBoards(user?.boards || []);
        }
    }, [search, user?.boards])

    const savePin = async (_id, title) => {
        try {
            const response = await fetch('/api/pin/save', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pin, _id })
            })

            if (response.ok) {
                router.push(`/user/${user?.username}/${title}`)
            }else{
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleBoardClick = (board) => {
        if (board.sections && board.sections.length > 0) {
            setSelectedBoard(board)
        } else {
            savePin(board._id, board.title)
        }
    };


    const handleBackClick = () => {
        setSelectedBoard(null)
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size={30}
                    className="bg-primary w-[70px] self-end text-white text-lg px-4 py-2 rounded-3xl shadow-none"
                >
                    Save
                </Button>
            </DialogTrigger>

            <DialogContent className="h-3/4 rounded-xl overflow-hidden">
                <div className="flex items-center mb-4">
                    {selectedBoard ? (
                        <div>
                            <ArrowLeft
                                size={24}
                                className="cursor-pointer"
                                onClick={() => handleBackClick()}
                            />
                            <h2 className="text-xl font-bold">Save Pin to</h2>
                        </div>
                    ) : (
                        <h2 className="text-xl font-bold">Save</h2>
                    )}
                </div>

                {!selectedBoard && (
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Search boards..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="shadow-none rounded-xl border-muted focus:outline-none"
                        />
                    </div>
                )}
                <ScrollArea className="h-[400px] overflow-y-auto">
                    {selectedBoard ? (
                        <div>
                            <h2 className='text-sm'>Board</h2>
                            <div onClick={()=>savePin(selectedBoard._id, selectedBoard.title)} key={selectedBoard._id} className="p-2 flex gap-2 items-center cursor-pointer">
                                <Image
                                    src={selectedBoard.cover}
                                    height={100}
                                    width={100}
                                    className="object-cover rounded-xl max-h-[100px]"
                                    alt={selectedBoard.title || 'Board Cover'}
                                />
                                <h2 className="font-medium">{selectedBoard.title}</h2>
                            </div>
                            <h2 className='text-sm'>Sections</h2>
                            {selectedBoard.sections.map((section) => (
                                <div key={section._id} onClick={()=>savePin(section._id, selectedBoard.title)} className="p-2 flex gap-2 items-center cursor-pointer">
                                    <Image
                                        src={section.images[0]}
                                        height={100}
                                        width={100}
                                        className="object-cover rounded-xl max-h-[100px]"
                                        alt={section.title || 'Board Cover'}
                                    />
                                    <h2 className="font-medium">{section.title}</h2>
                                </div>
                            ))}
                        </div>

                    ) : filteredBoards && filteredBoards.length > 0 ? (
                        filteredBoards.map((board) => (
                            <div
                                key={board._id}
                                onClick={() => handleBoardClick(board)}
                                className="flex items-center justify-between h-[100px] p-5 my-2 rounded-lg cursor-pointer"
                            >
                                <div className="flex gap-2 items-center">
                                    <Image
                                        src={board.cover}
                                        height={100}
                                        width={100}
                                        className="object-cover rounded-xl max-h-[100px]"
                                        alt={board.title || 'Board Cover'}
                                    />
                                    <h2 className="font-medium">{board.title}</h2>
                                </div>
                                <div className="flex gap-2">
                                    {board.private && <LockIcon size={20} strokeWidth={2.75} />}
                                    {board.sections.length > 0 && (
                                        <ChevronRight size={20} strokeWidth={2.75} />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-8">No boards found.</p>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default Save;
