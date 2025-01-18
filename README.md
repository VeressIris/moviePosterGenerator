# Minimalist Poster Generator

A web app that generates minimalist movie/TV show posters using only an image uploaded by the user.

See it in action at: https://minimalist-poster-generator.vercel.app

![image](https://github.com/user-attachments/assets/737e2cd8-8706-455a-af13-8168d2875687)
![image](https://github.com/user-attachments/assets/8ac2d048-70aa-4bcd-8dcf-174a92adea1d)
![image](https://github.com/user-attachments/assets/228e93f2-48d4-4687-bcb3-87e63a6be80c)


# Technologies

- Sveltekit
- Tailwindcss
- [TheMovieDB API](https://developer.themoviedb.org/docs/getting-started) - for getting movie/tv show data
- [Svelte Easy Crop](https://github.com/ValentinH/svelte-easy-crop) - for image cropping
- [ColorThief](https://www.npmjs.com/package/colorthief) - for extracting the color palette from the image

# Building yourself

Here are the instructions for setting up a svelte project:

## Setting up Svelte

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

### Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Tailwindcss

The instructions for setting up Tailwindcss with Sveltekit can be found here https://tailwindcss.com/docs/guides/sveltekit

## TheMovieDB API
Add your API key from 

## ColorThief
install colorthief
```bash
npm install colorthief
```

## Svelte Easy Crop
install svelte easy crop
```bash
npm install svelte-easy-crop
```
