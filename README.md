# behbes

### Build and Run the Mobile Version (different from normal, one will not work with the other on the same branch)
1. Pull the mobile branch
2. Got to Xcode -> Preferences -> Accounts and add your Apple ID there.
3. Use that same Apple ID to register for an Apple developer account.
4. Navigate to webApp/public/myApp
5. (Do not have your phone plugged in at this point) Run "ionic cordova build ios" - you will have to do npm install -g ios-deploy and regular npm install/update to make sure everything is right
6. once this is complete, do "open ." and navigate to platforms/ios and open the .xcode project
