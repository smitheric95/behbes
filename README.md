# behbes

### Setting up your development environment
1. Clone this directory, ensuring that it retains the name "behbes".
2. `cd` into `behbes/` and run `vagrant up`. This may take a bit of time to complete the first time it is run.
    - N.B. Towards the end of the installation, the terminal will show 'y' seemingly endlessly. This is the intended behavior--just give the script some time to complete. Unfortunately, there's no alternative for this behavior at this time.
3. Once the script has completed, open a browser and navigate to `192.168.50.4:8100` in your browser to begin development, working out of the `behbes/` directory.

### Build and Run
1. Navigate to webApp directory
2. Run "composer install" (Make sure to install composer on your local machine.)
3. Run "php -S localhost:8100 -t public public/index.php"
4. Navigate to webApp/public/myApp
5. Run "ionic serve" - install node dependecies if prompted
5. open "http://localhost:8100" in browser

