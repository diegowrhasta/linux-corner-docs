# Diego's Linux Corner

This is a project started with the command:

````
pnpm create astro --template starlight linux-corner
````

## Workflow

Nothing fancy has been done with the template (just yet), so the way to work with 
this is pretty simple:

- We use **pnpm** in this house. We tend to stray further away from **npm** due to 
the amount of space it takes, use `pnpm` it's the cooler version.
    - So just go inside the project folder, `pnpm install` and you can start the 
    server with `pnpm dev`.
- Everything under `src/content/docs`, that's where **_most of the time is spent_**. 
In there new folders will mean new sections for the _sidebar_, and by adding a new 
`.md` file a new entry will be **automatically populated**.
    - _How does this work?_ Just have a look at `astro.config.mjs`, in there under the 
`sidebar:` section you will see how this is setup to take in a **folder** and **create 
a section for it**, after that it **auto-creates entries** based on the different 
`.md` files that might be _created under said folder_.

## CI/CD

### Publish Pipeline

- A pretty simple CI/CD pipeline has been setup at `/.github/workflows`, this takes care of 
simply scanning for any commits that have a flag (`--p`), if they do, it will then 
run a simple build and deploy (to firebase) of the [docs page](https://linux-corner.dsbalderrama.top).

If you want a rundown of what the action does, you can read the code, but at a 
high level, these are the steps:

- **Build**
    - Only if the last commit (head commit) has `--p` in the message it will then run 
    this first step that is tied into the second one.
    - We establish the `strategy > matrix` syntax so that we might run the action 
    across different node versions (if need be).
    - We basically run standard github action pre-built workflows to check out the code, 
    install packages (with a --frozen-lockfile) and with `pnpm` configured.
    - If nothing fails, we will proceed to deployment.
- **Deploy**
    - We establish that this step needs the `ci` step to be successful, hence if it 
    gets skipped this also gets skipped.
    - We do standard checkout, install, stuff (remember that each step has its own 
    runtime, we don't keep state, but caching is configured so that we don't download 
    all the packages again).
    - We have configured on the project's repository a **SECRET** variable under 
    `GCLOUD_SERVICE_ACCOUNT`, and this is the `.json` credential we got from Google 
    Cloud Console as a `.json` file but we are putting it in github as text form.
    - We do some hacking here to create a `.json` file with this secret variable info, 
    and apply it as env variables so that once we run the `pnpm run deploy` command, 
    we are all setup to deploy to the specific Firebase project that we want to deploy 
    to through Service Account credentials.
    - As a final security measure, we make sure of deleting the temporal `json` 
    file we dumped our secret's text to.

### Cache Cleanup Pipeline

Because we are leveraging github actions and their pre-built actions for setup, 
we have caches being saved into the repository. A good practice is to do the 
**house keeping and delete caches that are old and no longer needed** since they contain 
dependencies that are no longer the ones for the new version of the project. You can 
read the github action at `/.github/workflows/cache-cleanup`.yml. But in short this 
leverages the _GitHub API_ in order to query for the caches of the repository, and 
it will **only keep up the latest one**, all previous caches will be deleted. This is 
a _CRON_, it will always run at 00:00 **every day.**

**_NOTE:_** Something interesting that Github does is to turn off these **CRON** 
type of actions if a repository **hasn't been active** for a while (around 60 days).

## Deploying manually

This is not recommended, since the idea is to **automate as much as possible**. 
But in any case, if you want to deploy to firebase directly, steps are as follows:

- `pnpm install -g firebase-tools`
- `firebase login` (Log into the account that has the Firebase Hosting space)
- `pnpm run install` `pnpm run build` (this will generate a `dist/` folder)
- _Only on the first run you would have to do this_.
    - `firebase init hosting`
    - Select the corresponding firebase project that should be setup on the **Firebase 
    side**
    - Public directory should be `dist`
    - SPA -> `N`
    - Overwrite -> `N`
    - This will create a `firebase.json` file (this can be put into VC, don't worry)
- `pnpm run deploy`

## About domains

This varies entirely on the provider you have bought a domain from. And for obvious 
**_Security Reasons_**, I shan't reveal which one I use. But in short, you **should** 
have a way to add **sub-domains to a domain** you bought, and through simple **redirections** 
you should be able to serve both `www.` and the simple `<name>.com` URLs. This is 
done by adding a **CNAME** entry that maps to the **actual Firebase direction** (this should 
be the without `www` url), and a second entry (for the `www.` version) that maps to the 
first URL that we configured, this is so that we adhere to industry standard and we don't 
have the `www` at the search bar. (I'm pretty sure this is what SEO takes into 
account).

_Example:_

````
bro.domain.com -> web.app.vercel.com # First CNAME entry without www.
www.bro.domain.com -> bro.domain.com # Second CNAME entry with www. that will simply 
make it bounce to the previously main entry point to then the hosting provider.
````