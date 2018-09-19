require('geckodriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  try {
    // seleniumhub is the name of the selenium container used in the docker-compose file 
    let driver = await new Builder().forBrowser('firefox').usingServer('http://seleniumhub:4444/wd/hub').build();

    // wordpress is the name of the wordpress container used in the docker-compose file
    await driver.get('http://wordpress:80');
    
    //basic test to hit the website and print out the title of the website
    var title = await driver.getTitle();
   	console.log(title);
    await driver.quit();

    console.log('SUCCESS');
  } catch(err) {
  	console.log('ERROR : ' + decodeURI(err));
  }
})();
