---
title: My VMs in QEMU have no internet
description: A guide forged in failures, to troubleshoot and fix VMs with no internet
---

Everything was working fine, until I ran update/upgrade of packages. And also suspended 
_forcefully_ whilst some VMs were still running in the background. _To this day the 
exact root cause is anyone's guess_

## Steps towards resetting qemu

So just to get some concepts out of the way. All VMs that are spun up by qemu, 
**need to bind towards a virtual network adapter**, this network adapter pipes into 
the host's network adapter, and has traffic redirected to the internet, and from the 
internet towards the VM. _That's the key concept here_.

So if we have this `virtual network adapter` concept in mind, and there's no internet 
in our VM, then we should work towards, _reconfiguring, restarting, rebuilding_ 
said virtual network adapter.

And so a good start is to first, delete all the networks that might be currently 
registered:

- `sudo virsh net-list --all` = Will list all the virtual networks that might be 
registered
- You should delete all the ones that might be there with `sudo virsh net-destroy 
default` (example to destroy the `default` network)
- And then with `sudo virsh net-undefine default` you can wipe it
- Once you have **no networks** you should create a new `default` one with the help 
of XML, create a temporal xml file wherever you want, and save this content:

````xml
<network>
  <name>default</name>
  <bridge name='virbr0' stp='on' delay='0'/>
  <forward mode='nat'/>
  <ip address='192.168.122.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.122.2' end='192.168.122.254'/>
    </dhcp>
  </ip>
</network>
````

Now you need to register the network using this xml as its "base"

- `sudo virsh net-define mynet.xml`
- `sudo virsh net-start default`
- `sudo virsh net-autostart default` (this makes sure the network always starts 
on boot-up and you don't have to start it yourself)

After that you can check if the virtual network is up: `ip addr show virbr0`

Now, **don't panic**, if you see the interface's info with words such as `<NO-CARRIER>`, 
and `state DOWN`. That's **expected**, in the world of virtual bridges, they **stay 
down** until a VM _actually plugs into it_. As soon a VM is started, you can double 
check, but the bridge will switch to `UP`.

## Network is brand new, still nothing

Another possible culprit could be the firewall, so you can run `sudo systemctl stop ufw`, 
to stop the firewall for a bit, and check in the VM if you can `ping 8.8.8.8`. 

If it doesn't... _keep reading_

You can check if the system is setup to allow packets to pass from the virtual bridge 
to the physical connection: `sysctl net.ipv4.ip_forward` (It should say `=1`).

And then, inside the VM you should check if your network configuration actually 
has been setup to the network and with a valid IP to the one that the virtual 
network was setup: `ip addr`, `ip route`.

If everything seems to be going okay, you can still try debugging/troubleshooting, 
and run a command like this: `sudo nft list ruleset | grep 192.168.122.0`. Notice 
that the IP address here corresponds to the default gateway of the virtual network 
that we configured [up above](#step-towards-resetting-qemu). You should see 
`masquerade` somewhere, this would confirm that the VMs traffic will be translated 
to the host's physical connection.

If all these checks **pass**, then we have to look at the _host's routing table:_ 
`ip route show`. In here you should look for `vnet0` being correctly plugged into 
`virbr0`, otherwise you might have to connect them here.

## The actual solution

Everything so far, went okay, meaning all checks passed, but still VM didn't have 
internet. _Frustrating_.

But it's through the `ip route show` command that something else came to life: 
`docker` was also mentioned.

**IMPORTANT:** Docker and Libvirt/QEMU on Linux have **firewall wars**. Docker often 
sets the default policy of the `FORWARD` chain to `DROP`, which kills QEMU's ability 
to send traffic to the internet even with NAT rules that are **correct**

_Why is this?_ Our QEMU and Docker setup resulted in a **"double bridge"**, Docker 
is _very aggressive_ with `iptables`. Even if the firewall is stopped `ufw`, Docker's 
internal `iptables` remain active and block anything that he himself didn't create 
(i.e., QEMU VMs).

And so, better to manually configure the `virbr0` traffic to be forwarded on the 
bridge (in and outbound):

- `sudo iptables -I FORWARD -i virbr0 -j ACCEPT`
- `sudo iptables -I FORWARD -o virbr0 -j ACCEPT`

**ALAS,** with this, the VM managed to hit the web. `ping 8.8.8.8` was returning 
packages!

## Don't forget clean up

Way before, we turned the firewall off (`sudo systemctl stop ufw`). In truth, `ufw` 
is a user-friendly "front-end" for the same `iptables` system.

- If we leave `ufw` off, the computer will rely on the NAT of the router for protection. 
However, it makes your linux installation less safe (this is a second layer of 
protection)
- **BUT DON'T JUST TURN IT BACK ON, IT WILL WIPE THE RULES WE SET for `iptables`**

Well, _actually, yes turn it back on_, but also run these two commands to make the 
forwards **permanent:**

- `sudo ufw route allow in on virbr0`
- `sudo ufw route allow out on virbr0`

With this, finally, `Docker` and `QEMU` can coexist. And our VMs get access to 
the internet no issue. _Stay safe out there_.