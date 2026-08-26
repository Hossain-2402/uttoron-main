# Uttoron — Post-Disaster Financial Recovery Planner

A MERN stack app that helps disaster-affected families reconstruct their finances from scratch
and track recovery against a pre-crisis income baseline.

## Third-Party Keys

None required for this build. No Stripe, maps, email, or SMS services are used.

You will generate two values yourself (not from a third party):

- `MONGO_URI` — a local MongoDB connection string, or a free MongoDB Atlas connection string if
  you don't want to run Mongo locally.
- `JWT_SECRET` — any long random string, used to sign login tokens. Generate one with:
  `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## Environment Variables

**back-end/.env**
```
PORT=5000
MONGO_URI="mongodb://localhost:27017/uttoron"
JWT_SECRET="replace_this_with_a_long_random_string"
JWT_EXPIRES_IN="7d"
```

**front-end/.env**
```
REACT_APP_API_URL="http://localhost:5000/api"
```

Both `.env` files are already included in this zip with the dummy values above. Replace
`JWT_SECRET` before deploying anywhere real.

## Install

```bash
cd back-end
npm install

cd ../front-end
npm install
```

## Run

```bash
# terminal 1
cd back-end
npm run dev

# terminal 2
cd front-end
npm start
```

Backend runs on `http://localhost:5000`, frontend on `http://localhost:3000`.

## Structure

```
uttoron/
├── front-end/
│   └── src/
│       ├── pages/      one file per page
│       ├── styles/     one CSS file per page/component
│       ├── components/ Navbar, ProtectedRoute
│       ├── context/    AuthContext (logged-in user, token)
│       └── api.js      axios instance with auth header
└── back-end/
    ├── models/         User, Income, Expense
    ├── controllers/     route logic
    ├── routes/          Express routers
    ├── middleware/      JWT auth middleware
    └── server.js
```

## How recovery numbers are calculated

- **Recovery %** — total income logged so far ÷ pre-crisis baseline income.
- **Remaining resources** — total income + aid − total expenses.
- **Minimum survival budget** — average daily essential spending over the last 30 days × 30.
- **Days funds will last** — remaining resources ÷ average daily essential spending.

## Notes

- Passwords are hashed with bcrypt before being stored.
- Auth uses JWT stored in `localStorage` on the client, sent as a Bearer token.
- No real bank linking — all data is entered manually by the user, by design.
