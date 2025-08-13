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
- Everything under `src/content/docs` that's where most of the time is spent. In there 
new folders will mean new sections for the _sidebar_, and by adding a new `.md` file 
a new entry will be automatically populated.
-- _How does this work?_ Just have a look at `astro.config.mjs`, in there under the 
`sidebar:` section you will see how this is setup to take in a folder and create 
a section for it, and just auto-create entries based on the different `.md` files that 
might be created under said folder.