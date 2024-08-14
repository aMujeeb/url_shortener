
import LaunchRedirectUrl from "@/app/components/redirection";

const URL_REDIRECT_ENDPOINT = "api/url/redirect";
export default async function RequestShortData({ params }: {
    params: { shortId: string }
}) {
    if (params.shortId === '') {
        return
    }
    try {
        const queryParams = new URLSearchParams({
            shorturl: `short/${params.shortId}`
        });

        const response = await fetch(`http://localhost:3000/api/url/redirect?${queryParams}`, {
            cache: 'no-store'
        });
        const { data, status_code } = await response.json();

        if (status_code === 204) {
            return (
                <h1>URL Not found</h1>
            )
        } else {
            //console.log("original url", data)
            return <LaunchRedirectUrl originalUrl={data} />
        }
    } catch (err) {
        return (
            <h1>Re Directed Error Occured</h1>
        )
    }
}