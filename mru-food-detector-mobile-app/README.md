# <center>Mauritius Food Net</center><br/>

# ATTENTION

* Ne pas utiliser YARN!
* Ne jamais lancer la commande `react-native link`
* Toujours lancer `npx jetify` après `npm i` (ex: après l'installation d'un nouveau plugin)
* Utilisez les scripts à disposition via `npm run ... ` disponibles dans le package.json
<br/>
<br/>

# Configuration environnement de développement

## Installation iOS

* `npm run install-packages`

## Installation Android

* `npm run install-packages`


## Installation des certificats Firebase

Récupérer les certificats et les copier dans les répertoires suivants : 

/ios/GoogleService-info.plist
/android/app/google-services.json
<br/>
<br/>

# BUILD EN MODE RELEASE

## BUILD APK RELEASE ANDROID

* Vérifiez et mettre à jour les numéros de versions et versionCode<br/>
  **STAGING:**<br/>
    <i><u>Prendre la dernière version sur TestFlight & incrémenter par 0.0.1</u></i><br/>
      [environment.js](src/environment.js#L26) (VERSION)<br/>
      [package.json](package.json#L3) (version)<br/>
      [build.gradle](android/app/build.gradle#L133) (versionName)<br/>
      [AndroidManifest.xml](android/app/src/main/AndroidManifest.xml#L4) (android:versionName)

  **PRODUCTION:**<br/>
    <i><u>Incrémenter par 1</u></i><br/>
      [build.gradle](android/app/build.gradle#L132) (versionCode)<br/>
      [AndroidManifest.xml](android/app/src/main/AndroidManifest.xml#L3) (android:versionCode)<br/>
    <i><u>Prendre la dernière version sur TestFlight & incrémenter par 0.0.1</u></i><br/>
      [environment.js](src/environment.js#L26) (VERSION)<br/>
      [package.json](package.json#L3) (version)<br/>
      [build.gradle](android/app/build.gradle#L133) (versionName)<br/>
      [AndroidManifest.xml](android/app/src/main/AndroidManifest.xml#L4) (android:versionName)
    
  **Build APK**
  * `npm run build:android-release`
  **Bundle AAB**
  * `npm run bundleRelease:android`

## BUILD RELEASE IOS

* Dans XCODE, vérifiez vos configurations (scheme en mode release) et mettez à jour les **numéros de versions** si nécessaire (l'onglet **Général**)<br/>
  **STAGING:**<br/>
    <i><u>Incrémenter par 0.1</u></i><br/>
      ***General*** -> ***Version***

  **PRODUCTION:**<br/>
    <i><u>Prendre le dernier numéro de build sur TestFlight & incrémenter par 1</u></i><br/>
      ***General*** -> ***Build***
* **Product** -> **Scheme** -> **Edit Scheme** et passer en **Release** mode
* Si modification de configuration dans XCODE, commit & push sur Gitlab
* Lancer la commande `BUILD` à destination du périphérique (ou **Product** -> **Archive** pour enclencher le processus de déploiement sur l'Apple Store)
* Cliquer sur **Distribute App** à l'ouverture d'une nouvelle fenêtre, ensuite **Next** partout et finalement **Upload**
* <span style="color: #d50000;">Arrêter ici si **PRODUCTION**</span>
* Une fois le mail reçu d’Apple Connect indiquant que le premier processus de validation est OK, Aller sur [Appstore Connect](https://appstoreconnect.apple.com/).
* Séléctionner le projet à partir de l'onglet mon profil située en haut à droit de l'écran
* **Mes Apps** -> **Application** -> **TestFlight**
* Cliquer sur **(Manage)** à côté de Missing compliance -> Choisir **No** et **Start Internal Testing**
* Cliquer sur le numéro de build, et rajouter les détails de test et le groupe de testeurs
<br/>
<br/>

# TROUBLESHOOTING

## Fix IOS pour 'Orientation.h' file not found

XCode -> Ajouter les lignes sous la section "Header Search Paths"
$(SRCROOT)/../node_modules/react-native-orientation/iOS/RCTOrientation  -> non-recursive
$(SRCROOT)/../ios/Pods  -> recursive

## Fix IOS pour RCTImageLoaderProtocol.h not found

Dans XCode, pour chaque fichier dont XCODE se plaint, double-cliquer sur the nom du fichier en rouge, modifier **RCTImageLoaderProtocol** -> **RCTImageLoader** & sauvegarder.

## Fix null is not an object (evaluating '_reactNativeImageCropPicker.default.openPicker')

# Open XCode
* Right click on Libraries -> Add files to ...
* Select imageCropPicker.xcodeproj from node_modules/react-native-image-crop-picker/ios
* Go to the build phases tab then drag libimageCropPicker.a in Link Binary With Libraries
* In the General Tab -> drag RSKImageCropper.framework and QBImagePicker.framework to the Embedded Binaries files
* Clear Cache (Cmd + Shift + K) then execute.

## Fix Android pour Could not find tools.jar. Please check that /Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home contains a valid JDK installation.
Rajouter `org.gradle.java.home=/Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home` dans gradle.properties

## Fix iOS pour CocoaPods could not find compatible versions for pod "GTMSessionFetcher/Core"
Add `pod 'RNFBApp', :path => '../node_modules/@react-native-firebase/app'` to Podfile under `target 'mruFoodApp' do`
Run: pod install --repo-update