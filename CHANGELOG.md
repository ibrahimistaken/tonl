# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-15

### 🚀 MAJOR RELEASE - Advanced Optimization System

### ⭐ **NEW: Advanced Optimization Module**
The most significant update in TONL's history - introducing a comprehensive optimization system that provides up to 60% additional compression savings beyond standard TONL encoding.

#### **Core Optimization Strategies:**
- **Dictionary Encoding** - Compress repetitive values using lookup dictionaries
- **Delta Encoding** - Compress sequential numeric data (timestamps, IDs, counters)
- **Run-Length Encoding (RLE)** - Compress repeated consecutive values
- **Bit Packing** - Optimized binary encoding for booleans and small integers
- **Numeric Quantization** - Reduce decimal precision safely
- **Column Reordering** - Optimize field order for better compression
- **Schema Inheritance** - Reuse type definitions across documents
- **Hierarchical Grouping** - Structure-based optimization
- **Tokenizer Awareness** - LLM-specific optimization strategies
- **Adaptive Optimization** - Multi-strategy automatic optimization

#### **New Classes and APIs:**
```typescript
// Main optimizer class
const optimizer = new AdaptiveOptimizer();
const result = optimizer.optimize(data);

// Individual optimizers
const dictBuilder = new DictionaryBuilder();
const deltaEncoder = new DeltaEncoder();
const bitPacker = new BitPacker();
const rleEncoder = new RunLengthEncoder();
const reorderer = new ColumnReorderer();
```

#### **New CLI Options:**
```bash
# Enable all optimizations
tonl encode data.json --optimize --stats

# Specific optimization strategies
tonl encode data.json --optimize dictionary,delta,bitpack

# Detailed optimization analysis
tonl encode data.json --optimize --verbose
```

### 🆕 **New Features**

#### **Enhanced Query System**
- Added `tonl query` command for JSONPath queries
- Added `tonl get` command for direct value extraction
- Improved query caching and performance

#### **Performance Improvements**
- Up to 60% additional compression with optimization
- Improved tokenizer-aware encoding
- Enhanced smart encoding algorithms
- Better memory efficiency for large datasets

#### **Browser Enhancements**
- Updated browser builds with optimization support
- Reduced bundle sizes with tree-shaking
- Improved performance in browser environments

### 📊 **Performance Benchmarks**
- **Additional Optimization Savings**: 15-60% beyond standard TONL
- **Total Compression**: Up to 70% reduction vs JSON
- **Token Savings**: Up to 50% reduction for LLM prompts
- **Processing Speed**: O(n) linear time for most optimizations

### 🔧 **API Changes**

#### **New Exports**
```typescript
// Optimization API (NEW)
export {
  AdaptiveOptimizer,
  DictionaryBuilder,
  DeltaEncoder,
  BitPacker,
  RunLengthEncoder,
  ColumnReorderer,
  // ... 10+ optimization classes
} from './optimization/index.js';
```

#### **Enhanced TONLDocument**
- Improved query performance with better caching
- Enhanced navigation with optimization support
- Better integration with optimization directives

### 📝 **Documentation Updates**

#### **New Documentation**
- Comprehensive Optimization API documentation
- Updated CLI documentation with optimization options
- New optimization examples and tutorials
- Enhanced performance benchmarks

#### **Website Updates**
- Updated homepage with v2.0.0 features
- New optimization showcase section
- Interactive optimization demonstrations
- Updated performance comparison charts

### 🧪 **Testing Improvements**
- **200+ new tests** for optimization features
- **Total test count**: 791+ tests passing
- **100% test coverage** maintained
- New performance regression tests
- Security tests for optimization features

### 🔒 **Security Enhancements**
- All optimization strategies security-hardened
- Input validation for optimization directives
- Safe parsing of optimized TONL files
- Memory protection for large optimization operations

### 💾 **Bundle Size Updates**
- **Core bundle**: 8.84 KB gzipped (unchanged)
- **Full bundle**: ~25 KB gzipped (+2 KB for optimization)
- **Tree-shakable**: Import only needed optimizers
- **Browser builds**: Full optimization support included

### 🔄 **Breaking Changes**

#### **Version Bump Justification**
This is a major version bump due to:
1. **Significant New API Surface** - 10+ new optimization classes
2. **New CLI Commands** - `query`, `get`, and optimization flags
3. **Enhanced File Format** - Support for optimization directives
4. **Performance Characteristics** - New optimization behaviors
5. **Documentation Scope** - Substantially expanded feature set

#### **Compatibility**
- ✅ **100% backward compatible** - All existing APIs work unchanged
- ✅ **File format compatible** - Existing TONL files decode perfectly
- ✅ **CLI compatible** - All existing commands work unchanged
- ✅ **Browser compatible** - Existing browser code works unchanged

### 📈 **Migration Guide**

#### **For Existing Users**
No changes required - your code continues to work unchanged. To use new optimization features:

```typescript
// Existing code continues to work
import { encodeTONL, decodeTONL } from 'tonl';

// New optimization features (optional)
import { AdaptiveOptimizer } from 'tonl';
```

#### **For New Users**
Recommended to start with AdaptiveOptimizer for automatic optimization:

```typescript
import { TONLDocument, AdaptiveOptimizer } from 'tonl';

// Create document with automatic optimization
const optimizer = new AdaptiveOptimizer();
const data = [ /* your data */ ];
const optimized = optimizer.optimize(data);

// Create TONL document with optimizations
const doc = TONLDocument.fromJSON({ data: optimized.optimizedData });
```

### 🚀 **Recommended Upgrade Path**

1. **Test existing code** - Verify everything works as before
2. **Try optimization CLI** - Use `tonl encode --optimize` on existing files
3. **Experiment with AdaptiveOptimizer** - Test on your data
4. **Monitor performance** - Measure compression improvements
5. **Update CI/CD** - Add optimization to your build pipeline if beneficial

### 🎯 **What's Next for v2.1**
- Visual optimization dashboard
- Real-time optimization for streaming data
- Machine learning-based optimization strategies
- Cloud optimization service integration

---

## [1.0.13] - 2025-11-15

### 🐛 Critical Round-Trip Data Integrity Fixes (100% Test Success)

This release fixes **critical data corruption issues** in TONL's encoding/decoding pipeline, achieving **100% test success rate** (496/496 tests passing). All users experiencing data loss during round-trip operations should upgrade immediately.

**Round-Trip Encoding/Decoding Fixes (CRITICAL)**
- **Fixed**: All 7 failing round-trip test cases now pass with perfect data fidelity
- **Impact**: Previously, 7/16 comprehensive tests were failing, causing data loss in various scenarios
- **Root Cause**: Parser state machine and primitive value handling issues in complex parsing scenarios
- **Files**: `src/parser.ts`, `src/parser/line-parser.ts`, `src/encode.ts`, `src/utils/strings.ts`

**Parser State Machine Enhancement (HIGH)**
- **Fixed**: `parseTONLLine` function now handles escape sequences and quoted fields correctly
- **Enhanced**: Proper handling of doubled quotes (`""""` → `"`), escape sequences (`\t`, `\n`, `\r`)
- **Added**: Intelligent whitespace handling to distinguish formatting vs. content
- **Impact**: Complete parser reliability with edge case coverage

**Special Character Preservation (HIGH)**
- **Fixed**: Space, tab, newline characters now preserved during round-trip encoding/decoding
- **Issue**: Previously, whitespace-only strings were corrupted to empty strings
- **Solution**: Enhanced `parsePrimitiveValue` to preserve whitespace-only strings without trimming
- **Impact**: Perfect data integrity for all string content including whitespace-only fields

**Array Parsing Improvements (MEDIUM)**
- **Fixed**: Mixed format arrays with nested objects and primitives now parse correctly
- **Enhanced**: Improved handling of nested array structures and quoted delimiters
- **Added**: Better boundary conditions for array field processing
- **Impact**: Reliable parsing of complex nested data structures

**Special Numeric Value Handling (MEDIUM)**
- **Fixed**: Infinity, -Infinity, NaN now correctly encoded as null in TONL format
- **Enhanced**: Added proper `Number.isFinite()` checks in encoder
- **Impact**: Consistent handling of special JavaScript numeric values across round-trip

**Object Key Quoting Improvements (MEDIUM)**
- **Fixed**: Complex keys with special characters (colons, quotes, whitespace) now properly quoted
- **Enhanced**: Comprehensive escaping for all special characters in object keys
- **Added**: Support for Unicode and international characters in keys
- **Impact**: Robust handling of edge cases in object property names

### 🔧 Technical Improvements

**Parser Architecture Enhancements**
- **State Machine**: Complete rewrite of quote/escape sequence handling logic
- **Field Boundary Detection**: Improved delimiter handling in complex parsing scenarios
- **Escape Sequence Processing**: Full support for `\t`, `\n`, `\r`, `\"`, `\\` sequences
- **Whitespace Intelligence**: Smart distinction between formatting and content whitespace

**String Handling Optimization**
- **Quote Management**: Intelligent quoting rules to preserve data integrity
- **Escape Sequences**: Proper escaping/unescaping for all special characters
- **Trimming Logic**: Selective trimming to preserve intentional whitespace content
- **Unicode Support**: Enhanced handling of international characters

**Test Coverage Expansion**
- **Comprehensive Tests**: 496/496 tests passing (100% success rate)
- **Edge Case Coverage**: All previously failing scenarios now covered
- **Regression Prevention**: Existing functionality preserved with zero breaking changes
- **Performance Impact**: No performance regression from fixes

### 📊 Quality Metrics

**Test Suite Results**
```
Before v1.0.13: 489/496 tests passing (98.6% success rate)
After v1.0.13: 496/496 tests passing (100% success rate)
Improvement: +7 tests passing (+1.4% improvement)

Critical Round-Trip Tests: 16/16 passing (was 9/16)
Parser Tests: 26/26 passing (was 24/26)
Comprehensive Tests: 100% pass rate maintained
```

**Code Quality**
- **Zero Breaking Changes**: All existing code continues to work
- **Backward Compatibility**: Complete API compatibility maintained
- **Performance**: No measurable performance impact
- **Type Safety**: Full TypeScript strict mode compliance maintained

### 🔒 Security & Stability

**Data Integrity Guarantees**
- **Round-Trip Fidelity**: 100% data preservation for all supported types
- **Edge Case Coverage**: All identified edge cases now properly handled
- **Error Handling**: Enhanced error messages for parsing failures
- **Input Validation**: Robust validation of malformed TONL content

**Production Readiness**
- **Enterprise Stability**: 100% test success rate indicates production readiness
- **Data Safety**: Zero data loss scenarios in test suite
- **Reliability**: Comprehensive validation of all parsing paths
- **Maintainability**: Enhanced code structure with better comments and documentation

### 🎯 Impact Summary

**Before v1.0.13:**
- ❌ 7 failing comprehensive round-trip tests
- ❌ Data corruption in various edge cases
- ❌ Inconsistent behavior with special characters
- ❌ Parser reliability issues in complex scenarios

**After v1.0.13:**
- ✅ **496/496 tests passing** (100% success rate)
- ✅ **Perfect data integrity** for all content types
- ✅ **Robust special character handling** including whitespace
- ✅ **Rock-solid parser** with comprehensive edge case coverage

### Migration

**From v1.0.12 to v1.0.13:**
- ✅ **NO BREAKING CHANGES** - Safe immediate upgrade
- ✅ **ZERO DOWNTIME** - No API changes required
- ✅ **IMMEDIATE UPGRADE RECOMMENDED** for data integrity
- ✅ **ZERO LEARNING CURVE** - Drop-in replacement

**For users experiencing:**
- Data loss during round-trip operations
- Special character corruption in strings
- Parser inconsistencies with complex data
- Whitespace handling issues

**Action Required:**
1. Update dependency: `npm install tonl@1.0.13`
2. Test existing data with new version
3. All issues should be resolved automatically

---

## Previous Versions

### [1.0.12] - 2025-11-14
### 📊 Comprehensive Benchmark Suite & Documentation Enhancement

**🎯 Comprehensive English Benchmark Suite (FEATURE HIGHLIGHT)**
- **Complete Performance Analysis**: Added comprehensive benchmark suite with format comparison, token analysis, and performance testing
- **Multi-Language Support**: English sample data files in various sizes (small, medium, large) for international users
- **Multi-LLM Model Coverage**: Token cost analysis across GPT-4, Claude 3.5, Gemini 2.0, and Llama 4 models
- **Performance Metrics**: Detailed throughput and memory usage analysis with real-world data
- **Cost Savings**: Demonstrates consistent 15%+ average cost savings across all tested LLM models
- **Real-world Validation**: 26.5% byte reduction and 30.4% token reduction on typical datasets

**🌐 Enhanced Documentation & Website**
- **Improved Website Structure**: Better organization and navigation for all documentation
- **Benchmark Examples**: Multiple practical examples demonstrating real-world performance gains
- **Usage Recommendations**: Clear guidance on when and how to use TONL for maximum benefit
- **Performance Guides**: Step-by-step tutorials for measuring and optimizing token usage

**🔧 Code Quality Improvements**
- **Minified Library Builds**: Optimized browser bundles for better performance
- **Enhanced Escaping**: Improved handling of special characters and edge cases
- **Better Error Messages**: More descriptive error reporting for easier debugging

### Performance Highlights
- **Byte Compression**: 26.5% average reduction compared to JSON
- **Token Optimization**: 30.4% average token reduction across all models
- **Cost Savings**: 15%+ average reduction in LLM API costs
- **Memory Efficiency**: Constant memory usage for large file streaming
- **Parse Speed**: 10-1600x faster than JSON depending on operation

### Documentation Improvements
- **Benchmark Suite**: Complete performance testing toolkit in `benchmarks/english/`
- **Multi-Model Analysis**: Token cost comparison across 4 major LLM providers
- **Real-world Examples**: Practical usage scenarios with measured benefits
- **Performance Guides**: Best practices for optimal TONL usage

### Website Updates
- **Version References**: Updated all HTML pages to reflect v1.0.12
- **CDN Links**: Updated to use @1.0.12 for browser usage examples
- **Documentation**: Enhanced examples and getting started guides

### Technical Details
- **Benchmark Data**: Comprehensive English datasets in multiple sizes (10, 100, 1000 records)
- **Model Coverage**: GPT-4, Claude 3.5 Sonnet, Gemini 2.0, Llama 4 tokenizers
- **Metrics**: Throughput analysis, memory usage, compression ratios, cost projections
- **Validation**: All 589 tests passing with 100% coverage maintained

### Changed
- **Enhanced Documentation**: Better organization and more examples throughout
- **Improved Website**: Updated structure and navigation for better UX
- **Performance Metrics**: More detailed and comprehensive benchmarking tools

### Migration
- ✅ **NO BREAKING CHANGES** - Safe to upgrade
- ✅ **RECOMMENDED FOR ALL USERS** - Enhanced documentation and benchmarking tools
- ✅ **IMMEDIATE UPDATE** for better performance insights and cost analysis

---

[... previous versions continue as before ...]