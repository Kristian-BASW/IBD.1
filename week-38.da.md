---
routeAlias: fea9eb75-b63b-47ee-9453-dfcf3fa4013e
layout: agenda
backgroundFit: cover
class: centered-cover
title: Uge 37 v1
exportFilename: week-37-da-v1
aspectRatio: 16/9
transition: slide-left
---

# Agenda


- ### Secrets i dotnet
- ### Deployment i fly.io


---
routeAlias: e5fc24a5-0780-41c0-b78c-c1a9e1f4d508
layout: image-right
image: week-38/pictures/ssssh-picture.webp
imageBottomPlacement: 0px
imageRightPlacement: 220px
imageHeight: 500px
---

# Kan i holde på en hemmelighed?


<!--
- Med dette mener jeg ikke at pushe til Git eller beholde det i jeres docker image
- Der er mange der fejler med dette.
- Prøv at huske på at det er meget værdifuldt at det ikke bliver offentliggjort
-->


---
routeAlias: fc6bd137-17ca-4c82-854e-000ff2bc58da
layout: cover
---

Hvilke secrets?

Hvilken som helst nøgle eller adgangskode i skal bruge i jeres applikation, som ikke skal bruges til at tale sammen med andre computere.
<br/>

**Eksempler:**
- Connection strings
- API Keys
- Private Keys
- JWT secret

<!--
Ingen af disse skal committes til jeres repository.
- Det kan komme til at koste rigtig mange penge at alle kender koden til virksomhedens database, de API'er i har adgang til osv.
-->


---
routeAlias: fc3de438-37e5-4933-9c5b-e4376a511717
layout: image-right
image: /week-38/pictures/how-to-avoid.png
imageBottomPlacement: -40px
imageHeight: 400px
imageRightPlacement: 200px
---

# Hvordan slipper man udenom det?

<br/>

<div v-click>

```bash
git add -A 
git diff --cached
git commit -m "Ingen secrets committed"
```

</div>

<!--
- Der er nogle teknologier, man kan bruge, som tjekker inden man pusher sit kode om der er kodeord eller nøgler -> disse er ikke 100% bulletproof
- Det bedste er at læse koden igennem inden i comitter som fører til flere gode ting.
-->

---
routeAlias: ed53d0df-b77e-4591-a6a2-b5a8e8f3f5d7
layout: image-right
image: /week-38/pictures/postgresql.png
imageHeight: 250px
imageBottomPlacement: 100px
imageRightPlacement: 200px
---

# Secrets i development

<br/>
<br/>

<img src="/week-38/pictures/user-secrets-dotnet.png" style="height: 300px"/>

<!--
Det er meget bekvemt at kører `docker compose up` og så kører alt på samme tid.
- Det hjælper med at onboarde nye udvikler
- Lokal database (på jeres pc), er det ok at sætte connection string i repositoriet.
- Dog vær opmærksom på at du ikke skal genbruge adgangskoderne.
- Alt der kommunikerer med eksterne API'er e.lign. skal stadigvæk ikke ligge i jeres repo.
- user-secrets er en ting som dotnet har tilføjet for at have secret i development.
-->



---
routeAlias: 4d501d5d-e16a-437a-a038-4790c28d5116
layout: cover
---

# Override configuration

<br/>

<div class="magic-move-large">

```json

{
    "ConnectionStrings": {
        "Default: "..."
    }
}

```

</div>

Erstat med:

```bash

dotnet user-secrets set "ConnectionStrings:Default" "Server=DIN_SERVER;Database=MIN_DB;User Id=MIN_BRUGER;Password=MIT_KODEORD;"

```

<!--
User-secrets sørger for at fjerne secrets fra dine applikationer og så ligge lokalt på din computer.
- De er bundet op på hver enkelt project
- User-secrets bliver læst inden appsettings.
-->


---
routeAlias: 4863c694-2a0f-4262-94c1-564580e22c85
layout: cover
---


# Environment fil

<br/>

Opsætning af environment i compose.yaml

<div class="magic-move-large">

```yaml {*|5|*}
services:
    db: 
        image: postgres:16-alpine
        restart: always
        env_file: .env
        ports:
         - "5432:5432"

```

</div>

<!--
I Docker kan man også referer til en hel fil.
-->

---
routeAlias: d2c1bc4c-ac38-4bb2-9743-ec8e6aabe481
layout: image-right
image: /week-38/pictures/fly-io-logo.webp
imageHeight: 200px
imageRightPlacement: 200px
imageBottomPlacement: 200px
---

# Deployment

<!--
- Gør software klar til brug
- WebApps derved også gøre brug af en web-server
- 2 valgmuligheder -> VM eller Docker Containers
- Smagsprøve de seneste par uger
-->


---
routeAlias: a6b62ddd-69b4-4640-a4da-8197d45d23ee
layout: image-right
image: /week-38/pictures/seperate-domains.png
imageHeight: 450px
imageRightPlacement: 200px
---

# Separate domæner


<!--
I Alex's timer, har i kørt med
- Frontend = 1 URL
- Backend = 1 URL
- Med docker compose, kan i kører det hele i en URL.
-->



---
routeAlias: 34414a9d-a331-4355-926c-8b0ed233f001
layout: image-right
image: /week-38/pictures/proxy.png
imageHeight: 450px
imageRightPlacement: 200px
---

# Proxy 

<!--
Tricket her er at man tager nogle stier og redirecter til backenden, herved behøves der ikke laves ændringer i frontenden, efter hvor api'et kører henne.
Det jeg bruger til dette er Nginx.
- 1 ting ændret i henhold til køre docker compose -> kun 1 image kan bygges i fly.
-->


---
routeAlias: 137f4855-3dd5-416c-9697-724023988c5b
layout: cover
---

# Proxy vs no-proxy

| **Proxy** | **No-proxy**|
|-------|----------|
| Kræver konfiguration af de stier, som webserveren skal sende videre | Kræver omhyggelig konfiguration af CORS-headere |
| Frontend og backend bruger det samme domæne | Frontend og backend bruger separate domæner |
| Frontend kan kalde API'et med relative stier | Frontend skal kende backendens URL |
| Kun proxyen er offentligt tilgængelig | Frontend og backend er tilgængelige hver for sig |
| Routing håndteres ét sted | Forespørgsler sendes direkte til backenden |


---
routeAlias: 2a84f582-6856-490a-9382-2cdf6a9cf7b7
layout: cover
---

# No-proxy 
Typescript

<div class="magic-move-medium">

```typescript
import {TodoClient} from "./generated-ts-client.ts";

const isProduction = import.meta.env.PROD;

const prod = "https://your-server-url.fly.dev";
const dev = "http://localhost:5228";

export const finalUrl = isProduction ? prod : dev;

export const todoClient = new TodoClient(finalUrl);
Requesting: https://your-server-url.fly.dev/api/todo

```

</div>

<!--
I no-proxy fremgangsmåden vil dette se sådan her ud, dette er noget lignende det som Alex vil vise jer.
-->

---
routeAlias: 065aa1d7-4fa4-49e2-b329-a2aa663895eb
layout: cover
---

# Proxy 
Typescript

<div class="magic-move-medium">
```typescript
export const todoClient = new TodoClient();


```
Requesting: /api/todo

</div>

<div class="magic-move-medium" v-click>

nginx.conf

```javascript
server {
    listen 80;
        location /api {
        proxy_pass http://server:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

</div>

<!--
Her er ingen grund til at definerer en Base-URL, fordi alle sammen er relative til web serveren.
- Istedet sætter man bare **/api** og så vil disse requests sende alle requests til backenden.
- Dette kræver selvfølgelig noget opsætning
- Dette er en simpel nginx.conf fil.
-->

---
routeAlias: 430ad9f7-5f3d-46ac-b393-5382ab734593
layout: image-right
image: /week-38/pictures/cors.png
imageHeight: 400px
imageRightPlacement: 100px
---

# No-Proxy
CORS

<div style="width:40%" class="magic-move-medium">

```csharp
app.UseCors(config => config
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
);
```

</div>

<!--
Hvis server bar.com får en request fra foo.com, så med dette kode, vil den være ligeglad med hvor det kommer fra. Altså det kan komme fra hvilken som helst domæne. Dette gør det nemmere for hacker at sende request til API'et.
-->



---
routeAlias: b347c00f-b1a9-4071-9a6b-3a24c3cffb01
layout: cover
---


# No-Proxy
CORS


<div  class="magic-move-medium">

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("TilladMinApp", policy =>
    {
        policy.WithOrigins("https://eksempel.dk")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("TilladMinApp");
```

</div>


<!--
Måden det undgås på er ved at definerer et domæne i Origin, så vil alle request godtages fra dette domæne, men ikke andre domæner. 
-->



---
routeAlias: e242cd21-743d-4a89-bee8-4a511085f45f
layout: image-right
image: /week-38/pictures/tls-certificate.png
imageHeight: 400px
imageRightPlacement: 100px
---

# Domæne og TLS-certifikat

<!--
I dette screenshot er domænet s-e-a.dk og et TLS-certifikat, er hvad der giver os mulighed for at kører webappen over en sikker for forbindelse vha. HTTPS.
- Fly.io sørger for dette
- Dog, hvis man gerne vil have sit eget domæne, så skal man både købe domæne og certifikat. I dag behøves man ikke købe certifikaterne. 
-->
