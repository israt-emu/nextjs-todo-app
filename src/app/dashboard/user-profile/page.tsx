import {getUserFromToken} from "@/app/actions/cookie";
import UserProfile from "@/app/components/user-profile/Profile";
import {User} from "@/app/types/user";
import React from "react";

const ProfilePage = async () => {
  const user = await getUserFromToken();
  return (
    <div>
      <UserProfile user={user as User} />
    </div>
  );
};

export default ProfilePage;
