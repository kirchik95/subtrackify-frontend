import { Link, useLocation } from 'react-router';

import { useAppDispatch, useAppSelector } from '@/common/store/hooks';
import { logout } from '@/features/auth/store/actions';
import { getUserSelector } from '@/features/auth/store/selectors';
import { LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserSelector);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@example.com';

  const isProfileActive = location.pathname === '/profile';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group outline-none focus:outline-none">
          <Avatar className="size-10 cursor-pointer transition-shadow duration-200 hover:shadow-sm group-data-[state=open]:shadow-sm">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-muted font-medium text-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-60 rounded-2xl p-0 shadow-[0_8px_24px_#00000014]"
      >
        <div className="flex items-center gap-3 px-5 py-4">
          <Avatar className="size-9 shrink-0">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-muted text-[13px] font-semibold text-muted-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold leading-[18px] text-foreground">{userName}</p>
            <p className="text-xs leading-4 text-muted-foreground">{userEmail}</p>
          </div>
        </div>

        <DropdownMenuSeparator className="mx-0 my-0" />

        <div className="p-2">
          <DropdownMenuItem
            asChild
            className={`rounded-lg px-3 py-2.5 gap-2.5 ${isProfileActive ? 'bg-accent' : ''}`}
          >
            <Link to="/profile">
              <User className="size-4" />
              Profile
            </Link>
          </DropdownMenuItem>
        </div>

        <div className="px-2 pb-2">
          <DropdownMenuItem
            onClick={handleLogout}
            variant="destructive"
            className="rounded-lg px-3 py-2.5 gap-2.5"
          >
            <LogOut className="size-4" />
            Log Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
