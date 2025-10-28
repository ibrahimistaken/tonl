#!/usr/bin/env pwsh
param(
    [Parameter(ValueFromRemainingArguments)]
    [string[]]$Arguments
)

$cliPath = Join-Path $PSScriptRoot "dist\cli.js"
& node $cliPath $Arguments