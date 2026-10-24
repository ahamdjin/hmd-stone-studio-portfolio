# Architecture & Interior Design Studio — website template

A portfolio site for a studio that does both the buildings and the rooms inside
them. Five pages: the work (a full-bleed project grid), a project case study, an
about page, a team page, and an enquiry form.

The hero and the card headlines both show a picture through the letters. The hero
draws video frames onto a canvas; the cards use a still photo with
`background-clip: text`, which needs no JavaScript. Both fall back to a plain
headline if the browser cannot do it, and both hold still for anyone who asks for
reduced motion.

Project content lives in one file: `src/data/projects.ts`. The page gutter is one
CSS class, `.site-shell`, shared by the nav and every page so their left and right
edges line up with the card text.

## Project info

**URL**: https://lovable.dev/projects/ed798653-3aab-4b89-bc12-418b54b0a6db

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ed798653-3aab-4b89-bc12-418b54b0a6db) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ed798653-3aab-4b89-bc12-418b54b0a6db) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

# ./tailwind-plus folder:

The tailwind-plus folder contains tailwind components and themes to be used as inspiration for the project. DO NOT REMOVE THE FOLDER UNLESS SPECIFICALLY TOLD TO DO SO
