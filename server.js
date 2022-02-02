const inquirer = require("inquirer");
const router = require('inquirer').Router();

const routes = require('./routes')

const app = express();
const PORT = process.env.PORT || 2001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => { console.log(`Server listening on PORT`); })