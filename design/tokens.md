# Subtrackify Design Tokens

Single source of truth for all visual values. Every Paper component and new
design must use values from this file.

## Colors

### Semantic Pairs

Each surface color has a matching foreground for guaranteed contrast (shadcn/ui convention).

| Token       | Background | Foreground | Usage                             |
| ----------- | ---------- | ---------- | --------------------------------- |
| Background  | `#FFFFFF`  | `#09090B`  | Page root                         |
| Card        | `#FFFFFF`  | `#09090B`  | Bento cards, modals               |
| Popover     | `#FFFFFF`  | `#09090B`  | Dropdowns, tooltips, toasts       |
| Primary     | `#18181B`  | `#FAFAFA`  | Primary buttons, CTA              |
| Secondary   | `#F4F4F5`  | `#18181B`  | Secondary buttons, subtle actions |
| Muted       | `#F4F4F5`  | `#71717A`  | Muted backgrounds, descriptions   |
| Accent      | `#F4F4F5`  | `#18181B`  | Hover states, active menu items   |
| Destructive | `#DC2626`  | `#FFFFFF`  | Danger buttons, error actions     |

### Utility

| Token       | Value     | Usage                                            |
| ----------- | --------- | ------------------------------------------------ |
| Border      | `#E4E4E7` | Borders, dividers, card outlines                 |
| Input       | `#E4E4E7` | Input field borders (separate token from border) |
| Ring        | `#A1A1AA` | Focus ring for accessibility                     |
| Placeholder | `#A1A1AA` | Input placeholders, disabled text                |

### Extended

| Token   | Value     | Usage                                    |
| ------- | --------- | ---------------------------------------- |
| Page BG | `#FCFCFC` | App page background (slightly off-white) |
| Surface | `#F4F4F5` | Hover backgrounds, skeleton fills        |

### Danger

| Token         | Value     | Usage                          |
| ------------- | --------- | ------------------------------ |
| Danger        | `#DC2626` | Error borders, danger buttons  |
| Danger Dark   | `#991B1B` | Danger zone text               |
| Danger BG     | `#FEF2F2` | Error input bg, danger card bg |
| Danger Border | `#FECACA` | Danger card border             |

### Success

| Token      | Value     | Usage                                    |
| ---------- | --------- | ---------------------------------------- |
| Success    | `#16A34A` | Toast icon circle, success accents       |
| Success BG | `#DCFCE7` | Success banner background, inline alerts |

### Warning

| Token      | Value     | Usage                                    |
| ---------- | --------- | ---------------------------------------- |
| Warning    | `#F59E0B` | Toast icon circle, warning accents       |
| Warning BG | `#FEF3C7` | Warning banner background, inline alerts |

### Information

| Token   | Value     | Usage                                 |
| ------- | --------- | ------------------------------------- |
| Info    | `#3B82F6` | Toast icon circle, info accents       |
| Info BG | `#DBEAFE` | Info banner background, inline alerts |

### Chart Palette

| Token   | Value     | Usage                            |
| ------- | --------- | -------------------------------- |
| Chart 1 | `#F54900` | Primary data series (orange-red) |
| Chart 2 | `#009689` | Secondary data series (teal)     |
| Chart 3 | `#104E64` | Tertiary data series (dark blue) |
| Chart 4 | `#FFB900` | Quaternary data series (gold)    |
| Chart 5 | `#FE9A00` | Quinary data series (amber)      |

## Border Radius

| Token | Value  | Usage                                |
| ----- | ------ | ------------------------------------ |
| xs    | `8px`  | Menu items, badges, tags, tooltip    |
| sm    | `12px` | Inputs, buttons, popups, small cards |
| md    | `16px` | Dropdown containers, popup cards     |
| lg    | `24px` | Bento cards, auth panels, modals     |
| full  | `50%`  | Avatars, circular elements           |

## Typography

Font family: `'Inter', system-ui, sans-serif`

| Role            | Size   | Weight | Line Height | Extras                    |
| --------------- | ------ | ------ | ----------- | ------------------------- |
| Page title      | `32px` | 600    | `40px`      | `letter-spacing: -0.02em` |
| Card title      | `18px` | 600    | `22px`      |                           |
| Body / Input    | `14px` | 400    | `18px`      |                           |
| Label           | `14px` | 500    | `18px`      |                           |
| Small / Caption | `13px` | 400    | `16px`      |                           |
| Tiny            | `12px` | 400    | `16px`      | Use sparingly             |
| Logo            | `18px` | 600    | `22px`      |                           |
| Auth heading    | `32px` | 600    | `40px`      | `letter-spacing: -0.02em` |
| Auth subheading | `15px` | 400    | `18px`      |                           |

## Spacing

| Token        | Value     | Usage                                  |
| ------------ | --------- | -------------------------------------- |
| Element      | `8px`     | Between label and input, icon and text |
| Group        | `20px`    | Between form rows, related items       |
| Section      | `24-28px` | Between card sections                  |
| Card gap     | `24px`    | Between bento cards in a row           |
| Card padding | `32px`    | Inside bento cards                     |
| Page padding | `40px`    | Content area padding                   |
| Auth wrapper | `24px`    | Auth page outer padding and gap        |

## Shadows

| Token | Value                     | Usage             |
| ----- | ------------------------- | ----------------- |
| Card  | `#00000005 0px 4px 12px`  | Bento cards       |
| Popup | `#00000014 0px 8px 24px`  | Dropdowns, toasts |
| Modal | `#00000033 0px 16px 48px` | Modal dialogs     |

## Component Specs

### Input

```
border: 1px solid #E4E4E7
border-radius: 12px
padding: 12px 16px
font-size: 14px
color: #09090B (filled) / #A1A1AA (placeholder)
```

Error variant: `border: 2px solid #DC2626; background: #FEF2F2`

### Button

| Variant | Background | Color     | Border              |
| ------- | ---------- | --------- | ------------------- |
| Primary | `#18181B`  | `#FAFAFA` | none                |
| Outline | `#FFFFFF`  | `#18181B` | `1px solid #E4E4E7` |
| Danger  | `#DC2626`  | `#FFFFFF` | none                |

```
border-radius: 12px
padding: 10px 16px
font-size: 14px
font-weight: 500
```

Auth submit variant: `width: 100%; padding: 14px; border-radius: 12px`

### Card (Bento)

```
background: #FFFFFF
border: 1px solid #E4E4E7
border-radius: 24px
padding: 32px
box-shadow: #00000005 0px 4px 12px
```

### Modal

```
background: #FFFFFF
border-radius: 24px
padding: 32px
box-shadow: #00000033 0px 16px 48px
```

Overlay: `background: #00000066`

### AlertDialog

Compact confirmation dialog (smaller than full Modal).

```
background: #FFFFFF
border-radius: 24px
padding: 24px
box-shadow: #00000033 0px 16px 48px
```

Overlay: `background: #00000066`

### Header

```
height: 80px
padding: 24px 40px
background: #FFFFFF
border-bottom: 1px solid #E4E4E7
```

### Toast

```
background: #FFFFFF
border: 1px solid #E4E4E7
border-radius: 12px
padding: 14px 20px
box-shadow: #00000014 0px 8px 24px
font-size: 14px
font-weight: 500
color: #09090B
```

Icon circle: `width: 20px; height: 20px; border-radius: 50%; background: #16A34A`
Checkmark: `stroke: #FFFFFF`

## Artboard Defaults

| Context     | Size           | Background |
| ----------- | -------------- | ---------- |
| Desktop app | `1440 × 900px` | `#FCFCFC`  |
| Auth        | `1440 × 900px` | `#F4F4F5`  |
