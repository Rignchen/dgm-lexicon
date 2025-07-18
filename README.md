# dgm-lexicon

DevenirGameMaster is a french tabletop rpg content creator.
With his community he has multiple inside jokes, memes and references that are unknown by people outside of the community.
This situation leads to him having to explain these jokes to people he meets which can get a bit annoying.

dgm-lexicon is a website created so that people can look up these jokes and references and understand them without having to ask.

# Installation
## Manual Installation
1. Dependencies
To install dgm-lexicon, you need to have [Node.js](https://nodejs.org/) installed on your computer.\
I also recommend using [pnpm](https://pnpm.io/) as a package manager there's no lockfile for other package managers in this project.
```bash
npm install -g pnpm
```

2. Get the files
Once you have installed the dependencies, you can [download the files](https://github.com/Rignchen/dgm-lexicon/archive/refs/heads/main.zip) from the repository.\
Unzip the files in a folder of your choice.

3. Install the dependencies
Once the files downloaded and unzipped, open a terminal in the folder and run the following command:
```bash
pnpm install --frozen-lockfile
```
pnpm will install all the dependencies needed to run the project.

4. Run the project
To run the project, you can use the following command:
```bash
pnpm run start
```
This will start the development server and you'll be able to access the website at [localhost:4200](http://localhost:4200).

5. Build the project
If you want to host the project on a server, you can build it using the following command:
```bash
pnpm run build
```
This will create a `dist` folder with the built files that you can host on your server.

These files hold the entiere project under `dist/dgm-lexicon/browser`,
you can move this folder somewhere else and delete everything else if you want to.
These can be hosted on any static file server
```bash
npx http-server
```

## Docker Installation
1. Dependencies
To install dgm-lexicon, you need to have [Docker](https://www.docker.com/) installed on your computer.

2. Get the files
Once you have installed the dependencies, you can [download the files](https://github.com/Rignchen/dgm-lexicon/archive/refs/heads/main.zip) from the repository.\
Unzip the files in a folder of your choice.

3. Build the Docker image
Once the files downloaded and unzipped, open a terminal in the folder and run the following command:
```bash
docker build -t dgm-lexicon .
```
This will build the Docker image with the name `dgm-lexicon`. Once that's done, you can remove all the files if you want to.

4. Run the Docker container
To run the Docker container, you can use the following command:
```bash
docker run -d -p 80:8080 dgm-lexicon
```
This will start the production server and which will be accessible at [localhost](http://localhost).

5. Stop the Docker container
When you want to stop the website, you can use the following command:
```bash
docker stop $(docker ps -q --filter ancestor=dgm-lexicon)
```

