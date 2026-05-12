import { ChangeEvent, useState } from "react";

export function useImagePreview() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const tempUrl = URL.createObjectURL(file);
            setPreviewUrl(tempUrl);
            setFileName(file.name);
        }
    };

    const clearPreview = () => {
        setPreviewUrl(null);
        setFileName("");
    };

    return { previewUrl, fileName, onFileSelected, clearPreview };
}