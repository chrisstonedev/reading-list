# Reading List

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It was created in
order to learn Next.js, React, and Tailwind CSS development and have more practice with Sanity.io.

I had been recommended dozens of books by several coworkers and, after turning their lists into a large spreadsheet, it
just seemed to me like the next logical progression was to move this data into a headless CMS that can be fetched by a
web app at build time to create a Jamstack static site that uses serverless functions to update this data so my friends
and coworkers can build their own recommendation and wish lists, right?

This app is hosted on Netlify and can be found at [reading.engineering](https://reading.engineering).

[![Netlify Status](https://api.netlify.com/api/v1/badges/9c5a06da-ee42-42c3-9b71-58ddc089ca43/deploy-status)](https://app.netlify.com/sites/reading-engineering/deploys)

## Development

### Prerequisites

This project requires the NPM package manager.

In addition to installing the packages defined in `package.json`, this project also requires that the Netlify CLI and
Sanity.io CLI are installed globally. In addition to this, the Netlify CLI must be used to link this workspace with a
Netlify account to be able to run services like Netlify Identity and Netlify Functions on a local server.

```bash
npm install
npm install netlify-cli @sanity/cli -g
netlify link
```

### Writing code

New pages can be created by adding them to the `/pages` directory. Components can be created by adding them to
the `/components` folder.

### Back-end changes

To make schema changes to the back-end CMS, edit the files in `/backend/schemas`.

To run Sanity Studio and view the available data, navigate into the `/backend` folder, run `npm install` and then
run `sanity start`. You will need to authenticate to gain access.

### API calls

Read-only data is fetched within the pages themselves and is pre-fetched at build time. Updates are abstracted into
the `/functions` directory. This is the folder specified in `netlify.toml` for the serverless Netlify Functions that the
app can call at runtime. They use the GROQ query language and will require a token from Sanity to be placed in an
environment variable to be able to run.

### Running

Run `netlify dev` to run the app on a local server.

### Deploying

Run `npm run build` to build the project into the  `/.next` folder. On the Netlify project, install the Essential
Next.js plugin and have the build process run this command and pull from this folder.

## Future work

I plan to return to this project someday to add the following features:

* Add Netlify Forms support to allow users to suggest books not already listed.
* Add an authors view to see all authors that have books on the list and view books from that specific author.
* Personal lists that can be shared or printed that filter out books that the logged-in user has not recommended or
  placed on a wish list (in other words, make "wish list" an actual list).
* Add more information about the publisher of these books and links to purchase each book.
