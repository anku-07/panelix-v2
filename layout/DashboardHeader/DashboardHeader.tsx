import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CommonInput from "@/ui/CommonInput/CommonInput";
import ManIcon from "@/ui/icons/ManIcon";
import NotificationIcon from "@/ui/icons/NotificationIcon";
import { logout } from "@/utils/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DashboardHeaderProps {
  title?: string;
}

function DashboardHeader({ title }: DashboardHeaderProps) {
  const router = useRouter();
  const handleLogout = () => {
    logout();
    toast.success("Logout successful!");
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-md border-b border-border px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* 1. Page Title */}
        <div className="flex-shrink-0">
          <h2 className="font-heading text-2xl font-bold text-foreground capitalize">
            {title}
          </h2>
        </div>

        {/* 3. Action Icons */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <Button className="p-2.5 w-[45px] h-[45px] rounded-xl bg-surface border border-border text-secondary hover:text-primary hover:border-primary transition-all relative">
            <NotificationIcon />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-surface"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p-2.5m w-[45px] h-[45px] rounded-xl bg-surface border border-border text-secondary hover:text-primary hover:border-primary transition-all">
                <ManIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
