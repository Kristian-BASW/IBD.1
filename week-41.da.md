---
routeAlias: dc228283-8ae1-4c9e-8a2e-11e7a8437c9b
layout: agenda
backgroundFit: cover
class: centered-cover
title: Uge 41
exportFilename: week-41-da
aspectRatio: 16/9
transition: slide-left
---

# Agenda

<br/>

- ### Authorization
- ### Lille demo
- ### Øvelse


---
routeAlias: 4379a7aa-bbf1-400f-a5ae-e348a3819cd6
layout: image-right
image: /week-41/pictures/jwt-debug.png
imageHeight: 480px
imageRightPlacement: 150px
imageBottomPlacement: 10px
---

<div style="margin-top: -25px">

## JWT

</div>


---
routeAlias: 0593cfb8-90cd-4b5c-96ff-a83f27fdb31c
layout: image-right
image: /week-41/pictures/authentication-vs-authorization.svg
imageHeight: 280px
imageRightPlacement: 300px
---

## **Authentication vs. Authorization**

<br/>
<div v-click>

**Authentication** er processen, hvor en person (eller et system) beviser, at vedkommende (eller systemet) er den, de udgiver sig for at være
</div>

<div v-click>

**Authorization** afgør, hvilken adgang en autentificeret person (eller et system) har til dine data og ressourcer
</div>

<!--
**Autentifikation** -> Hvem er du?
**Authorization** -> Hvad må du gøre?
-->




---
routeAlias: 5094f445-5c1a-4e9b-bd53-e7aa3f7469d1
layout: cover
---

# Authorization
### Tilgang



<div style="margin-top: 100px; margin-left: 50px">

**whitelist** - afvis som standard, tillad eksplicit
<br/>

**blacklist** - tillad som standard, afvis eksplicit

</div>

<!--
Der er to tilgange til at implementere autorisationspolitikker.
- Hvilken tror I er mest sikker?
- **SVAR** 
-->


---
routeAlias: 6e4a2918-e43d-4f16-b049-d6d768a55a50
layout: cover
---

# Afvis som standard

<br/>

**Program.cs**

<div class="magic-move-large">


```csharp
builder.Services.AddAuthorization(options => 
{
    options.FallbackPolicy = new AuthorizationPolicy()
        .RequireAuthenticatedUser()
        .Build();
});
```

</div>


<!--
For at bruge whitelist-tilgangen skal vi opsætte en standardpolitik, der blokerer adgang. Det gør vi i filen ”Program.cs”.
-->



---
routeAlias: e51b6555-1613-4244-9a18-b10795c16232
layout: cover
---

# Authorization
<br/>
<br/>

- Simpel Authorization
- Rollebaseret Authorization
- Ressourcebaseret Authorization

<!--
Autorisation kan håndteres på mange måder.<br/>
Vi ser på 3 tilgange, som ofte kombineres
-->


---
routeAlias: 8b45036d-3bb3-4fbb-ac56-38fee763fa0c
layout: cover
---

# Simpel Authorization


<div class="magic-move-medium">


```csharp
[Authorize]
[HttpGet]
[Route("protected-endpoint")]
public async Task<IResult> ProtectedEndpoint()
{
    // Forespørg databasen, og returnér oplysninger
}

[AllowAnonymous]
[HttpGet]
[Route("unprotected-endpoint")]
public async Task<IResult> UnprotectedEndpoint()
{
    // Forespørg databasen, og returnér oplysninger
}
```

</div>


<!--
Den simpleste form for autorisation er at tillade eller afvise adgang ud fra, om brugeren er autentificeret. 
<br/>
Det fungerer på endpointniveau.
<br/>
Der er to varianter.
<br/>
1. Markér de endpoints, hvor vi kræver autentifikation (blacklist).
2. Markér de endpoints, hvor vi tillader adgang uden autentifikation (dvs. anonym adgang).
<br/>
Da det er let at glemme at tilføje attributten ”Authorize” til endpoints, anbefaler jeg en opsætning, hvor man eksplicit skal tillade anonym adgang.

-->


---
routeAlias: 4ec1eb6b-663a-4aa1-b086-11061f52e244
layout: cover
---

# Rollebaseret Authorization

<div class="magic-move-large">


```csharp

[Authorize(Roles = "Admin")]
[HttpGet]
[Route("users")]
public async Task<List<UserDto>> Users(DraftFormData data) {
    // Hent og returnér brugere
}
```

</div>


<!--
Hvis vi har et system, hvor brugere kan have roller, 
<br/>
kan vi have en politik, der kun giver adgang, hvis brugeren har en bestemt rolle.
-->

---
routeAlias: a53804c3-b0a0-4385-90cf-8fb1db936389
layout: cover
---

# Ressourcebaseret Authorization

<br/>

<div class="magic-move-medium">


```csharp

[HttpPut]
public async Task Update(InvoiceData data)
{
    var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
    var post = dbContext.Invoices.Where(x => x.Id == data.Id)
        .SingleOrDefault(x => x.CreatedByUser == userId);
    // Opdatér fakturaen
}
```

</div>

<!--
I denne kode bruger vi userId til at kontrollere, om brugeren har oprettet fakturaen.
- Politikken er, at kun den bruger, der har oprettet fakturaen, må redigere den.
-->


---
routeAlias: 07ae1a60-fc97-429f-b6db-f816a4599e36
layout: cover
---

# Hvorfor er Authorization vigtig?

<div v-click style="margin-top: 200px; margin-left: 50px">

**Lad mig sige det sådan:** Stoler du på alle på internettet?
</div>
