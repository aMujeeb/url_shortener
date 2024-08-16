
import LaunchRedirectUrl from "@/app/components/redirection";

export default async function RequestShortData({ params }: {
    params: { shortId: string }
}) {
    if (params.shortId === '') {
        return <h1>Invalid URL</h1>;
    }
    try {

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        const queryParams = new URLSearchParams({
            shorturl: `short/${params.shortId}`
        });

        const response = await fetch(`${apiUrl}/api/url/redirect?${queryParams}`, {
            cache: 'no-store'
        });
        const { data, status_code } = await response.json();

        if (status_code === 404) {
            return (
                <h1>URL Not found</h1>
            )
        } else {
            //console.log("original url", data)
            return <LaunchRedirectUrl originalUrl={data} />
        }
    } catch (err) {
        return (
            <h1>An error occurred while redirecting</h1>
        )
    }
}