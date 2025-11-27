import { toast } from "sonner";

export const errorMsg = (message:String) => {
    toast.error(message);
};

export const successMsg = (message = "Success") => {
    toast.success(message, { id: "success-toast" });
};


export const handleCatchErrors = (error: any) => {
    const { status, data } = error?.response || {};

    if (error.response) {
        const message = data?.error?.detail || data?.message || "Something went wrong";

        errorMsg(message);

        switch (status) {
            case 401:
                // redirect if needed
                break;
            case 403:
                break;
            case 404:
                break;
            case 500:
                break;
            default:
                console.error("Unhandled error:", status, data);
        }
    }

    return null;
};

export const getHeader = () => ({
    headers: {
        "Content-Type": "application/json",
    },
});


export const buildUrl = (baseUrl: string, params: Record<string, any> = {}) => {
    let url = baseUrl;

    const remaining = { ...params };

    Object.keys(params).forEach((key) => {
        const placeholder = `:${key}`;
        if (url.includes(placeholder)) {
            url = url.replace(placeholder, params[key]);
            delete remaining[key];
        }
    });

    const query = new URLSearchParams(remaining).toString();

    return query ? `${url}?${query}` : url;
};
