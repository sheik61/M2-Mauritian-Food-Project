export default {
  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Transverse
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Mots communs
  common: {
    email: 'Email',
    password: 'Mot de passe',
    name: 'Nom',
    firstname: 'Prénom',
    country: 'Pays',
    choosePic: 'Choisir une image',
    camera: 'Appareil photo',
    gallery: 'Galerie',
    cancel: 'Annuler',
    save: 'Sauvegarder',
    update: 'Mettre à jour',
    ok: 'OK',
    loading: 'Chargement en cours...',
    category: 'Catégorie',
    handicapIndex: 'Handicap (index)',
    initials: 'Initiales',
    chooseCategory: 'Choisir la catégorie',
    chooseTee: 'Choisir le tee',
    chooseAnotherInitials: 'Veuillez choisir une autre initiale',
    enterValidHandicap: 'Veuillez saisir un handicap valide',
    next: 'Suivant',
  },

  // Navigation
  navigation: {
    myCollection: 'Ma collection',
    myMap: 'Vue carte',
  },

  // Messages d'aletre pour le mode déconnecté
  initialWarning: {
    modal: {
      title: 'Mode déconnecté',
      message:
        'Connectez-vous si vous avez déjà un compte. Sinon votre nouveau spot sera ajouté automatiquement à votre futur compte lors de sa création.',
      buttonText: "J'ai compris",
      messageAlreadyHaveOneSpot:
        'Votre spot est enregistré sur votre téléphone uniquement. Veuillez créer un compte pour éviter de le perdre.',
      messageAlreadyHaveManySpots:
        'Vos spots sont enregistrés sur votre téléphone uniquement. Veuillez créer un compte pour éviter de les perdre.',
      understoodButtonText: 'Créer un compte',
      laterButtonText: 'Plus tard',
    },
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Login and Registration
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Page de connexion
  login: {
    title: 'Connexion',
    subTitle: 'MRU Food Net',
    text: 'Détection de plats mauriciens',
    button: 'Connexion',
    notRegisteredMessage: 'Première fois ?',
    createAccount: 'Créer un compte',
    skip: 'Passer cette étape',
    forgotPassword: 'Mot de passe oublié ?',
    lostSpot:
      'Vous devez être connecté pour sauvegarder vos spots, sinon vous risquez de les perdre.',
  },

  // Page de création d'un compte
  registration: {
    title: 'Créer un compte',
    button: 'Enregistrer',
    alreadyHaveAnAccount: 'Déjà inscrit ?',
    // Compte créé
    signupMessage:
      "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter",
    modal: { title: 'Bienvenue' },
    category: {
      man: 'Homme',
      woman: 'Femme',
      youth: 'Jeune',
    },
  },

  // Message d'erreurs
  errors: {
    emailError: 'Veuillez saisir un email valide',
    passwordError: 'Veuillez saisir un mot de passe',
    chooseName: 'Veuillez renseigner votre nom',
    handicapError: 'Veuillez renseigner votre handicap',
    handicapFormatError: "Le format de votre handicap n'est pas correct",
    passwordConfirmationError: 'Les mots de passe ne correspondent pas',
    enterNewPasswordError:
      'Le mot de passe doit contenir au moins 8 caractères incluant une majuscule, un chiffre et un caractère spécial',
    nameError: "Le nom renseigné n'est pas correct",
    playServicesNotAvailable:
      "L'application ne fonctionnera pas sans Google Play Services",
    generalError: 'Une erreur vient de se produire',
    countryError: 'Veuillez saisir un pays',
    connectionError: "Vous n'êtes pas connecté",
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Profile
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Page Profile.
  userAccount: {
    handicap: 'Handicap (index) {{handicap}}',
    myAccount: 'Mon Compte',
    aboutApp: 'À propos',
    rateApp: "Noter l'application",
    shareApp: "Partager l'application",
    signOut: 'Déconnecter',
    guestExit: 'Sortir',
  },
  // Page my account
  myAccount: {
    countryPickerSearchText: 'Entrer le nom du pays',
    licenceNo: 'Numéro de licence',
  },
  about: {
    reportABug: 'Signaler un problème',
    privacyPolicy: 'Politique de confidentialité',
    legalNotice: 'Mentions légales et CGU',
    website: 'Site web mruFood',
    links: {
      website: 'https://mruFood.app/',
      legalNotice: 'https://mruFood.app/fr/mentions-legales/',
      privacyPolicy:
        'https://mruFood.app/fr/politique-de-confidentialite-la-politique/',
    },
  },
  profile: {
    title: 'Profil',
    alertText: 'Vous devez être connecté pour accéder à votre profil',
  },

  // Modification mot de passe.
  password: {
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    update: 'Mettre à jour',
    msg: 'Veuillez compléter les champs ci-dessous pour modifier votre mot de passe',
  },
  alert: {
    passwordUpdateSuccess: 'Mot de passe mis a jour',
    updateSuccess: 'Mise à jour réussie',
    checkMailForNewPassword:
      'Votre nouveau mot de passe a été envoyé par email',
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Add spot (scan)
  //////////////////////////////////////////////////////////////////////////////////////////////////

  addSpot: {
    permission: {
      camera: {
        title: "Permission d'utiliser la caméra",
        message:
          'mruFood a besoin de votre autorisation pour utiliser la caméra du téléphone',
      },
      localisation: {
        title: "Permission d'accéder à la localisation",
        message:
          'mruFood a besoin de votre autorisation pour accéder à la localisation du téléphone',
      },
      confirm: 'Ok',
      cancel: 'Annuler',
    },
    modal: {
      redeemCode: 'QR code en cours de validation',
      addSpotError: 'Veuillez essayer avec un autre QR code',
      newEventSpot: 'Votre évènement a été ajouté avec succès',
      newSpot: 'Votre spot a été ajouté avec succès',
      inValidCode: "Ce QR code n'est pas valide",
      redeemedOrExistCode: 'Vous avez déjà ce spot dans votre collection',
      pin: {
        title: 'Code secret',
        subTitle: 'Veuillez demander le code secret au vendeur',
        inValidCode: "Le code du spot n'est pas valide",
        enterPin: 'Entrer le code du spot',
      },
    },
    scanText:
      'Scannez le QR code chez notre club de golf partenaire pour obtenir votre balle de golf 3D',
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Clubs
  //////////////////////////////////////////////////////////////////////////////////////////////////

  clubDetails: {
    myScores: 'Mes scores',
    myScorecard: 'Scorecard',
    share: 'Partager',
    partnerModal: {
      title: 'Déverrouiller le spot',
      subTitle:
        "Ce club de golf n'est pas encore partenaire. Souhaitez-vous déverrouiller manuellement le spot pour accéder aux scorecards?",
    },
  },

  // Scorecards
  scoreCard: {
    delete: {
      label: 'Supprimer',
      title: 'Supprimer la scorecard',
      description: 'Voulez-vous vraiment supprimer cette scorecard ?',
      confirm: 'Confirmer',
      cancel: 'Annuler',
    },
    save: {
      title: 'Sauvegarder la scorecard',
      description: 'Voulez-vous sauvegarder vos modifications ?',
      confirm: 'Sauvegarder',
      cancel: 'Non merci',
    },
    handicap: {
      title: 'Handicap de jeu',
      description: 'Veuillez saisir le handicap de jeu',
      confirm: 'Sauvegarder',
      cancel: 'Annuler',
    },
    saveSuccess: 'Scorecard sauvegardée avec succès',
    addPlayer: {
      title: 'Ajouter un joueur',
      playerInformation: 'Informations du joueur',
      selectTee: 'Sélectionner le tee',
    },
    removePlayer: {
      title: 'Supprimer un joueur',
      subTitle: 'Voulez-vous supprimer le joueur : ',
    },
    modifyPlayer: {
      title: 'Modifier un joueur',
    },
  },

  // myScores
  myScores: {
    new: {
      title: 'Add',
      chooseDateModal: {
        title: 'Choisir la date',
        buttons: {
          choose: 'Choisir',
        },
      },
    },
    scoreCardAvailable: {
      scorecard: 'scorecard(s)',
    },
    // Handicap
    handicap: {
      label: 'Handicap de jeu',
      unknown: 'unknown',
    },
    modal: {
      title: 'Profil incomplet',
      subTitle: 'Veuillez compléter votre profil avant de créer une scorecard',
    },
  },
  // Tees
  tees: {
    label: 'Tee',
    options: {
      red: 'Rouge',
      blue: 'Bleu',
      white: 'Blanc',
      green: 'Vert',
      gold: 'Or',
      black: 'Noir',
      silver: 'Argent',
      yellow: 'Jaune',
    },
    values: {
      red: 'Tee rouge',
      blue: 'Tee bleu',
      white: 'Tee blanc',
      green: 'Tee vert',
      gold: 'Tee or',
      black: 'Tee noir',
      silver: 'Tee argent',
      yellow: 'Tee Jaune',
    },
    errors: {
      noTees: 'Veuillez choisir le tee pour démarrer',
    },
  },

  // Scorecard
  scoreSheet: {
    hole: 'TROU',
    par: 'PAR',
    me: 'MOI',
    stroke: 'COUPS',
    noParError: 'Veuillez saisir une valeur supérieure à 0 pour le PAR',
    noCourseAvailable: 'Aucun parcours disponible',
    chooseDate: 'Étape 1 : Saisir la date',
    chooseCourse: 'Étape 2 : Choisir le parcours',
    chooseTee: 'Étape 3 : Sélectionner le tee',
    createScoreSheet: 'Créer',
    courseName: 'Parcours',
    score: 'Score',
    totalStroke: 'Total coups',
    holenum: 'Coups trou n°{{holeNumber}}',
    outin: 'A/R',
    out: 'A',
    in: 'R',
    editPar: {
      modal: {
        title: 'Modification du PAR',
        msg: 'Voulez-vous modifier le par pour le trou n°{{holeNumber}} ?',
      },
    },
  },

  //Partage du spot
  createPost: {
    step1: 'Étape 1 : Saisir un message personnalisé',
    step2: 'Étape 2 : Ajouter une photo',
    step3: 'Étape 3 : Sélectionner une scorecard',
    noScoreCard: 'Pas de scorecard',
    createPost: 'Share',
    error: 'Une erreur est survenue, veuillez reéssayer svp.',
    description: 'Votre message...',
    noDescription: 'Pas de message',
    noImage: 'Pas de photo',
    modal: {
      title: 'Partage scorecard',
      subTitle: 'Voulez vous partager le score de tous les joueurs ?',
      myScores: 'Mon score uniquement',
      allScores: 'Tous les scores',
    },
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Rate the app
  //////////////////////////////////////////////////////////////////////////////////////////////////

  rateModal: {
    title: 'Que pensez vous de mruFood ?',
    rateApp: 'Votre avis',
    subTitle: 'Que pensez vous de mruFood ?',
    dislikeTitle: 'Commentaires',
    dislike:
      "Dommage que vous n'ayez pas aimé l'application. Aidez-nous à l'améliorer !",
    placeholder: 'Ajouter un commentaire...',
    later: 'Plus tard',
    cancel: 'Annuler',
    validate: 'Envoyer',
    next: 'Suivant',
    appNotAvailable: "L'application n'est pas disponible sur les stores",
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Report issue
  //////////////////////////////////////////////////////////////////////////////////////////////////

  bug: {
    title: 'Signaler un problème',
    placeholder:
      'Veuillez décrire précisément le problème rencontré et les étapes pour le reproduire...',
    button: 'Envoyer',
    errorMessage: 'Veuillez saisir une description',
    image: 'Insérez une image',
    successMessage: 'Le problème va être analysé par notre équipe',
    messageHeader: 'Merci',
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Notifications
  //////////////////////////////////////////////////////////////////////////////////////////////////

  notifications: {
    title: 'Notifications push',
    new_spot_discovered: 'Découvrez les nouveaux spots autour de vous !',
    show_me: 'Voir',
    no_notifications: 'Pas de notification',
    markAllAsRead: 'Marquer tout comme lu',
    tabTitle: 'Notifications',
    singleTabTitle: 'Notification',
  },
};
