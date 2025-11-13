import { Link } from 'react-router';

import { useAppDispatch, useAppSelector } from '@/common/store/hooks';
import { logout } from '@/features/auth/store/actions';
import { getUserSelector } from '@/features/auth/store/selectors';
import { LogOut, Settings, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserSelector);

  const handleLogout = () => {
    dispatch(logout());
  };

  const userInitials = user?.email ? user.email.split('@')[0].slice(0, 2).toUpperCase() : 'U';

  const userName = user?.email?.split('@')[0] || 'User Name';
  const userEmail = user?.email || 'user@example.com';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group outline-none focus:outline-none">
          <Avatar className="cursor-pointer size-9 transition-shadow duration-200 hover:shadow-sm group-data-[state=open]:shadow-sm">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
          <Link to="/profile" className="flex items-center gap-2 w-full">
            <User className="size-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
          <Link to="/settings" className="flex items-center gap-2 w-full">
            <Settings className="size-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          variant="destructive"
          className="cursor-pointer hover:bg-destructive/10 dark:hover:bg-destructive/20 hover:text-destructive"
        >
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
