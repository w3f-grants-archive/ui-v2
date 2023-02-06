## ParaSpell - UI-V2
![Full name (3)](https://user-images.githubusercontent.com/55763425/197985791-fc7afa52-061d-413a-bbe9-bf1123f16a50.png)

UI Tool is now available on netlify you just need to start your local network! Reffer to 3.3 .
Link to netlify - [ParaSpell UI-V2](https://bejewelled-creponne-000744.netlify.app/)

[1. Introduction](#1-introduction)<br />
[2. Overview](#2-overview)<br />
[3. Installation](#3-installation)<br />
&nbsp;&nbsp;[3.1 Prerequisites](#31-prerequisites)<br />
&nbsp;&nbsp;[3.2 Dependencies](#32-dependencies)<br />
&nbsp;&nbsp;[3.3 Network install, compilation & start](#33-network-install-compilation--start)<br />
&nbsp;&nbsp;[3.4 Application install & launch](#34-application-install--launch)<br />
&nbsp;&nbsp;[3.5 Use XYK Feature](#35-use-xyk-feature)<br />
[4. Wiki](#4-wiki)<br />
[5. Project achievements](#5-project-achievements)<br />

# 1. Introduction
ParaSpell is XCM & XCMP related tool built to save developers time when interacting with the network. It is no longer necessary to search for correct XCM pallets, fill lengthy XCM messages with all the required details or go through research on launching network. Developers can use ParaSpell to download/install/start necessary nodes with a single command, execute XCM transactions from a user-friendly UI, or open & close HRMP channels between nodes in the launched network from a user-friendly UI.

# 2. Overview
ParaSpell main advantages can be summarized in the following list:
- ParaSpell is a platform that allows developers to use specific XCM & XCMP related tasks from a user-friendly interface. 
- ParaSpell focuses on ease of use, broad scale of use cases, and bringing XCM & XCMP utilization & documentation closer to developers. 
- ParaSpell guarantees to be a completely decentralized, open-source platform that does not collect any user data. 

One of the ParaSpell main goals is to reduce the time necessary to create XCM calls or open HRMP channels.

![imgonline-com-ua-twotoone-T9tsjx0827n](https://user-images.githubusercontent.com/55763425/215355410-1315db7f-3fba-4ee0-ba0a-49b7ba1d9412.jpg)

As we can see in the figure above, the amount of details the user has to fill to transfer the XCM message is drastically reduced. As an example, users do not need to specify a specific route from origin to destination chain. These details are filled for them. 

Another goal of ParaSpell is having network installation, compilation & startup done as simply as possible. This is achieved by makefile that groups commands into fewer much more intuitive commands and by network startup configuration file. Together, these two files take care of the network side, and adding new nodes into these files is intuitive.  Starting the application is also very simple and done by one command. Communication between application and network is made possible with Polkadot API libraries.

ParaSpell focuses mainly on substrate developers. Added value comes from being user friendly SDK for simplifying development by saving time necessary to install & launch network, open HRMP channels or create XCM transfers between nodes available in network.

Overall ParaSpell is all about developer experience.

# 3. Installation
Complete guide for project installation and launch.
## 3.1 Prerequisites
Prerequisites required for cloning repository, work with Makefile and Network.

#### Linux
- Git & Make
```
sudo apt install git make
```

- DOCKER ENGINE, you can install it from this link [Docker](https://docs.docker.com/engine/install/ubuntu/) or via:
```
sudo apt-get update

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo make installDockerEngine
```
#### MacOs
- DOCKER, you can install it from this link [Docker](https://docs.docker.com/get-docker/)

- Brew, Git & Make
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install make git
```
## 3.2 Dependencies:
Depedencies necessary for network compilation & startup
#### Linux
```
sudo make initialize
```
#### MacOs
```
make initializemac
(Make sure you have sufficient permissions for usage of npm commands)
```

#### Install rust (Linux & MacOS) - Restart shell after this install 
```
make rustup
```

## 3.3 Network install, compilation & start 
```
make install
```

#### Relaunch network after it was put down.
```
make launch
```

## 3.4 Application install & launch
### Start application in docker container
```
make dockerLaunch
```
### Start application manually
#### Install dependencies & packages
```
pnpm install
```

#### Starts application for development
```
pnpm run dev
```

#### Compiles and minifies for production
```
pnpm run build
```

## 3.5 Use XYK Feature
This feature requires local network with Basilisk node.
How to start local network can be seen below:

Install polkadot-launch
```
npm install -g polkadot-launch
```

Clone and Build Relay chain repo
```
git clone https://github.com/paritytech/polkadot.git
cd ./polkadot/ && git checkout release-v0.9.36 && cargo build --release
```

Clone and Build Basilisk repo
```
git clone https://github.com/galacticcouncil/Basilisk-node.git
cd ./Basilisk-node/ && make build
```

Launch local network with Basilisk
```
cd ./rococo-local
polkadot-launch config.json
```

# 4. Wiki
If you are looking for more indepth explanation of XCM, HRMP, Query calls ParaSpell uses or you want to add new currencies/nodes to ParaSpell/Network check out our Wiki - [ParaSpell✨ Wiki 📚️](https://paraspell.github.io/docs/)

# 5. Project achievements
Project achievements in chronological order ⌛️.

- 📙 Article about project created & presented on international conference ICECET2022 held in Prague (450 out of 1000+ articles accepted) Link to IEEE publication - [IEEE Sharing Fungible Assets Across Polkadot Paraverse](https://ieeexplore.ieee.org/document/9872938/)
- 🥈 2nd Prize, Build a XCM related Tool for Moonbeam - Polkadot North America Hackathon [Hackathon entry](https://devpost.com/software/polkachange-cross-blockchain-transfer-tool)
- 🥉 3rd Prize, EVM+ DApp for aUSD yield - Polkadot North America Hackathon [Hackathon entry](https://devpost.com/software/polkachange-cross-blockchain-transfer-tool)
- 🎈 Web 3 Foundation base grant [Application](https://github.com/dudo50/Grants-Program/blob/d182e10ecbd7705aee07edc5f7aa0085d07188e5/applications/ParaSpell.md), [Delivery](https://github.com/w3f/Grant-Milestone-Delivery/pull/584)
- 🐍 [Basilisk](https://bsx.fi/) treasury proposal 2/2 Approved [link](https://basilisk.subsquare.io/treasury/proposal/2), [link2](https://basilisk.subsquare.io/treasury/proposal/4)
- 🔭 Web 3 Foundation phase 2 grant Milestone 3 / 3 delivered [Application](https://github.com/w3f/Grants-Program/pull/1245), [Delivery1](https://github.com/w3f/Grant-Milestone-Delivery/pull/670), [Delivery 2 & 3](https://github.com/w3f/Grant-Milestone-Delivery/pull/715) 

## Founded by

[<img width="245" alt="web3 foundation_grants_badge_black" src="https://user-images.githubusercontent.com/55763425/211145923-f7ee2a57-3e63-4b7d-9674-2da9db46b2ee.png">](https://github.com/w3f/Grants-Program/pull/1245)
[<img width="245" alt="web3 foundation_grants_badge_white (1)" src="https://user-images.githubusercontent.com/55763425/211069914-bbec9e28-7a0d-417b-8149-087b7f04e57e.png">](https://github.com/w3f/Grants-Program/pull/1245)

[![logo-v1](https://user-images.githubusercontent.com/55763425/204865221-90d2b3cd-f2ac-48a2-a367-08722aa8e923.svg)](https://bsx.fi/)


