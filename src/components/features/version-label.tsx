import { useEffect, useState } from "react";

const VersionLabel = () => {
    const [version, setVersion] = useState("Cargando...");

    useEffect(() => {
        const fetchVersion = async () => {
            try {
                const response = await fetch('/version.txt');
                if (!response.ok) throw new Error();
                const text = await response.text();
                setVersion(text.trim()); 
            } catch (err) {
                setVersion('undefined');
            }
        };

        fetchVersion();
    }, []);

    return (
        <div className="w-full h-fit flex items-center justify-center py-1.5">
            <span className="text-xs text-muted-foreground">Current version: {version}</span>
        </div>
    );
};

export { VersionLabel };
