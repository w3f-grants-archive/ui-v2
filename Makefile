.PHONY: install-parachain-launch
install-parachain-launch:
	npm install -g @open-web3/parachain-launch
	rustup default nightly
	rustup target add wasm32-unknown-unknown
	parachain-launch generate paraspell-network-config.yml
	cd ./output && docker-compose up -d --build

.PHONY: launch-parachain-launch
launch-parachain-launch:
	cd ./output && docker-compose down -v && docker-compose up -d --build

.PHONY: install-zombienet-linux
install-zombienet-linux:
	rustup default nightly
	rustup target add wasm32-unknown-unknown
	sudo apt-get -y update
	sudo apt-get -y install podman
	git clone https://github.com/paritytech/zombienet.git
	cd ./zombienet/javascript && npm install && npm run build && npm run zombie -- -p podman spawn ../../paraspell-zombienet-config.toml

.PHONY: launch-zombienet-linux
launch-zombienet-linux:
	cd ./zombienet/javascript && npm run zombie -- -p podman spawn ../../paraspell-zombienet-config.toml

.PHONY: install-zombienet-mac
install-zombienet-mac:
	rustup default nightly
	rustup target add wasm32-unknown-unknown
	brew install podman-desktop
	podman machine init
	podman machine start
	git clone https://github.com/paritytech/zombienet.git
	cd ./zombienet/javascript && npm install && npm run build && npm run zombie -- -p podman spawn ../../paraspell-zombienet-config.toml

.PHONY: launch-zombienet-mac
launch-zombienet-mac:
	podman machine start
	cd ./zombienet/javascript && npm run zombie -- -p podman spawn ../../paraspell-zombienet-config.toml

.PHONY: initialize
initialize:
	cd .. && chmod 777 ./ui-v2
	apt-get update && apt-get upgrade
	apt install curl npm
	npm install -g n
	n stable
	corepack enable
	curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;
	apt-get install -y git clang libssl-dev llvm libudev-dev cmake
	
.PHONY: installDockerEngine
installDockerEngine:
	 sudo apt-get update
	 sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

.PHONY: initializemac
initializemac:
	cd .. && chmod 777 ./ui-v2
	brew install curl node@18 npm pnpm docker git openssl make llvm protobuf python@3.9 

.PHONY: rustup
rustup:
	curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

.Phone: dockerLaunch
dockerLaunch:
	docker build -t paraspell . && docker run -it -p 3000:3000 --rm --name paraspell1 paraspell
