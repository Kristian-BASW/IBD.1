---
routeAlias: fea9eb75-b63b-47ee-9453-dfcf3fa4013e
layout: agenda
backgroundFit: cover
class: centered-cover
title: Week 38
exportFilename: week-38
aspectRatio: 16/9
transition: slide-left
---

# Agenda


- ### Secrets in .NET
- ### Deployment on Fly.io


---
routeAlias: b23ae81d-f3ac-4399-ba6f-db6f95f3e7b5
layout: image-right
image: week-38/pictures/ssssh-picture.webp
imageBottomPlacement: 0px
imageRightPlacement: 220px
imageHeight: 500px
---

# Can you keep a secret?


<!--
- By this, I mean not pushing it to Git or keeping it in your Docker image
- Many people get this wrong.
- Try to remember that keeping it from becoming public is extremely valuable
-->


---
routeAlias: 4d372fbb-1678-475c-882d-84ec364f2245
layout: cover
---

Which secrets?

Any key or password you need in your application that should not be used to communicate with other computers.
<br/>

**Examples:**
- Connection strings
- API keys
- Private keys
- JWT secret

<!--
None of these should be committed to your repository.
- It can become very expensive if everyone knows the credentials for the company's database, the APIs you have access to, etc.
-->


---
routeAlias: d36e3757-f9ac-4e0f-96a1-7be25b078f89
layout: image-right
image: /week-38/pictures/how-to-avoid.png
imageBottomPlacement: -40px
imageHeight: 400px
imageRightPlacement: 200px
---

# How do you avoid it?

<br/>

<div v-click>

```bash
git add -A 
git diff --cached
git commit -m "No secrets committed"
```

</div>

<!--
- Some technologies can check your code for passwords or keys before you push it, but they are not 100% foolproof
- The best approach is to review the code before committing, which has several other benefits as well.
-->

---
routeAlias: 89e44f90-f6fe-4ed9-993a-f6155a13c027
layout: image-right
image: /week-38/pictures/postgresql.png
imageHeight: 250px
imageBottomPlacement: 100px
imageRightPlacement: 200px
---

# Secrets in development

<br/>
<br/>

<img src="/week-38/pictures/user-secrets-dotnet.png" style="height: 300px"/>

<!--
It is very convenient to run `docker compose up` and have everything run at the same time.
- It helps onboard new developers
- For a local database (on your PC), it is okay to put the connection string in the repository.
- However, make sure you do not reuse the passwords.
- Anything that communicates with external APIs or similar services should still not be stored in your repository.
- user-secrets is a feature .NET has added for storing secrets during development.
-->



---
routeAlias: 2d05452c-2483-46e6-9f5b-091cc1851d61
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

Replace with:

```bash

dotnet user-secrets set "ConnectionStrings:Default" "Server=YOUR_SERVER;Database=MY_DB;User Id=MY_USER;Password=MY_PASSWORD;"

```

<!--
User secrets keep secrets out of your applications and store them locally on your computer instead.
- They are associated with each individual project
- User secrets are loaded before appsettings.
-->


---
routeAlias: a84b83da-c198-4a1d-8cd6-be18c2e196c3
layout: cover
---


# Environment file

<br/>

Environment setup in compose.yaml

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
In Docker, you can also reference an entire file.
-->

---
routeAlias: e87155ed-0192-4492-b4a4-fcd9977ea8fd
layout: image-right
image: /week-38/pictures/fly-io-logo.webp
imageHeight: 200px
imageRightPlacement: 200px
imageBottomPlacement: 200px
---

# Deployment

<!--
- Make software ready for use
- Web apps therefore also need to use a web server
- Two options: a VM or Docker containers
- You have had a taste of both over the past few weeks
-->


---
routeAlias: a8761b13-548d-4e6b-9fcd-4365c42aa7fd
layout: image-right
image: /week-38/pictures/seperate-domains.png
imageHeight: 450px
imageRightPlacement: 200px
---

# Separate domains


<!--
In Alex's classes, you have been using:
- Frontend = 1 URL
- Backend = 1 URL
- With Docker Compose, you can run everything under one URL.
-->



---
routeAlias: 46a8b880-538c-443c-b3c3-c213974d4359
layout: image-right
image: /week-38/pictures/proxy.png
imageHeight: 450px
imageRightPlacement: 200px
---

# Proxy 

<!--
The trick is to take certain paths and redirect them to the backend. This means no frontend changes are needed based on where the API is running.
I use Nginx for this.
- One thing has changed compared with running Docker Compose: only one image can be built on Fly.io.
-->


---
routeAlias: 1e7c9138-0e11-464e-94ef-2961f3ef7072
layout: cover
---

# Proxy vs no proxy

| **Proxy** | **No proxy**|
|-------|----------|
| Requires configuration of the paths the web server should forward | Requires careful configuration of CORS headers |
| Frontend and backend use the same domain | Frontend and backend use separate domains |
| The frontend can call the API using relative paths | The frontend must know the backend URL |
| Only the proxy is publicly accessible | The frontend and backend are accessible separately |
| Routing is handled in one place | Requests are sent directly to the backend |


---
routeAlias: 664fe79b-6e54-4ffd-8664-cd5b0fece8e4
layout: cover
---

# No proxy 
TypeScript

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
With the no-proxy approach, it will look like this. This is similar to what Alex will show you.
-->

---
routeAlias: bd324c5a-0780-4ac4-a660-aaa7703ff840
layout: cover
---

# Proxy 
TypeScript

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
There is no need to define a base URL here because everything is relative to the web server.
- Instead, you simply use **/api**, and all requests to this path will be sent to the backend.
- This does, of course, require some configuration
- This is a simple nginx.conf file.
-->

---
routeAlias: 9f2abee6-6506-415b-bb20-b3cffb088f4d
layout: image-right
image: /week-38/pictures/cors.png
imageHeight: 400px
imageRightPlacement: 100px
---

# No proxy
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
If the server at bar.com receives a request from foo.com, this code means it does not care where the request comes from. In other words, it can come from any domain. This makes it easier for a hacker to send requests to the API.
-->



---
routeAlias: 03666dab-7d94-46e1-aaa9-dbe79d95ecdf
layout: cover
---


# No proxy
CORS


<div  class="magic-move-medium">

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyApp", policy =>
    {
        policy.WithOrigins("https://example.com")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("AllowMyApp");
```

</div>


<!--
You avoid this by defining a domain in Origin. Requests from this domain will then be accepted, but requests from other domains will not.
-->



---
routeAlias: 794a86e0-7ad3-4b43-a960-8f859e169999
layout: image-right
image: /week-38/pictures/tls-certificate.png
imageHeight: 400px
imageRightPlacement: 100px
---

# Domain and TLS certificate

<!--
In this screenshot, the domain is s-e-a.dk. A TLS certificate is what allows us to run the web app over a secure connection using HTTPS.
- Fly.io takes care of this
- However, if you want your own domain, you have to buy the domain and obtain a certificate. Today, you do not need to pay for the certificate itself.
-->
