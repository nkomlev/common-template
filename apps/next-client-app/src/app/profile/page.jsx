import MainTemplate from "@/components/template/MainTemplate";
import ProfileForm from "@/components/profileForm/ProfileForm";

const ProfilePage = () => {
  return (
    <MainTemplate>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[400px] h-fit p-6 bg-gray-600 rounded-xl flex flex-col gap-4">
          <ProfileForm />
        </div>
      </div>
    </MainTemplate>
  );
};

export default ProfilePage;