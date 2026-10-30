import { Favicon, GitHub } from "@/components/icons";
import { Button } from "@/components/ui";
import { GridShorts, Shortener, VersionLabel } from "./components/features";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const REPO_LINK = `https://github.com/74686961676f/shrt-link`;

export default function App() {
  const [n, update] = useState(0);

  const { t } = useTranslation('page');

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'rounded-xl! text-sm!'
        }}
      />
      <main className="mx-auto flex flex-col items-center justify-start">
        <header className="flex items-center justify-between">
          <span className="inline-flex text-lg">
            <Favicon width={40} />
          </span>
          <div className="flex items-center justify-center gap-1.5">
            <Button
              variant={'ghost'}
              aria-haspopup
              className={'rounded-lg bg-zinc-100 hover:bg-zinc-200 font-normal'}
              onClick={() => {
                alert(t('messageAn', 'En esta demostración, el dominio «shrt.ink» se utiliza únicamente con fines de prueba; en realidad, no funciona. Si deseas realizar pruebas utilizando el dominio «localhost» o cualquier otro, dirígete al archivo `.env` y modifica el valor de `VITE_PUBLIC_DOMAIN`.'))
              }}
            >
              {t('ann', '¡Nota!')}
            </Button>
            <Button
              size={"icon-sm"}
              aria-haspopup
              variant={'ghost'}
              nativeButton={false}
              render={(props) => <a {...props} href={REPO_LINK} />}
            >
              <GitHub width={20} />
            </Button>
          </div>
        </header>
        <section
          className="w-full flex flex-col items-center justify-start"
        >
          <h1 className="text-3xl text-center font-medium">
            {t('title', 'Acortá tus enlaces.')}
          </h1>
          <p className="text-sm text-center text-muted-foreground">
            {t('about', 'Pegá un enlace largo y obtene una URL corta, simple y facíl de compartir.')}
          </p>
          <Shortener
            onShort={() => update((previous) => previous + 1)}
          />
          <GridShorts
            update={n}
          />

        </section>
      </main>
      <VersionLabel />
    </>
  );
}