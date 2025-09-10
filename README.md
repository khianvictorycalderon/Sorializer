# Sorializer
Sorting Algorithm Visualizer. A utility website that visualizes data structure algorithm's sorting algorithms with complete solution.

## Usage
Enter array list separated by comma in the input field.

## To run this project:
1. Clone this repository `git clone https://github.com/khianvictorycalderon/Sorializer.git`
2. Run `npm install`
3. Run `npm run dev`

## Dependencies & Configuration
The following is a list of installed dependencies and configuration settings used in this project.
You don’t need to install anything manually, as all dependencies are already managed through `package.json`.
This section is provided for reference only, to give you insight into how the project was set up.

## Dependencies
- `npm install tailwindcss @tailwindcss/vite`

## Configuration Dependencies
- Update `package.json`:
  ```ts
  import { defineConfig } from 'vite'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [
      tailwindcss(),
    ],
  })
  ```