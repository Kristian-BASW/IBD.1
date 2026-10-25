---
routeAlias: 7812a424-a820-4a3f-bd45-68d25975a2ae
layout: agenda
backgroundFit: cover
class: centered-cover
title: Week 41
exportFilename: week-41
aspectRatio: 16/9
transition: slide-left
---

# Agenda

<br/>

- ### Session
- ### Encryption
- ### Exercises


---
routeAlias: 1097b545-b2e1-4674-a8df-cd4079e08ff6
layout: image-right
image: /week-43/pictures/session-management.png
imageHeight: 150px
imageRightPlacement: 150px
imageBottomPlacement: 200px
---

# Session Management


<!--
When a user authenticates we establish a session with users identity.
Based on the session we can authorize/control access.
-->


---
routeAlias: 1e3dc1af-42c2-4ee0-a448-47cba3c7721a
layout: cover
---

# Session Cookie vs JWT

<br/><br/>


<div style="display:flex; font-size: 20px">
    <div style="flex:1">
        <div style="font-weight: bold;">Session Coookie</div>
        <div style="padding-bottom: 5px">Stateful</div>
        <div style="padding-bottom: 5px">Less scalable</div>
        <div style="padding-bottom: 5px">Not readable to client</div>
        <div style="padding-bottom: 5px">Handled by browser</div>
        <div style="padding-bottom: 5px">Can be vulnerable to CSRF</div>
        <div style="padding-bottom: 5px">Server can terminate session</div>
        <div style="padding-bottom: 5px">User data on the server</div>
    </div>
    <div style="flex:1;">
        <div style="font-weight: bold;">Bearer + JWT</div>
        <div style="padding-bottom: 5px">Stateless</div>
        <div style="padding-bottom: 5px">More scalable</div>
        <div style="padding-bottom: 5px">Readable to client</div>
        <div style="padding-bottom: 5px">Requires client side code</div>
        <div style="padding-bottom: 5px">Can be vulnerable to XSS</div>
        <div style="padding-bottom: 5px">Session terminates when JWT expires, or forgotten.</div>
        <div style="padding-bottom: 5px">Contains user information and metadata</div>
    </div>
</div>

<!--
Cookies are stateful -> because it is dependent on something is stored on the server
- Server crash = cookie is worthless.
-->

---
routeAlias: c2ac8c61-6080-47ac-9b26-3ecf79dbb53a
layout: cover
---

# Cookie
### Headers

### **Server setting cookie**
Set-Cookie: Session=CfDJ8PYsQ; path=/; samesite=strict; httponly; secure

### **Browser sending cookie**
Cookie: Session=CfDJ8PYsQ

---
routeAlias: f6c13ec8-3949-4448-a3ea-47d58904b79f
layout: cover
---

# Session ID Security

### Use **Secure** flag to only set the cookie on encrypted requests (HTTPS).
<br/>

### Use **HttpOnly** to prevent JavaScript from reading the cookie. It limits cookie theft, but does not prevent XSS.
<br/>

### **SameSite=Strict** means that cookie is only sent from the same site from which it was set. Protects against Cross-Site Request Forgery (CSRF) attacks. 
- ### Both frontend and backend should have the same domain, but subdomains could be different.
<br/>

### **Path=/** can be used to restrict which paths include the cookie.
- ### **Path=/admin** -> the cookie can only be used for paths like /admin, /admin/users etc.


---
routeAlias: 9d033634-f2cf-4f70-a39c-30cb2533bc84
layout: cover
---

# Example: Changing your email

You are logged in to **comment.example**.

<div style="display: flex; gap: 40px; font-size: 22px; margin-top: 28px;">

<div style="flex: 1;">

### CSRF — A fake giveaway

1. You click “Claim prize” on **evil.example**.
2. A hidden form submits an email change to the shop, with your session cookie.
3. The shop changes your email to the attacker's.

</div>

<div style="flex: 1;">

### XSS — A malicious review

1. You open a review on **comment.example**.
2. The shop renders unsafe HTML, running the attacker's JavaScript.
3. The script changes your email using your session.

</div>

</div>

<!--
Both examples assume a vulnerable email-change endpoint with no reauthentication.
CSRF: the browser must send the session cookie on the cross-site POST, e.g. SameSite=None; Secure, and the server lacks effective CSRF validation.
XSS: attacker-controlled review HTML executes in the shop's origin. HttpOnly does not stop the script from making authenticated requests.

HTML sanitization removes unsafe HTML while keeping allowed formatting.
Example: <b onclick="alert('XSS')">Hello</b> → <b>Hello</b>

-->


---
routeAlias: 2e00c96b-d409-4070-8e14-9457f901a1e0
layout: cover
---

# Small sidetrack
### Encryption

<br/>

- ### Symmetric encryption
- ### Asymmetric encryption

<!--
- We have had about hashing, which is a one way process.
- Encryption is a two-way process.
-->


---
routeAlias: 27a80bed-82b5-49e2-89b2-9b1c943865ca
layout: image-right
image: /week-43/pictures/shared-key.png
imageHeight: 300px
imageRightPlacement: 120px
imageBottomPlacement: 120px
---

# Symmetric Encryption

---
routeAlias: 25f7cbd1-2f9f-4c98-9a8b-47308de3b678
layout: image-right
image: /week-43/pictures/public-key.png
imageHeight: 300px
imageRightPlacement: 120px
imageBottomPlacement: 120px
---

# Asymmetric Encryption

<!--
Look at it as mailboxes
- I write a letter to my mom
- Writes the address (public key) on the envelope and sends it
- Only my mom has the key for her mailbox.
-->
