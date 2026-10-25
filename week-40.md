---
routeAlias: 7812a424-a820-4a3f-bd45-68d25975a2ae
layout: agenda
backgroundFit: cover
class: centered-cover
title: Week 40
exportFilename: week-40
aspectRatio: 16/9
transition: slide-left
---

# Agenda

<br/>

- ### What is authentication
- ### Hashing 


---
routeAlias: 97b41a43-27b5-433a-98ab-869cafe43c89
layout: image-right
image: /week-40/pictures/3-factors.png
imageHeight: 500px
imageRightPlacement: 200px
imageBottomPlacement: 20px
---

# Authentication
#### Factors of Authentication



<!--
The act of verifying identity is called authentication <br/>
3 Categories
<br/>
- Know -> Password, security questions, PIN
- Have -> Token, key, SIM, email address, authenticator app
- Are -> Biometrics, fingerprint, facial recognition, iris
-->

---
routeAlias: b8fa67ad-299d-4db9-9370-94e83c452c41
layout: image-right
image: /week-40/pictures/have-i-been-pwned.png
imageHeight: 450px
imageRightPlacement: 350px
imageBottomPlacement: 20px
---


# Have you been pwned? 

<img src="/week-40/pictures/haveibeenpwned-qr.png" style="position:absolute; right: 100px; height: 200px"/>


---
routeAlias: 4a5fac53-ac36-435d-bf15-80d97d4d8821
layout: image-right
image: /week-40/pictures/password-strength.png
imageHeight: 300px
imageRightPlacement: 350px
imageBottomPlacement: 100px
---

# How strong is your password?


<a href="https://bitwarden.com/password-strength/" style="position:absolute; bottom: 40px; right: 300px"> Bitwarden password strength tester</a>


---
routeAlias: 90386d70-2572-4828-89ca-8374825d3f1b
layout: image-right
image: /week-40/pictures/password-strength.png
imageHeight: 150px
imageRightPlacement: 70px
imageBottomPlacement: 200px
---

# What is a good password?

<br/><br/><br/>

## Which of these make a password good?
- ### Upper and lowercase
- ### Digits and symbols
- ### Leet speak (swapping "s" for "$" and "e" for 3 etc)
- ### Name of your pet plus year you were born
- ### Long and random
- ### Different for each service

<a href="https://bitwarden.com/password-strength/" style="position:absolute; bottom: 150px; right: 90px"> Bitwarden</a>


---
routeAlias: 96853f0f-2dbb-431e-bd8e-1584b9f4182f
layout: image-right
image: /week-40/pictures/password-cracking-calculator.png
imageHeight: 350px
imageRightPlacement: 300px
imageBottomPlacement: 100px
---

# Size matters
##### When it comes to passwords

<a href="https://passwordbits.com/password-cracking-calculator/" style="position:absolute; bottom: 40px; right: 300px"> Password cracking calculator</a>

<!--
Estimations assumes passwords are hashed with 1 iteration of PBKDF2-SHA256
-->

---
routeAlias: 5cba6fd0-46d1-40d8-a1f2-44e42b8880a1
layout: default
---

# Fun video

<Youtube id="opRMrEfAIiI?start=39" style="height: 400px; width: 600px"/> 



---
routeAlias: 8fddaa47-3661-4bf8-b394-c522e0d5e029
layout: image-right
image: /week-40/pictures/passphrase-vs-password.jpg
imageHeight: 350px
imageRightPlacement: 200px
imageBottomPlacement: 100px
---

---
routeAlias: 390170cb-079f-4c86-884d-39eabdf24f89
layout: image-right
image: /week-40/pictures/passphrase-cracking-calculator.png
imageHeight: 350px
imageRightPlacement: 300px
imageBottomPlacement: 100px
---

# Passphrase is stronger

<a href="https://passwordbits.com/password-cracking-calculator/" style="position:absolute; bottom: 40px; right: 300px"> Passphrase cracking calculator</a>


#### - crystal onion clay pretzel
#### - red house sky train
#### - carpet lemon thursday

<!--
A passphrase is just a string random words from a dictionary.
Play around with the settings and see how iteration count and algorithm affects the result.
-->


---
routeAlias: f1a26f7f-eab3-4a42-8988-8a0587d4205a
layout: default
class: centered-cover
---

# How do you remember so many passwords?
The secret is <strong v-click> - you don't!</strong>

<img v-click src="/week-40/pictures/proton-logo.png" style="position:absolute; right: 100px; height: 120px"/>
<img v-click src="/week-40/pictures/bitwarden-logo.webp" style="position:absolute; right: 300px; bottom:100px; height:150px"/>
<img v-click src="/week-40/pictures/keepassxc-logo.png" style="position:absolute; left: 40px; bottom:200px; height:150px"/>

<!--
- Use a different password for each service
- Use a passwordmanager
- Proton Pass, Bitwarden, Keepassxc
-->


---
routeAlias: 78e39f29-62a1-48c8-bbe6-e7a47f765ad0
layout: image-right
image: /week-40/pictures/hash.drawio.png
imageHeight: 400px
imageRightPlacement: 170px
---

# How do we protect our passwords?

<!--
- We use Hash functions
-->


---
routeAlias: 7ce607c6-c1d2-4030-b10d-56ac7661c865
layout: image-right
image: /week-40/pictures/hash-without-salt.png
imageHeight: 280px
imageRightPlacement: 30px
imageBottomPlacement: 150px
---

# Same password, same hash


<!--
Here I have a screenshot of the database. We can see that all passwords are hashed, so we can’t
read them.<br/>
Do you notice something about the hashes? <br/> <br/>Yes, some users have the same hash. Which means
that they likely are using the same password.
- As hacker, which do you want to crack first?
-->

---
routeAlias: e7c1618d-ecfa-40b9-b9ba-31ce8a056d3c
layout: image-right
image: /week-40/pictures/password-hashing.png
imageHeight: 350px
imageRightPlacement: 100px
imageBottomPlacement: 50px
---

# Password hashing

<!--
- Better than plain hashing
- Use salt
- Login attempt -> getting salt from database -> Uses this to verify the user
- We hereby know if it is the same user
-->


---
routeAlias: 7120fd64-6c6a-4137-afcf-75818edcb2bd
layout: image-right
---

# Which is easier to crack?

<br/> <br/> <br/> <br/> 

1. Hash generated with a fast algorithm?
2. Hash generated with a slow algorithm?
<br/> Does it even matter?

<!--
Hacker steals a database
- 1 billions combinations of passwords each second (brute force)
- Algorithm is artificial slow example takes 0,1 seconds
- The hacker would use alot of time to crack your code
-->

---
routeAlias: f3fa335c-c07b-4338-bf3f-9138175eecd5
layout: image-right
---

# Which is easier to crack?

<br/>
<br/>

### - Never ever store plain text password!
### - Use a slow hashing function!
<br/>
<br/>

### Ranked algorithms
1. Argon2id
2. scrypt
3. bcrypt
4. PBKDF2

<!--
Always use an appropriate algorithm
-->
