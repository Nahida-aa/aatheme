# Change Log

All notable changes to the "aatheme" extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.0.7] - 2025-07-10

### Added
- Custom extension icon with neon glow theme design
- Comprehensive CHANGELOG.md with detailed version history
- Icon generation script using Deno and TypeScript
- Professional SVG-to-PNG conversion workflow

### Changed
- Enhanced visual branding with custom icon
- Improved project documentation structure
- Better development workflow with icon generation tools

### Technical
- Added `scripts/svg-to-png.ts` for automated icon generation
- Updated build process to include icon generation
- Enhanced project visual identity

## [0.0.6] - 2025-07-09

### Added
- TypeScript support for custom files
- Separate TypeScript configuration for browser-compatible compilation
- Improved build process with automatic TypeScript compilation
- Enhanced code documentation and type annotations

### Changed
- Migrated `theme_template.js` to TypeScript (`theme_template.ts`)
- Updated build scripts to handle TypeScript and CSS files separately
- Improved error handling and code structure

### Fixed
- Fixed CommonJS module exports issue causing `exports` undefined errors in browser environment
- Resolved TypeScript compilation conflicts between Node.js and browser environments
- Fixed build process to properly handle mixed TypeScript/CSS content

### Technical
- Added `tsconfig.custom.json` for browser-compatible TypeScript compilation
- Updated `package.json` scripts for better build workflow
- Enhanced development experience with proper TypeScript tooling

## [0.0.5] - 2025-07-08

### Changed
- Lowered VS Code minimum version requirement to `^1.74.0` for better compatibility
- Improved user experience for older VS Code versions

### Fixed
- Fixed compatibility issues with older VS Code versions

## [0.0.4] - 2025-07-08

### Added
- Comprehensive `THEME_GUIDE.md` with detailed documentation
- MIT License for open source compliance
- Enhanced `README.md` with better installation and usage instructions

### Changed
- Unified theme naming from "Neon Dreams" to "Glow Effect" across all UI elements
- Renamed JavaScript file from `glowdreams.js` to `aatheme-glow.js`
- Updated all user-facing text for consistency

### Fixed
- Fixed theme activation and command consistency
- Improved theme detection and application logic

## [0.0.3] - 2025-07-08

### Added
- Initial theme implementation with glow effects
- Custom CSS for editor chrome modifications
- Theme activation/deactivation commands
- Configuration options for brightness and glow disable

### Features
- Neon-style syntax highlighting for multiple programming languages
- Customizable glow effects with brightness controls
- Support for TypeScript, JavaScript, Python, Rust, Go, and more
- Beautiful color scheme with carefully selected glow effects

## [0.0.2] - 2025-07-08

### Added
- Basic theme structure and configuration
- Initial color theme definition

## [0.0.1] - 2025-07-08

### Added
- Initial project setup
- Basic extension structure
- Theme foundation