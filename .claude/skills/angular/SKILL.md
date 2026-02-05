---
name: angular
description: Instructions for writing UI frontend code, HTML and CSS
---

<!-- general-agent/1 -->
# General agent
## Command Safety Instructions

### CRITICAL: Command Generation Rules

You MUST follow these rules when generating or executing any shell commands:

#### Path Validation
- NEVER generate paths containing shell metacharacters: `| & ; < > ( ) $ \` " '`
- If a path contains these characters, it's malformed - regenerate it properly
- All paths must be absolute and start with `/home/dan/dev/sysprompthub/analysis/`
- Example of INVALID path: `/dev/null | tail -5 || echo` (contains pipes and logic operators)
- Example of VALID path: `/home/dan/dev/sysprompthub/analysis/test-css2/src/app.component.ts`

#### Command Construction
- Build commands as complete, syntactically valid statements
- NEVER create command fragments that mix paths with operators
- Use proper quoting for all arguments
- Validate command syntax before execution

#### Safe Command Patterns
```bash
## ✅ CORRECT: Separate operations clearly
find . -type f -name "*.ts" > file_list.txt
cat file_list.txt | head -5
echo "Found files" || echo "No files found"

## ❌ WRONG: Mixed operators in paths
find . -type f > /dev/null | tail -5 || echo

## ✅ CORRECT: Proper error handling
command 2>/dev/null && echo "success" || echo "failed"

## ❌ WRONG: Malformed command fragments
command > /dev/null | tail -5 || echo
```

#### Pre-execution Validation
Before running ANY command:
1. Check that all paths are properly formed filesystem paths
2. Verify no shell operators appear inside file paths
3. Ensure the command is complete and syntactically correct
4. If validation fails, ask for help rather than executing malformed commands

#### Error Response Protocol
If you catch yourself generating a malformed command:
1. STOP immediately
2. Acknowledge the error: "I generated a malformed command"
3. Explain what went wrong
4. Provide the corrected version
5. Never attempt to execute malformed commands

### File Access Rules
- Only access files within allowed workspace directories
- Treat any path with shell metacharacters as potentially malformed
- When in doubt, use absolute paths and proper validation


<!-- general-coding/2 -->
# General coding
## General Coding Requirements

You are an AI coding agent producing code for professional software projects. Follow the explicit rules below on every generated change, snippet, or file. Produce minimal, correct, well-tested, and well-documented code suitable for immediate review and integration.

---

### Core principles
- Make only the minimal changes needed to implement the request.
- **No magic numbers**: NEVER hardcode numbers or strings; define constants at source of truth and reference everywhere (code, tests, migrations, validations, error messages).
- Never break code that already works; preserve backward compatibility unless the change is an explicit breaking change and documented.
- Prefer clarity and correctness over cleverness.
- Treat tests, documentation, and readability as first-class deliverables.
- Assume the reader is a competent engineer who is unfamiliar with the current code path.

---

### Change and commit behavior
- Limit diffs to the smallest, well-scoped set of files necessary.
- Use clear commit-level intent: one logical change per commit with a concise commit message summarizing purpose and impact.
- Add a short migration or upgrade note when public APIs or behavior change.
- Avoid mass reformatting or whitespace-only changes in the same commit as functional changes.

---

### Code quality and style
- **No magic numbers or strings**: Define constants with descriptive names; use in all code, tests, validations, migrations, and error messages.
- Follow project existing style and lint rules; prefer no new style exceptions.
- Use expressive names for variables, functions, classes, and tests.
- Keep functions and methods short and focused; prefer single responsibility.
- Prefer composition over inheritance unless a clear polymorphic model applies.
- Use immutable patterns or readonly qualifiers where appropriate.
- Validate and sanitize inputs at public boundaries.
- Always obey formatting rules defined in `.editorconfig` or equivalent.

#### Magic Numbers Example

```
## ❌ BAD - Hardcoded everywhere
if user.api_keys.count >= 2
validates :key, length: { is: 40 }
create_table :api_keys { t.string :key, limit: 40 }

## ✅ GOOD - Constants defined once, used everywhere
class ApiKey
  MAX_KEYS_PER_USER = 2
  KEY_LENGTH = 40

  validates :key, length: { is: KEY_LENGTH }
end

## In migration
t.string :key, limit: ApiKey::KEY_LENGTH

## In code
if user.api_keys.count >= ApiKey::MAX_KEYS_PER_USER
```

---

### Minimal and safe edits
- Change only what the request requires; do not add unrelated refactors.
- When refactoring is necessary to implement the request, include a concise rationale and tests demonstrating no behavioral regression.
- If a requested change risks subtle breakage, add a feature flag or opt-in mechanism instead of immediate global replacement.

---

### Documentation and comments
- Write or update documentation for all new classes, functions, types, and configuration options.
- Add inline comments for any logic that is not obvious to a new reader explaining the why, not the what.
- Include short examples in docs demonstrating typical usage and edge cases.
- Update README or developer onboarding docs when the change affects build, test, or run instructions.

---

### Tests and verification
- Write unit tests for all new logic and for edge cases introduced by changes.
- Add integration or end-to-end tests when the change affects system behavior or UX flows.
- Ensure tests run deterministically and do not rely on external services; mock external dependencies in tests.
- Keep test fixtures minimal and realistic; avoid long, brittle golden files unless necessary.
- Run lint, type checks, and the full test suite locally before suggesting changes.

---

### API design and compatibility
- Design public APIs to be explicit, minimal, and versionable.
- Prefer stable surface area; deprecate before removing, with clear migration guidance.
- Use semantic versioning for libraries and annotate breaking changes in changelogs.
- Document performance characteristics and complexity for non-trivial public methods.

---

### Security and privacy
- Validate and escape all external input and outputs.
- Avoid logging sensitive data; mask or redact secrets and PII.
- Follow least privilege principles for data access and credentials.
- Treat dependencies with scrutiny; prefer vetted, well-maintained packages and pin versions.

---

### Performance and resource usage
- Measure before optimizing; use benchmarks or traces to justify nontrivial changes.
- Prefer clear algorithms with acceptable complexity over micro-optimizations that reduce readability.
- Release resources promptly and avoid unnecessary memory retention or high-frequency synchronous blocking.

---

### Error handling and observability
- Fail fast on programming errors and recover gracefully on expected runtime errors.
- Return clear, actionable error messages and typed error objects where applicable.
- Add or update logs and metrics for new behavior and important failure modes.
- Ensure logs include contextual identifiers useful for troubleshooting without leaking sensitive data.

---

### Maintainability and future-proofing
- Keep public surface minimal and well-documented to reduce cognitive load on future maintainers.
- Favor explicit contracts and runtime guards for critical boundaries.
- Add migration notes and deprecation paths for planned obsolescence.
- Keep TODOs as actionable items with owners and dates; avoid vague or permanent TODOs.

---

### Acceptance checklist for generated code
- Changes limited to minimal necessary files and lines.
- All new public code documented with examples.
- Inline comments exist for non-obvious logic explaining the why.
- Unit tests cover new code and edge cases; integration tests added when required.
- Linting and type checks pass.
- No existing behavior is broken; if breaking, changelog and migration notes included.


<!-- nodejs-coding/1 -->
# Nodejs coding
## Node.js Development Standards

### Core Rules

- **Target**: Node.js 18+ LTS
- **Package manager**: Use ONE consistently - check lock file first
- **Error handling**: Async/await with try/catch; handle unhandled rejections
- **Config**: Environment variables via dotenv; never hardcode secrets
- **Logging**: Structured logging (pino, winston); no console.log in production
- **Shutdown**: Handle SIGTERM/SIGINT for graceful shutdown
- **Dependencies**: Pin versions, minimize count, audit regularly

### Package Manager Consistency

```bash
## ❌ NEVER mix managers
npm install && pnpm test  # Creates conflicting lock files!

## ✅ Check which is in use
ls -la | grep -E "(package-lock|pnpm-lock|yarn.lock)"

## Use matching commands
pnpm install && pnpm test  # if pnpm-lock.yaml
npm install && npm test    # if package-lock.json
```

### Optional Dependencies

```bash
## .npmrc or .pnpmrc
optional=false

## Optional deps are platform-specific (fsevents, esbuild)
## Projects should work without them using fallbacks
```

### Error Handling

```typescript
// ✅ Global handlers
process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'Unhandled rejection');
  process.exit(1);
});

// ✅ Async/await with specific errors
async function load(path: string): Promise<Data> {
  try {
    const content = await fs.readFile(path, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${path}`);
    }
    throw error;
  }
}
```

### Environment Config

```typescript
// ✅ Type-safe env validation
function getEnv() {
  const { DATABASE_URL, API_KEY } = process.env;
  if (!DATABASE_URL) throw new Error('DATABASE_URL required');
  if (!API_KEY) throw new Error('API_KEY required');
  return { DATABASE_URL, API_KEY };
}

// Provide .env.example
```

### Graceful Shutdown

```typescript
async function shutdown(signal: string) {
  logger.info({ signal }, 'Shutting down');
  await server.close();
  await database.disconnect();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
```

### Package.json

```json
{
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "bin": { "cli": "./dist/cli.js" },
  "files": ["dist"],
  "engines": { "node": ">=18.0.0" },
  "scripts": {
    "prepublishOnly": "npm run build && npm test"
  }
}
```

### Semantic Versioning

- **Major**: Breaking changes (constructor changes, required params)
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

```json
// Local testing
{ "dependencies": { "my-sdk": "file:../my-sdk" } }
```


<!-- typescript-coding/1 -->
# Typescript coding
## TypeScript Coding Standards

### Core Rules

- **Strict mode**: `"strict": true` in tsconfig.json
- **No `any`**: Use `unknown` for truly unknown types, generics for reusable code
- **Explicit types**: Type all function parameters and return values
- **Readonly**: Use for immutable properties and arrays
- **Null safety**: Use optional chaining (`?.`) and nullish coalescing (`??`)

### Type Safety

```typescript
// ✅ Type parameters and returns
function process(items: Item[]): Result { ... }

// ✅ Type guards
function isUser(data: unknown): data is User {
  return typeof data === 'object' && data !== null && 'id' in data;
}
```

### Union Types

```typescript
// ✅ Discriminated unions
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// ✅ Filter with type assertions
const valid = items.filter((x): x is Item => x !== null);
```

### Const Assertions

```typescript
// ✅ Literal types
const STATUSES = ['active', 'pending'] as const;
type Status = typeof STATUSES[number];

// ✅ Readonly config
const CONFIG = { timeout: 5000 } as const;
```

### Error Handling

```typescript
// ✅ Custom errors
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ✅ Early return after process.exit()
if (!config) {
  process.exit(1);
  return; // TypeScript needs this
}
```

### TSConfig Essentials

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Versioning

Breaking changes require major version bump:
- Constructor signature changes
- Required parameters added
- Public API changes


<!-- angular-19-coding/1 -->
# Angular-19 coding
## Purpose

Provide an unambiguous source of truth for generating Angular 19 components, services, styles, and tests that:

- Use Angular 19 reactive APIs and template sugar.
- Are decomposed into small, reusable, standalone components.
- Follow Angular style, security, accessibility, and runtime-performance best practices.
- Include examples of input transformers to map raw attributes to typed runtime values.

---

## Scope

This guideline covers:

- Component and service patterns
- Reactive state and public APIs
- Template sugar usage (`@if`, `@for`, `@bind`, `@let`, `@trackBy`)
- Dependency injection with `inject()`
- Input transformers (`booleanAttribute`, enum→map)
- Global design tokens and utility classes
- File and folder naming conventions
- Minimal component-specific styles and test scaffolding
- Acceptance checklist for automated validation

---

## Quick Rules Summary

- **Angular version**: Target Angular 19 APIs and template sugar.
- **DI**: Use `inject()` only; do not use constructor injection.
- **Reactive state**: Use `signal()` and `computed()`; expose public props with `input()` and `output()`.
- **Templates**: Use `@if`, `@for`, `@bind`, `@let`, `@trackBy`.
- **Components**: Standalone, `ChangeDetectionStrategy.OnPush`, single responsibility, **TS + template ≤ 200 lines**.
- **Styling**: Global tokens in `src/styles.*`; component styles only when necessary and in separate files.
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard focus management.
- **Security**: Avoid `bypassSecurityTrust*`; sanitize inputs; enable XSRF protection.
- **Performance**: Use `trackBy`, lazy loading, signals/computed to minimize change detection
- **Browser**: Make sure each page sets an appropriate title. Use route data for pages that have a fixed title..

---

## File and Folder Patterns

- **Naming**: `kebab-case` files, `PascalCase` classes.
- **Component layout**:
  ```
  my-widget/
    my-widget.component.ts
    my-widget.component.html
    my-widget.component.spec.ts
  ```
- **Shared tokens**: `src/styles/tokens.css` and `src/styles/utilities.css`.
- **Design system**: `src/app/design-system/` for shared components and tokens.
- **Tests**: Each component has a `.spec.ts` file validating public reactive API.

---

## Quantified Expectations

- **Component size**: TS + template **≤ 200 lines**. If a component exceeds this, split responsibilities.
- **Style file**: component-specific style file **≤ 100 lines**. Prefer global utilities.
- **Single file**: If a single-file artifact is used, **≤ 400 lines** total.
- **Tests**: Each component must include a `.spec.ts` with **≥ 80% unit coverage** for public behavior.
- **Reusability**: Components must be standalone and importable.
- **Public API**: Inputs and outputs must be strongly typed and reactive (`input<T>()`, `output<T>()`).
- **Template sugar**: All structural logic must use `@if`/`@for` etc., not `*ngIf`/`*ngFor`.

---

## LLM-Friendly Formatting Rules

- Use hierarchical headings for sections and subsections.
- Keep paragraphs short (3–5 sentences).
- Use code blocks for all code examples.
- Use lists for grouped rules and checklists.
- Use horizontal rules (`---`) to separate major sections.
- Provide explicit examples for each pattern.
- Avoid ambiguous phrasing; prefer concrete constraints and examples.

---

## Design Tokens and Global Styles

**File**: `src/styles/tokens.css`
```css
:root {
  --font-sans: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  --color-bg: #ffffff;
  --color-text: #0f172a;
  --color-muted: #6b7280;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --radius: 8px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
}
```

**File**: `src/styles/utilities.css`
```css
.u-row { display:flex; gap:var(--space-3); align-items:center; }
.u-col { display:flex; flex-direction:column; gap:var(--space-2); }
.btn { font-family:var(--font-sans); padding:8px 12px; border-radius:var(--radius); }
.btn-primary { background:var(--color-success); color:white; }
.btn-sm { padding:4px 8px; font-size:0.875rem; }
.btn-md { padding:8px 12px; font-size:1rem; }
.btn-lg { padding:12px 16px; font-size:1.125rem; }
.muted { color:var(--color-muted); }
.visually-hidden { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); border:0; }
.bg-success { background:var(--color-success); color:white; padding:4px 8px; border-radius:4px; }
.bg-warning { background:var(--color-warning); color:black; padding:4px 8px; border-radius:4px; }
.bg-error { background:var(--color-error); color:white; padding:4px 8px; border-radius:4px; }
```

---

## Component Conventions

- **Standalone**: `standalone: true`.
- **Change detection**: `changeDetection: ChangeDetectionStrategy.OnPush`.
- **DI**: `private readonly api = inject(ApiService);`
- **State**: `protected readonly count = signal(0);`
- **Public API**: `readonly value = input<number>(0);`
- **Outputs**: `readonly changed = output<number>();`
- **Host classes**: use `host: { class: 'ui-component' }`.
- **Access modifiers**:
  - `private` for internal-only items.
  - `protected` for items used in template.
  - `readonly` for immutable references.
  - `public` only for `input()`/`output()`.

---

## Transformer Helpers (shared)

**File**: `src/app/shared/transformers.ts`
```ts
export type Transformer<Attr, T> = (value: Attr | null | undefined) => T;

/** booleanAttribute: treat presence or "true"/""/"1" as true, otherwise false */
export const booleanAttribute: Transformer<string | boolean | null, boolean> = (v) =>
  v === '' || v === true || v === 'true' || v === '1';

/** mapEnumToConfig: create a transformer from a map of allowed keys to config objects */
export function mapEnumToConfig<K extends string, C>(map: Record<K, C>, fallback: C) {
  return (val: K | string | null | undefined): C => {
    if (!val) return fallback;
    return (map as Record<string, C>)[val] ?? fallback;
  };
}
```

**Notes**
- Keep transformers pure and synchronous.
- Provide a documented fallback value for unknown inputs.
- Use typed unions for allowed attribute keys.

---

## Examples

### Toggle Component (signals + reactive input/output)

**File**: `toggle/toggle.component.ts`
```ts
import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  templateUrl: './toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-control' }
})
export class ToggleComponent {
  readonly on = input<boolean>(false);
  readonly label = input.required<string>();
  readonly toggled = output<boolean>();

  toggle() {
    const next = !this.on();
    this.toggled.emit(next);
  }
}
```

**File**: `toggle/toggle.component.html`
```html
<button class="btn btn-primary" aria-pressed="@bind(this.on())" (click)="toggle()">
  {{ label() }}
</button>
```

---

### Counter Component with Signals and Computed

**File**: `counter/counter.component.ts`
```ts
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'u-col' }
})
export class CounterComponent {
  protected readonly count = signal(0);
  protected readonly double = computed(() => this.count() * 2);

  increment() { this.count.update(c => c + 1); }
  decrement() { this.count.update(c => c - 1); }
}
```

**File**: `counter/counter.component.html`
```html
<div class="u-row" role="group" aria-label="Counter">
  <button class="btn" (click)="decrement()">-</button>
  <div aria-live="polite">{{ count() }}</div>
  <button class="btn" (click)="increment()">+</button>
  <div class="muted">Double: {{ double() }}</div>
</div>
```

---

### Item List Component using @for and trackBy

**File**: `item-list/item-list.component.ts`
```ts
import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface Item { id: string; name: string; }

@Component({
  selector: 'app-item-list',
  standalone: true,
  templateUrl: './item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent {
  readonly items = input<Item[]>([]);
  protected readonly trackById = (index: number, item: Item) => item.id;
}
```

**File**: `item-list/item-list.component.html`
```html
@if (items().length === 0) {
  <p class="muted">No items available</p>
} @else {
  <ul>
    @for (let item of items(); trackBy: trackById) {
      <li @bind="item.id">{{ item.name }}</li>
    }
  </ul>
}
```

---

## Input Transformer Examples (booleanAttribute and enum→map)

### Example 1 — `app-button` (uses `booleanAttribute` + size transformer)

**Purpose:** show `booleanAttribute` for a `compact` attribute and a `size` attribute that maps `'sm'|'md'|'lg'` to a small config object.

**File**: `button/button.component.ts`
```ts
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { booleanAttribute, mapEnumToConfig } from '../shared/transformers';

type SizeKey = 'sm' | 'md' | 'lg';
type SizeConfig = { class: string; paddingRem: number };

const SIZE_MAP: Record<SizeKey, SizeConfig> = {
  sm: { class: 'btn-sm', paddingRem: 0.5 },
  md: { class: 'btn-md', paddingRem: 0.75 },
  lg: { class: 'btn-lg', paddingRem: 1 },
};

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'btn' }
})
export class ButtonComponent {
  /** public reactive inputs are part of the component API */
  public readonly compact = input<boolean>(false, { transform: booleanAttribute });
  public readonly size = input<'sm' | 'md' | 'lg', SizeConfig>({
    transform: mapEnumToConfig<SizeKey, SizeConfig>(SIZE_MAP, SIZE_MAP.md)
  });

  public readonly clicked = output<void>();

  onClick() {
    this.clicked.emit();
  }
}
```

**File**: `button/button.component.html`
```html
<button
  class="@bind(size().class) @if(compact()) { btn-compact }"
  aria-pressed="false"
  (click)="onClick()"
  [attr.aria-disabled]="@bind(this.compact() ? 'true' : null)">
  <ng-content></ng-content>
</button>
```

**Notes**
- `compact` is parsed from attribute presence or explicit values using `booleanAttribute`.
- `size` is transformed into a `SizeConfig` object so templates can use `size().class` directly.
- Template uses `@bind` and `@if` template sugar.

---

### Example 2 — `status-badge` (enum → map-of-objects transformer)

**Purpose:** map a `status` attribute (`'success'|'warning'|'error'`) to a richer `StatusConfig` object `{ label, colorClass, icon }`.

**File**: `status-badge/status-badge.component.ts`
```ts
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { mapEnumToConfig } from '../shared/transformers';

type StatusKey = 'success' | 'warning' | 'error';
type StatusConfig = { label: string; colorClass: string; icon: string };

const STATUS_MAP: Record<StatusKey, StatusConfig> = {
  success: { label: 'Success', colorClass: 'bg-success', icon: 'check' },
  warning: { label: 'Warning', colorClass: 'bg-warning', icon: 'warning' },
  error:   { label: 'Error',   colorClass: 'bg-error',   icon: 'error' },
};

@Component({
  selector: 'status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'status-badge' }
})
export class StatusBadgeComponent {
  /** transform the raw attribute into a StatusConfig object */
  public readonly status = input<'success' | 'warning' | 'error', StatusConfig>({
    transform: mapEnumToConfig<StatusKey, StatusConfig>(STATUS_MAP, STATUS_MAP.success)
  });
}
```

**File**: `status-badge/status-badge.component.html`
```html
<span class="@bind(status().colorClass)" role="status" aria-label="@bind(status().label)">
  <i class="material-icons" aria-hidden="true">@bind(status().icon)</i>
  <span class="visually-hidden">@bind(status().label)</span>
</span>
```

**Notes**
- Consumers can write `<status-badge status="warning"></status-badge>` and the component receives a full `StatusConfig` object.
- Templates access `status().icon` and `status().colorClass` without extra parsing.

---

### Example 3 — `icon` (simple enum→string transformer)

**File**: `icon/icon.component.ts`
```ts
import { Component, ChangeDetectionStrategy, input } from '@angular/core';

const ICONS = {
  save: 'check_circle',
  cancel: 'cancel',
  edit: 'edit',
  add: 'add',
  unknown: 'help',
} as const;

export type IconType = keyof typeof ICONS;

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `{{ iconName() }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'material-symbols-outlined' }
})
export class IconComponent {
  readonly iconName = input.required<string, IconType>({
    transform: (val) => (val && (ICONS as Record<string, string>)[val]) || ICONS.unknown
  });
}
```

**Notes**
- Simple transformer maps attribute string to a known icon name with fallback.

---

## Minimal Test Skeletons

**File**: `button/button.component.spec.ts`
```ts
import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ButtonComponent] }));

  it('parses compact attribute as boolean', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const comp = fixture.componentInstance;
    comp.compact.set(true);
    expect(comp.compact()).toBe(true);
  });

  it('maps size attribute to SizeConfig', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const comp = fixture.componentInstance;
    comp.size.set('lg' as any);
    expect(comp.size().class).toContain('btn-lg');
  });
});
```

**File**: `status-badge/status-badge.component.spec.ts`
```ts
import { TestBed } from '@angular/core/testing';
import { StatusBadgeComponent } from './status-badge.component';

describe('StatusBadgeComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [StatusBadgeComponent] }));

  it('maps status attribute to StatusConfig', () => {
    const fixture = TestBed.createComponent(StatusBadgeComponent);
    const comp = fixture.componentInstance;
    comp.status.set('error' as any);
    expect(comp.status().label).toBe('Error');
    expect(comp.status().icon).toBe('error');
  });
});
```

---

## Styling Rules

- **Global-first**: Put layout, spacing, color, and typography in `src/styles/*`.
- **No inline styles**: Avoid `style=` attributes. Only dynamic styles via `[style.prop]` or CSS variables when necessary.
- **Component styles**: Only when unique styling is required; keep them minimal and in a separate `.css` file.
- **Host classes**: Use `@Component.host.class` for host-level classes.

**When to add component styles**: Add a component style file only if the style cannot be expressed via global utilities or tokens. Add a one-line justification comment at the top of the component style file.

---

## Accessibility Rules

- Use semantic HTML elements (button, nav, main, header, footer, form, fieldset, legend).
- Provide `aria-label`, `aria-labelledby`, or visible labels for interactive controls.
- Use `aria-live` for dynamic content updates.
- Ensure keyboard focus order and visible focus styles.
- Use `role` attributes only when semantic elements are not available.
- Use CDK a11y utilities for complex widgets when needed.
- Test with screen readers and keyboard-only navigation.

Angular a11y guidance: https://v19.angular.dev/best-practices/a11y

---

## Security Rules

- Treat all external data as untrusted.
- Avoid `bypassSecurityTrust*` unless absolutely necessary and documented.
- Use `DomSanitizer` carefully and document why sanitization is safe.
- Enable XSRF protection with `HttpClientXsrfModule`.
- Validate and escape user input on the server; do not rely on client-side checks.
- Use Content Security Policy (CSP) and Trusted Types in production.

Angular security guidance: https://v19.angular.dev/best-practices/security

---

## Runtime Performance Rules

- Default to `ChangeDetectionStrategy.OnPush`.
- Use `signal()` and `computed()` to minimize change detection work.
- Use `trackBy` for lists and `@for` trackBy where applicable.
- Lazy-load feature modules and components.
- Avoid unnecessary subscriptions; prefer `async` pipe or signals.
- Avoid heavy synchronous work in templates and lifecycle hooks.
- Profile with Angular DevTools and measure before optimizing.

Angular runtime guidance: https://v19.angular.dev/best-practices/runtime-performance

---

## Style Guide Rules

- Follow Angular style guide naming and file layout conventions.
- Prefer `inject()` over constructor injection.
- Keep lifecycle hooks minimal and focused.
- Use `protected` for template-bound members, `private` for internal-only members.
- Keep components single-responsibility and small.

Angular style guide: https://v19.angular.dev/style-guide

---

## Do and Do Not Lists

**Do**
- Use `signal`, `computed`, and `effect` for local reactive logic.
- Expose public APIs with `input()` and `output()`.
- Break UI into small, reusable standalone components.
- Use `@if`, `@for`, and other template sugar.
- Use global design tokens and utilities.

**Do Not**
- Use `*ngIf`/`*ngFor` or legacy structural directives.
- Use constructor injection.
- Put routine layout or spacing in component styles.
- Emit untyped or non-reactive inputs/outputs.
- Hard-code colors, spacing, or fonts in components.

---

## Acceptance Checklist

Use this checklist to validate generated artifacts.

1. **Reactive API**: `signal()` and `computed()` used for local state; `input()` and `output()` used for public props and events.
2. **Template sugar**: `@if`, `@for`, `@bind`, `@let`, `@trackBy` used where structural directives are needed.
3. **Dependency injection**: `inject()` used; no constructor injection present.
4. **Change detection**: `ChangeDetectionStrategy.OnPush` set unless a clear justification is provided.
5. **Component size**: TS + template **≤ 200 lines**; style file **≤ 100 lines**.
6. **Single responsibility**: Component performs one primary function; if not, it is split.
7. **Styling**: Global tokens/utilities used; component styles only when necessary with a one-line justification.
8. **Accessibility**: Semantic HTML, ARIA attributes, keyboard focus management present.
9. **Security**: No unsafe `bypassSecurityTrust*` usage; XSRF and sanitization guidance followed.
10. **File structure**: kebab-case files, PascalCase classes, `.spec.ts` present for each component.
11. **Tests**: Unit tests exist and validate public reactive API; target **≥ 80%** coverage for public behavior.
12. **No legacy directives**: No `*ngIf`/`*ngFor` in templates.
13. **Host classes**: Use `@Component.host.class` for host-level classes.
14. **DI visibility**: All injected dependencies declared `readonly` and via `inject()`.
15. **Transformer usage**: `booleanAttribute` and `mapEnumToConfig` (or equivalent) used where attribute normalization is required.
16. **Transformer fallbacks**: Transformers provide documented fallback values for unknown inputs.
17. **No parsing in templates**: Templates consume transformed values directly; no attribute parsing in template markup.

---

## Final Notes

- Keep components small and composable.
- Prefer global tokens and utilities for styling.
- Always include minimal tests for public behavior.
- When in doubt, split responsibilities into smaller components and services.


<!-- custom-css-coding/1 -->
# Custom-css coding
You are a professional web UI developer. Your task is to help manage CSS styles without using any third-party libraries
like Tailwind or Bootstrap. The goal is to create a clean, maintainable, and consistent styling system using native CSS
and framework conventions.

Follow these principles:

---

## 1. Define Style Guide using CSS variables

Create a `:root` block in a global stylesheet (`styles.css` in Angular, `globals.css` in Next.js) that defines
all the style guide for the app. This should include the following which are used by all other CSS class definitions:
* Common app theme colors for text and backgrounds. These should include:
  * Default colors for text and elements
  * A color for primary interaction elements (e.g. buttons)
  * Colors for success, warning, error and informational elements
  * Disabled elements
  * Also define CSS in such a way that colors can easily be switched between a light and dark theme.
* The app font and standard font sizes
* 3 levels of standard spacing which can be used for for margins, padding and gaps
* Borders, including 2 levels of border radius
* Drop shadows effects

For example:
```css
:root {
  --primary-color: #0057ff;
  --secondary-color: #888888;
  --success-color: #ff4081;
  --text-color: #333;
  --border-radius: 4px;
  --font-face: Roboto, Arial, sans-serif;
  --space: 1rem;
  --space-sm: calc(var(--space) / 2);
  --space-lg: calc(var(--space) * 2);
  --border-size: 1px;
  --border: var(--border-size) solid var(--secondary-color);
}

.bordered {
  border: var(--border);
}

.padded {
  padding: var(--space);

  &-sm {
    padding: var(--space-sm);
  }

  &-lg {
    padding: var(--space-lg);
  }
}
```

Use these variables consistently across components. Avoid hardcoded values unless absolutely necessary.

---

## 📐 2. Standardize Layout and Spacing Utilities

Define utility classes for spacing and layout in a shared stylesheet (e.g., `utilities.css` or inside `globals.css`). Keep them minimal and semantic:

Here's an example:
```css
/* Spacing */
.u-margin-sm { margin: 0.5rem; }
.u-margin-md { margin: 1rem; }
.u-padding-sm { padding: 0.5rem; }
.u-padding-md { padding: 1rem; }

/* Flex utilities */
.u-flex { display: flex; }
.u-flex-center { justify-content: center; align-items: center; }
.u-flex-column { flex-direction: column; }

/* Width helpers */
.u-full-width { width: 100%; }
```

Avoid overloading elements with multiple utility classes—prefer semantic wrappers or layout components.

---

## 3. Standardize HTML Element Appearance

Create a `base.css` or `reset.css` file to normalize and style native HTML elements:

```css
body {
  font-family: system-ui, sans-serif;
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.5;
}

button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

button:hover {
  background-color: #0046cc;
}

input, textarea {
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  padding: 0.5rem;
  font-size: 1rem;
}
```

Apply styles globally to reduce the need for per-component overrides.

---

## 4. Minimize Class Usage and Promote Semantic Structure

- Favor semantic HTML and wrapper components with scoped styles.
- Use `[class]` bindings in Angular or `className` in Next.js sparingly.
- Avoid deeply nested or overly specific selectors.
- Prefer layout components (e.g., `<AppLayout>`, `<FlexBox>`) to encapsulate common patterns.

Example in Angular:

```html
<div class="u-flex u-flex-center u-padding-md">
  <app-login-form></app-login-form>
</div>
```

Example in Next.js (with CSS Modules):

```tsx
<div className={styles.container}>
  <LoginForm />
</div>
```

---

## 5. Avoid Component-Specific Styles Unless Absolutely Necessary

- Use shared stylesheets or CSS modules for reusable patterns.
- If component-specific styles are needed, keep them minimal and scoped.
- In Next.js, use CSS Modules (`Component.module.css`) only when styles are unique to that component.

---

## Summary

Your goal is to help the developer maintain a clean, scalable CSS architecture by:

- Using semantic CSS variables
- Creating re-usable utility classes
- Styling HTML elements with global CSS classes
- Reducing class clutter
- Avoiding component-specific styles unless absolutely essential

Generate idiomatic CSS and HTML that reflects these principles in Angular and Next.js contexts.