---
routeAlias: 19b615d7-71db-473f-9d06-2d07121df66a
layout: agenda
backgroundFit: cover
class: centered-cover
title: Uge 43
exportFilename: week-43-da
aspectRatio: 16/9
transition: slide-left
---

# Agenda

<br/>

- ### Sessioner
- ### Kryptering
- ### Øvelser


---
routeAlias: 114c25a9-912c-4c36-85b4-2dca7c470284
layout: image-right
image: /week-43/pictures/session-management.png
imageHeight: 150px
imageRightPlacement: 150px
imageBottomPlacement: 200px
---

# Sessionmanagement


<!--
Når en bruger autentificerer sig, opretter vi en session med brugerens identitet.
Ud fra sessionen kan vi autorisere og styre adgang.
-->


---
routeAlias: 992bba59-80c8-4698-abed-65dd6f56a795
layout: cover
---

# Sessionscookie vs. JWT

<br/><br/>


<div style="display:flex; font-size: 20px">
    <div style="flex:1">
        <div style="font-weight: bold;">Sessionscookie</div>
        <div style="padding-bottom: 5px">Med tilstand (stateful)</div>
        <div style="padding-bottom: 5px">Mindre skalerbar</div>
        <div style="padding-bottom: 5px">Kan ikke læses af klienten</div>
        <div style="padding-bottom: 5px">Håndteres af browseren</div>
        <div style="padding-bottom: 5px">Kan være sårbar over for CSRF</div>
        <div style="padding-bottom: 5px">Serveren kan afslutte sessionen</div>
        <div style="padding-bottom: 5px">Brugerdata på serveren</div>
    </div>
    <div style="flex:1;">
        <div style="font-weight: bold;">Bearer + JWT</div>
        <div style="padding-bottom: 5px">Uden tilstand (stateless)</div>
        <div style="padding-bottom: 5px">Mere skalerbar</div>
        <div style="padding-bottom: 5px">Kan læses af klienten</div>
        <div style="padding-bottom: 5px">Kræver kode på klienten</div>
        <div style="padding-bottom: 5px">Kan være sårbar over for XSS</div>
        <div style="padding-bottom: 5px">Sessionen slutter, når JWT udløber eller slettes.</div>
        <div style="padding-bottom: 5px">Indeholder brugeroplysninger og metadata</div>
    </div>
</div>

<!--
Sessionscookies er stateful, fordi de afhænger af sessionstilstand, der er gemt på serveren.
- Servernedbrud = cookien er værdiløs, hvis sessionstilstanden går tabt.
-->

---
routeAlias: 3e61dd93-2086-42ea-8379-8c4065549857
layout: cover
---

# Cookie
### HTTP-headere

### **Serveren sætter en cookie**
Set-Cookie: Session=CfDJ8PYsQ; path=/; SameSite=strict; httponly; secure

### **Browseren sender en cookie**
Cookie: Session=CfDJ8PYsQ

---
routeAlias: 8fec3a4e-9b23-470b-bd27-14c4314550d5
layout: cover
---

# Sikkerhed for sessions-id

### Brug **Secure**, så cookien kun sendes over krypterede forbindelser (HTTPS).
<br/>

### Brug **HttpOnly**, så JavaScript ikke kan læse cookien. Det begrænser cookietyveri, men forhindrer ikke XSS.
<br/>

### **SameSite=Strict** betyder, at cookien kun sendes ved forespørgsler fra samme site. Beskytter mod Cross-Site Request Forgery (CSRF). 
- ### Frontend og backend bør have samme domæne, men kan bruge forskellige underdomæner.
<br/>

### **Path** kan begrænse, hvilke stier cookien sendes til. **Path=/** omfatter alle stier.
- ### **Path=/admin** → cookien sendes kun til stier som /admin, /admin/users osv.


---
routeAlias: 536248ef-d78f-4240-8059-dd800da2e862
layout: cover
---

# Eksempel: Din e-mailadresse ændres

Du er logget ind på **comment.example**.

<div style="display: flex; gap: 40px; font-size: 22px; margin-top: 28px;">

<div style="flex: 1;">

### CSRF — En falsk konkurrence

1. Du klikker på “Hent præmie” på **evil.example**.
2. En skjult formular sender en e-mailændring til sitet med din sessionscookie.
3. Sitet ændrer din e-mailadresse til angriberens.

</div>

<div style="flex: 1;">

### XSS — En ondsindet anmeldelse

1. Du åbner en anmeldelse på **comment.example**.
2. Sitet viser unsafe HTML, som kører angriberens JavaScript.
3. Scriptet ændrer din e-mailadresse via din session.

</div>

</div>

<!--
Begge eksempler forudsætter et sårbart endpoint til e-mailændring uden krav om ny autentifikation.
CSRF: Browseren skal sende sessionscookien med POST-forespørgslen fra det andet site, fx med SameSite=None; Secure, og serveren mangler effektiv CSRF-validering.
XSS: Angriberens HTML i anmeldelsen kører i sitets origin. HttpOnly forhindrer ikke scriptet i at sende autentificerede forespørgsler.

HTML-rensning fjerner usikker HTML og bevarer tilladt formatering.
Eksempel: <b onclick="alert('XSS')">Hej</b> → <b>Hej</b>

-->


---
routeAlias: e2fa2a08-3893-491f-a22b-f81a29db1168
layout: cover
---

# Et lille sidetrack
### Kryptering

<br/>

- ### Symmetrisk kryptering
- ### Asymmetrisk kryptering

<!--
- Vi har gennemgået hashing, som er en envejsproces.
- Kryptering er en tovejsproces.
-->


---
routeAlias: 7ee468ee-8692-43c3-97db-cc79eaf6b09f
layout: image-right
image: /week-43/pictures/shared-key.png
imageHeight: 300px
imageRightPlacement: 120px
imageBottomPlacement: 120px
---

# Symmetrisk kryptering

---
routeAlias: 52b3e935-8297-4350-a803-24a58544ae4e
layout: image-right
image: /week-43/pictures/public-key.png
imageHeight: 300px
imageRightPlacement: 120px
imageBottomPlacement: 120px
---

# Asymmetrisk kryptering

<!--
Tænk på det som postkasser.
- Jeg skriver et brev til min mor.
- Jeg skriver adressen (den offentlige nøgle) på kuverten og sender brevet.
- Kun min mor har nøglen til sin postkasse.
-->
