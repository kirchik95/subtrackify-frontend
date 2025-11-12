import { useEffect, useState } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { useAppDispatch } from '../../store/hooks';
import { getCommands } from './commands';

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const commands = getCommands();

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {commands.map((command) => {
            const Icon = command.icon;
            return (
              <CommandItem key={command.id} onSelect={() => command.onSelect(dispatch, setOpen)}>
                <Icon className="size-4" />
                {command.label}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
