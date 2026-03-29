import { useEffect, useRef, useState } from 'react';

import { categoriesApi, SUBSCRIPTION_COLORS, type Category } from '@/common/api';
import { Check, Loader2, Pencil, Plus, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const COLORS = SUBSCRIPTION_COLORS;

interface InlineColorPickerProps {
  value: string | null;
  onChange: (color: string) => void;
}

function InlineColorPicker({ value, onChange }: InlineColorPickerProps) {
  return (
    <div className="flex items-center gap-1.5">
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={cn(
            'size-5 rounded-full shrink-0 flex items-center justify-center transition-transform hover:scale-110',
            value === color && 'ring-2 ring-offset-1 ring-foreground'
          )}
          style={{ backgroundColor: color }}
        >
          {value === color && <Check className="size-2.5 text-white" />}
        </button>
      ))}
    </div>
  );
}

export const CategoriesCard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState<string>(COLORS[0]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState<string>(COLORS[0]);
  const createInputRef = useRef<HTMLInputElement>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const triggerReload = () => setReloadKey((k) => k + 1);

  useEffect(() => {
    let cancelled = false;
    categoriesApi.getAll().then((res) => {
      if (cancelled) return;
      if (res.success && res.data) setCategories(res.data);
      setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      const res = await categoriesApi.create({ name: newName.trim(), color: newColor });
      if (res.success) {
        toast.success(`Category "${newName.trim()}" created`);
        setNewName('');
        setNewColor(COLORS[0]);
        setIsCreating(false);
        triggerReload();
      } else {
        toast.error(res.error || 'Failed to create category');
      }
    } catch {
      toast.error('Failed to create category');
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editName.trim()) return;
    try {
      const res = await categoriesApi.update(id, { name: editName.trim(), color: editColor });
      if (res.success) {
        toast.success('Category updated');
        setEditingId(null);
        triggerReload();
      } else {
        toast.error(res.error || 'Failed to update category');
      }
    } catch {
      toast.error('Failed to update category');
    }
  };

  const handleDelete = async (cat: Category) => {
    try {
      const res = await categoriesApi.delete(cat.id);
      if (res.success) {
        toast.success(`Category "${cat.name}" deleted`);
        triggerReload();
      } else {
        toast.error(res.error || 'Failed to delete category');
      }
    } catch {
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-border bg-background p-8 shadow-[0_4px_12px_#00000005]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Categories</h2>
        {!isCreating && (
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-lg px-3 text-sm"
            onClick={() => {
              setIsCreating(true);
              setTimeout(() => createInputRef.current?.focus(), 0);
            }}
          >
            <Plus className="mr-1.5 size-3.5" />
            Add
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {isCreating && (
            <div className="flex flex-col gap-3 rounded-xl border border-border p-3">
              <div className="flex items-center gap-2">
                <Input
                  ref={createInputRef}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Category name"
                  className="h-9 text-sm"
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
                  className="h-9 px-3"
                  onClick={handleCreate}
                  disabled={!newName.trim()}
                >
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-9 px-2"
                  onClick={() => {
                    setIsCreating(false);
                    setNewName('');
                  }}
                >
                  <X className="size-4" />
                </Button>
              </div>
              <InlineColorPicker value={newColor} onChange={setNewColor} />
            </div>
          )}

          {categories.length === 0 && !isCreating && (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No categories yet. Create one to organize your subscriptions.
            </p>
          )}

          {categories.map((cat) => (
            <div key={cat.id}>
              {editingId === cat.id ? (
                <div className="flex flex-col gap-3 rounded-xl border border-border p-3">
                  <div className="flex items-center gap-2">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-9 text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUpdate(cat.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      autoFocus
                    />
                    <Button
                      size="sm"
                      className="h-9 px-3"
                      onClick={() => handleUpdate(cat.id)}
                      disabled={!editName.trim()}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-9 px-2"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                  <InlineColorPicker value={editColor} onChange={setEditColor} />
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-3 shrink-0 rounded-full"
                      style={{ backgroundColor: cat.color || 'var(--muted-foreground)' }}
                    />
                    <span className="text-sm font-medium text-foreground">{cat.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {cat._count.subscriptions} sub{cat._count.subscriptions !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingId(cat.id);
                        setEditName(cat.name);
                        setEditColor(cat.color || COLORS[0]);
                      }}
                      className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat)}
                      className="rounded-md p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
