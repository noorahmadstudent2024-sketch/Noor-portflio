# skill-creator script
# This script guides users through creating a new skill

Write-Host "Welcome to the Skill Creator!" -ForegroundColor Green
Write-Host ""

# Ask what the skill does
$skill_description = Read-Host "What should the new skill do? Describe its purpose"

# Ask for trigger phrases
$trigger_phrases = Read-Host "What phrases should trigger this skill? (comma-separated)"

# Generate the skill directory name from the description
$skill_name = ($skill_description -split ' ')[0].ToLower()
$skill_dir = ".claude/skills/$skill_name"

# Create the skill directory
New-Item -ItemType Directory -Path $skill_dir -Force

# Create the SKILL.md file
$content = @"
# $((Get-Culture).TextInfo.ToTitleCase($skill_description))

$skill_description

## Description

$skill_description

## Usage

Trigger phrases: $trigger_phrases

## Parameters

None

## Examples

```
$trigger_phrases
```

This skill performs the described functionality.
"@

Set-Content -Path "$skill_dir/SKILL.md" -Value $content

Write-Host ""
Write-Host "New skill created successfully!" -ForegroundColor Green
Write-Host "Skill name: $skill_name" -ForegroundColor Yellow
Write-Host "Directory: $skill_dir" -ForegroundColor Yellow
Write-Host "Description: $skill_description" -ForegroundColor Yellow
Write-Host "Trigger phrases: $trigger_phrases" -ForegroundColor Yellow
Write-Host ""
Write-Host "The skill has been created with a basic SKILL.md file." -ForegroundColor Cyan
Write-Host "You can now customize it further as needed." -ForegroundColor Cyan