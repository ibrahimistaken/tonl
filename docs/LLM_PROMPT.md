# TONL Format - LLM Reading Instructions

## System Prompt for LLMs

When you receive data in TONL (Token-Optimized Notation Language) format, use these instructions to parse it:

### Format Rules

```
TONL is a compact data serialization format designed for LLM efficiency:

1. HEADERS (optional):
   - #version 1.0
   - #delimiter "," (or |, \t, ;)

2. ARRAYS OF OBJECTS (tabular):
   - Format: arrayName[count]{field1,field2,...}:
   - Data rows follow with values in order
   - Example:
     users[2]{id,name,age}:
       1, Alice, 30
       2, Bob, 25

3. SINGLE OBJECTS:
   - Format: objectName{field1,field2,...}:
   - Each field on its own line: fieldName: value
   - Example:
     user{name,age}:
       name: Alice
       age: 30

4. NESTED STRUCTURES:
   - Objects can contain other objects or arrays
   - Indentation shows nesting level (2 spaces per level)

5. PRIMITIVE ARRAYS:
   - Format: arrayName[count]: value1, value2, value3
   - Example: tags[3]: javascript, python, rust

6. VALUE TYPES:
   - Strings: quoted if contain special chars
   - Numbers: unquoted integers or floats
   - Booleans: true/false
   - Null: null

When you see TONL data:
1. Look for headers to understand delimiters
2. Identify structure by looking for [count]{fields}: pattern
3. Parse tabular data as arrays of objects
4. Parse indented single-line fields as object properties
5. Respect nesting through indentation
6. Convert back to JSON mentally if needed for processing
```

## Quick Reference for Common Patterns

### Pattern 1: User List
```tonl
users[3]{id,name,email,active}:
  1, Alice, alice@example.com, true
  2, Bob, bob@example.com, false
  3, Carol, carol@example.com, true
```
→ Array of 3 objects with 4 fields each

### Pattern 2: Nested Configuration
```tonl
config{database,cache}:
  database{host,port,name}:
    host: localhost
    port: 5432
    name: mydb
  cache{enabled,ttl}:
    enabled: true
    ttl: 3600
```
→ Object with nested objects

### Pattern 3: Mixed Structure
```tonl
response{status,data,metadata}:
  status: success
  data[2]{id,name}:
    101, Product A
    102, Product B
  metadata{total,page}:
    total: 2
    page: 1
```
→ Object containing string, array, and nested object

## Usage in Your Application

**Include this in your system prompt when sending TONL data:**

```
The following data is in TONL format. Parse it as follows:
- Lines with [count]{fields}: are array headers, followed by data rows
- Lines with {fields}: are object headers, followed by field: value pairs
- Indentation (2 spaces) indicates nesting
- Default delimiter is comma unless specified in #delimiter header

[Your TONL data here]
```

## Benefits for LLM Applications

- **32-50% fewer tokens** than equivalent JSON
- **Human-readable** - easy to debug
- **Preserves structure** - all relationships maintained
- **No parsing library needed** - LLMs understand it natively with this prompt

## Example Conversion

**JSON (348 tokens):**
```json
{
  "users": [
    {"id": 1, "name": "Alice", "role": "admin"},
    {"id": 2, "name": "Bob", "role": "user"}
  ]
}
```

**TONL (216 tokens):**
```tonl
users[2]{id,name,role}:
  1, Alice, admin
  2, Bob, user
```

Both represent identical data, but TONL uses significantly fewer tokens.
