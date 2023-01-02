# Analytics demo

This is a demonstration project that uses generated data and allows users to upload a CSV file to view the results as graphs and tables.

Data was generated with the Faker.js library, written to a JSON file, and then converted to CSV for use as a "demo.csv" file.
Go to <strong>"./server/src/utils/fake_data.js"</strong> to learn more about how data was generated.

## Tech Stack

**Client:** React, TailwindCSS, Chartjs, DaisyUI

**Server:** Node, Express, MySQL

## Run locally

Clone the project and make sure you have node, npm installed on your local machine.

```bash
  git clone git@github.com:ginnyvt/demo-analytics.git
```

To generate new dataset, run

```bash
  npx json2csv -i path/to/fake_data.json -f store,product,date,sales -o new_file_name.csv
```

To run client, go to the client directory

```bash
  cd client
```

Install dependencies and start client server

```bash
  npm install && npm run dev
```

To run server, go to the server directory

```bash
  cd server
```

Run docker and start database service

```bash
  docker compose -f docker-compose.yml up
```

Install dependencies and start backend server

```bash
  npm install && npm run dev
```

## Demo

Link to [demo](https://demo-client-bhs.pages.dev/)

## Authors

- [ginnyvt](https://github.com/ginnyvt)

## License

[MIT](https://choosealicense.com/licenses/mit/)
