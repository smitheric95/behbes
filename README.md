# behbes

### Build and Run
1. Install [Vagrant](https://www.vagrantup.com)
2. Navigate to this repo in terminal and run "vagrant up"
3. Naviagate to myApp repo and run "npm install"
4. run "ionic serve"
5. Open "http://192.168.50.1:8080" in browser

Web App(after Vagrant up)
1. Navigate to webApp directory
2. run "composer install"(either install composer on ur local machine or vagrant ssh and navigate to directory)
2. run "php -S localhost:8088 -t public public/index.php"
3. open "http://localhost:8088" in browser

Some useful vagrant commands:

vagrant up: gets vagrant up and running - run when you're about to develop

vagrant halt: saves state up the machine - run when you're done developing

vagrant destroy: destroys the machine - run when things aren't working

