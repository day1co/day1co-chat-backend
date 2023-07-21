## DAY1CO CMS STANDALONE SERVER

### Usage

link service packages into server package

- fastify (with typeorm) web server

## Ready to Project

```
npm i -g npm@7
npm i
```

## API Server

```
http://localhost:8001
```

## API Document

```
http://localhost:8001/docs
```

## set variable

```
// Local DB Endpoing
REDSTONE_MYSQL_URL=mysql://root:root@127.0.0.1/fastcampus_test

// set config-server
// for window
$env:NODE_ENV="test"
$env:REDSTONE_MYSQL_URL="mysql://root:root@127.0.0.1/fastcampus_test"
$env:SPRING_CLOUD_CONFIG_LABEL="main"
$env:SPRING_CLOUD_CONFIG_PROFILE="test"
$env:SPRING_CLOUD_CONFIG_NAME="cereal"
$env:SPRING_CLOUD_CONFIG_URI="http://localhost:8888"

// for mac
export NODE_ENV=test
export REDSTONE_MYSQL_URL=mysql://root:root@127.0.0.1/fastcampus_test
export SPRING_CLOUD_CONFIG_LABEL=main
export SPRING_CLOUD_CONFIG_PROFILE=test
export SPRING_CLOUD_CONFIG_NAME=cereal
export SPRING_CLOUD_CONFIG_URI=http://localhost:8888
```

## run config-mock server

```
npm run config-mock
```

## migrate

```
npm run test:migrate
```

## jest test all service

```
npm run test

```

## jest test target service

```
npm run test [target file].spec.ts

```

## start

```
npm run serve
```
