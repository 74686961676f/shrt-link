import type { LocalStorageShorts } from "@/types";
import { Button } from "../ui";
import { CopyIcon } from "lucide-react";
import { cn } from "cn";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Short = ({ shortCode, url }: LocalStorageShorts) => {
    const { t } = useTranslation('page');

    const PLAIN_URL = `${import.meta.env.VITE_PUBLIC_DOMAIN}/${shortCode}`;
    const FORMATED_URL = /^https?:\/\//i.test(PLAIN_URL) ? PLAIN_URL : PLAIN_URL.includes('localhost') ? `http://${PLAIN_URL}` : `https://${PLAIN_URL}`;

    const handleCopy = async () => {
        try {
            toast(t('url_clipboard', 'Enlace copiado correctamente'));
            await navigator.clipboard.writeText(FORMATED_URL);
        } catch (error) {
            console.error("Failed to copy link:", error);
        }
    };

    return (
        <div
            className={cn(
                "w-full flex mt-1.5 p-1.5 border-b border-b-blue-50 items-center justify-center",
                'text-sm text-muted-foreground'
            )}
        >
            <div title={url} className="w-1/2 pr-5 max-w-full flex items-center justify-start">
                <span className="truncate">
                    {url}
                </span>
            </div>
            <div
                className="w-1/2 flex items-center justify-between"
            >
                <a href={FORMATED_URL} className="text-black">
                    {PLAIN_URL}
                </a>
                <Button
                    size={'icon-sm'}
                    variant={'ghost'}
                    aria-haspopup
                    onClick={handleCopy}
                >
                    <CopyIcon />
                </Button>
            </div>
        </div>
    )
};

//@ts-ignore
const GridShorts = ({ update }: { update: number }) => {
    const { t } = useTranslation('page');

    const items: LocalStorageShorts[] = (() => {
        try {
            return JSON.parse(
                localStorage.getItem("items") ?? "[]"
            );
        } catch {
            return [];
        }
    })();

    return (
        <>
            <div className="flex w-full pt-10 pb-20 items-start justify-start flex-col">
                <div className="mb-0.5">
                    <span className="text-left select-none">{t('recents', 'Enlaces recientes')}</span>
                </div>
                {items.length <= 0 && <div className="mx-auto py-10">
                    <span className="text-sm text-muted-foreground ">{t('noYet', 'Aún no tienes enlaces.')}</span>
                </div>
                }
                {items.map((i, n) => (
                    <Short
                        {...i}
                        key={n}
                    />
                ))}
            </div>
        </>
    )
};

export {
    GridShorts
};
