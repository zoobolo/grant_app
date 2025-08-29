# UI Patterns & Design System

## Component Inventory

### Status Indicators

#### Phase Pills
Display the current phase of a grant application.

```tsx
<PhasePill phase="planning" />    // Gray background
<PhasePill phase="pre-app" />      // Blue background  
<PhasePill phase="submitted" />    // Purple background
```

#### Status Pills
Show the current status of grant processing.

```tsx
<StatusPill status="not-started" />        // Red
<StatusPill status="in-progress" />        // Yellow
<StatusPill status="documents-needed" />   // Orange
<StatusPill status="review" />             // Blue
<StatusPill status="address-comments" />   // Yellow
<StatusPill status="complete" />           // Green
```

#### Environmental Status
Indicate environmental review status.

```tsx
<EnvStatus status="complete" />     // Green
<EnvStatus status="in-progress" />  // Yellow
<EnvStatus status="not-started" />  // Red
<EnvStatus status="n/a" />          // Gray
```

### Data Display Components

#### Pipeline Table
Main spreadsheet view with sticky columns and filtering.

Features:
- Sticky LOCID and Airport columns
- Sortable headers
- Row selection
- Inline editing for notes
- Click-through to grant details

#### Filter Bar
Multi-criteria filtering component.

Filters:
- Fiscal Year (dropdown)
- LOCID (dropdown with search)
- State (dropdown)
- Phase (multi-select)
- Status (multi-select)
- Funding Type (multi-select)
- Environmental Status (dropdown)
- Program Manager (dropdown)
- Planner (dropdown)
- Text search (all fields)

### Form Components

#### Grant Number Input
Special input for grant numbers with TBD handling.

```tsx
<GrantNumberInput 
  prefix="3-45-0022"
  value="TBD"
  year="2025"
  onUpdate={(value) => handleUpdate(value)}
/>
```

#### Project Builder
Dynamic form for adding/editing projects.

Fields:
- Project Type (dropdown)
- Description (textarea)
- Cost (currency input)
- Order (drag handle for reordering)

#### Requirements Checklist
Interactive checklist with document attachments.

Features:
- Checkbox completion
- Comment field
- Document upload button
- Review status indicator
- PM addressed toggle

### Layout Components

#### Page Header
Consistent header across all pages.

```tsx
<PageHeader
  title="Grant Detail"
  backButton={true}
  backUrl="/pipeline"
  actions={[
    { label: "Save", onClick: handleSave },
    { label: "Delete", onClick: handleDelete, variant: "danger" }
  ]}
/>
```

#### Info Grid
Responsive grid for displaying grant metadata.

```tsx
<InfoGrid>
  <InfoField label="Fiscal Year" value="2025" />
  <InfoField label="Status" value={<StatusPill status="review" />} />
  <InfoField label="PM" value="R. Martinez" editable />
</InfoGrid>
```

### Interactive Patterns

#### Inline Editing
Double-click to edit pattern for table cells and fields.

States:
1. Display mode (default)
2. Hover state (highlight)
3. Edit mode (input field)
4. Saving state (spinner)
5. Success state (checkmark flash)

#### Modal Dialogs
Consistent modal pattern for confirmations and forms.

Types:
- Confirmation (Yes/No actions)
- Form Modal (Complex inputs)
- Info Modal (Read-only information)

#### Toast Notifications
Non-blocking feedback messages.

Variants:
- Success (green) - "Grant saved successfully"
- Error (red) - "Failed to update status"
- Warning (yellow) - "Unsaved changes"
- Info (blue) - "Document uploaded"

## Color System

### Primary Colors
- **Navy**: #1e3a5f (Headers, primary buttons)
- **Light Blue**: #4a9eff (Links, hover states)

### Status Colors
- **Red**: #fee2e2 (Not started, errors)
- **Yellow**: #fef3c7 (In progress, warnings)
- **Orange**: #fed7aa (Documents needed)
- **Blue**: #dbeafe (Review, info)
- **Green**: #d1fae5 (Complete, success)
- **Purple**: #e9d5ff (Submitted)
- **Gray**: #f3f4f6 (N/A, disabled)

### Neutral Colors
- **Text Primary**: #333333
- **Text Secondary**: #666666
- **Border**: #cccccc
- **Background**: #f5f5f5
- **White**: #ffffff

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

### Font Sizes
- **Heading 1**: 1.25rem (20px)
- **Heading 2**: 1rem (16px)
- **Body**: 0.875rem (14px)
- **Small**: 0.8125rem (13px)
- **Tiny**: 0.75rem (12px)

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600

## Spacing System

Base unit: 0.25rem (4px)

- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 0.75rem (12px)
- **lg**: 1rem (16px)
- **xl**: 1.5rem (24px)
- **2xl**: 2rem (32px)

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px)

/* Tablet */
@media (max-width: 1024px)

/* Desktop */
@media (min-width: 1025px)
```

## Accessibility Guidelines

### Keyboard Navigation
- All interactive elements accessible via Tab
- Escape key closes modals
- Enter key submits forms
- Arrow keys navigate tables

### ARIA Labels
- All form inputs have labels
- Status pills include screen reader text
- Loading states announced
- Error messages associated with inputs

### Color Contrast
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Don't rely solely on color for information

## Animation & Transitions

### Standard Timing
```css
transition: all 0.2s ease;
```

### Hover Effects
- Buttons: Slight background color change
- Links: Underline or color change
- Table rows: Background highlight

### Loading States
- Spinner for actions > 1 second
- Skeleton screens for initial loads
- Progress bars for multi-step processes

## Component States

### Button States
1. **Default**: Base appearance
2. **Hover**: Lighter background
3. **Active**: Darker background
4. **Disabled**: Gray, reduced opacity
5. **Loading**: Spinner icon

### Form Field States
1. **Default**: Gray border
2. **Focus**: Blue border
3. **Error**: Red border with message
4. **Disabled**: Gray background
5. **Success**: Green checkmark

### Table Row States
1. **Default**: White background
2. **Hover**: Light gray background
3. **Selected**: Light blue background
4. **Editing**: Yellow border

---
*Last Updated: 2025-08-29*