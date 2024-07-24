# event.y - Event Manager

![Banner](/readme/banner.jpg)

> event.y is a web application that allows its users to schedule events by choosing the venue, date and type of event. 

#### In this project used:
1. [TicketMaster API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/)
2. Firebase

---

## 🌐 BASE URL
You can access `Moviesta` by this link:
> https://eventy.onrender.com

---

## 📱 FUNCTIONALITY
#### In event.y user can:
1. Create an account
2. Search for events in and add to your library
3. Upload your own events, and also manage them

---

## 📝 PREPARING FOR IMPORTING
#### To start importing a project `If you want to run it without docker`, you need to:
[Node.js](https://nodejs.org/en) version 18.0.0 [min] and more.

## 📤 IMPORTING
Step-by-step instructions for importing the `event.y` project.

#### 1. Downloading

Clone project using the `git clone` command. To do this, you need to go to the command prompt and specify the path to the folder where you will import the project.

Next you will need to enter the following:
```bash
git clone https://github.com/azikkw/event.y.git
```

You can also [download ZIP archive](https://github.com/azikkw/event.y/archive/refs/heads/main.zip) and unpack it to the folder you want.

#### 2. Building the project with Docker 🐋
```bash
make build
```

#### 3. Building the project with Package Manager
Since the project does not contain all the necessary dependencies, you will need to install them.

To do this, you need to enter the following command:
```bash
# For npm package manager
npm install
# For pnpm package manager
pnpm install
# For yarn package manager
yarn install
# For bun package manager
bun install
```

---

## ▶️ PROJECT START

After completing all the steps described in the instructions, you can run the project in two ways:

#### 1. If you built it using Docker 🐋
```bash
# To run:
make run
```
```bash
# To stop
make stop
```

#### 2. If you built it using Package Manager
```bash
# For npm package manager
npm run dev
# For pnpm package manager
pnpm run dev
# For yarn package manager
yarn dev
# For bun package manager
bun run dev
```

#### 3. Once project is running you can access it at:
> http://localhost:3000
