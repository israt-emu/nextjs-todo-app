/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {Avatar} from "@/components/ui/avatar";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import avatarImg from "../../../assets/avatar.png";
import Image from "next/image";
import {User} from "@/app/types/user";
import {Textarea} from "@/components/ui/textarea";
import {useEffect, useState} from "react";
import {Camera} from "lucide-react";
import {toast} from "@/components/ui/use-toast";
import Spinner from "@/components/ui/Spinner";
import {updateUser} from "@/app/actions/user";
export default function UserProfile({user}: {user: User}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    profession: "",
    address: "",
    email: "",
    phone: "",
    bio: "",
  });
  useEffect(() => {
    setFormData({
      ...formData,
      name: user?.name,
      photo: user?.photo || "",
      profession: user?.profession || "",
      address: user?.address || "",
      email: user?.email,
      phone: user?.phone,
      bio: user?.bio || "",
    });
  }, [user]);
  //handling form data
  const handleFormData = (e: any) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageUpload = async (e: any) => {
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

      if (data?.success) {
        setFormData({
          ...formData,
          photo: data.data,
        });
        setLoading(false);
      } else {
        toast({
          variant: "destructive",
          title: "An Error Occured!",
        });
        setLoading(false);
      }
    };
  };
  const [profileLoading, setProfileLoading] = useState(false);
  const updateProfile = async () => {
    setProfileLoading(true);
    const res = await updateUser({userId: user.userId, ...formData} as User);
    setProfileLoading(false);
    if (res?.success) {
      toast({
        title: "Information saved!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "An error occured!",
      });
    }
  };
  return (
    <div className="grid w-11/12 lg:w-10/12 gap-4 mt-6 sm:mt-0 mx-auto lg:grid-cols-3 lg:gap-6 xl:gap-10 pb-5">
      <div className="space-y-4 lg:col-span-3">
        <div className="flex items-center space-x-4">
          <Avatar className="relative group w-24 h-24 border border-gray-300">
            <>
              {loading ? (
                <div className="w-full flex items-center justify-center mx-auto">
                  <Spinner color="border=primary" />
                </div>
              ) : (
                <Image src={formData?.photo || avatarImg} alt="avatar" width={100} height={100} className="" />
              )}
              {/* Overlay with camera emoji */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer mx-auto">
                <Camera className="text-gray-100" />
              </div>
              {/* Hidden file input */}
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} title="Upload Image" />
            </>
          </Avatar>
          <div className="space-y-1">
            <Input id="name" name="name" defaultValue={user?.name} className="border-0 outline-none focus:outline-none text-xl sm:text-2xl font-bold py-0 h-7" onChange={handleFormData} placeholder="Your Name" />
            <Input id="profession" name="profession" placeholder="Your Profession" defaultValue={user?.profession} className="border-0 outline-none focus:outline-none text-gray-500 dark:text-gray-400 h-6" onChange={handleFormData} />
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 w-10/12">{formData?.bio ? user?.bio : "--------- your bio ----------"}</p>
      </div>
      <div className="space-y-3 lg:col-span-2">
        <Card className="pt-4">
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={user?.email} readOnly className="text-gray-500" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue={user?.phone} onChange={handleFormData} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" defaultValue={user?.address} onChange={handleFormData} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" placeholder="Enter your bio" className="min-h-[100px]" onChange={handleFormData} defaultValue={user?.bio} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="h-8 flex items-center justify-center gap-1" onClick={updateProfile}>
              {profileLoading && <Spinner color="border-white" />}
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Activity</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="flex items-center space-x-4">
              <CalendarIcon className="w-6 h-6" />
              <div className="grid items-center grid-rows-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Scheduled a meeting</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4">
              <MessageCircleIcon className="w-6 h-6" />
              <div className="grid items-center grid-rows-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Sent a message</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">1 day ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div> */}
    </div>
  );
}
