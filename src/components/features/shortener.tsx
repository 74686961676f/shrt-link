import { cn } from "cn";
import { LinkIcon, Loader2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui";
import { ValidateURL } from "@/lib";
import { ShortURL } from "@/services";
import { useTranslation } from "react-i18next";

const EXAMPLES = [
    'google.com',
    'facebook.com',
    'netflix.com',
    'crunchyroll.com'
];

interface PropsShortener {
    onShort: () => void;
};

const Shortener = (props: PropsShortener) => {
    const [value, setValue] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const { t } = useTranslation('page');

    const validURL = useMemo(() => {
        return ValidateURL(value);
    }, [value]);

    const shortLink = async () => {
        setLoading(true);
        ShortURL(value)
            .then(() => props.onShort())
            .finally(() => setLoading(false));
    };

    return (
        <>
            <div
                className={cn(
                    'w-full mt-5 border p-2 rounded-xl',
                    'flex items-center justify-start',
                    'focus-within:border-blue-200'
                )}
            >
                <div className="w-full flex items-center justify-center">
                    <div className="size-fit mr-1.5">
                        <LinkIcon size={14} className="text-zinc-500" />
                    </div>
                    <div
                        className="[&_input]:text-sm [&_input]:outline-none [&_input]:w-full w-full"
                    >
                        <input
                            type="text"
                            placeholder={t('shortener', 'Pegar enlace aqui...')}
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            disabled={isLoading}
                            className="disabled:text-muted-foreground"
                        />
                    </div>
                </div>
                <Button
                    className={'font-normal text-sm rounded-lg text-black'}
                    aria-haspopup
                    variant={'ghost'}
                    disabled={!validURL || isLoading}
                    onClick={() => { shortLink() }}
                >
                    {
                        !isLoading ? t('shortenbutton', 'Acortar') :
                            <Loader2Icon className="animate-spin" />
                    }
                </Button>
            </div>
            <div className="flex items-start flex-wrap justify-start w-full pt-3.5">
                {EXAMPLES.map((i, n) => (
                    <Button
                        key={n}
                        onClick={() => setValue(i)}
                        className={'rounded-lg text-black bg-zinc-100 hover:bg-zinc-200 font-normal'}
                        variant={'ghost'}
                    >
                        {i}
                    </Button>
                ))}
            </div>
        </>
    )
};

export {
    Shortener
};