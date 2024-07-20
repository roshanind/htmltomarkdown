# HTMLtoMD Editor Documentation

## Overview

HTMLtoMD is a powerful web-based Markdown editor designed to provide an intuitive and efficient editing experience. Built with React, TypeScript, and Vite, this editor integrates a variety of plugins and UI components to enhance the Markdown editing capabilities.

## Features

- **Markdown Editing**: Offers real-time Markdown editing with support for various Markdown syntaxes.
- **Plugin Support**: Includes a wide range of plugins for extended functionality such as headings, quotes, lists, tables, and more.
- **Theme Customization**: Utilizes Material-UI for theme customization, allowing for a personalized editing environment.
- **Undo/Redo Operations**: Supports undo and redo operations for hassle-free editing.
- **Image and Link Insertion**: Provides tools for easy insertion of images and links.
- **Code Block Support**: Allows for the insertion of code blocks with syntax highlighting for different languages.
- **Diff View**: Enables viewing changes made to the Markdown content, comparing the current content with the last edited version.

## Components

### MDEditor

The main component of the application, responsible for rendering the Markdown editor and integrating various plugins for enhanced functionality.

- **Location**: [src/components/globals/MDEditor.tsx](src/components/globals/MDEditor.tsx)
- **Key Features**:
  - Dynamic plugin integration
  - Markdown content editing and viewing
  - Custom toolbar for Markdown formatting

### UI Components

#### Theme Customization

Customizes the appearance of the editor and its components using Material-UI's theme customization capabilities.

- **Location**: [src/components/ui/theme/index.ts](src/components/ui/theme/index.ts)
- **Key Features**:
  - Customized button styles
  - List item and dialog action styling
  - Chip component variants for tags

## Getting Started

To get started with HTMLtoMD, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Start the development server with `npm start`.

## Building and Deployment

To build the project for production, run `npm run build`. This will generate a production-ready build in the `dist` directory.

## Contributing

Contributions to HTMLtoMD are welcome! Please refer to the project's issues tab on GitHub to find areas where you can help.

## License

This project is licensed under the MIT License.

## Acknowledgments

- This project uses @vitejs/plugin-react and @vitejs/plugin-react-swc for Fast Refresh capabilities.
- ESLint configuration can be expanded as described in the README for production applications.
