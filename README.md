# dgm-lexicon

DevenirGameMaster is a french tabletop rpg content creator.
With his community he has multiple inside jokes, memes and references that are unknown by people outside of the community.
This situation leads to him having to explain these jokes to people he meets which can get a bit annoying.

dgm-lexicon is a website created so that people can look up these jokes and references and understand them without having to ask.

# Add entries
If you want to contribute to the project, the easiest way is to send me a message on [discord](https://discord.com/channels/1207648183178760262/1391567892734021702) with
- the title of the entry
- the description of the entry (markdown is supported)
- the date when the entry first appeared
- the tags associated with the entry

If you prefer to do it yourself, you can get the file `db.csv` under [`db.csv`](https://rignchen.github.io/dgm-lexicon/db.csv) or in the repository under [`publics/db-prod.csv`](https://github.com/Rignchen/dgm-lexicon/blob/main/public/db-prod.csv).\
Once you have the file, the easiest way to edit it is to use a spreadsheet software like [LibreOffice Calc](https://www.libreoffice.org/download/download-libreoffice/) or [Microsoft Excel](https://www.microsoft.com/en-us/microsoft-365/excel).\
In the spreadsheet, add a new row at the bottom of it with the following columns:

| id | word | definition | first_time_used | tags |
|----|------|------------|-----------------|------|
| take the last id + 1 | the title of the entry | the description of the entry (markdown is supported) | the date when the entry first appeared (format: YYYY-MM-DD) | the tags associated with the entry (comma separated), you can find the list of tags at the top of the spreadsheet |

Once your modifications done, save it back to csv and send it to me so I can update the website.

If you are confortable with git and github, you can also open a pull request with your changes instead of sending me the file.

## Microsoft Excel
While most spreadsheet software (including libreoffice calc) have no problem with csv files in UTF-8 (=all characters), it is not the case for Microsoft Excel.\
To open the file in Excel, you need to follow [these steps](https://support.microsoft.com/en-us/office/opening-csv-utf-8-files-correctly-in-excel-8a935af5-3416-4edd-ba7e-3dfd2bc4a032):
1. Open Excel
2. Create a new blank spreadsheet
3. Go to the `Data` tab
4. Click on `Get Data` > `From File` > `From Text/CSV`
5. Select the `db.csv` file
6. In the preview window, verify that the `File Origin` is set to `65001: Unicode (UTF-8)` and the `Delimiter` is set to `Comma`
7. Click on `Load`

Once your modifications are done, do not export it back to csv as Excel will replace all accented characters with `�`, instead save it as an Excel file and send it to me, I can convert it back to csv using LibreOffice Calc.

# Installation
## Just use it
If you just want to visit the website without installing anything, it is available at [https://rignchen.github.io/dgm-lexicon/](https://rignchen.github.io/dgm-lexicon/).

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

