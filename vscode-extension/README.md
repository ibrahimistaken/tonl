# TONL VS Code Extension

Complete language support for TONL (Token-Optimized Notation Language) files with syntax highlighting, intelligent code completion, and interactive document exploration.

## Features

### ✅ Syntax Highlighting (T038) - Complete
- **TONL file recognition** - Automatic language mode for `.tonl` files
- **Comprehensive syntax coloring**:
  - Directives: `@version`, `@delimiter`, `@types`, `@schema`
  - Comments: `# comment lines`
  - Field headers: `key:`, `array[0]:`
  - Strings: double quotes `"..."` and triple quotes `"""..."""`
  - Numbers: integers, decimals, scientific notation
  - Booleans: `true`, `false`
  - Null values: `null`
  - Inline objects: `{key: value, ...}`
  - Inline arrays: `[item1, item2, ...]`
  - Delimiters: `,`, `|`, `;`, `\t`
  - Escape sequences in strings

### ✅ Document Explorer (T039) - Complete
- **Interactive tree view** in sidebar
- **Real-time parsing** of TONL documents
- **Visual structure navigation**:
  - Collapsible objects and arrays
  - Type icons for all value types
  - Value previews for primitives
  - Array length and object property counts
- **Intelligent tooltips** showing paths and types
- **Auto-refresh** on document changes (debounced)
- **Error display** for invalid TONL syntax

### ✅ IntelliSense (T040) - Complete
- **Auto-completion**:
  - Directive suggestions (`@version`, `@delimiter`, etc.)
  - Value completions (`true`, `false`, `null`)
  - Snippet support for strings, objects, and arrays
  - Context-aware suggestions
- **Hover information**:
  - Type detection for all values
  - Directive documentation
  - Field name hints
  - Value type indicators
- **Real-time diagnostics**:
  - Parse error detection with line numbers
  - Duplicate key warnings
  - Inconsistent delimiter detection
  - Schema validation messages

### ✅ Commands
- **TONL: Validate Document** - Parse and validate TONL syntax
- **TONL: Format Document** - Round-trip format via encode/decode
- **TONL: Show Document Tree** - Open tree explorer sidebar

## Installation

### From VSIX (Development)
```bash
cd vscode-extension
npm install
npm run compile
vsce package
code --install-extension tonl-vscode-0.1.0.vsix
```

### From VS Code Marketplace (Future)
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "TONL"
4. Click Install

## Usage

### Basic Editing
1. Open any `.tonl` file
2. Syntax highlighting activates automatically
3. IntelliSense provides suggestions as you type
4. Hover over elements for type information

### Document Explorer
1. Open a `.tonl` file
2. View the "TONL Explorer" in the sidebar
3. Navigate through the document structure
4. Click on elements to see tooltips with paths and values

### Commands
Access commands via Command Palette (Ctrl+Shift+P / Cmd+Shift+P):
- **TONL: Validate Document** - Check for syntax errors
- **TONL: Format Document** - Reformat the document
- **TONL: Show Document Tree** - Open explorer view

### IntelliSense Features
- Type `@` to see directive completions
- Type `:` after a field name for value suggestions
- Hover over any element to see type and documentation
- Real-time error highlighting in the editor

## Example

```tonl
# TONL Document Example
@version 1.0
@delimiter ,
@types {name: string, age: number, active: boolean}

# User profile
user:
  name: Alice Johnson
  age: 30
  email: alice@example.com
  active: true

# Inline object notation
settings: {theme: dark, notifications: true}

# Array of users
users[0]:
  id: 1
  name: Bob Smith
  role: admin

users[1]:
  id: 2
  name: Carol Davis
  role: user

# Nested structure
config:
  database:
    host: localhost
    port: 5432
    credentials: {username: admin, password: secret}
  features: [auth, logging, caching]
```

## Development

```bash
# Install dependencies
npm install

# Compile
npm run compile

# Watch mode
npm run watch

# Package
npm run package
```

## Requirements

- VS Code 1.80.0 or higher
- TONL library installed (`npm install tonl`)

## Extension Settings

This extension currently has no configurable settings. Future versions may include:

- `tonl.validateOnSave`: Enable validation on save
- `tonl.formatOnSave`: Enable formatting on save
- `tonl.maxFileSize`: Maximum file size for tree view (MB)

## Known Issues

- Tree view performance may degrade with very large files (>10K lines)
- Format command does a full encode/decode cycle (may change formatting slightly)
- Diagnostics update on every keystroke (500ms debounced)

## Release Notes

### 0.1.0 - Initial Release

**Complete implementation of T038, T039, and T040:**

✅ **T038 - Syntax Highlighting (Complete)**
- Full TextMate grammar for TONL syntax
- Support for all TONL features including inline objects/arrays
- Proper escape sequence highlighting
- Directive and delimiter recognition

✅ **T039 - Document Explorer (Complete)**
- Interactive tree view with real-time parsing
- Type-aware icons and tooltips
- Collapsible structure navigation
- Error handling for invalid documents

✅ **T040 - IntelliSense (Complete)**
- Auto-completion for directives and values
- Hover information with type detection
- Real-time diagnostics (parse errors, duplicate keys, delimiter warnings)
- Context-aware suggestions

## Contributing

See the main TONL repository: https://github.com/tonl-dev/tonl

## License

MIT
