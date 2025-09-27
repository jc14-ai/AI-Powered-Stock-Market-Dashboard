# PredictaBoard AI
## A dashboard uses to display stock market charts, and also predicts the next price for a stock.

## Development Installation
  1. Clone the repository.

     ```bash
     git clone https://github.com/jc14-ai/PredictaBoard-AI.git
  2. Navigate to project directory.

     ```bash
     cd PredictaBoard-AI
  3. Create local environment.

     ```bash
     python -m venv venv
  4. Activate venv script.

     ```bash
     venv/Scripts/activate
  5. Install requirements.txt

     ```bash
     pip install -r requirements.txt
  6. Navigate to client side directory and install node packages and tailwindcss.

     ```bash
     cd frontend
     npm install
     npm install tailwindcss @tailwindcss/vite
  7. Add the @tailwindcss/vite plugin to your Vite configuration.

     ```Javascript
     import { defineConfig } from 'vite'
     import tailwindcss from '@tailwindcss/vite'

     export default defineConfig(
       {plugins: [
           tailwindcss(),
         ],
       }
     )
     ```
  8. Add an @import to your CSS file that imports Tailwind CSS.

     ```Javascript
     @import "tailwindcss";
     ```
  9. Run the development.

      ```bash
      npm run dev
  10. Navigate to server side directory then install express and dependencies.

      ```bash
      cd ../backend
      npm init -y
      npm install express
  11. Remove type attribute in package.json

      ```bash
      { "type": "module" }
  12. Install express' typescript dependencies

      ```bash
      npm install -D typescript
      npm install -D @types/express
  13. Create a json of typescript configuration.

      ```bash
      npx tsc --init
  14. In tsconfig.json set verbatimModuleSyntax to false,
      esModuleInterop to true,
      add "rootDir": "./src",
      add "outDir": "./dist".

      ```Javascript
      {
        "verbatimModuleSyntax": false ,
        "esModuleInterop": true,
        "rootDir": "./src",
        "outDir": "./dist"
      }
      ```
   15. Install nodemon.

       ```bash
       npm install -D nodemon
   16. Install ts-node to run typescript directly without compiling it first into JS.

       ```bash
       npm install -D ts-node
   17. Add this inside the "scripts" of package.json file.

       ```Javascript
       {
         "build": "tsc --build",
         "start": "node ./dist/index.js",
         "dev": "nodemon ./src/index.ts"
       }
       ```
   18. Run server side development.

       ```bash
       npm run dev
   19. Run Flask development environment.

       ```bash
       python App.py
