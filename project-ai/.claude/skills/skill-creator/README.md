# Skill Creator

A skill that helps create new skills by guiding through the process of defining what the skill does, trigger phrases, and generating the complete SKILL.md.

## Purpose

This skill simplifies the process of creating new Claude Code skills by providing an interactive workflow that:
1. Asks what the skill does
2. Asks for trigger phrases
3. Generates a complete SKILL.md file with a basic structure

## How It Works

The skill-creator guides users through a series of prompts to collect necessary information for a new skill:

1. **Skill Description**: User describes what the new skill should do
2. **Trigger Phrases**: User specifies phrases that should activate the skill
3. **Automatic Generation**: Creates a new skill directory with a basic SKILL.md file

## Files

- `SKILL.md`: Documentation for the skill-creator itself
- `skill-creator.js`: Script that implements the interactive creation process

## Usage

Run the skill-creator interactively to create a new skill:

```
skill-creator --interactive
```

Follow the prompts to define your new skill, and the tool will automatically create the necessary files in the appropriate directory structure.