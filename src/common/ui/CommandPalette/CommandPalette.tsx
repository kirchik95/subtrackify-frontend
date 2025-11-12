import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

import { useAppDispatch } from '../../store/hooks';
import { getCommands } from './commands';

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const commandSections = getCommands();

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
        {commandSections.map((section, sectionIndex) => (
          <div key={section.heading}>
            <CommandGroup heading={section.heading}>
              {section.commands.map((command) => {
                const Icon = command.icon;
                return (
                  <CommandItem
                    key={command.id}
                    onSelect={() =>
                      command.onSelect({
                        dispatch,
                        setOpen,
                        navigate,
                      })
                    }
                  >
                    <Icon className="size-4" />
                    {command.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {sectionIndex < commandSections.length - 1 && <CommandSeparator />}
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  );
};
