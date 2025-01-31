# `Shuffile` 🗃

---

## SHUFFILE LINKS BUG 🐛
Shuffile Links was supposed to be deployed on [Hack CLub's Nest](https://hackclub.app) but had encourtered issues with subdomain creation and docker-mongo conflicts. While the issue is being resolved, you can access this feature by:
1. Clone this repo:
```git clone https://github.com/raghav-karn/shuffile-links.git```

2. Install npm packages:
```npm install```

3. Create a `.env` file in the root directory and add:
```
DATABASE_URL=mongodb://127.0.0.1/fileSharing
PORT=3000
```

4. Run the server by opening `localhost:3000` on your browser

---

**Note**: Shuffile only supports desktop as of now.

*** Desclaimer**: [*Shuffile Send*](https://shuffile.raghavkarn.hackclub.app/sender.html) and [*Shuffile Receive*](https://shuffile.raghavkarn.hackclub.app/receiver.html) is meant for small file transfer only, and starts to get quite slow for files more than 10MB.

## Overview ✨
[**Shuffile**](https://shuffile.raghavkarn.hackclub.app) is a end-to-end files sharing web app that lets you seamlessly transfer files*. You can use Shuffile to generate password-protected shareable links using [*Shuffile Links*](https://links.raghavkarn.hackclub.app), or send files using [*Shuffile Send*](https://shuffile.raghavkarn.hackclub.app/sender.html) and receive the same on [*Shuffile Receive*](https://shuffile.raghavkarn.hackclub.app/receiver.html).

## Images 📸
**Preview of home page**:
![Shuffile Home](images/preview1.png)
![Shuffile Links](images/preview2.png)
![Shuffile Password](images/preview3.png)
![Shuffile Send](images/preview4.png)
![Shuffile Receive](images/preview5.png)


## Inside Shuffile 📃
> Shuffile (Node.js) uses a simple method of sharing files using Socket IO and Express for end-to-end files sharing. For creating links, it uses a combination of multer, express, mongoose, bcrypt and more.

## The fun part — Making things work! 😋
> It was very cool to see the projects come to life after over 50hr of grind on this project, that I had started way back a month ago.

## The rough part — Deploying 🎊
> Deploying Shuffile Links had been an issue because idk how to deploy MongoDB apps. Nest was also having some issues with Docker and creating subdomains.

## Credits 🤝
**From online sources**: GeeksforGeeks (for formatting file inputs), Duck AI (to help me deploy but no good), @Johannes on Hack Club's Slack (he was a hero in helping me set up Nest for Shuffile)

**From previous projects**: Shuffile Links

---