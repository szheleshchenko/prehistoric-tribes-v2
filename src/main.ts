import { appConfig } from './configuration';

const title = document.getElementById('title');

if (title) {
  title.innerText = appConfig.title;
}
