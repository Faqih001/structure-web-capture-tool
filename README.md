# Structure Web Capture Tool

A web-based tool for capturing and analyzing website structures. This tool helps developers and designers understand website layouts and hierarchies through visual and code-based analysis.

## Features

- Website structure analysis and visualization
- HTML source code extraction and viewing
- Screenshot capture capabilities
- Responsive design support
- Interactive structure navigation
- Code syntax highlighting
- Download captured data

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd structure-web-capture-tool
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # React components
│   ├── ui/        # UI components from shadcn
│   └── ...        # Custom components
├── hooks/         # Custom React hooks
├── lib/          # Utility libraries
├── pages/        # Page components
└── utils/        # Helper functions
```

## Building for Production

To create a production build:

```sh
npm run build
```

The built files will be available in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
