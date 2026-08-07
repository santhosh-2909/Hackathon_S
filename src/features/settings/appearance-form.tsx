'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsHydrated } from '@/hooks/use-is-hydrated';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const THEMES = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
] as const;

function AppearanceForm() {
  const { theme, setTheme } = useTheme();
  const hydrated = useIsHydrated();
  const [reduceMotion, setReduceMotion] = React.useState(false);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            System follows your operating system setting and switches with it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={hydrated ? (theme ?? 'system') : 'system'}
            onValueChange={setTheme}
            className="grid gap-3 sm:grid-cols-3"
          >
            {THEMES.map((option) => {
              const selected = hydrated && (theme ?? 'system') === option.value;
              return (
                <div key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={`theme-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`theme-${option.value}`}
                    className={cn(
                      'flex cursor-pointer flex-col items-start gap-3 rounded-lg border border-border p-4',
                      'transition-colors hover:border-border-strong',
                      'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
                      selected && 'border-accent bg-accent-surface',
                    )}
                  >
                    <option.icon className="size-4 text-muted-foreground" aria-hidden />
                    <span className="font-medium">{option.label}</span>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Motion</CardTitle>
          <CardDescription>
            The product already respects your OS reduced-motion setting. This forces it on
            regardless.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="flex items-center justify-between gap-4 py-1">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="reduce-motion">Reduce motion</Label>
              <p className="text-caption text-muted-foreground">
                Disables scroll reveals and panel transitions.
              </p>
            </div>
            <Switch id="reduce-motion" checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
          <Separator className="my-4" />
          <p className="text-caption text-muted-foreground">
            Charts never animate on data change, in either setting — a moving bar is harder to read
            than a still one.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export { AppearanceForm };
