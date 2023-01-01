# Analytics demo

This is a demonstration project that uses generated data and allows users to upload a CSV file to view the results as graphs and tables.

Data was generated with the Faker.js library, written to a JSON file, and then converted to CSV for use as a "demo.csv" file. Go to <strong>"./server/src/utils/fake_data.js"</strong> to learn more about how data was generated.

## Tech Stack

**Client:** React, TailwindCSS, Chartjs, DaisyUI

**Server:** Node, Express, MySQL

## Getting started

Clone the project

```bash
  git clone git@github.com:ginnyvt/demo-analytics.git
```

Make sure you have node, npm installed on your local machine.
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

Link to demo

## Authors

- [ginnyvt](https://github.com/ginnyvt)

## License

[MIT](https://choosealicense.com/licenses/mit/)
