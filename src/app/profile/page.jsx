import Profile from "@/app/profile/Profile";
import MainTemplate from "@/components/templates/MainTemplate";

const ProfilePage = () => {
  return (
    <MainTemplate>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[400px] h-fit p-6 bg-gray-600 rounded-xl flex flex-col gap-4">
          <Profile />
        </div>
      </div>
    </MainTemplate>
  );
};

export default ProfilePage;