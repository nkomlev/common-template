'use client';
import { useStore } from "@/store/useStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown";
import { LogOutIcon, UserPenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeChanger from "@/components/themeChanger/ThemeChanger";

const Header = () => {
  const { currentCustomer, setCurrentCustomer } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    setCurrentCustomer({});
    router.replace('/logout');
  }

  return (
    <div className="h-[80px] w-full mx-auto p-4 absolute top-0 grid grid-cols-3">
      <div className="flex items-center justify-center font-bold">
          <Link href="/">
            На главную
          </Link>
        </div>
      <div></div>
      <div className="flex items-center justify-center gap-4">
        {
          currentCustomer.id ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={currentCustomer.profileImage} />
                    <AvatarFallback>{(`${currentCustomer.firstName[0]}${currentCustomer.lastName[0]}`).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="font-bold">
                      {currentCustomer.login}
                    </div>
                    <div>
                      Роли: {currentCustomer.role}
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mt-2">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem>
                    <UserPenIcon />
                    Профиль
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOutIcon/>
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : <Link href="/authorization"><Button>Войти</Button></Link>
        }
        <ThemeChanger />
      </div>
    </div>
  )
}

export default Header;