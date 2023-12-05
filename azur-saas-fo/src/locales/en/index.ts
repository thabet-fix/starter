import acContract from './acContract.json';
import account from './account.json';
import admin from './admin.json';
import aiContext from './aiContext.json';
import auth from './auth.json';
import billing from './billing.json';
import common from './common.json';
import companies from './companies.json';
import components from './components.json';
import configuration from './configuration.json';
import dashboard from './dashboard.json';
import language from './language.json';
import languages from './languages.json';
import layout from './layout.json';
import mainMenu from './mainMenu.json';
import pack from './pack.json';
import payment from './payment.json';
import sdContract from './sdContract.json';
import template from './template.json';
import tmContract from './tmContract.json';
import users from './users.json';

export default {
  account,
  admin,
  auth,
  common,
  components,
  dashboard,
  layout,
  users,
  acContract,
  tmContract,
  languages,
  mainMenu,
  sdContract,
  payment,
  pack,
  language,
  configuration,
  companies,
  aiContext,
  template,
  billing,
} as const;
