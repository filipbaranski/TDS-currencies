# TDS-currencies

This project has been set up with `npm create vue@latest` and contains most up to date libraries. Structure wasn't changed heavily, only modified in places that required it.

## How to run

1. Go to branch `main` and clone repostory.
2. When cloned, navigate to the folder and run `npm install`
3. Once installed, create `.env` file with following variables:
   `VITE_CB_API_KEY = Cuc569NXAchUYZrFxUrMEFQEP2lZhGIt`
   `VITE_CB_URL = https://api.currencybeacon.com/v1`
   This solution has been implemented as an indicator I'm aware such things should not be stored in the project, and I would not mention them here if it was actual production code.
4. Run app with `npm run dev`

## How it works and known issues

Project imitates closely Google Currency Converter and its behavior should be a 1:1 copy of aforementioned.

There is one passing test in place, which can be run with `npm run test:unit`, and it exists only to show how I would go about writing them and they were not ommited.

Similarly, typescript has been implemented only in places where Prettier and ESLint were demandng it. Generally it should be extended upon.

One missing functionality is signal abort for fetching data from api and debounce to prevent DDoS-like interaction with database. Provided api is very fast, but without current solution, users might get wrong data. Given more time I would write it in a way that would allow interacting with one input or select without any limitations while blocking others until data has been properly fetched.

All of the above appeared as a result of running out of time. In assessment instructions, I've been given around 2 hours to finish the task, but as I moved past 3,5 I decided to leave it as it is and not stretch it any longer.
