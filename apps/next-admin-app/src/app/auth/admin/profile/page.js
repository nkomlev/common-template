import { MainLayout } from "@premieroctet/next-admin"; // сайдбар next-admin
import { getMainLayoutProps } from "@premieroctet/next-admin/appRouter";
import options from "../../../../../nextAdminOptions";
import "../../../../../nextAdminCss.css";
import {getNextAdminUserData} from "@/lib/getNextAdminUserData";
import ProfileForm from "@/components/ProfileForm/ProfileForm";

const Page = async () => {
  const mainLayoutProps = getMainLayoutProps({
    basePath: "/auth/admin",
    apiBasePath: "/api/auth/admin",
    options: options,
  });

  return (
    <>
      <MainLayout
        {...mainLayoutProps}
        user={await getNextAdminUserData()}
      >
        <div className="flex justify-center lg:justify-start">
          <div className="w-[480px] flex flex-col gap-4 p-6">
            <ProfileForm />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Page