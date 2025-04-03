import MainTemplate from "@/components/template/MainTemplate";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import PushNotificationManager from "@/components/pwa/PushNotificationManager";

const PWA = () => {
  return(
    <MainTemplate>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <PushNotificationManager />
        <InstallPrompt />
      </div>
    </MainTemplate>
  );
};

export default PWA;