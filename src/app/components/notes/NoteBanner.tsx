"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import {toast} from "@/components/ui/use-toast";
import {ImageIcon, PaletteIcon, Smile} from "lucide-react";
import React, {MouseEvent, useState} from "react";
import Picker, {EmojiClickData} from "emoji-picker-react";
import Image from "next/image";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Color} from "@/app/types/color";
import {findColorById} from "@/app/actions/color";

const NoteBanner = ({colors}: {colors: Color[]}) => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [color, setColor] = useState("");
  const [colorId, setColorId] = useState("");
  const onEmojiClick = (event: MouseEvent, emojiObject: EmojiClickData) => {
    setChosenEmoji(emojiObject);
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

      const response = await fetch("http://localhost:3000/api/cloudinary", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({data: base64data}),
      });
      const data = await response.json();
      setLoading(false);
      if (data?.success) {
        toast({
          title: "Image uploaded Successfully!",
        });

        setImg(data?.data);
      } else {
        toast({
          variant: "destructive",
          title: "An Error Occured!",
        });
      }
    };
  };
  //
  const colorSelect = async (id: string) => {
    console.log(id);
    const res = await findColorById(Number(id));
    console.log(res);
    setColor((res as any)?.hexCode);
    setColorId(id);
  };
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
        {(chosenEmoji as any)?.target ? (
          <div className="absolute bottom-2 left-2 right-0 flex ">
            <Image src={(chosenEmoji as any)?.target?.src} alt="emoji" width={40} height={15} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="relative w-10/12 my-3 group">
        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="relative">
            <Button className="bg-gray-300 text-gray-900 flex items-center justify-center gap-1 px-3 py-1 hover:bg-gray-300 text-sm" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <Smile className="w-5" /> Add Emoji
            </Button>
            {/* Conditionally render the Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute top-full mt-2">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          <Button className="relative bg-gray-300 text-gray-900 px-3 py-1 hover:bg-gray-300 text-sm">
            {/* Hidden file input */}
            <input
              type="file"
              id="cover-upload"
              accept="image/*"
              className="hidden"
              onChange={(e) => uploadFile(e as any)} // Handle file selection here
            />

            {/* Custom button that acts as a label */}
            <label htmlFor="cover-upload" className="cursor-pointer flex items-center justify-center gap-1 rounded text-sm ">
              <ImageIcon className="w-5" />
              Add Cover
            </label>
          </Button>
          <Button className="border-0 outline-none focus:outline-none bg-gray-300 hover:bg-gray-300 px-3 py-0 ">
            <Select onValueChange={(v) => colorSelect(v)}>
              <SelectTrigger id="color" className="bg-gray-300 text-gray-900 border-0 outline-none flex items-center gap-x-1 p-0 m-0 h-8">
                <PaletteIcon className="w-5" />
                <SelectValue placeholder="Add Color" />
              </SelectTrigger>
              <SelectContent className="bg-background flex items-center justify-center">
                {colors?.map((color: Color, i: number) => (
                  <SelectItem key={i} value={`${color.id}`}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full border border-gray-900 `} style={{backgroundColor: color.hexCode}}></div>
                      <p className="capitalize ml-2">{color.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {loading && <Spinner color="border-purple-600" />}
          <Input placeholder="Untitled" className="border-0 outline-none focus:outline-none font-bold text-4xl " defaultValue="Untitled" />{" "}
        </div>
      </div>
    </>
  );
};

export default NoteBanner;
