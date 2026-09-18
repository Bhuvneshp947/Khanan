# Nova Storefront

Dark luxury storefront for SYNOVA with bold typography, smooth GSAP reveal animations, hover motion, and a premium mobile accessory product layout.

## Development

Use Node.js and npm.

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

On Windows, run this from PowerShell in the project folder:

```powershell
cd "C:\Users\bhuvn\Downloads\parallax-pixels-theme"
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev
```

Open `http://127.0.0.1:8080/` or `http://localhost:8080/`. The port is `8080`, not `808`.

For automatic order emails, configure the server environment before starting the app:

```sh
RESEND_API_KEY=re_your_key
ORDER_EMAIL_FROM="SYNOVA Orders <orders@your-domain.com>"
```

Orders are sent to `bhuvneshp947@gmail.com` and also open WhatsApp for confirmation.
