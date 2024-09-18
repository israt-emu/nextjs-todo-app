/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import {toast} from "@/components/ui/use-toast";
import {ImageIcon, PaletteIcon, Smile} from "lucide-react";
import React, {useEffect, useState} from "react";
import {EmojiClickData} from "emoji-picker-react";
import Image from "next/image";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Color} from "@/app/types/color";
import {findColorById} from "@/app/actions/color";
//to avoid yjs conflict
import dynamic from "next/dynamic";
import {useNote} from "@/contexts/NoteContext";
import {NoteBannerProps} from "@/app/types/props";
const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  {ssr: false}
);

const NoteBanner = ({colors, singleNote}: NoteBannerProps) => {
  const [img, setImg] = useState(singleNote?.coverImg || "");
  const {note, setNote, loading, setLoading} = useNote();
  const [chosenEmoji, setChosenEmoji] = useState<string>(singleNote?.coverEmoji || "");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [color, setColor] = useState(singleNote?.color?.hexCode || "");
  const [colorId, setColorId] = useState(singleNote?.colorId !== 0 ? singleNote?.colorId : "");
  const [title, setTitle] = useState(singleNote?.title || "Untitled");
  //emoji click handle
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setChosenEmoji(emojiObject?.imageUrl);
    setShowEmojiPicker(false);
  };
  //uploading cover image
  const uploadFile = async (e: {target: {files: any[]}}) => {
    const file = e.target.files[0];
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result;

      const response = await fetch(`${process.env.NEXT_API_URL}/api/cloudinary`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({data: base64data}),
      });
      const data = await response.json();
      setLoading(false);
      if (data?.success) {
        setImg(data?.data);
      } else {
        toast({
          variant: "destructive",
          title: "An Error Occured!",
        });
      }
    };
  };
  //selecting note cover color
  const colorSelect = async (id: string) => {
    const res = await findColorById(Number(id));
    setColor((res as any)?.data?.hexCode);
    setColorId(id);
    setShowSelect(false);
  };
  //setting note data on context

  useEffect(() => {
    setNote({
      ...note,
      colorId: Number(colorId),
      coverEmoji: chosenEmoji as string,
      title,
      coverImg: img,
    });
  }, [colorId, chosenEmoji, img, title]);
  return (
    <>
      <div
        className="h-52 relative"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: `${color ? color : "#9C68B2"}`,
        }}
      >
        {chosenEmoji ? (
          <div className="absolute bottom-2 left-2 right-0 flex ">
            <Image src={chosenEmoji} alt="emoji" width={40} height={15} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="relative w-10/12 my-3 group">
        <div className={`flex items-center gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 ${showSelect && "opacity-100"}`}>
          <div className="relative">
            <Button className="bg-gray-300 dark:bg-[#404140] text-foreground flex items-center justify-center gap-1 px-3 py-1 hover:bg-gray-300 dark:hover:bg-[#404140]  text-sm" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <Smile className="w-5" /> <span className="hidden sm:inline-block ">Add Emoji</span>
            </Button>
            {/* Conditionally render the Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute top-full mt-2">
                <Picker onEmojiClick={(emoji: EmojiClickData) => onEmojiClick(emoji)} />
              </div>
            )}
          </div>

          <Button className="relative bg-gray-300 dark:bg-[#404140] text-foreground px-3 py-1 hover:bg-gray-300 dark:hover:bg-[#404140] text-sm">
            {/* Hidden file input */}
            <input
              type="file"
              id="cover-upload"
              accept="image/*"
              className="hidden"
              onChange={(e) => uploadFile(e as any)} // Handle file selection here
            />

            {/* Custom button that acts as a label */}
            <label htmlFor="cover-upload" className="cursor-pointer flex items-center justify-center gap-1 rounded ">
              <ImageIcon className="w-5" />
              <span className="hidden sm:inline-block"> Add Cover</span>
            </label>
          </Button>
          <div className="rounded bg-gray-300 dark:bg-[#404140] px-3">
            <Select onValueChange={(v) => colorSelect(v)} onOpenChange={() => setShowSelect(true)} defaultValue={colorId?.toString()}>
              <SelectTrigger id="color" className="bg-gray-300 text-foreground dark:bg-[#404140] border-0 outline-none flex items-center gap-x-1 p-0 m-0 h-8">
                <PaletteIcon className="w-5" />
                <SelectValue placeholder="Add Color" className="hidden sm:inline-block" />
              </SelectTrigger>
              <SelectContent className="bg-background flex items-center justify-center">
                {colors?.map((color: Color, i: number) => (
                  <SelectItem key={i} value={`${color.id}`}>
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border border-gray-900 `} style={{backgroundColor: color.hexCode}}></div>
                      <p className="capitalize ml-2">{color.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {loading && <Spinner color="border-primary" />}
          <Input placeholder="Untitled" className="border-0 outline-none focus:outline-none font-bold text-2xl md:text-4xl " defaultValue={title} onChange={(e) => setTitle(e.target.value)} />{" "}
        </div>
      </div>
    </>
  );
};

export default NoteBanner;
