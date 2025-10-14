---
title: Docker environment GUI
description: Small guide on how to get a GUI that displays your docker environment info
---

This guide discusses on how to get a GUI that shows information of your docker environment 
that is not by using Docker Desktop.

## Docker Desktop

As we all know (specially if you come from the Windows world), docker is synonymous 
to `Docker Desktop` which is, _as it name implies_ a desktop app implementation that 
in the backend is powered by the `docker` engine.

I remember that I used to use it a lot, even at work, but at one point a manager 
asked the whole team to completely uninstall it, due to some licensing specificity. 
I am aware of it having a `pro` version, or whatnot. But the moment its `free tier` 
became an issue for a company that's when I started to not rely on it anymore.

## Portainer

And so, instead of relying on some closed source, licensing app, we can look at 
open-source, free alternatives. One implementation of such an idea is **Portainer**. 

You can access its repository and license terms at its 
[Github](https://github.com/portainer/portainer).

So, how do you use it? It's pretty simple, once you have `docker` installed. As 
a simple command, no extra GUI or things wrapping it. You can then run Portainer 
on its own container:

````
docker volume create portainer_data && \
docker run -d \
  -p 8000:8000 \
  -p 9443:9443 \
  --name portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
````
- We first create a volume so that we can persist things such as user data
- We then run the container as a daemon
- We bind two ports `8000` and `9443`
- We give the container a name
- We tell the container to always start on engine initialization
- We bind the hosts `docker.sock` runner to the container's `docker.sock` that way 
the container can see all the docker engine stuff from the host (and it can display 
its info)
- We also bind our docker volume previously created to the containers persistance 
directory
- Lastly we state the portainer image that we will spin up (it's the community 
edition which is totally free)

Once the container is running you should be able to just open up a **browser** 
and head to `localhost:9443`. On the first login you will have to create a user 
and a password (don't forget about these).

Once the user is created, you should be able to go into the container, and immediately 
you should be able to visualize the `local` environment ready to be connected to. 
If not just refresh the page.

If you `Live connect` the GUI will immediately show you all sorts of information in 
regards to the current docker instance you are running.

- images
- containers
- networks
- volumes
- and more

You get controls to start containers, delete, duplicate, same thing to images, 
volumes, and so on.

It is basically what _Docker Desktop_ is, but on a web app and running on its own 
container. It's pretty neat, and if you enough about **web services**, you can see how 
this opens up the possibility of literally **exposing this website** in a **server** so that 
you can allow someone to patch through and **_look at the status of the docker instance 
on a server_** by simply heading to a **URL**

## Extra Notes

Some Linux setups may differ but remember to have docker running first so that 
you can both run portainer's container, and also have the engine powering it. Otherwise 
nothing can be alive:

- `sudo systemctl start docker`
- `sudo docker ps -a`

Also, `docker` **has** to run as `sudo`. So it should always be prefixed with it.