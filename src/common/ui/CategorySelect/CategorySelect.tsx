import { useEffect, useRef, useState } from 'react';

import { categoriesApi, type Category } from '@/common/api';
import { Check, ChevronsUpDown, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface CategorySelectProps {
  value: string; // categoryId as string, or ''
  onChange: (value: string) => void;
}

export const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const loadCategories = () => {
    categoriesApi.getAll().then((res) => {
      if (res.success && res.data) setCategories(res.data);
    });
  };

  useEffect(() => {
    if (open) loadCategories();
  }, [open]);

  const selectedCategory = categories.find((c) => String(c.id) === value);

  const handleCreate = async () => {
    if (!newName.trim()) return;

    try {
      const res = await categoriesApi.create({ name: newName.trim() });
      if (res.success && res.data) {
        onChange(String(res.data.id));
        setNewName('');
        setIsCreating(false);
        loadCategories();
        toast.success(`Category "${res.data.name}" created`);
      } else {
        toast.error(res.error || 'Failed to create category');
      }
    } catch {
      toast.error('Failed to create category');
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          <span className={cn(!selectedCategory && 'text-muted-foreground')}>
            {selectedCategory?.name || 'Select category'}
          </span>
          <div className="flex items-center gap-1">
            {value && (
              <X
                className="size-3.5 text-muted-foreground hover:text-foreground"
                onClick={handleClear}
              />
            )}
            <ChevronsUpDown className="size-3.5 text-muted-foreground" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <div className="flex flex-col">
          {categories.length > 0 && (
            <div className="max-h-[200px] overflow-y-auto p-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onChange(String(cat.id));
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                >
                  <Check
                    className={cn(
                      'size-3.5 shrink-0',
                      value === String(cat.id) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {cat.color && (
                    <div
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  )}
                  <span className="truncate">{cat.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {cat._count.subscriptions}
                  </span>
                </button>
              ))}
            </div>
          )}

          {categories.length === 0 && !isCreating && (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              No categories yet
            </div>
          )}

          <div className="border-t p-1">
            {isCreating ? (
              <div className="flex items-center gap-1 p-1">
                <Input
                  ref={inputRef}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Category name"
                  className="h-8 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreate();
                    if (e.key === 'Escape') {
                      setIsCreating(false);
                      setNewName('');
                    }
                  }}
                  autoFocus
                />
                <Button
                  size="sm"
                  className="h-8 px-2"
                  onClick={handleCreate}
                  disabled={!newName.trim()}
                >
                  Add
                </Button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsCreating(true);
                  setTimeout(() => inputRef.current?.focus(), 0);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Plus className="size-3.5" />
                Create new category
              </button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
