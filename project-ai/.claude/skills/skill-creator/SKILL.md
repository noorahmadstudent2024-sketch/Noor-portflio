# Skill Creator

A skill that helps create new skills by guiding through the process of defining what the skill does, trigger phrases, and generating the complete SKILL.md file.

## Description

This skill guides users through creating new Claude Code skills by:
1. Asking what the skill does
2. Asking for trigger phrases
3. Generating a complete SKILL.md template

## Usage

When prompted, provide:
- A clear description of what the new skill should do
- Trigger phrases that should activate the skill
- Any specific requirements or parameters

## Parameters

- `--interactive`: Enable interactive mode to guide through creation process

## Examples

```
skill-creator --interactive
```

This will start an interactive session to create a new skill.