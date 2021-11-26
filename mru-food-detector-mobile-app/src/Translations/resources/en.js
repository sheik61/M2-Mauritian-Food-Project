export default {
  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Transverse
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Common terms
  common: {
    email: 'Email',
    password: 'Password',
    name: 'Last name',
    firstname: 'First name',
    country: 'Country',
    choosePic: 'Choose a picture',
    camera: 'Camera',
    gallery: 'Gallery',
    cancel: 'Cancel',
    save: 'Save',
    update: 'Update',
    ok: 'OK',
    loading: 'Loading...',
    category: 'Category',
    handicapIndex: 'Handicap (index)',
    initials: 'Initials',
    chooseCategory: 'Choose the category',
    chooseTee: 'Choose the tee',
    chooseAnotherInitials: 'Please choose anoter initials',
    enterValidHandicap: 'Please enter a valid handicap',
    next: 'Next',
  },

  // Navigation
  navigation: {
    myCollection: 'My collection',
    myMap: 'Map view',
  },

  // Warning messages for offline mode
  initialWarning: {
    modal: {
      title: 'Offline Mode',
      message:
        'If you already have an account, please connect. Otherwise your new spot will be added automatically on your future account when you sign up.',
      buttonText: 'I understood',
      messageAlreadyHaveOneSpot:
        'Your spot is stored only in your phone. Please create an account to avoid losing it.',
      messageAlreadyHaveManySpots:
        'Your spots are stored only in your phone. Please create an account to avoid losing them.',
      understoodButtonText: 'Create an account',
      laterButtonText: 'Later',
    },
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Login and Registration
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Login page
  login: {
    title: 'Log in',
    subTitle: 'MRU Food Net',
    text: 'Mauritian Food detection',
    button: 'Log in',
    notRegisteredMessage: 'Not registered yet?',
    createAccount: 'Create an account',
    skip: 'Skip for now',
    forgotPassword: 'Forgot your password?',
    lostSpot:
      'You need to log in to be able to save your spots on your profile. Otherwise you might lose them.',
  },

  // Registration page
  registration: {
    title: 'Create an account',
    button: 'Sign up',
    alreadyHaveAnAccount: 'Already have an account?',
    // Account created
    signupMessage:
      'Your account has been created successfully. You can now login with your credentials',
    modal: { title: 'Welcome' },
    category: {
      man: 'Man',
      woman: 'Woman',
      youth: 'Youth',
    },
  },

  // Error messages
  errors: {
    emailError: 'Please enter a valid email',
    passwordError: 'Please enter a password',
    chooseName: 'Please enter your name',
    handicapError: 'Please enter your handicap',
    handicapFormatError: 'The format of your handicap is incorrect',
    passwordConfirmationError: 'Passwords do not match',
    enterNewPasswordError:
      'The password must contain at least 8 characters including a capital letter, a number, and a special character',
    nameError: 'The proposed name is not valid',
    playServicesNotAvailable:
      "The app won't work without Google Play Services.",
    generalError: 'An error just occurred',
    countryError: 'Please enter your country',
    connectionError: 'You are currently offline',
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Profile
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Profile page
  userAccount: {
    handicap: 'Handicap (index) {{handicap}}',
    myAccount: 'My Account',
    aboutApp: 'About us',
    rateApp: 'Rate the app',
    shareApp: 'Share the app',
    signOut: 'Sign out',
    guestExit: 'Exit',
  },
  // My account page
  myAccount: {
    countryPickerSearchText: 'Enter country name',
    licenceNo: 'Licence number',
  },
  about: {
    reportABug: 'Report an issue',
    privacyPolicy: 'Privacy policy',
    legalNotice: 'Legal notice and GCU',
    website: 'Website mruFood',
    links: {
      website: 'https://mruFood.app/',
      legalNotice:
        'https://mruFood.app/legal-notice-andgeneral-conditions-of-use/',
      privacyPolicy: 'https://mruFood.app/privacy-policy/',
    },
  },
  profile: {
    title: 'Profile',
    alertText: 'You need to be connected to access your profile',
  },

  // Change passwords
  password: {
    currentPassword: 'Current password',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
    update: 'Update',
    msg: 'Please complete the fields below to change your password',
  },
  alert: {
    passwordUpdateSuccess: 'Password successfully updated',
    updateSuccess: 'Update Successful',
    checkMailForNewPassword: 'Your new password has been sent by email',
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Add spot (scan)
  //////////////////////////////////////////////////////////////////////////////////////////////////

  addSpot: {
    permission: {
      camera: {
        title: 'Permission to use camera',
        message: 'mruFood need your permission to use the phone camera',
      },
      localisation: {
        title: 'Permission to access to location',
        message:
          'mruFood need your permission to access to the location of the phone',
      },
      confirm: 'Ok',
      cancel: 'Cancel',
    },
    modal: {
      redeemCode: 'Redeeming QR code',
      addSpotError: 'Please try with another QR code',
      newEventSpot: 'Your event has been added successfully',
      newSpot: 'Your spot has been added successfully',
      inValidCode: 'This QR code is not valid',
      redeemedOrExistCode: 'You already have this spot in your collection',
      pin: {
        title: 'Secret code',
        subTitle: 'Please ask the seller for the secret code',
        inValidCode: 'The spot code is not valid',
        enterPin: 'Enter the spot code',
      },
    },
    scanText:
      'Scan the QR code at our partner golf club to get your 3D golf ball',
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Clubs scores
  //////////////////////////////////////////////////////////////////////////////////////////////////

  clubDetails: {
    myScores: 'My scores',
    myScorecard: 'Scorecard',
    share: 'Share',
    partnerModal: {
      title: 'Unlock the spot',
      subTitle:
        'This golf club is not yet a partner. Would you like to manually unlock the spot to access the scorecards?',
    },
  },

  // Scorecards
  scoreCard: {
    delete: {
      label: 'Delete',
      title: 'Delete scorecard',
      description: 'Do you really want to delete this scorecard?',
      confirm: 'Confirm',
      cancel: 'Cancel',
    },
    save: {
      title: 'Save the scorecard',
      description: 'Do you want to save your modifications?',
      confirm: 'Save',
      cancel: 'No thanks',
    },
    handicap: {
      title: 'Course handicap',
      description: 'Please enter the course handicap',
      confirm: 'Save',
      cancel: 'Cancel',
    },
    saveSuccess: 'Scorecard saved successfully',
    addPlayer: {
      title: 'Add a player',
      playerInformation: 'Player information',
      selectTee: 'Select the tee',
    },
    removePlayer: {
      title: 'Delete a player',
      subTitle: 'Do you want to delete the player:',
    },
    modifyPlayer: {
      title: 'Modify a player',
    },
  },

  // myScores
  myScores: {
    new: {
      title: 'Add',
      chooseDateModal: {
        title: 'Choose the date',
        buttons: {
          choose: 'Choose',
        },
      },
    },
    scoreCardAvailable: {
      scorecard: 'scorecard(s)',
    },
    // Handicap
    handicap: {
      label: 'Course handicap',
      unknown: 'unknown',
    },
    modal: {
      title: 'Incomplete profile',
      subTitle: 'Please complete your profile before creating a scorecard',
    },
  },
  // Tees
  tees: {
    label: 'Tee',
    options: {
      red: 'Red',
      blue: 'Blue',
      white: 'White',
      green: 'Green',
      gold: 'Gold',
      black: 'Black',
      silver: 'Silver',
      yellow: 'Yellow',
    },
    values: {
      red: 'Red tee',
      blue: 'Blue tee',
      white: 'White tee',
      green: 'Green tee',
      gold: 'Gold tee',
      black: 'Black tee',
      silver: 'Silver tee',
      yellow: 'Yellow tee',
    },
    errors: {
      noTees: 'Please select the tee to start',
    },
  },

  // Scorecard
  scoreSheet: {
    hole: 'HOLE',
    par: 'PAR',
    stroke: 'STROKE',
    me: 'ME',
    noParError: 'Please enter a value greater than 0 for PAR',
    noCourseAvailable: 'No course available',
    chooseDate: 'Step 1: Enter the date',
    chooseCourse: 'Step 2: Choose the course',
    chooseTee: 'Step 3: Select the tee',
    createScoreSheet: 'Create',
    courseName: 'Course',
    score: 'Score',
    totalStroke: 'Total Stroke',
    holenum: 'Strokes hole nb{{holeNumber}}',
    outin: 'O/I',
    out: 'O',
    in: 'I',
    editPar: {
      modal: {
        title: 'Modify PAR',
        msg: 'Do you want to change the par for hole nb{{holeNumber}}?',
      },
    },
  },

  // Share the spot
  createPost: {
    step1: 'Step 1: Enter a custom message',
    step2: 'Step 2: Add a picture',
    step3: 'Step 3: Select a scorecard',
    noScoreCard: 'No scorecard',
    createPost: 'Share',
    error: 'An error occured, please try again.',
    description: 'Your message...',
    noDescription: 'No message',
    noImage: 'No picture',
    modal: {
      title: 'Share scorecard',
      subTitle: 'Do you want to share all players scores?',
      myScores: 'My score only',
      allScores: 'All scores',
    },
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Rate the app
  //////////////////////////////////////////////////////////////////////////////////////////////////

  rateModal: {
    title: 'Do you like mruFood?',
    rateApp: 'Your opinion',
    subTitle: 'What do you think about mruFood?',
    dislikeTitle: 'Comments',
    dislike: "We are sorry you don't like the app. Help us to get better!",
    placeholder: 'Add a comment...',
    later: 'Later',
    cancel: 'Cancel',
    validate: 'Submit',
    next: 'Next',
    appNotAvailable: 'The app is not available on the stores',
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Report issue
  //////////////////////////////////////////////////////////////////////////////////////////////////

  bug: {
    title: 'Report an issue',
    placeholder:
      'Please describe precisely the bug you encountered and the step to reproduce it...',
    button: 'Send',
    errorMessage: 'Please enter a description',
    image: 'Insert a picture',
    successMessage: 'The issue will be investigated by our team',
    messageHeader: 'Thank you',
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Notifications
  //////////////////////////////////////////////////////////////////////////////////////////////////

  notifications: {
    title: 'Push notifications',
    new_spot_discovered: 'Discover the new spots around you!',
    show_me: 'Show me',
    no_notifications: 'No notification',
    markAllAsRead: 'Mark all as read',
    tabTitle: 'Notifications',
    singleTabTitle: 'Notification',
  },
};
