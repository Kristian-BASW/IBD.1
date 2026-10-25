---
routeAlias: edc56c33-41d3-4630-a1af-3e652d2b02fe
layout: agenda
backgroundFit: cover
class: centered-cover
title: Uge 40
exportFilename: week-40-da
aspectRatio: 16/9
transition: slide-left
---

# Agenda

<br/>

- ### Hvad er authentication?
- ### Hashing 


---
routeAlias: 453bf56a-8dde-4f69-9556-8a2fca0ac1f8
layout: image-right
image: /week-40/pictures/3-factors.png
imageHeight: 500px
imageRightPlacement: 200px
imageBottomPlacement: 20px
---

# Authentication
#### Authentication factors



<!--
At bekræfte en identitet kaldes autentifikation <br/>
3 kategorier
<br/>
- Noget, du ved -> password, sikkerhedsspørgsmål, pinkode
- Noget, du har -> Token, nøgle, SIM-kort, e-mailadresse, autentifikationsapp
- Noget, du er -> Biometri, fingeraftryk, ansigtsgenkendelse, iris
-->

---
routeAlias: cf02ff09-9ea6-4969-8958-ed040597d2ce
layout: image-right
image: /week-40/pictures/have-i-been-pwned.png
imageHeight: 450px
imageRightPlacement: 350px
imageBottomPlacement: 20px
---


# Er dine oplysninger blevet lækket? 

<img src="/week-40/pictures/haveibeenpwned-qr.png" style="position:absolute; right: 100px; height: 200px"/>


---
routeAlias: 27e666a7-35ca-445d-ad82-45c54e0a29f9
layout: image-right
image: /week-40/pictures/password-strength.png
imageHeight: 300px
imageRightPlacement: 350px
imageBottomPlacement: 100px
---

# Hvor stærk er din password?


<a href="https://bitwarden.com/password-strength/" style="position:absolute; bottom: 40px; right: 300px"> Bitwardens test af adgangskodestyrke</a>


---
routeAlias: ebd647db-3f0e-4a70-b1cf-71d1077998fb
layout: image-right
image: /week-40/pictures/password-strength.png
imageHeight: 150px
imageRightPlacement: 70px
imageBottomPlacement: 200px
---

# Hvad er en god password?

<br/><br/><br/>

## Hvad gør en password god?
- ### Store og små bogstaver
- ### Tal og symboler
- ### Leetspeak (udskiftning af "s" med "$" og "e" med 3 osv.)
- ### Dit kæledyrs navn plus dit fødselsår
- ### Lang og tilfældig
- ### Forskellig for hver tjeneste

<a href="https://bitwarden.com/password-strength/" style="position:absolute; bottom: 150px; right: 90px"> Bitwarden</a>


---
routeAlias: 2a79343e-67b4-40ef-9a2f-a8e9a1197f04
layout: image-right
image: /week-40/pictures/password-cracking-calculator.png
imageHeight: 350px
imageRightPlacement: 300px
imageBottomPlacement: 100px
---

# Længden betyder noget
##### Når det gælder passwords

<a href="https://passwordbits.com/password-cracking-calculator/" style="position:absolute; bottom: 40px; right: 300px"> Beregner til knækning af adgangskoder</a>

<!--
Estimaterne forudsætter, at adgangskoderne er hashet med 1 iteration af PBKDF2-SHA256
-->

---
routeAlias: 9875c124-88b8-4996-bd81-e601367a6bf1
layout: default
---

# Sjov video

<Youtube id="opRMrEfAIiI?start=39" style="height: 400px; width: 600px"/> 



---
routeAlias: 2129432f-a6de-4b18-9bd3-de8b872a9f39
layout: image-right
image: /week-40/pictures/passphrase-vs-password.jpg
imageHeight: 350px
imageRightPlacement: 200px
imageBottomPlacement: 100px
---

---
routeAlias: 9f3482f8-d3c9-4088-bea5-acb27b9c9574
layout: image-right
image: /week-40/pictures/passphrase-cracking-calculator.png
imageHeight: 350px
imageRightPlacement: 300px
imageBottomPlacement: 100px
---

# En passphrase er stærkere

<a href="https://passwordbits.com/password-cracking-calculator/" style="position:absolute; bottom: 40px; right: 300px"> Beregner til knækning af adgangssætninger</a>


#### - krystal løg ler kringle
#### - rød hus himmel tog
#### - tæppe citron torsdag

<!--
En adgangssætning er blot en række tilfældige ord fra en ordbog.
Prøv at ændre indstillingerne, og se, hvordan antallet af iterationer og algoritmen påvirker resultatet.
-->


---
routeAlias: ed9e14b1-07f6-428e-b6cc-5386e3d6f718
layout: default
class: centered-cover
---

# Hvordan husker du så mange passwords?
Hemmeligheden er <strong v-click> - det gør du ikke!</strong>

<img v-click src="/week-40/pictures/proton-logo.png" style="position:absolute; right: 100px; height: 120px"/>
<img v-click src="/week-40/pictures/bitwarden-logo.webp" style="position:absolute; right: 300px; bottom:100px; height:150px"/>
<img v-click src="/week-40/pictures/keepassxc-logo.png" style="position:absolute; left: 40px; bottom:200px; height:150px"/>

<!--
- Brug en forskellig adgangskode til hver tjeneste
- Brug en adgangskodeadministrator
- Proton Pass, Bitwarden, Keepassxc
-->


---
routeAlias: bc21585c-6043-48f5-b4f4-00f84f35a37b
layout: image-right
image: /week-40/pictures/hash.drawio.png
imageHeight: 400px
imageRightPlacement: 170px
---

# Hvordan beskytter vi vores passwords?

<!--
- Vi bruger hashfunktioner
-->


---
routeAlias: ca9abc11-ca1c-420e-b8b2-d15a5ed789fc
layout: image-right
image: /week-40/pictures/hash-without-salt.png
imageHeight: 280px
imageRightPlacement: 30px
imageBottomPlacement: 150px
---

# Samme password, samme hash


<!--
Her har jeg et skærmbillede af databasen. Vi kan se, at alle adgangskoder er hashet, så vi ikke kan
læse dem.<br/>
Lægger I mærke til noget ved hashværdierne? <br/> <br/>Ja, nogle brugere har samme hashværdi. Det betyder,
at de sandsynligvis bruger samme adgangskode.
- Hvilken vil du som hacker forsøge at knække først?
-->

---
routeAlias: b547761a-05e2-4d55-b2f8-4d2cb9db5352
layout: image-right
image: /week-40/pictures/password-hashing.png
imageHeight: 350px
imageRightPlacement: 100px
imageBottomPlacement: 50px
---

# Hashing af password

<!--
- Bedre end simpel hashing
- Brug salt
- Loginforsøg -> Hent salt fra databasen -> Brug det til at verificere brugeren
- På den måde ved vi, om det er den samme bruger
-->


---
routeAlias: 8c7fd3c0-fa9b-4d21-b0ad-3c7c14238783
layout: image-right
---

# Hvad er lettest at knække?

<br/> <br/> <br/> <br/> 

1. En hash genereret med en **hurtig** algoritme?
2. En hash genereret med en **langsom** algoritme?
<br/> Gør det overhovedet en forskel?

<!--
En hacker stjæler en database
- 1 milliard kombinationer af adgangskoder hvert sekund (brute force)
- Algoritmen er bevidst langsom og tager for eksempel 0,1 sekund
- Hackeren vil skulle bruge meget tid på at knække din adgangskode
-->

---
routeAlias: 130f2e8a-9041-46db-81b5-a1378562c14f
layout: image-right
---

# Hvad er lettest at knække?

<br/>
<br/>

### - Gem aldrig adgangskoder i klartekst!
### - Brug en langsom hashfunktion!
<br/>
<br/>

### Algoritmer rangeret
1. Argon2id
2. scrypt
3. bcrypt
4. PBKDF2

<!--
Brug altid en passende algoritme
-->
