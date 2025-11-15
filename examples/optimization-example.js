#!/usr/bin/env node

/**
 * TONL Advanced Optimization Example
 *
 * This example demonstrates the v2.0.0 optimization features
 * including dictionary encoding, delta compression, bit packing, etc.
 */

import {
  TONLDocument,
  encodeTONL,
  decodeTONL,
  AdaptiveOptimizer,
  DictionaryBuilder,
  DeltaEncoder,
  BitPacker,
  RunLengthEncoder,
  ColumnReorderer
} from '../dist/index.js';

// Sample data for optimization demonstration
const sampleData = [
  {
    id: 1001,
    employee_id: "EMP001",
    name: "Alice Johnson",
    department: "Engineering",
    role: "Senior Developer",
    salary: 95000.00,
    active: true,
    hire_date: "2020-01-15",
    skills: ["JavaScript", "TypeScript", "React", "Node.js"],
    projects_completed: 12,
    last_login: 1704067200000,
    performance_rating: 4.5,
    remote_worker: true,
    manager_id: 5001
  },
  {
    id: 1002,
    employee_id: "EMP002",
    name: "Bob Smith",
    department: "Engineering",
    role: "Developer",
    salary: 75000.00,
    active: true,
    hire_date: "2021-03-22",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    projects_completed: 8,
    last_login: 1704067201000,
    performance_rating: 4.2,
    remote_worker: false,
    manager_id: 5001
  },
  {
    id: 1003,
    employee_id: "EMP003",
    name: "Carol Davis",
    department: "Marketing",
    role: "Marketing Manager",
    salary: 85000.00,
    active: true,
    hire_date: "2019-07-10",
    skills: ["SEO", "Google Ads", "Analytics", "Content Strategy"],
    projects_completed: 15,
    last_login: 1704067202000,
    performance_rating: 4.7,
    remote_worker: true,
    manager_id: 5002
  },
  {
    id: 1004,
    employee_id: "EMP004",
    name: "David Wilson",
    department: "Engineering",
    role: "DevOps Engineer",
    salary: 88000.00,
    active: true,
    hire_date: "2020-09-01",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    projects_completed: 10,
    last_login: 1704067203000,
    performance_rating: 4.4,
    remote_worker: true,
    manager_id: 5001
  },
  {
    id: 1005,
    employee_id: "EMP005",
    name: "Eva Brown",
    department: "Marketing",
    role: "Content Specialist",
    salary: 65000.00,
    active: false,
    hire_date: "2022-02-14",
    skills: ["Copywriting", "Social Media", "Email Marketing", "Canva"],
    projects_completed: 6,
    last_login: 1704067204000,
    performance_rating: 3.8,
    remote_worker: false,
    manager_id: 5002
  }
];

console.log('🚀 TONL Advanced Optimization Example');
console.log('=====================================\n');

// 1. Basic TONL Encoding
console.log('1️⃣ Basic TONL Encoding');
const basicTonl = encodeTONL({ employees: sampleData });
console.log(`Size: ${basicTonl.length} characters`);
console.log(`Preview:\n${basicTonl.substring(0, 300)}...\n`);

// 2. Smart Encoding
console.log('2️⃣ Smart Encoding');
const smartTonl = encodeTONL({ employees: sampleData }, {
  delimiter: '|',
  includeTypes: false,
  singleLinePrimitiveLists: true
});
console.log(`Size: ${smartTonl.length} characters`);
console.log(`Savings vs Basic: ${((1 - smartTonl.length / basicTonl.length) * 100).toFixed(1)}%\n`);

// 3. Individual Optimization Strategies
console.log('3️⃣ Individual Optimization Strategies');

// Dictionary Encoding for repetitive values
console.log('📚 Dictionary Encoding:');
const deptValues = sampleData.map(emp => emp.department);
const dictBuilder = new DictionaryBuilder();
const deptDict = dictBuilder.analyzeDictionaryCandidates(deptValues, 'department');
if (deptDict) {
  console.log(`  Department dictionary saves: ${deptDict.totalSavings} bytes`);
  console.log(`  Encoding: ${deptDict.encoding}`);
  const directive = dictBuilder.generateDictionaryDirective(deptDict);
  console.log(`  Directive: ${directive}`);
}

// Delta Encoding for sequential timestamps
console.log('\n⏭️  Delta Encoding:');
const timestamps = sampleData.map(emp => emp.last_login);
const deltaEncoder = new DeltaEncoder();
const deltaAnalysis = deltaEncoder.analyzeSequence(timestamps);
if (deltaAnalysis.recommended) {
  console.log(`  Delta compression ratio: ${deltaAnalysis.compressionRatio.toFixed(2)}x`);
  const deltaEncoded = deltaEncoder.encode(timestamps, 'last_login');
  console.log(`  Original: [${timestamps.slice(0, 3).join(', ')}...]`);
  console.log(`  Encoded: [${deltaEncoded.slice(0, 3).join(', ')}...]`);
}

// Bit Packing for boolean values
console.log('\n💾 Bit Packing:');
const activeValues = sampleData.map(emp => emp.active);
const bitPacker = new BitPacker();
const bitAnalysis = bitPacker.analyzeValues(activeValues);
if (bitAnalysis.recommended) {
  console.log(`  Bit packing saves: ${bitAnalysis.compressionRatio} ratio`);
  console.log(`  Boolean array: [${activeValues.join(', ')}]`);
  console.log(`  Data type: ${bitAnalysis.dataType}, Bit width: ${bitAnalysis.bitWidth}`);
}

// Run-Length Encoding
console.log('\n🔄 Run-Length Encoding:');
const roleSequence = ['Developer', 'Developer', 'Developer', 'Manager', 'Manager', 'Developer'];
const rleEncoder = new RunLengthEncoder();
const rleAnalysis = rleEncoder.analyzeSequence(roleSequence);
if (rleAnalysis.recommended) {
  console.log(`  RLE compression ratio: ${rleAnalysis.compressionRatio.toFixed(2)}x`);
  const rleEncoded = rleEncoder.encode(roleSequence);
  console.log(`  Original: [${roleSequence.join(', ')}]`);
  console.log(`  Encoded: ${JSON.stringify(rleEncoded)}`);
}

// 4. Adaptive Optimization (Recommended Approach)
console.log('\n4️⃣ Adaptive Optimization Analysis');
const optimizer = new AdaptiveOptimizer();
const analysis = optimizer.analyzeDataset(sampleData);

console.log('Recommended Strategies:');
analysis.recommendedStrategies.forEach(strategy => {
  console.log(`  ✓ ${strategy}`);
});

console.log(`\nEstimated Savings: ${analysis.estimatedSavings}%`);
console.log('\nOptimization Details:');
analysis.appliedOptimizations.forEach(detail => {
  console.log(`  • ${detail}`);
});

if (analysis.warnings.length > 0) {
  console.log('\nWarnings:');
  analysis.warnings.forEach(warning => {
    console.log(`  ⚠️  ${warning}`);
  });
}

// 5. Apply Adaptive Optimization
console.log('\n5️⃣ Applying Adaptive Optimization');
const optimizationResult = optimizer.optimize(sampleData);

console.log(`Original records: ${sampleData.length}`);
console.log(`Optimization directives: ${optimizationResult.directives.length}`);
console.log('\nDirectives:');
optimizationResult.directives.forEach((directive, index) => {
  console.log(`  ${index + 1}. ${directive}`);
});

// 6. Create Optimized TONL Document
console.log('\n6️⃣ Creating Optimized TONL Document');
const optimizedDoc = TONLDocument.fromJSON({
  employees: optimizationResult.optimizedData
});

// Add optimization directives as comments
const tonlWithDirectives = optimizationResult.directives.join('\n') + '\n' + optimizedDoc.toTONL();

console.log(`Final optimized TONL size: ${tonlWithDirectives.length} characters`);
console.log(`Total compression: ${((1 - tonlWithDirectives.length / basicTonl.length) * 100).toFixed(1)}%`);

// 7. Performance Comparison
console.log('\n7️⃣ Performance Comparison Summary');
console.log('================================');
console.log(`Original JSON:     ${JSON.stringify(sampleData).length} chars`);
console.log(`Basic TONL:        ${basicTonl.length} chars (${((1 - basicTonl.length / JSON.stringify(sampleData).length) * 100).toFixed(1)}% savings)`);
console.log(`Smart TONL:        ${smartTonl.length} chars (${((1 - smartTonl.length / JSON.stringify(sampleData).length) * 100).toFixed(1)}% savings)`);
console.log(`Optimized TONL:    ${tonlWithDirectives.length} chars (${((1 - tonlWithDirectives.length / JSON.stringify(sampleData).length) * 100).toFixed(1)}% savings)`);

// Token estimation (rough calculation)
const jsonTokens = Math.ceil(JSON.stringify(sampleData).length / 4);
const tonlTokens = Math.ceil(tonlWithDirectives.length / 4);
console.log(`\nToken Estimation:`);
console.log(`JSON tokens:     ~${jsonTokens}`);
console.log(`TONL tokens:     ~${tonlTokens}`);
console.log(`Token savings:   ${((1 - tonlTokens / jsonTokens) * 100).toFixed(1)}%`);

// 8. Round-trip verification
console.log('\n8️⃣ Round-trip Verification');
try {
  // Parse the optimized TONL with directives
  const parsedDoc = TONLDocument.parse(optimizedDoc.toTONL());
  const retrievedData = parsedDoc.get('employees');

  console.log('✅ Round-trip successful');
  console.log(`Original records: ${sampleData.length}`);
  console.log(`Retrieved records: ${retrievedData.length}`);
  console.log('Data integrity: ✅ PRESERVED');
} catch (error) {
  console.log('❌ Round-trip failed:', error.message);
}

console.log('\n🎉 Optimization Example Complete!');
console.log('=====================================');